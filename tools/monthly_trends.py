# -*- coding: utf-8 -*-
"""Monthly GitHub star snapshot for Signal Ledger.

Run locally:
    python tools/monthly_trends.py [--period 2026-11] [--dry-run]

In GitHub Actions it uses the automatic GITHUB_TOKEN. The script writes
trend-snapshots/<YYYY-MM>.json and trend-snapshots/latest.json, then prints a
markdown table for the monthly editorial review. It deliberately does not edit
data.js: direction clustering and Asia feasibility need human review.
"""
import argparse
import datetime as dt
import json
import os
import ssl
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACKED = os.path.join(ROOT, "tools", "tracked-repos.json")
SNAPSHOTS = os.path.join(ROOT, "trend-snapshots")
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE


def fetch_repo(repo, token):
    url = "https://api.github.com/repos/" + repo
    headers = {
        "User-Agent": "signal-ledger-monthly",
        "Accept": "application/vnd.github+json",
    }
    if token:
        headers["Authorization"] = "Bearer " + token
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        print("  ! %s -> HTTP %s" % (repo, e.code))
        return None
    except Exception as e:
        print("  ! %s -> %s" % (repo, str(e)[:80]))
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--period", default=dt.datetime.now().strftime("%Y-%m"))
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or ""
    with open(TRACKED, encoding="utf-8") as f:
        repos = json.load(f)

    prev = {}
    prev_path = os.path.join(SNAPSHOTS, "latest.json")
    if os.path.exists(prev_path):
        try:
            with open(prev_path, encoding="utf-8") as f:
                prev_doc = json.load(f)
            prev = {r["repo"]: r for r in prev_doc.get("repos", [])}
        except Exception:
            prev = {}

    rows = []
    for repo in repos:
        d = fetch_repo(repo, token)
        if not d:
            continue
        stars = int(d.get("stargazers_count") or 0)
        old = prev.get(repo, {}).get("stars")
        delta = (stars - old) if isinstance(old, int) else None
        rows.append({
            "repo": repo,
            "stars": stars,
            "delta_since_last_snapshot": delta,
            "forks": int(d.get("forks_count") or 0),
            "open_issues": int(d.get("open_issues_count") or 0),
            "pushed_at": d.get("pushed_at"),
        })
        print("  %-42s %8d  %s" % (repo, stars, ("+" + str(delta)) if delta is not None else "—"))

    doc = {
        "period": args.period,
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "source": "GitHub REST API",
        "repos": rows,
    }
    if args.dry_run:
        print(json.dumps(doc, ensure_ascii=False, indent=2))
        return 0

    os.makedirs(SNAPSHOTS, exist_ok=True)
    out = os.path.join(SNAPSHOTS, args.period + ".json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
    with open(prev_path, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
    print("\nWrote", out)
    print("Next: review directions/Asia sections, update signal-ledger/data.js, then publish.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
