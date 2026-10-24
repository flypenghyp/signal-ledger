/* Signal Ledger — static dataset (window 2026-09-24 → 2026-10-24) */
window.LEDGER = {
  meta: {
    windowStart: "2026-09-24",
    windowEnd: "2026-10-24",
    cut: "2026-10-24",
    totalDisclosed: 286.9,
    dealCount: 18,
    repoCount: 18
  },

  deals: [
    {
      id: "dream-labs", name: "Dream Labs", hq: "旧金山", region: "US",
      stage: "Seed", amount: 90, amountLabel: "$90M", date: "2026-10-19",
      sector: "physical", sectorLabel: "物理 AI / 机器人",
      oneLiner: "机器人通用基础模型 Dream-1 + 按小时计费的 API",
      lead: "B Capital、Kindred Ventures", confidence: "A",
      notable: "把操作技能建模成视频预测，支持没见过的本体、任务与场地；开放 $3/小时 API，合作 20+ 硬件厂商。",
      asia: "高：东亚协作臂与双足硬件最密集，缺的正是“任意本体可用的通用大脑”；边缘部署与数据合规是本地化关键。"
    },
    {
      id: "watchtower", name: "Watchtower Labs", hq: "西雅图", region: "US",
      stage: "Seed", amount: 35, amountLabel: "$35M", date: "2026-10-21",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "国防后勤的 AI 决策与仿真",
      lead: "未证实", confidence: "B",
      notable: "在敌情、天气、运力变化前先跑补给方案；已有 DIU 原型合同，团队为前海军陆战队特战军官 + 微软系统工程师。",
      asia: "中低：国防采购高度本地化；能力可平移到应急管理、港口/航运调度与供应链韧性。"
    },
    {
      id: "mach9", name: "Mach9", hq: "旧金山", region: "US",
      stage: "Series A", amount: 34, amountLabel: "$34M", date: "2026-10-21",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "把 3D 实景捕捉自动转成土木工程图纸",
      lead: "First Round、Bessemer", confidence: "A",
      notable: "AI CAD 重做的是输入管线，而不是给旧软件加 Copilot；服务基建巡检、改扩建与新建，团队来自 CMU 机器人研究所。",
      asia: "高：亚洲基建存量大、测绘数字化参差；需适配本地坐标规范、点云格式，做区域版 CAD 插件或数据服务更现实。"
    },
    {
      id: "outersignal", name: "OuterSignal", hq: "纽约", region: "US",
      stage: "Series A", amount: 22, amountLabel: "$22M", date: "2026-09-30",
      sector: "enterprise", sectorLabel: "企业数据 / 软件",
      oneLiner: "消费品牌的客户情报与个性化营销层",
      lead: "Long Journey、Abstract", confidence: "B",
      notable: "在第三方 cookie 退场、AI 内容泛滥的背景下，帮品牌识别“客户到底是谁”，并据此做跨平台投放。",
      asia: "中高：跨境电商与美妆/食品品牌同样缺第一方客户资产；差异化要靠跨平台数据整合。"
    },
    {
      id: "azoma", name: "Azoma", hq: "多伦多 / 伦敦", region: "EU",
      stage: "Series A", amount: 11.2, amountLabel: "$11.2M", date: "2026-10-21",
      sector: "agent", sectorLabel: "代理经济基础设施",
      oneLiner: "ACO：让品牌在 AI 购物代理里被看见、被推荐",
      lead: "未披露", confidence: "A",
      notable: "把 SEO 预算迁移成“代理可见度”预算，提供测量/优化/执行三层工具，客户含 L'Oréal、Unilever、Mars；收入一年近 10 倍。",
      asia: "高，时间窗明确：淘宝问问、京东/美团 AI 助手、LINE/Naver/Kakao 生态正在成形；各家代理的引用结构差异是本地化关键。"
    },
    {
      id: "parakeet", name: "Parakeet Health", hq: "美国", region: "US",
      stage: "Series A", amount: 10, amountLabel: "$10M", date: "2026-10-01",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "面向诊所的患者预约/随访对话 Agent",
      lead: "Canvas Ventures", confidence: "B/C",
      notable: "已签美国前十大皮肤科集团中的 6 家，与 Qualderm 合作覆盖 160 家诊所；ARR 一年约 10 倍。",
      asia: "中高：私立诊所/医美预约密集，微信/LINE 天然适合对话式 Agent；先从非诊疗的预约与回访切入。"
    },
    {
      id: "destro", name: "Destro AI", hq: "纽约", region: "US",
      stage: "Seed", amount: 8, amountLabel: "$8M", date: "2026-09-30",
      sector: "physical", sectorLabel: "物理 AI / 机器人",
      oneLiner: "跨品牌仓储机器人、人与企业系统的编排层",
      lead: "Base10、Bonfire", confidence: "B",
      notable: "不绑定任何机器人品牌，解决仓库里多品牌 AGV/AMR 无法协同的真实痛点；做编排层比再做一款机器人更轻。",
      asia: "很高：亚洲电商仓的机器人品牌碎片化更严重，跨品牌编排的本地需求可能比美国更刚性。"
    },
    {
      id: "gudea", name: "Gudea", hq: "美国", region: "US",
      stage: "Seed", amount: 7, amountLabel: "$7M", date: "2026-10-08",
      sector: "enterprise", sectorLabel: "企业数据 / 软件",
      oneLiner: "预测哪条叙事会爆、在哪些平台扩散",
      lead: "Mudita、Collide", confidence: "B/C",
      notable: "把自己定位为“互联网风暴追踪器”，把舆情从事后监测推向事前概率预测；收入同比 +357%，39 家客户。",
      asia: "中：多语种、多平台（微信/微博/小红书/X/LINE）扩散路径差异大，模型需重训；品牌与公共事务付费意愿在上升。"
    },
    {
      id: "elio", name: "Elio Mortgage", hq: "纽约", region: "US",
      stage: "Pre-seed", amount: 5.1, amountLabel: "$5.1M", date: "2026-10-01",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "自己持牌的 AI 原生房贷机构",
      lead: "Motive、Social Leverage", confidence: "B",
      notable: "拒绝“卖 SaaS 给银行”，自己持牌经营、直接吃利差与手续费；用真实业务打磨自动填表、缺件识别与嵌入式房贷。",
      asia: "中低：房贷牌照与征信高度本地化；范式可迁移到消费金融/保险经纪，前提是找到持牌合作方。"
    },
    {
      id: "beagle", name: "Beagle Labs", hq: "纽约", region: "US",
      stage: "Pre-seed", amount: 4.1, amountLabel: "$4.1M", date: "2026-09-29",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "财险核保的 AI + 线下查勘数据平台",
      lead: "Chingona Ventures", confidence: "B",
      notable: "组织 7,000+ 名认证查勘员，把电气、管道、消防等卫星看不到的墙内隐患结构化，14 天返回首检；AI 与线下履约互相喂养。",
      asia: "中高：亚洲工程险/商业地产险查勘分散；AI 预判 + 众包查勘可复制，难点在查勘标准与责任归属。"
    },
    {
      id: "xrlabs", name: "XRlabs", hq: "伦敦 / 帕洛阿尔托", region: "EU",
      stage: "Seed", amount: 8.4, amountLabel: "$8.4M", date: "2026-10-19",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "不换设备、只加软件层的手术室“外科智能”",
      lead: "Playground Global", confidence: "A",
      notable: "融合 4K 3D 手术镜、导航遥测与术前 CT/MRI，做解剖感知与器械追踪；已在三大洲 100+ 台手术中使用。",
      asia: "中高：设备保有量上升、医院愿为“不换设备的能力升级”付费；医疗器械软件注册（NMPA/PMDA/CE）是硬门槛，宜与本土设备厂商捆绑。"
    },
    {
      id: "klarent", name: "Klarent", hq: "苏黎世", region: "EU",
      stage: "Seed", amount: 8, amountLabel: "$8M", date: "2026-10-12",
      sector: "agent", sectorLabel: "代理经济基础设施",
      oneLiner: "自主软件测试 Agent：LLM 生成 + 确定性校验",
      lead: "Mosaic Ventures", confidence: "A",
      notable: "用 LLM 生成并自适应测试代码，但保留确定性测试与人工核验；在“代码由 AI 生成”的时代，测试也必须可验证。",
      asia: "高：亚洲软件外包与互联网研发密度高，测试人力占比大；需适配本地 CI/CD 与框架。"
    },
    {
      id: "ygo", name: "YGO", hq: "柏林", region: "EU",
      stage: "Series A", amount: 9.0, amountLabel: "€8M", date: "2026-10-21",
      sector: "agent", sectorLabel: "代理经济基础设施",
      oneLiner: "把旅游库存变成 AI 代理可查询、可下单的接口",
      lead: "Ventech", confidence: "B",
      notable: "结构化航司/酒店碎片化库存并做验证，让 ChatGPT/Claude/Gemini 安全下单；6 个月 €15M 交易额、七位数经常性收入。",
      asia: "很高：亚洲 OTA/航司/酒店库存同样碎片化，“代理可调用层”接近空白；需与本地 GDS/OTA 深度对接。"
    },
    {
      id: "deepslate", name: "Deepslate", hq: "柏林", region: "EU",
      stage: "Seed", amount: 8.7, amountLabel: "€7.7M", date: "2026-10-01",
      sector: "agent", sectorLabel: "代理经济基础设施",
      oneLiner: "欧洲的语音到语音模型，主打数据主权",
      lead: "42CAP", confidence: "B",
      notable: "端到端 speech-to-speech，不经过“语音转文字再转回”，保留语气、重音、方言；EU 境内托管、ISO 27001、可私有化。",
      asia: "高：多语种多方言 + 各国数据本地化；中国/日韩有本土玩家，机会更在东南亚。"
    },
    {
      id: "photon", name: "Photon Bridge", hq: "埃因霍温", region: "EU",
      stage: "Seed", amount: 11.3, amountLabel: "€10M", date: "2026-10-21",
      sector: "infra", sectorLabel: "AI 基础设施",
      oneLiner: "AI 数据中心光互连的激光光源",
      lead: "Amadeus APEX、360 Capital", confidence: "B",
      notable: "用多路低功率激光合束/复用替代少数高功率激光，提升良率、适配共封装光学（CPO）规模化；首批样品 2027。",
      asia: "中：光模块制造高度集中在亚洲，适合被亚洲供应链采购/合作，而不是直接复制商业模式。"
    },
    {
      id: "marc", name: "MARC", hq: "纽约 / 都柏林", region: "US",
      stage: "Seed", amount: 5, amountLabel: "$5M", date: "2026-10-22",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "商业地产运营支出的 AI 审计器",
      lead: "Work-Bench、MXV", confidence: "B",
      notable: "连接合同、发票、供应商数据，发现超额收费、保护 NOI；已管理 30 州 + 加拿大超 $1 亿年度供应商支出，融资前已盈利。",
      asia: "中高：REITs 与资管同样存在“合同 vs 发票”对账黑洞；发票/税务格式与供应商体系是本地化关键。"
    },
    {
      id: "dubsof", name: "Dubsof", hq: "都柏林", region: "EU",
      stage: "Undisclosed", amount: 6.5, amountLabel: "$6.5M", date: "2026-10-13",
      sector: "enterprise", sectorLabel: "企业数据 / 软件",
      oneLiner: "用 AI 给中小企业生成整套业务系统",
      lead: "未披露（BlueYard 等参投）", confidence: "B",
      notable: "按企业实际流程生成定制软件（车队、排程、合规、办公），目标客户是土木、工业自动化、运输等“没有像样软件”的中小企业。",
      asia: "很高：亚洲中小企业多、定制软件贵；“AI 生成 + 本地服务商交付”在东南亚/南亚尤其成立，可靠性是规模化瓶颈。"
    },
    {
      id: "alchera", name: "Alchera", hq: "剑桥", region: "EU",
      stage: "Seed", amount: 3.6, amountLabel: "£2.7M", date: "2026-10-13",
      sector: "vertical", sectorLabel: "垂直行业 AI",
      oneLiner: "城市道路/公交网络的 AI 决策层",
      lead: "Maven / British Business Bank", confidence: "B",
      notable: "融合交通与上下文数据，把路网/公交运行分析从数周压到数秒；客户为地方政府、公路运营方与顾问。",
      asia: "中高：智慧交通预算足，但采购周期长、数据开放度差异大；宜与本地系统集成商合作。"
    }
  ],

  repos: [
    { repo: "morluto/rea", dir: "逆向 / 兼容", lang: "TypeScript", stars: 373082, d30: 372523, d7: 82269,
      quality: "mixed", what: "Agent 通过 MCP 调用 Ghidra/IDA 等工具，对二进制、App、网站做带证据的逆向分析",
      evidence: "4 天连发 3 版；6.6.0 含 571 commits / 236 PR；1,549 open issues。但单周 24.9 万 star 的量级异常。",
      url: "https://github.com/morluto/rea" },
    { repo: "eternity4719/HowToLiveBetter", dir: "垂直应用 / 内容", lang: "HTML", stars: 68326, d30: 55100, d7: null,
      quality: "hype", what: "中文“高性价比人生指南”文档站，覆盖健康、法律、理财、婚育",
      evidence: "纯 HTML、CC-BY-4.0、仅 21 个 issue；star 反映收藏/转发，不是工程采用。",
      url: "https://github.com/eternity4719/HowToLiveBetter" },
    { repo: "debpalash/VoiceStudio", dir: "创作与多媒体", lang: "Python", stars: 83295, d30: 48265, d7: 12130,
      quality: "mixed", what: "完全本地的 ElevenLabs 替代：声音克隆、配音、转录、有声书",
      evidence: "AGPL-3.0；332 open issues；日更。方向真实，但 star/issue 比例偏低，存在推广助推。",
      url: "https://github.com/debpalash/VoiceStudio" },
    { repo: "storytold/artcraft", dir: "创作与多媒体", lang: "Rust", stars: 35991, d30: 33865, d7: 20267,
      quality: "strong", what: "面向艺术家/影视创作者的 AI 图像 + 视频创作 IDE，保留 2D/3D 可编辑场景",
      evidence: "Apache-2.0；516 issues；每日 push；仓库有长期代码史。30 天涨 3.3 万 star 仍偏话题驱动。",
      url: "https://github.com/storytold/artcraft" },
    { repo: "mattpocock/skills", dir: "Agent Skills", lang: "Shell", stars: 301801, d30: 33171, d7: 7793,
      quality: "mixed", what: "Matt Pocock 的“真实工程”Skills 合集，可被多个 coding agent 安装",
      evidence: "MIT；release v1.3.1；201 issues；作者长期影响力。30 万总 star 明显偏离同类历史量级。",
      url: "https://github.com/mattpocock/skills" },
    { repo: "DietrichGebert/ponytail", dir: "Agent Skills", lang: "JavaScript", stars: 174788, d30: 29679, d7: 9578,
      quality: "hype", what: "让 coding agent 像“最懒的资深工程师”一样少写代码的 Skill",
      evidence: "4 个月 17 万 star；watchers/star 仅 0.2%；典型情绪共鸣型传播。",
      url: "https://github.com/DietrichGebert/ponytail" },
    { repo: "stablyai/orca", dir: "多 Agent 工作台", lang: "TypeScript", stars: 103839, d30: 26616, d7: 9355,
      quality: "strong", what: "多 Agent 工作台：worktree 隔离、手机监控、远程 SSH，可跑任意 coding agent",
      evidence: "日更 release；v1.4.237 的 mac 安装包累计下载约 27.8 万；8,760 open issues；fork 6,557。真需求最强样本。",
      url: "https://github.com/stablyai/orca" },
    { repo: "vectorize-io/hindsight", dir: "Agent 记忆", lang: "Python", stars: 53129, d30: 25850, d7: null,
      quality: "mixed", what: "Agent 长期记忆：retain / recall / reflect，可自托管",
      evidence: "v1.1.0 changelog 含数十 PR 与外部贡献者；但新 release 二进制下载仅数百、watchers 110，“star 高、下载低”背离明显。",
      url: "https://github.com/vectorize-io/hindsight" },
    { repo: "paperclipai/paperclip", dir: "多 Agent 工作台", lang: "TypeScript", stars: 106586, d30: 25205, d7: null,
      quality: "strong", what: "开源的多 Agent 组织、任务与成本控制平面",
      evidence: "6,443 open issues、17,718 forks、每日 push。issue 爆炸说明真实使用/试错，也说明产品尚不稳定。",
      url: "https://github.com/paperclipai/paperclip" },
    { repo: "cloudflare/security-audit-skill", dir: "Agent Skills", lang: "JavaScript", stars: 42089, d30: 21099, d7: 11834,
      quality: "hype", what: "Cloudflare 出品的多阶段安全审计 Skill，产出可机读、可独立验证的结论",
      evidence: "0 release、最后 push 2026-09-14（5 周无提交），却月增 2.1 万 star；品牌 + 榜单驱动。",
      url: "https://github.com/cloudflare/security-audit-skill" },
    { repo: "affaan-m/ECC", dir: "多 Agent 工作台", lang: "JavaScript", stars: 287313, d30: 21006, d7: null,
      quality: "hype", what: "“Agent 性能优化系统”：Skills、instincts、memory、安全与研究流程",
      evidence: "28.7 万 star 与 4.2 万 fork 的比例异常（watchers 仅 1,409），大概率叠加社区互推。",
      url: "https://github.com/affaan-m/ECC" },
    { repo: "MadsLorentzen/ai-job-search", dir: "垂直应用 / 内容", lang: "Python", stars: 64092, d30: 20321, d7: 15612,
      quality: "strong", what: "本地运行的 AI 求职框架：评估岗位、改简历、写 cover letter、面试准备",
      evidence: "fork/star ≈ 31%（“fork 即拥有”设计）；issue 少，属拿来就用型；已迁移到 ai-job-search-dev。",
      url: "https://github.com/ai-job-search-dev/ai-job-search" },
    { repo: "yetone/magpie", dir: "本地运行时 / 网关", lang: "Go", stars: 20202, d30: 19719, d7: 6043,
      quality: "mixed", what: "本地模型网关：让 Codex 用 DeepSeek、Claude Code 用 Kimi，菜单栏切换",
      evidence: "创建仅一个月；1,592 open issues；watchers 26（0.13%）。真实痛点 + 病毒式传播的混合体。",
      url: "https://github.com/yetone/magpie" },
    { repo: "cathrynlavery/diagram-design", dir: "Agent Skills", lang: "HTML", stars: 60350, d30: 18122, d7: 9024,
      quality: "strong", what: "45 种图表类型的 Agent Skill，输出自包含 HTML + SVG",
      evidence: "MIT；43 issues；10 月仍在更新；输出物可验证。star/issue 比偏高，含榜单放大。",
      url: "https://github.com/cathrynlavery/diagram-design" },
    { repo: "heygen-com/hyperframes", dir: "创作与多媒体", lang: "TypeScript", stars: 70785, d30: 18056, d7: 5601,
      quality: "strong", what: "把 HTML/CSS/媒体/动画渲染成确定性 MP4，面向 Agent 的视频生产线",
      evidence: "Apache-2.0；411 issues；每日 push；HeyGen 官方团队维护。企业级真需求。",
      url: "https://github.com/heygen-com/hyperframes" },
    { repo: "lexmount/moli", dir: "本地运行时 / 网关", lang: "Rust", stars: 20315, d30: 18000, d7: null,
      quality: "mixed", what: "Rust 写的 Agent 无头浏览器，轻量、高兼容（CDP/WebDriver）",
      evidence: "436 issues、每日 push；但 2 万 star 仅 543 fork（2.7%），对开发者工具偏低，疑有推广。",
      url: "https://github.com/lexmount/moli" },
    { repo: "Graphify-Labs/graphify", dir: "Agent Skills", lang: "Python", stars: 133897, d30: null, d7: 6646,
      quality: "strong", what: "把代码库 + 文档 + SQL + PDF 转成可查询知识图谱的 Skill（本地 AST，无向量库）",
      evidence: "1,597 open issues；12,789 forks；存在同内容镜像仓库（safishamsi/graphify），统计不可叠加。",
      url: "https://github.com/Graphify-Labs/graphify" },
    { repo: "boykopovar/AnyPS5", dir: "逆向 / 兼容", lang: "C++", stars: 47377, d30: null, d7: 7582,
      quality: "strong", what: "把 PS5 可执行文件移植到 Linux/Windows，重编译着色器",
      evidence: "GPL-2.0；1,539 issues；watchers 424（0.89%，全表最高）；非 AI 项目，真需求在兼容性/保存。",
      url: "https://github.com/boykopovar/AnyPS5" }
  ],

  asia: {
    regions: ["中国大陆", "日本", "韩国", "新加坡+东南亚", "印度"],
    rows: [
      { cat: "A 编码 / 软件生成", short: "编码 Agent", cells: [
        { level: "中", reason: "本地竞品占位；须用已备案模型，只能做信创私有化/企业版。" },
        { level: "高", reason: "付费意愿强；Klarent 类测试 Agent 适配 SIer 交付。" },
        { level: "中高", reason: "财阀研发预算足，但 CSAP 审查与采购周期长。" },
        { level: "高", reason: "英语区 PLG 顺滑；Klarent、Dubsof 可直接卖。" },
        { level: "高", reason: "开发者全球第一；但 ARPU 极低，靠 GCC 变现。" }
      ]},
      { cat: "B Agent 能力层", short: "记忆 / MCP", cells: [
        { level: "低", reason: "被阿里/字节/腾讯内化为云能力；美欧融资样本 0 家。" },
        { level: "中低", reason: "多随 AWS/Azure/SIer 打包，独立售卖空间小。" },
        { level: "中低", reason: "Naver/KT 云 + 财阀自研双挤压。" },
        { level: "中", reason: "跨国区域总部适合 PoC，但易被云厂商吸收。" },
        { level: "中", reason: "开源采用快，但 star/下载背离，PLG 变现存疑。" }
      ]},
      { cat: "C 垂直行业 Agent", short: "垂直 Agent", cells: [
        { level: "中", reason: "备案 + 行业监管叠加，但微信/飞书/钉钉分发最强。" },
        { level: "高", reason: "人手不足 + DX 预算；Mach9、XRlabs 有明确场景。" },
        { level: "高", reason: "财阀流程自动化 + 政府 AX；Destro、Parakeet 适配。" },
        { level: "高", reason: "总部分发 + 多国复制；YGO 类库存接口接近空白。" },
        { level: "中高", reason: "BPM/后台场景大，但价格极低；Parakeet 类预约可行。" }
      ]},
      { cat: "D AI 安全 / 治理", short: "治理与安全", cells: [
        { level: "低", reason: "奇安信/深信服/360 占渠道；外资过不了网安审查/等保。" },
        { level: "高", reason: "经济安保 + 金融厅合规；可“咨询 + 工具”打包。" },
        { level: "中高", reason: "义务已生效，但罚则执行至少延后 1 年。" },
        { level: "高", reason: "MAS 金融监管 + 跨国治理预算，可作区域合规中枢。" },
        { level: "中", reason: "DPDP 18 个月过渡窗口，需借 GSI 渠道。" }
      ]},
      { cat: "E 科学 / 具身智能", short: "科学 / 具身", cells: [
        { level: "中高", reason: "科研预算 + 机器人硬件生态最强。", },
        { level: "中高", reason: "发那科/安川 + 手术设备；Dream Labs API、XRlabs 适配。" },
        { level: "中", reason: "生物医药/电池材料 + 现代/三星机器人，生态有限。" },
        { level: "中低", reason: "科研体量小；仅新加坡 A*STAR/生物医药枢纽。" },
        { level: "中低", reason: "适合数据/标注合作，而非直接售卖。" }
      ]}
    ]
  },

  trend: {
    period: "2026-10",
    label: "2026 年 10 月",
    updatedAt: "2026-10-24",
    nextUpdate: "2026-11-24",
    cadence: "每月 24 日更新",
    note: "首期：18 个仓库；Agent 能力 / 运行时 / 编排 / 记忆占 67%。月度快照抓取 star 与增量，方向判断与亚洲落地建议由研究团队复核。",
    directions: [
      {
        id: "skills",
        name: "Agent Skills 能力包",
        count: 5,
        thesis: "把专业动作封装成可安装、可审计的 Skill，而不是卖通用 Agent。",
        ratings: ["中", "高", "中高", "高", "中高"],
        keyPoints: [
          "本地连接器是门槛：飞书/钉钉/微信、LINE/Naver/Kakao，以及 Freee/Tally 等本地财务与 ERP。",
          "收费点在“企业管控面”——权限、审计、数据出境策略、私有化许可，不是 Skill 内容本身。",
          "不要做通用技能市场：它会被云厂商或模型厂商内置吸收，最后只剩渠道价值。"
        ],
        path: [
          { phase: "0–3 个月", action: "选 3 个本地高频动作（发票录入、合同比对、客服话术），做 5 个本地系统连接器，先在一个设计伙伴内部跑通。" },
          { phase: "3–6 个月", action: "与 1 家 SIer / 本地云发布“私有 Skill Registry”，按席位 + 审计模块收费。" },
          { phase: "6–12 个月", action: "把行业 Skill 包做成可交付模板，进入 SIer 标书与云市场。" }
        ],
        local: "日本先卖 SIer 可交付包；中国需境内主体 + 内容安全；东南亚用英语 + 本地支付/电商连接器切入。"
      },
      {
        id: "workbench",
        name: "多 Agent 工作台 / 编排",
        count: 3,
        thesis: "竞争点在治理与成本，不在“能开几个窗口”。",
        ratings: ["中低", "高", "中高", "中高", "高"],
        keyPoints: [
          "企业身份 / SSO、权限、审计日志、成本中心，缺一不可；没有这些只能停留在个人开发者。",
          "优先服务软件外包、GCC、金融科技研发团队——它们的交付周期与 token 成本最可量化。",
          "本地模型网关 + 私有化是亚洲大客户的默认要求，不能把代码与上下文送出境。"
        ],
        path: [
          { phase: "0–3 个月", action: "内部用 orca / paperclip 跑 3 个真实仓库，记录任务成功率、token 成本与交付周期。" },
          { phase: "3–6 个月", action: "企业版补齐 SSO、审计、成本看板与本地模型接入，找 1 家 SIer 做联合交付。" },
          { phase: "6–12 个月", action: "与 SIer 打包成“研发效能”方案，按团队席位收费，进入大企业采购。" }
        ],
        local: "日本走 NTT Data / 富士通；印度锁定 GCC；中国只做私有化，不做公有云 SaaS。"
      },
      {
        id: "creative",
        name: "创作与多媒体生产链",
        count: 3,
        thesis: "卖确定性生产链（可编辑源文件 + 本地渲染），不卖“一键生成”。",
        ratings: ["中高", "高", "高", "高", "中高"],
        keyPoints: [
          "最近的付费需求在电商短视频、漫画/网漫、游戏素材，而不是通用影视。",
          "版权与标识是硬门槛：素材授权、AI 标识、平台 Content ID；日本最严，中国要求显式 + 隐式标识。",
          "本地语音与方言 TTS 是差异化，尤其东南亚多语种市场。"
        ],
        path: [
          { phase: "0–3 个月", action: "做 1 条电商短视频模板流水线（脚本→分镜→TTS→MP4），接 1 个本地平台或 MCN。" },
          { phase: "3–6 个月", action: "与平台 / 广告代理 / MCN 合作，按条或按项目计费，建立授权素材库。" },
          { phase: "6–12 个月", action: "开放 API + 私有化渲染，进入品牌方与电商服务商采购。" }
        ],
        local: "日本先拿授权素材；中国需内容标识与备案；东南亚用 TikTok Shop / Shopee 生态。"
      },
      {
        id: "reverse",
        name: "逆向 / 兼容与遗留系统",
        count: 2,
        thesis: "把“逆向”从攻击能力转成遗留系统迁移与软件供应链审计。",
        ratings: ["中低", "中", "中", "低", "中"],
        keyPoints: [
          "目标客户是银行、保险、制造的 COBOL / Mainframe / 老旧 ERP 迁移，不是游戏破解。",
          "必须可解释、可审计、可回滚；黑盒自动化的迁移方案过不了金融采购。",
          "法律边界前置：授权范围、出口管制、开源许可证，先找法务再找客户。"
        ],
        path: [
          { phase: "0–3 个月", action: "做遗留系统依赖图谱 / 迁移评估工具，找 1 家银行或保险做只读 PoC。" },
          { phase: "3–6 个月", action: "与 SIer 做迁移交付，按项目 + 软件许可收费，积累行业模板。" },
          { phase: "6–12 个月", action: "沉淀迁移知识库，转成合规审计订阅，复制到制造与公共部门。" }
        ],
        local: "日本遗留系统多、付费强；中国信创迁移是机会但需资质；东南亚/印度更适合离岸交付。"
      },
      {
        id: "runtime",
        name: "本地运行时 / 模型网关",
        count: 2,
        thesis: "亚洲企业的刚需：多模型、可计量、数据不出境。",
        ratings: ["高", "中高", "中高", "中高", "高"],
        keyPoints: [
          "多模型路由、成本核算、数据驻留策略要一体交付，单点功能会被云厂商覆盖。",
          "不做模型转售，做企业侧的“模型网关 + 策略 + 审计”。",
          "与本地云、一体机、MSP 结合，卖许可 + 运维，而不是纯订阅。"
        ],
        path: [
          { phase: "0–3 个月", action: "开源网关做开发者漏斗，企业版加审计、配额、私有化与成本看板。" },
          { phase: "3–6 个月", action: "与本地云市场 / 一体机厂商合作，进入其解决方案目录。" },
          { phase: "6–12 个月", action: "按节点或用量订阅，发展 MSP / SIer 渠道。" }
        ],
        local: "中国模型供给多、价格战，网关价值在合规与成本；日韩要数据驻留；印度要低价与本地云。"
      },
      {
        id: "vertical",
        name: "垂直应用 / 内容",
        count: 2,
        thesis: "不做通用行业 Agent，做本地平台上的“结果交付”。",
        ratings: ["中高", "高", "中高", "高", "高"],
        keyPoints: [
          "选人力密集、结果可计量的场景：招聘、保险查勘、诊所预约、物流调度。",
          "接本地平台：RIKUNABI、JobStreet、LINE、微信、Grab；不要自建流量。",
          "按结果 / 节省工时计费，而不是席位；印度与东南亚尤其如此。"
        ],
        path: [
          { phase: "0–3 个月", action: "日本与印度各选 1 个场景，做 10 个客户试点，先验证 ROI 与合规。" },
          { phase: "3–6 个月", action: "与招聘 / 保险 / 诊所连锁合作，按结果收费，形成行业模板。" },
          { phase: "6–12 个月", action: "复制到东南亚，做本地语言、支付与渠道，一国一策。" }
        ],
        local: "日本劳动力短缺最刚需；印度量大价低、走 GCC/GSI；东南亚一国一策。"
      },
      {
        id: "memory",
        name: "Agent 记忆 / 上下文",
        count: 1,
        thesis: "卖“权限感知的本地记忆”，不卖通用 memory API。",
        ratings: ["低", "中高", "中高", "中高", "中"],
        keyPoints: [
          "记忆必须带权限、保留策略、可删除、可审计；否则进不了法务与医疗。",
          "先做法律、医疗、制造的知识库场景，价值可证明，再谈通用记忆层。",
          "与本地协作工具（飞书/钉钉/LINE WORKS）绑定，成为工作流的一部分。"
        ],
        path: [
          { phase: "0–3 个月", action: "做 1 个私有化文档记忆 PoC（法务或医疗），把权限与删除做成演示重点。" },
          { phase: "3–6 个月", action: "与 SIer / 云市场打包，按知识库容量与审计模块收费。" },
          { phase: "6–12 个月", action: "扩到跨系统记忆与合规留存，进入大企业知识管理预算。" }
        ],
        local: "中国数据出境最敏感；日本 APPI / 韩国 PIPA 要求保留与删除；东南亚先新加坡。"
      }
    ]
  }
};
