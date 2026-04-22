# 网站改造：把《赤脚程序员实战手册》变成九篇结构的网站

日期：2026-04-23
作者：hikariming（与 Claude 协同）
状态：待实现

## 背景

项目根有一份 365 页的 PDF《赤脚程序员实战手册》，分成 9 个"篇"（部分）。当前网站（Next.js App Router）的首页 hero 之外是营销占位内容（`HotChapters` / `LearningPath` / `ValueGrid`），与本书的真实结构无关。本次改造把首页 hero 之下重做成"书的目录"，并补上 9 个篇封面页。

## 目标 / 非目标

**目标**
- 首页 hero 下面替换为反映本书 9 篇结构的内容。
- 新增 9 个篇封面页 `/book/[slug]`，每页展示该篇的"核心痛点 / 解决方案 / 关键行动 / 作者"，作为最小可信版（MVP）。
- 视觉与现有 hero / header / footer 保持完全一致：圆角 28-30px、白→软蓝渐变、brand 蓝色、`fade-up` 动效、`dot-field` 背景、卡片浮起 hover。
- 内容数据从 PDF 抓取后人工校对，写入静态数据文件。

**非目标**
- 不做章节正文页（`/book/[slug]/[chapter]`）。
- 不做 PDF→Markdown 全量转换。
- 不引入数据库 / CMS / 鉴权 / 搜索。
- 不引入头像图片资源（用首字母占位）。
- 不调整 hero 区。

## PDF 内容地图（已校验）

| # | 篇 | 起始页 | 篇幅 | slug | 作者 | 阶段 |
|---|---|---|---|---|---|---|
| 1 | 认知篇 - 重塑 AI 编程思维 | p5 | 12 | `cognition` | 明立 / AI 教育工作者 | 想清楚 |
| 2 | 准备篇 - 打造 VibeCoding 工作台 | p17 | 58 | `setup` | 社恐患者杨老师 / 资深 Agent 开发工程师 | 想清楚 |
| 3 | 入门篇 - 快速构建 MVP | p75 | 40 | `mvp` | 蓝星 / 后端开发工程师 | 写出来 |
| 4 | 进阶篇 - 完整网页应用 | p115 | 57 | `webapp` | 蓝星 / 后端开发工程师 | 写出来 |
| 5 | 秩序篇 - 建立工程规范 | p172 | 29 | `engineering` | 卡夫卡 / 移动开发工程师 | 写出来 |
| 6 | 效率篇 - 把重复劳动交给机器 | p201 | 49 | `efficiency` | 卡夫卡 / 移动开发工程师 | 写出来 |
| 7 | 连接篇 - 打破能力的孤岛 | p250 | 42 | `integration` | 卡夫卡 / 移动开发工程师 | 写出来 |
| 8 | 设计篇 - 建立工程化审美 | p292 | 48 | `design` | Bay / 设计师 | 变好看 |
| 9 | 上线篇 - 让世界看到你的作品 | p340 | 26 | `launch` | 扣子是谁呀 / 独立开发者 | 发出去 |

9 篇全部具备 `[核心痛点] / [解决方案] / [关键行动]` 三段结构（已用脚本验证），可作为卡片与篇页面的稳定数据源。

## 信息架构

```
/                        首页
/book/cognition          第 1 篇封面
/book/setup              第 2 篇封面
/book/mvp                第 3 篇封面
/book/webapp             第 4 篇封面
/book/engineering        第 5 篇封面
/book/efficiency         第 6 篇封面
/book/integration        第 7 篇封面
/book/design             第 8 篇封面
/book/launch             第 9 篇封面
```

**首页区块顺序（hero 之后）**
1. `StageBand` — 4 阶段引子条（`#path`）
2. `PartGrid` — 九篇 3×3 网格（`#chapters`）
3. `AboutBook` — 关于本书 + 作者卡墙（`#about`）
4. `CtaBand` — 末尾 CTA → `/book/cognition`
5. `Footer`

