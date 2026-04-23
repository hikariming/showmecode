export type StageId = "think" | "build" | "polish" | "ship";

export type Stage = {
  id: StageId;
  label: string;
  description: string;
  partRange: string;
};

export const stages = [
  { id: "think",  label: "想清楚", description: "看清需求与边界，建立 AI 协作心法。",     partRange: "第 1-2 篇" },
  { id: "build",  label: "写出来", description: "从第一个 MVP 到工程化的完整应用。",      partRange: "第 3-7 篇" },
  { id: "polish", label: "变好看", description: "用专业审美让产品脱离粗糙感。",           partRange: "第 8 篇" },
  { id: "ship",   label: "发出去", description: "把代码变成所有人都能访问的网站。",       partRange: "第 9 篇" },
] as const satisfies readonly Stage[];

export type Author = {
  id: string;
  name: string;
  title: string;
  initials: string;
  partSlugs: readonly string[];
};

export const authors = [
  { id: "mingli",   name: "明立",           title: "AI 教育工作者",          initials: "明", partSlugs: ["cognition"] },
  { id: "yang",     name: "社恐患者杨老师", title: "资深 Agent 开发工程师",   initials: "杨", partSlugs: ["setup"] },
  { id: "lanxing",  name: "蓝星",           title: "后端开发工程师",          initials: "蓝", partSlugs: ["mvp", "webapp"] },
  { id: "kafka",    name: "卡夫卡",         title: "移动开发工程师",          initials: "卡", partSlugs: ["engineering", "efficiency", "integration"] },
  { id: "bay",      name: "Bay",            title: "设计师",                  initials: "B",  partSlugs: ["design"] },
  { id: "kouzi",    name: "扣子是谁呀",     title: "独立开发者",              initials: "扣", partSlugs: ["launch"] },
] as const satisfies readonly Author[];

export type AuthorId = (typeof authors)[number]["id"];

export type BookPart = {
  slug: string;
  number: number;
  name: string;       // "认知篇"
  fullTitle: string;  // "重塑 AI 编程思维"
  pain: string;
  solution: string;
  actions: readonly string[];
  authorId: AuthorId;
  pageCount: number;
  stage: StageId;
};

