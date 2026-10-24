# Monthly snapshots

`monthly_trends.py` writes one JSON per month, then updates `latest.json`.
The GitHub Action runs on the 24th of each month (09:17 Asia/Shanghai).

Editorial update after each snapshot:

1. Read `trend-snapshots/<YYYY-MM>.json` and the job summary.
2. Re-check the direction clusters and the 7 `trend.directions` entries.
3. Update `signal-ledger/data.js` (`repos`, `trend.period`, `trend.updatedAt`, `trend.nextUpdate`).
4. Publish and verify the live page.
