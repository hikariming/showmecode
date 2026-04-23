# 篇正文页：把 9 篇全文接入 /book/[slug]

日期：2026-04-23
作者：hikariming（与 Claude 协同）
状态：待实现
前置：`docs/superpowers/specs/2026-04-23-book-site-redesign-design.md`（首页改造、9 个篇封面页骨架已落地）

## 背景

首页改造已完成，9 个 `/book/[slug]` 页面目前只展示「核心痛点 / 解决方案 / 关键行动」三段导读 + 「全文整理中」占位。本次改造把每篇真正的正文接入这 9 个页面，让读者能在网页上完整阅读全书。

正文来源是用户用 mineru 把原 PDF 转成的两份 markdown：
- `MinerU_markdown_《赤脚程序员实战手册》_2047115887568547840.md`（含 part 1-4 完整 + part 5 部分内容，截断在第 5 篇中段）
- `MinerU_markdown_《赤脚程序员实战手册》_第5-9篇_2047119446859116544.md`（part 5-9 完整）

合并策略：part 1-4 取第一份，part 5-9 取第二份。

## 目标 / 非目标

**目标**
- 9 个 `/book/[slug]` 页面在现有「痛点 / 方案 / 行动」导读卡片下方显示对应篇的完整正文。
- 长篇右侧出现 sticky 章节目录（TOC），点击跳转到对应锚点。
- 正文里的图片下载到本地 `public/book/<slug>/`，不依赖 mineru 临时 CDN。
- 视觉与现有篇页面一致：圆角、行距、间距、色板沿用全局变量，不引入新色。

**非目标**
- 不做 PDF→Markdown 重新转换（直接消费 mineru 已有产物）。
- 不做章节子路由（`/book/[slug]/[chapter]`），全篇一页。
- 不做评论 / 笔记 / 收藏 / 进度记录。
- 不做全文搜索。
- 不做 dark mode 专项调优（沿用现有色）。
- 不做图片懒加载 / blur placeholder（v1 先用浏览器原生 lazy）。
- 不做 RSS / OG 预览图自动生成。

## 信息架构

```
/book/<slug>                       (现有，新增正文区)
  ┌─────────────────────────┐
  │  PartCover（已有）        │   ← 篇号 + 名 + 作者 + 痛点/方案/行动
  ├─────────────────────────┤
  │  MarkdownBody             │   ← 新增，正文长文
  │  ┌─────────┬───────────┐ │
  │  │ 主正文   │ TOC sticky │ │   ← lg+ 显示 TOC，移动端隐藏
  │  └─────────┴───────────┘ │
  ├─────────────────────────┤
  │  上一篇 / 下一篇（已有）   │
  └─────────────────────────┘
```

TOC 显示规则：当篇正文里 `<h2>` 数量 ≥ 4 时显示。低于 4 的短篇不显示（避免半空的右栏）。

## 数据流

```
mineru md ×2 文件（项目根，不入构建）
   ↓ 一次性脚本 scripts/split-book-md.py
   ├── 切分：按 "# 第X部分：" 边界切 9 段
   ├── 下载：扫描 markdown 图片 URL，并行下载到 public/book/<slug>/<sha256-12>.<ext>
   ├── 改写：替换图片 URL 为 /book/<slug>/<hash>.<ext>
   ├── 清理：移除 "本章作者" 行 + "# [核心痛点]/[解决方案]/[关键行动]" 三段
   └── 写出：data/book/<slug>.md（已存在则跳过，--force 才覆盖）
   ↓ 我手工清洗一遍 OCR 噪声（参见「OCR 清洗 checklist」）
data/book/<slug>.md ×9（入库，TS 通过 fs.readFileSync 读取）
   ↓ react-markdown + remark-gfm + rehype-slug 渲染
   ↓ 同时抽出 H2 列表喂给 PartToc
/book/<slug> 页面
```

`data/book/<slug>.md` 是单一真相源。脚本只能新建文件、不会覆盖已有文件，确保我清洗后的版本不会被脚本重跑覆盖。

## 文件结构

**新增**
- `scripts/split-book-md.py` — 一次性切分 + 图片下载 + URL 改写脚本。命令行参数：`--force` 允许覆盖。提交但不进入构建。
- `data/book/cognition.md` … `data/book/launch.md` — 9 个 markdown 文件，正文入库。
- `public/book/cognition/` … `public/book/launch/` — 9 个图片目录。每张图文件名 `<sha256[:12]>.<ext>`，避免 mineru CDN URL 失效。
- `lib/book-content.ts` — 服务端 helper：`getPartBody(slug: string): string`，同步从 `data/book/${slug}.md` 读取，找不到时抛错（构建期失败优于线上 404）。
- `components/markdown-body.tsx` — react-markdown 包装器，配 remark-gfm + rehype-slug，给 H1-H4 / p / ul / ol / code / pre / img / a / blockquote 各配 Tailwind className。**Server component**。
- `components/part-toc.tsx` — sticky 右侧目录。从 markdown 字符串里 regex 抽 `^## (.+)$`，拼成锚点列表。**Client component**（要监听滚动高亮当前项）。