export const bookParts = [
  {
    slug: "cognition",
    number: 1,
    name: "认知篇",
    fullTitle: "重塑 AI 编程思维",
    pain: `绝大多数人的热情，都耗尽在了"准备开始"的路上。你立志也要成为"赤脚程序员"的一员，信心满满地想做一个网页，却被告知要先学 HTML；想写个脚本，被告知要先懂 Python 语法。这种漫长的技术学习路线，让普通人根本无法触达创造的乐趣。`,
    solution: "用自然语言替代编程语言。把 AI 当作编译器：输入的不再是代码，而是你清晰的中文指令。",
    actions: [
      `认知升级：从"写代码的人"转变为"定义问题的人"。你负责逻辑和需求，AI 负责语法和实现。`,
      "打破迷信：不用担心基础薄弱。在 VibeCoding 时代，语文能力（表达清晰度）比代码能力更重要。",
    ],
    authorId: "mingli",
    pageCount: 12,
    stage: "think",
  },
  {
    slug: "setup",
    number: 2,
    name: "准备篇",
    fullTitle: "打造 VibeCoding 工作台",
    pain: `大多数人的编程梦，都死在了"Hello World"之前的环境配置里。你已经建立了 AI 编程的思维，但刚迈出第一步，就发现市面上全是 AI 编程工具，有的叫 IDE，有的叫插件。你不知道该选哪个，生怕选错了浪费时间。好不容易下载了一个，却发现还要配置各种复杂的环境变量，第一步就被劝退了。`,
    solution: `只选最强的黄金组合。用 VSCode 作为你的"开发环境"（IDE），用 Claude Code 作为你的"编码代理"（Agent）。`,
    actions: [
      "IDE 选择：下载 VSCode。这是你写代码的主战场，它提供了许多网站开发的必要环境和工具。",
      `安装 Agent：在 VSCode 的终端里安装 Claude Code。它不同于普通的聊天机器人，它是一个能帮你跑命令、查文件、甚至自我修正的超级智能体。`,
      `合二为一：不要在系统黑窗口里操作，直接在 IDE 内部唤起 Claude Code，让"编辑代码"和"执行命令"无缝衔接。`,
    ],
    authorId: "yang",
    pageCount: 58,
    stage: "think",
  },
  {
    slug: "mvp",
    number: 3,
    name: "入门篇",
    fullTitle: "快速构建 MVP",
    pain: `没有粗糙的 0.1，就不可能有完美的 1.0。你安装好了必要的工具，但却在做什么内容上迟疑了。很多初学者的热情，都死在了"第一行代码"写点什么。你想做一个完美的 App，但不知道从何下手；试着写了两句，又因为界面太丑、报错太多而备受打击，最后只能把想法重新塞回抽屉。`,
    solution: `不要追求完美，追求"能跑"。MVP（最小可行性产品）的核心就是——糙一点没关系，先把最核心的功能跑通。哪怕界面简陋，一个能用的半成品也比脑子里完美的幻影强一万倍。`,
    actions: [
      `言出法随：体验"一句话生成网页"的魔力，用自然语言打破对代码的恐惧。`,
      `前端先行：不碰数据库，不碰服务器，只用 HTML/CSS/JS 构建你的第一个应用"喵宇宙"。`,
      `生存技能：学会两个救命招数——"任务拆解"（把大象切片）和"F12 调试大法"（把报错甩给 AI）。`,
      `粗糙但有用：接受不完美的代码，优先保证"能跑起来"。`,
    ],
    authorId: "lanxing",
    pageCount: 40,
    stage: "build",
  },
  {
    slug: "webapp",
    number: 4,
    name: "进阶篇",
    fullTitle: "完整网页应用",
    pain: `离线即死，刷新即忘——这是玩具与产品的重要区别。你用 MVP 思维搭建了一个看起来还不错的网页，但是前端网页就像金鱼，记忆只有 7 秒（刷新即忘）。你想做一个真正的产品，比如让用户注册账号、保存他们的猫咪照片，并且在手机和电脑上都能看到。单纯的网页做不到这一点，你需要一个能够长久存储数据的地方。`,
    solution: `给你的应用配一个"云端大硬盘"。使用 Supabase 这种 BaaS（Backend as a Service）平台，它既是数据库，又是文件柜，还能处理用户登录。最重要的是，AI 能直接帮你写好连接它的代码。`,
    actions: [
      "云端记忆：用 Supabase 替代浏览器的本地存储，让数据在云端永生。",
      `用户专属：添加用户认证（Auth）功能，让这一只猫只属于你，而不是被所有人都能修改。`,
      `无限空间：使用对象存储（Object Storage）来保存高清猫片，而不是塞爆浏览器的缓存。`,
    ],
    authorId: "lanxing",
    pageCount: 57,
    stage: "build",
  },
  {
    slug: "engineering",
    number: 5,
    name: "秩序篇",
    fullTitle: "建立工程规范",
    pain: `VibeCoding 节省下来的"思考成本"，未来会以"维护成本"的形式，连本带利收回来。你已经掌握了 VibeCoding 的基本窍门，一开始进展飞快，功能像搭积木一样往上叠，每天都有不断累积的成就感；但接着代码开始变得只能加、不能动，小改一行就牵一片，只能不断打补丁；再往后，你逐渐不敢重构、不敢删代码、不敢升级依赖，改需求前都只能祈祷；最后项目表面还在"迭代"，实际上是在和历史遗留问题僵持，而你已经说不清系统真正是怎么运转的，只剩下一句——"能跑就别动它"。`,
    solution: `真正的工业级产品，对于稳定性与长期可维护性有着很高的要求。当 VibeCoding 的代码量不断膨胀，如果不想让项目变成"屎山代码"，就必须建立工程规范。`,
    actions: [
      `CLAUDE.md：制定项目"宪法"，强制 AI 必须遵守特定的编码规范。`,
      "SubAgent：分而治之，把不同类型的任务分配给特定领域的专家。",
    ],
    authorId: "kafka",
    pageCount: 29,
    stage: "build",
  },
  {
    slug: "efficiency",
    number: 6,
    name: "效率篇",
    fullTitle: "把重复劳动交给机器",
    pain: `你的操作速度，不应该成为 AI 交付代码的瓶颈。随着项目变大，你发现自己越来越多的时间花在了"代码之外"的事情上：花大量时间在优化提示词结构上；跑个测试要敲半天命令；每次提交代码都要担心格式对不对。你以为自己在 Copilot，其实你只是在为 AI 打下手。这种琐碎的上下文切换，正在不断打断你的"心流"，让 VibeCoding 变成了痛苦的 Waiting。`,
    solution: `通过"并行开发"与"流程自动化"，将非创造性的工作剥离。让机器去处理那些重复、琐碎、易错的流程，你只专注于做决策。`,
    actions: [
      `Custom Commands：化繁为简。把复杂的命令行封装成简单的 /slash 指令，让常用操作"一键直达"。`,
      `Git Worktree：多线程作战。不再受困于单一工作目录，像浏览器开多标签页一样同时处理多个功能分支，彻底告别 git stash 的泥沼。`,
      `Git Hooks：自动执行动作。比如在代码提交前自动运行检查，把低级错误拦截在本地，确保每一行提交都是"干净"的。`,
    ],
    authorId: "kafka",
    pageCount: 49,
    stage: "build",
  },
  {
    slug: "integration",
    number: 7,
    name: "连接篇",
    fullTitle: "打破能力的孤岛",
    pain: `最聪明的 AI，如果无法结合实际业务，就无法写出有用的代码。你已经把效率全部拉满，但是你逐渐发现，AI 虽然精通所有编程语言，但它不懂"你的代码"。它看不见你本地的数据库，读不懂你私有的 API 文档，也不知道你公司内部复杂的部署流程。每次你都要把数据复制粘贴给它，它才能干活。这种"数据孤岛"和"能力断层"，让 AI 始终像个被关在小黑屋里的天才，空有一身武艺却无处施展。`,
    solution: `打通数据（MCP）与能力（Skills）。不仅要给 AI 装上"眼睛"去读取外部世界，更要给它装上"双手"去执行复杂任务，彻底打破 AI 的能力边界。`,
    actions: [
      `MCP（Model Context Protocol）：数据桥梁。无需搬运数据，直接让 AI "连接"到你的本地数据库、GitHub 仓库或飞书文档，实现实时读写。`,
      `Skills：能力封装。将一系列复杂的操作（如"一键发布"、"自动巡检"）打包成 AI 可调用的技能，让 AI 从"建议者"进化为"执行者"。`,
    ],
    authorId: "kafka",
    pageCount: 42,
    stage: "build",
  },
  {
    slug: "design",
    number: 8,
    name: "设计篇",
    fullTitle: "建立工程化审美",
    pain: `你的指令越模糊，AI 的输出就越平庸。你对于 AI 编程的各种技巧都已得心应手，但你发现，当你输入"设计一个现代化的网页"，AI 还是只能基于概率给你一个"平均值"——毫无个性的蓝紫色背景、随意的间距、以及缺乏层级的字体。究其原因，是 AI 不懂审美，它只是在拼凑素材。如果不加约束，它生成的页面就像一盘散沙：每个组件单看凑合，拼在一起就是典型的"模板网页"味道，廉价感满满。`,
    solution: `把设计问题转化为工程问题。不要试图教会 AI 审美，而是制定一套严格的 Design Token（设计变量），强制它在限定的数学规则内填空。`,
    actions: [
      "Token 提取：停止凭感觉选色。解析优秀网站，直接提取其配色表、字阶和间距系统，转化为你项目的 Tailwind 配置。",
      `视觉约束：创建一个 Design System.md，明确定义具体的设计规则。把它喂给 AI，禁止它生成规则以外的样式。`,
      "组件复用：别让 AI 重新发明轮子。直接从 21st.dev 或 Shadcn 复制成熟组件的代码投喂给 AI，让它负责逻辑接入，而不是视觉设计。",
    ],
    authorId: "bay",
    pageCount: 48,
    stage: "polish",
  },
  {
    slug: "launch",
    number: 9,
    name: "上线篇",
    fullTitle: "让世界看到你的作品",
    pain: `在本地跑通只是做了一道菜，上线发布才是开了家餐厅。你的网站已经美化得相当好看，但目前只在自己电脑上运行得很好，朋友们却都看不见。你想把网站发给别人看，结果发现要买服务器（租店面）、配 Linux 环境（搞装修）、弄域名（挂招牌），太麻烦了。而且如果选错了平台，可能会因为流量费太贵而瞬间破产。`,
    solution: `现在有很多现代化平台（如 Vercel），你只需要把代码传上去，它们会自动帮你处理服务器、网络这些杂事。`,
    actions: [
      "一键托管：前端网站首选 Vercel，后端服务选 Railway。只要把代码上传到 GitHub，它们就能自动帮你发布上线，就像发朋友圈一样简单。",
      "个性域名：去 Cloudflare 买个好记的域名（比如 yourname.com），这比冷冰冰的 IP 地址看起来专业得多。",
      `看好钱包：云服务虽然好用，但要注意费用。设置好"消费上限"，别因为代码写了死循环，睡一觉起来房子归平台了。`,
    ],
    authorId: "kouzi",
    pageCount: 26,
    stage: "ship",
  },
] as const satisfies readonly BookPart[];
