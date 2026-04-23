# showmecode · 《赤脚程序员实战手册》

一个面向中文创作者的 VibeCoding 学习站，把 AI 编程、产品设计与真实项目实战串成一条可执行的路径。从一个想法，到一个能让别人用上的产品。

> **赤脚程序员**：没有计算机科班背景，但更懂生活、更懂业务、更懂痛点。在 AI 时代，他们用自然语言和工具，把想法变成产品。


---

## 这本书讲什么

九篇内容，覆盖从想法到上线的四个阶段：

| 阶段 | 篇章 | 内容 |
|---|---|---|
| **想清楚** | 第 1 篇 认知篇 | 从"写代码的人"转变为"定义问题的人" |
| **想清楚** | 第 2 篇 准备篇 | 打造 VibeCoding 工作台（VSCode + Claude Code） |
| **写出来** | 第 3 篇 入门篇 | 快速构建第一个 MVP |
| **写出来** | 第 4 篇 进阶篇 | 完整网页应用（Supabase / 用户认证 / 对象存储） |
| **写出来** | 第 5 篇 秩序篇 | 建立工程规范（CLAUDE.md / SubAgent） |
| **写出来** | 第 6 篇 效率篇 | 把重复劳动交给机器（Custom Commands / Worktree / Hooks） |
| **写出来** | 第 7 篇 连接篇 | 打破能力的孤岛（MCP / Skills） |
| **变好看** | 第 8 篇 设计篇 | 建立工程化审美（Design Token） |
| **发出去** | 第 9 篇 上线篇 | 让世界看到你的作品（Vercel / 域名 / CI/CD） |

---

## 站点结构

```
app/
  page.tsx              首页（Hero / StageBand / IntroBand / PartGrid / AboutBook）
  book/
    intro/page.tsx      引言独立页
    [slug]/page.tsx     九个章节页（动态路由）
components/
  header.tsx            顶部导航 + 搜索触发
  search-dialog.tsx     全站搜索对话框（Ctrl/⌘+K）
  intro-band.tsx        首页"先读引言"卡片
  markdown-body.tsx     react-markdown 渲染配置
  ...
data/
  book.ts               9 篇章节元数据 + 作者 + 学习阶段
  homepage.ts           首页导航 / 页脚链接
  book/                 各章节 markdown 正文
lib/
  book-content.ts       章节读取 + 目录提取
public/
  book/<slug>/          每章配图（SHA256 命名）
  search-index.json     构建期生成的搜索索引
scripts/
  rebuild-from-docx.py  从 .docx 源文件重新生成所有章节内容
  rebuild_from_docx/    重建管道（slicer / anchors / runs / images / tables / render）
  build-search-index.mjs 构建搜索索引
tests/
  rebuild_from_docx/    Python 单元测试（33 项）
docs/
  superpowers/          设计文档与实施计划
```

---

## 本地开发

需要 Node.js ≥ 18。

```bash
npm install
npm run dev          # 启动开发服务，默认 http://localhost:3000
npm run lint         # 运行 ESLint
npm run build        # 产线构建（自动先构建搜索索引）
npm start            # 启动产线服务
```

只想重新生成搜索索引：

```bash
npm run build:search-index
```

---

## 内容来源：从 .docx 重新生成

章节正文不是手写 markdown，而是从权威源 `《赤脚程序员实战手册》.docx` 重建出来的。这样保证站点内容与原稿严格一致。

```bash
# 重新生成全部章节
python3 scripts/rebuild-from-docx.py

# 只重新生成某几章
python3 scripts/rebuild-from-docx.py --only=intro,cognition

# 只校验，不写文件
python3 scripts/rebuild-from-docx.py --dry-run
```

执行流程：

1. **slicer** — 按"第 N 部分："切分 docx，引言段落归到 `slug=intro`
2. **anchors** — 读取 `data/book/<slug>.md` 现有的 H1/H2/H3 作为标题骨架
3. **runs** — 解析 docx 段落 run，识别字体（Consolas → 行内代码）、加粗
4. **images** — 提取所有 `<a:blip>` 嵌入图片，按 SHA256[:12] 内容寻址写入 `public/book/<slug>/`
5. **tables** — 区分 callout / code / data 三类表格并分别渲染
6. **render** — 按文档顺序拼装最终 markdown，校验图片引用与孤儿文件

跑测试：

```bash
python3 -m pytest tests/rebuild_from_docx/ -q
```

---

## 搜索功能

- 支持中英文混合搜索（自定义 bigram 分词器，处理中文无空格场景）
- 索引粒度：章节标题 + 每个 H2/H3 段落 + 段落正文
- 索引在 `npm run build` 时自动生成到 `public/search-index.json`，约 80KB（gzip 后）
- 客户端首次打开搜索时按需加载索引
- 快捷键：`Ctrl/⌘+K` 打开，`↑↓` 选择，`Enter` 跳转，`Esc` 关闭

---

## 作者团队

| 作者 | 角色 | 负责章节 |
|---|---|---|
| 明立 | AI 教育工作者 | 第 1 篇 认知篇 |
| 社恐患者杨老师 | 资深 Agent 开发工程师 | 第 2 篇 准备篇 |
| 蓝星 | 后端开发工程师 | 第 3-4 篇 入门篇 / 进阶篇 |
| 卡夫卡 | 移动开发工程师 | 第 5-7 篇 秩序篇 / 效率篇 / 连接篇 |
| Bay | 设计师 | 第 8 篇 设计篇 |
| 扣子是谁呀 | 独立开发者 | 第 9 篇 上线篇 |

---

## 技术栈

- **框架**：Next.js 16（App Router）+ React 19 + TypeScript
- **样式**：Tailwind CSS v4
- **Markdown**：react-markdown + remark-gfm + rehype-slug + github-slugger
- **搜索**：MiniSearch（自定义 bigram 分词器）
- **内容管道**：Python 3 + python-docx
- **测试**：pytest

---

## 目录约定

- 章节正文：`data/book/<slug>.md`（由 docx 重建，请勿手改）
- 章节配图：`public/book/<slug>/<sha256>.png`（由 docx 重建，请勿手改）
- 章节元数据（标题 / 痛点 / 行动 / 作者 / 阶段）：`data/book.ts`
- 首页文案 / 导航 / 页脚：`data/homepage.ts`
- 章节锚点骨架：`data/book/<slug>.md` 中的 H1/H2/H3 是重建管道的"目录契约"，编辑前先理解其作用