**改动**
- `app/book/[slug]/page.tsx` — 在现有 `<PartCover />` 下追加 `<MarkdownBody />` + 长篇 `<PartToc />`。
- `package.json` — 加依赖 `react-markdown`、`remark-gfm`、`rehype-slug`。
- `.gitignore` — 加 `MinerU_*.md`、`MinerU_*.json`、`/tmp/`（mineru 原始产物不入库，体积大且非真相源）。

**保留不动**
- `components/part-cover.tsx`（导读卡片不变）
- `data/book.ts`（不加 `bodyPath` 字段，约定 `data/book/<slug>.md` 即可）
- 首页所有组件、Header、Footer

## 关键决策

**1. 路由不动**
正文挂在现有 `/book/[slug]` 下，不开 `/book/[slug]/[chapter]` 子路由。原因：mineru 输出里只有 part 1 有干净的「一、二、三、四、五」章节边界，其余 8 篇章节边界要么靠 `第N步`、要么靠主题切换，强行切子路由要么粒度不一致、要么需要大量人工标注，性价比低。单页 + TOC 已经够用。

**2. Markdown 入库 vs JSON 结构化**
选 markdown。校对协作友好（PR diff 可读）、文件即源、零运行时解析层、未来加 mdx 也容易。代价是要给 react-markdown 调一组 className，一次性。

**3. 图片本地化**
mineru CDN URL 形如 `cdn-mineru.openxlab.org.cn/result/2026-04-23/<uuid>/<hash>.jpg`，带日期路径，明显是临时桶。脚本下载到 `public/book/<slug>/<hash[:12]>.<ext>` 入仓。预估 881 张图（part 1-4 ≈ 399 + part 5-9 ≈ 482），按 PDF 截图典型大小 100-300KB 估算，约 100-260MB。**这个体量值得在执行前再向用户确认一次**：可能要选择性丢图（只保留有信息量的截图，丢装饰图），或上 git LFS。

**4. 清洗范围归我**
脚本只做机械活（切分、下载、URL 改写、删署名行 / 三段导读标题）。语义清洗（错别字、半角 Kangxi `⼀⻓⻔⻅⽵⻥`、mineru 的 LaTeX 化符号 `$\mathbb{C}$`、heading 层级重映射、显然冗余的图）由我手工逐篇过。

**5. 单文件 + 防覆盖**
`data/book/<slug>.md` 是同一份文件。脚本默认不覆盖已存在文件；`--force` 才覆盖。这样我清洗后的版本不会被脚本重跑误伤。

## OCR 清洗 checklist（每篇都要过一遍）

1. **半角 Kangxi 字符**：`⼀⼆⼿⼝⼯⻓⻔⻅⻥⽵⻜⻚` → 对应正常字符（部分已在前阶段 PDF 抽取脚本里有映射，可复用）。
2. **mineru LaTeX 化符号**：`$\mathbb{C}$` 通常是 ✅ 或 ✔，按上下文还原（多在「成果验收」类列表里）。
3. **错别字**：肉眼扫一遍，常见的有「⻆色」「⼯具」之类被半角化导致看着别扭的。
4. **heading 层级**：mineru 把所有 heading 都扁平化为 `#`，要重映射：
   - `# 一、xxx` / `# 二、xxx` 等带中文序号的 → `## ` (H2，主章节)
   - `# 第N步：xxx` → `### ` (H3，步骤)
   - 其他 `# xxx` → 视上下文判断，多数 `### `
5. **删冗余**：移除 `# [核心痛点] / # [解决方案] / # [关键行动]` 三个块（已在 `data/book.ts` 导读里）；移除 `本章作者：xxx` + 下一行职位（已在 author 数据里）。
6. **代码块**：mineru 输出里 shell 命令、JSON 配置经常是普通段落而非代码块。识别后补上 ```` ```bash / ```json ```` 围栏。
7. **图片**：肉眼判断装饰性 vs 信息性，装饰图（书的封面、几张并排的小插图）必须删掉以控制仓库体积，目标 ≤ 50MB。保留 IDE 截图、命令行截图、UI 演示等承载信息的图。
8. **空段 / 重复**：mineru 偶尔会把一段拆成多个空 paragraph，合并。

## 视觉规范