**Header 导航**：全部篇章 → `/#chapters` ｜ 学习路径 → `/#path` ｜ 关于本书 → `/#about` ｜ GitHub → 外链占位（`#`，待填入仓库 URL）

## 数据模型（`data/book.ts` 新文件 + `data/homepage.ts` 重构）

```ts
// data/book.ts (new)

export type StageId = "think" | "build" | "polish" | "ship";

export type Stage = {
  id: StageId;
  label: string;          // "想清楚"
  description: string;    // 一句话
  partRange: string;      // "第 1-2 篇"
};

export type Author = {
  id: string;             // "mingli"
  name: string;           // "明立"
  title: string;          // "AI 教育工作者"
  initials: string;       // "明"
  partSlugs: string[];    // ["cognition"]
};

export type BookPart = {
  slug: string;           // "cognition"
  number: number;         // 1
  name: string;           // "认知篇" — 作为 section tag 显示
  fullTitle: string;      // "重塑 AI 编程思维" — 作为主标题显示
  pain: string;           // [核心痛点] 全文
  solution: string;       // [解决方案] 全文
  actions: string[];      // [关键行动] 拆成 3-5 条
  authorId: string;       // → Author.id
  pageCount: number;      // PDF 页数（用于卡片角标"约 N 页"）
  stage: StageId;
};

export const stages: Stage[];     // 4 项
export const authors: Author[];   // 6 项
export const bookParts: BookPart[]; // 9 项，按 number 排序
```

```ts
// data/homepage.ts (refactor)

export const navItems: NavItem[] = [
  { label: "全部篇章", href: "/#chapters" },
  { label: "学习路径", href: "/#path" },
  { label: "关于本书", href: "/#about" },
  { label: "GitHub", href: "#" }, // 待替换
];

export const footerGroups: FooterGroup[] = [...]; // 链接更新到对应锚点 + 9 个篇 URL

// 删除：chapterCards、chapterCategories、valueItems、learningSteps、相关类型
```

## 组件改动

**新增**
- `components/stage-band.tsx` — 4 阶段引子条。
- `components/part-grid.tsx` — 九篇网格容器。
- `components/part-card.tsx` — 单张篇卡片。左上角大号篇号 `01–09`，渐变 + `dot-field` 背景；标题 + 副标 + 痛点一行 + 关键行动前 2 条 + "阅读这篇 →"。整卡 wrap 在 `<Link href="/book/[slug]">` 内。
- `components/about-book.tsx` — 引言段 + 6 张作者卡。
- `components/cta-band.tsx` — 末尾 CTA。
- `app/book/[slug]/page.tsx` — 动态路由。Next.js App Router；用 `generateStaticParams` 生成 9 个静态路径；用 `generateMetadata` 生成每篇标题。
- `components/part-cover.tsx` — 篇封面页主体：篇号 + 篇名 + 作者条 → 痛点引述块（左侧 brand 竖线）→ 解决方案段 → 关键行动 bullet → "全文整理中" 提示 → 上一篇 / 下一篇导航。

**删除**
- `components/value-grid.tsx`
- `components/hot-chapters.tsx`
- `components/learning-path.tsx`
- `components/category-tabs.tsx`
- `components/chapter-card.tsx`

**保留不动（视觉骨架）**
- `components/hero.tsx`、`header.tsx`、`footer.tsx`、`section-shell.tsx`、`logo.tsx`、`icons.tsx`
- `header.tsx` 的 nav 数据来自 `data/homepage.ts`，自动同步；footer 类似。

**`app/page.tsx`**
```tsx
<Header />
<main>
  <Hero />
  <StageBand />
  <PartGrid />
  <AboutBook />
  <CtaBand />
</main>
<Footer />
```

## 视觉规范（继承现有）