沿用全局色板和现有篇封面页节奏，**不引入新色**。

| 元素 | className |
|---|---|
| 段落 | `text-foreground/86 leading-[1.85] text-[15px] mb-5` |
| H2 | `text-2xl font-semibold text-foreground mt-12 mb-4 pl-4 border-l-4 border-brand/60` |
| H3 | `text-lg font-semibold text-foreground mt-8 mb-3` |
| H4 | `text-base font-semibold text-foreground mt-6 mb-2` |
| 无序列表 | `list-disc pl-6 mb-5 space-y-2 text-foreground/86` |
| 有序列表 | `list-decimal pl-6 mb-5 space-y-2 text-foreground/86` |
| 行内 code | `rounded-md bg-brand-soft px-1.5 py-0.5 text-[0.9em] font-mono text-brand` |
| 代码块 | `rounded-2xl bg-slate-900 text-slate-100 px-5 py-4 text-sm overflow-x-auto my-6 leading-[1.7]` |
| 图片 | `rounded-2xl border border-line my-6 mx-auto block max-w-full` + `loading="lazy"` |
| 链接 | `text-brand underline decoration-brand/40 underline-offset-2 hover:decoration-brand` |
| blockquote | `border-l-4 border-brand/60 bg-brand-soft/40 pl-4 py-2 italic my-6` |
| TOC 容器 | `hidden xl:block sticky top-20 self-start w-56 text-sm` |
| TOC 项 | `block py-1.5 text-muted hover:text-foreground transition` |
| TOC 当前项 | `text-brand font-medium` |

正文容器宽度：`max-w-3xl`（与现有 `PartCover` 主区一致），TOC 在 `xl` 断点起从右侧浮出，整体页面在 `xl` 用 `flex` 布局，TOC 用 `flex-shrink-0`。

## 落地顺序

1. 加 deps（react-markdown / remark-gfm / rehype-slug） + 更新 .gitignore
2. 写 `scripts/split-book-md.py`（含图片下载 + URL 改写 + 防覆盖），生成 9 份 raw `data/book/<slug>.md`
3. 写 `lib/book-content.ts` + `components/markdown-body.tsx`，最小集成到 `app/book/[slug]/page.tsx`，先验证 raw 内容能渲染（不带 TOC）
4. 写 `components/part-toc.tsx`（含滚动高亮），集成到长篇页面
5. 我手工清洗 9 份 `data/book/<slug>.md`，每篇过一遍 checklist
6. 全量 build + 走查 9 个页面：图片显示、TOC 跳转、heading 层级合理、代码块识别正确

## 验证清单

- [ ] 9 个 `/book/<slug>` 页面在导读下方显示完整正文，无残留 mineru 元数据。
- [ ] 所有图片从本地 `/book/<slug>/...` 加载，不依赖外网。
- [ ] 长篇（H2 ≥ 4）在 xl 断点显示右侧 sticky TOC，点击锚点平滑跳转，当前可见 H2 高亮。
- [ ] 短篇不显示 TOC，主区居中。
- [ ] 代码块、行内 code、列表、引用块、图片、链接全部按视觉规范渲染。
- [ ] heading 层级合理：H2 是主章节、H3 是子节、不出现孤立 H1（H1 是 PartCover 的篇名）。
- [ ] `npm run build` 通过、`npm run lint` 0 错误。
- [ ] 手动点开每篇浏览一遍，无半角 Kangxi、无 LaTeX 残留、无明显错别字。
- [ ] mineru 原始 md 不入仓（被 .gitignore 屏蔽）。

## 风险 & 取舍

- **图片体积**：881 张图潜在 100-260MB。**已决策：清洗时筛掉装饰图**（书封、纯插图、并排小装饰），只保留有信息量的截图（IDE / 命令行 / UI 演示），目标压到 ≤ 50MB。
- **mineru 输出质量不一**：part 1 章节结构清晰，part 5-9 几乎是连续散文 + `第N步` 小标题。TOC 在后几篇可能很稀疏，靠清洗时把主题分界提到 H2 来补齐结构。
- **react-markdown 安全**：来源是我们自己的内容，不需要 sanitize 第三方 HTML。但要禁用 `rehype-raw` / `dangerouslySetInnerHTML`，避免后续校对时无意引入 XSS 面。
- **server-only 文件读**：`fs.readFileSync` 在 Next.js App Router server component 里没问题，构建期会被静态化。但 `getPartBody` 必须只在 server 调用，文件里不出现 `"use client"`。
- **「全文整理中」占位**：当前 `PartCover` 末尾有这段提示，集成正文后要删掉。
- **GitHub 链接占位**（前置 spec 遗留）：本次不解决，仍是 TODO。