- 区块外壳：复用 `SectionShell`，传 `eyebrow` / `title` / `description`。
- 卡片：`rounded-[28-30px] border border-line bg-white/88` + `shadow-[0_18-20px_40-60px_rgba(15,23,42,0.04-0.05)]` + `hover:-translate-y-1 hover:border-brand/24-28`。
- 颜色：`text-brand` / `bg-brand-soft` / `text-foreground` / `text-muted` 沿用全局变量，**不引入新色**。
- 篇号样式：`text-[2.4rem] font-semibold tabular-nums tracking-[-0.06em] text-brand/85`，零填充两位（`01`-`09`）。
- 作者 avatar：`h-12 w-12 rounded-full bg-brand-soft text-brand font-semibold text-lg flex items-center justify-center`。
- 痛点引述：左侧 `border-l-4 border-brand/60 pl-4 text-foreground/90 italic`。
- 阶段卡：`md:grid-cols-2 lg:grid-cols-4`，每张卡比篇卡更紧凑（padding 减半）。

## 内容抽取流程

1. 写一次性脚本 `scripts/extract-book-data.py`：用 pypdf 按每篇起始 4-5 页抓 `[核心痛点]` / `[解决方案]` / `[关键行动]` 的原文段落，输出 `data/book.draft.json`。
2. 人工逐篇校对 JSON（OCR 易错点：emoji、半角符号、空白字符 `\x01`），把校对结果填入 `data/book.ts` 的 `bookParts` 常量。
3. 副标取标题破折号后半段（如"重塑 AI 编程思维"）。
4. 每篇 `actions` 字段拆 3-5 条 bullet（PDF 里"关键行动"段已是 bullet 形式，直接拆）。
5. 脚本属于一次性产物，提交但不进入构建。

## 落地顺序

1. 抽取脚本 + `data/book.ts` 数据校对入库
2. `data/homepage.ts` 重构 + Header / Footer 链接更新
3. `app/book/[slug]/page.tsx` + `part-cover.tsx`（篇页面优先，让首页跳转有目的地）
4. `stage-band.tsx` / `part-grid.tsx` / `part-card.tsx` / `about-book.tsx` / `cta-band.tsx`
5. 替换 `app/page.tsx` 区块组合
6. 删除旧组件（`value-grid.tsx` / `hot-chapters.tsx` / `learning-path.tsx` / `category-tabs.tsx` / `chapter-card.tsx`）
7. `npm run dev` 走查：首页 → 9 篇 → 上一篇/下一篇 → 末尾 CTA → footer 链接

## 验证清单

- [ ] 首页 hero 不变，下方按 `StageBand → PartGrid → AboutBook → CtaBand` 排列。
- [ ] `PartGrid` 在 `lg` 宽度下呈 3×3，`md` 下 2 列，移动端 1 列。
- [ ] 9 张篇卡链接到 `/book/<slug>`，9 个 slug 全部可访问，无 404。
- [ ] 每个篇页面正确显示对应篇号、标题、痛点、方案、行动、作者署名。
- [ ] 上一篇 / 下一篇导航在第 1 篇仅显示"下一篇"、第 9 篇仅显示"上一篇"。
- [ ] Header / Footer 所有链接锚点真实存在。
- [ ] 没有残留的旧组件 import；`npm run build` 通过、无 TS 报错。
- [ ] `npm run dev` 实地走查：首页四块顺序正确、9 篇页面都能进、上一篇/下一篇不越界。
- [ ] 视觉与现有 hero 一致：圆角、阴影、间距、字体节奏一致。

## 风险 & 取舍

- **PDF 文本噪声**：emoji / 中英文标点 / `\x01` 控制字符多。靠人工校对兜底；脚本只产草稿不直接入库。
- **作者头像缺图**：用首字母 avatar 占位。后续若提供图片资源，扩展 `Author.avatar?: string` 字段即可，不影响现有结构。
- **篇页面正文缺失**：用"全文整理中"提示降级。后续若做章节正文页，路由扩展为 `/book/[slug]/[chapter]`，篇封面页改为列子章节列表，不破坏现有 URL。
- **GitHub 链接占位**：`navItems` 与 footer 的 GitHub URL 留 `#` 标记 TODO，由用户后续填入。
