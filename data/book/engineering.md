## 用CLAUDE.md构建“多层记忆系统”

本篇将带你：

. 让ClaudeCode真正记住你的项目规范与个人偏好。

. 掌握“三层记忆结构”，从容管理不同层级的特定规则。

## 1. 为什么我们需要“记忆系统”？

如果你用过早期版本的ChatGPT，一定有过这种“鬼打墙”般的体验：每次新建一个对话窗口，它都像刚认识你一样，把之前的一切忘得干干净净。

你不得不像复读机一样，一遍遍地重复着你的基本信息：“我是一名前端开发者”、“我习惯使用Vue框架”……

![image](/book/engineering/c1089ebfecec.jpg)


![image](/book/engineering/a2dad13f5059.jpg)


这就好比你招了一名有记忆缺陷的天才实习生。

他绝顶聪明，代码写得飞快，逻辑一流。缺点是记性极差，你上次教他的内容，他转头就忘了。

而“记忆系统”的建立，就相当于你给这名实习生专门编写了一本《工作手册》。

有了它，他就能随时查阅、照章办事。无论何时何地，都能严格按照你预期的方式工作，不再自由散漫。

这样一来，他出错的次数少了，你的血压也稳了，工作自然更省心。

**记忆系统=工作手册**

![image](/book/engineering/27e43ba17bd8.jpg)


![image](/book/engineering/067f6ddcd826.jpg)


![image](/book/engineering/3ddce0f2b650.jpg)


## 2. 揭秘：为什么LLM是“金鱼记忆”？

为什么像ChatGPT这类强大的大语言模型（LLM），都会有这种“金鱼记忆”呢？

究其原因，从技术原理上讲，大语言模型本质上是无状态的（Stateless）。简单来说，就是模型本身不会存储任何对话历史。

每次你发送一条新的消息，系统实际上是把你之前所有的聊天记录，连同你的新消息，全部“打包”起来，一次性发送给模型。

**大语言模型的无状态性 (Stateless)**

### 场景一：单次会话

![image](/book/engineering/497a20383207.jpg)


你好，我叫小明，我喜欢蓝色

你好呀小明

![image](/book/engineering/b817de1cb301.jpg)


![image](/book/engineering/fa0f5ea68d13.jpg)


我喜欢什么颜色？

![image](/book/engineering/1186297559ca.jpg)


AI模型 (获得临时上下文）

将[完整会话]打包发送

你喜欢蓝色

### 场景二：新会话（无状态）

![image](/book/engineering/d8dacf3df70f.jpg)


新窗口，直接提问

![image](/book/engineering/34e680fe340b.jpg)


我喜欢什么颜色？

![image](/book/engineering/4aa146fe0c7e.jpg)


AI模型 (无历史记录)

只发送[当前消息]

我不知道你喜欢什么颜色呢

原因：模型本身不存储对话历史。每次交互，系统将[全部记录 + 新消息]打包发送。

这就像你和朋友聊天，每说一句话前，都得先把两人从认识第一天起的所有记录重读一遍。这种方式不仅昂贵（Token消耗大），而且受限于“上下文窗口”的大小，记忆注定是短暂且脆弱的。

ClaudeCode的解决方案就是：不再依赖脆弱的临时对话上下文，而是利用“文件系统”，跨越会话、跨越时间，将你的项目规范和个人偏好永久“固化”下来。

## 3. 核心大脑： CLAUDE.md

这个记忆系统的核心，就是一个看似普通的 Markdown 文件： CLAUDE.md 。它就是我们前面提到的、给 Claude Code 的那本《工作手册》。

一开始，ClaudeCode对你的代码库一无所知。现在，每次开启一个新的会话，它做的第一件事，就是扫描并阅读这个文件，把里面的重要信息刻进“脑子”里。

CLAUDE.md 里可以写些什么？

这份手册的内容包罗万象，规则越具体，执行效果越好：

<table><tr><td>分类</td><td>内容</td><td>示例</td></tr><tr><td>常用命令</td><td>教它学会你的工作流</td><td>启动开发环境: `npm run dev`</td></tr><tr><td>核心文件</td><td>帮它快速定位关键模块</td><td>通用 UI 组件库目录: `src/components/uit/`</td></tr><tr><td>代码风格</td><td>强迫它统一画风</td><td>防御性编程: 总是假设输入可能为空或异常, 做好空值处理。</td></tr><tr><td>Git 规范</td><td>保持提交历史整洁</td><td>Commit 格式 `type(scope): subject`</td></tr><tr><td>环境依赖</td><td>避免它乱用库</td><td>框架核心: React (Functional Components + Hooks), TypeScript (Strict Mode)。</td></tr><tr><td>避坑提示</td><td>防止它重复踩雷</td><td>禁止硬编码: 所有的魔法数字、API 地址必须抽取为常量或环境变量。</td></tr></table>

## 4. Claude Code 的“三层记忆系统”

Claude Code 的记忆系统设计得非常优雅，采用了一种类似 “洋葱” 的分层结构。

原则很简单：越靠近你当前的工作目录，记忆的“权重”就越高，优先级也越高。

<table><tr><td>层级</td><td>存放位置</td><td>用途</td><td>举例</td></tr><tr><td>用户记忆</td><td>\~/.claude/CLAUDE.md</td><td>全局偏好
你个人的编码习惯，对所有项
目生效。</td><td>渐进式改进：倾向于小步快
跑，改一点测一点，而不是一
次性重写整个模块。</td></tr><tr><td>项目记忆</td><td>\(/CLAUDE.md\)</td><td>团队共识
当前项目的特定规范。</td><td>样式方案：Tailwind CSS
（优先使用工具类，减少自定
义CSS）。</td></tr><tr><td>子目录记忆</td><td>\(/ui/CLAUDE.md\)</td><td>局部规则</td><td></td></tr></table>

Claude会像搜索文件一样，从你所在的目录开始，一层层向外递归查找，把所有相关的记忆拼凑成一个完整的上下文。

**Claude Code的递归记忆加载机制**

**系统如何查找并加载CLAUDE.md文件**

### 阶段一：启动时向上递归加载

![image](/book/engineering/34da8d1a22d6.jpg)


![image](/book/engineering/4ff313aff290.jpg)


结果：/project，/foo，/bar记忆被立即加载

### 阶段二：访问时向下动态加载

![image](/book/engineering/2cdd7eec8112.jpg)


![image](/book/engineering/77ff6a2ba474.jpg)


![image](/book/engineering/910fb8e6014b.jpg)


结果：/components/CLAUDE.md才被动态加载

## 5. 实战演练：4步构建你的记忆系统

我们以一个随手VibeCoding出来的、名为“Marka”的Markdown编辑器应用为例，手把手带你构建记忆系统。

![image](/book/engineering/d99587ba2ee5.jpg)


### 第 1 步：一键初始化

我们不需要手动创建文件，只需要在对话框输入：

1 /init 

ClaudeCode会像一个经验丰富的架构师，自动扫描你的项目结构，为你在根目录生成一个初版的CLAUDE.md 。

**> /init is analyzing your codebase..**

·我将分析代码库结构并创建 CLAUDE.md 文件，包含未来 Claude Code 实例所需的基本信息。

. Expore(Analyzeudebasesructurensm30s) 

. Read(package.json) Read30lines 

●已成功创建 CLAUDE.md 文件，内容涵盖了未来 Claude Code实例在该代码库中工作时所需的核心信息：

**文件结构**

1．开发命令-三个核心命令：dev、build、preview

2.架构概述-基于功能的模块化结构，重点介绍 features/editor、features/theme 和features/layout三大核心模块

3.状态管理- 使用 React Context API 的组件间通信模式

4.CSS主题系统-基于 CSS 变量的主题切换实现方式

5.开发指南-如何添加新功能及Markdown处理的最佳实践

6.关键约定-TypeScript使用、命名规范等

文档聚焦于"大局"架构，避免重复或显而易见的内容，同时保持简洁和可操作性。

你只需要看一眼，确认内容无误，或者微调其中的规则即可。


1 # CLAUDE.md 

此文件为 Claude Code（claude.ai/code）在处理本仓库代码时提供指导。2

3 

4 ## 项目概览

5 Marka 是一个基于 React 18 和 TypeScript 构建的极简 Markdown 编辑器，支持实时预览、主题切换，并采用简洁的按功能模块划分的架构设计。

6 

7 ## 开发命令

8 ``bash 

**启动开发服务器9**

npm run dev10 

**构建生产版本11**

```txt
npm run build # 预览生产构建  
npm run preview
```

**## 架构**

**### 按功能模块划分的结构**

代码库遵循按功能（feature-based）的目录结构，每个功能都在 `src/features/` 下独立封装：

* **`features/editor/`** - 核心 Markdown 编辑功能

* 组件：Toolbar、Editor、Preview

* Context：EditorContext 管理 markdown 内容、视图模式和编辑器状态

* Hook：useMarked 包装 marked 库，实现异步 markdown 解析

* **`features/theme/`** - 动态主题系统

* Context：ThemeContext 管理当前主题和 CSS 变量注入

* 内置 4 个可定制颜色与字体的主题

* 通过 JavaScript 注入 CSS 变量，实现运行时主题切换

* **`features/layout/`** - 应用布局组件

* Sidebar：可折叠侧边栏，包含主题切换器

* StatusBar：底部状态栏，包含字数统计和视图控制

**### 状态管理**

应用仅使用 React Context API：

* `useEditor()` —— 获取 markdown 内容（markdown）、视图模式（viewMode）、侧边栏状态（sidebarOpen）、文本编辑辅助方法（insertText）

* `useTheme()` —— 获取当前主题（activeTheme）与主题切换方法（setActiveTheme）

组件应使用这些 hooks 获取共享状态，而不是通过 props 传递。

**### CSS 主题系统**

主题通过 JavaScript 注入 CSS 变量实现。主题颜色作为 Tailwind 类名使用：

* 背景：`bg-theme-bg`

* 文本：`text-theme-text`

* 侧边栏：`bg-theme-sidebar`

* 边框：`border-theme-border`

* 强调色：`bg-theme-accent` / `text-theme-accent`

* 代码块：`bg-theme-code`

**### 添加新功能**

1. 在 `src/features/` 下创建新目录

2. 编写该功能的组件

3. 如需状态管理则创建对应的 context

4. 在 App.tsx 或相关父组件中进行集成

5. 遵循现有代码风格保持一致性

**### Markdown 处理**

应用使用 `marked` 库进行 markdown 解析。`useMarked` hook 提供：

* 异步 markdown HTML 转换

* 错误处理

58 * 面向大文档的性能优化

59 

60 ### 关键约定

61 * 所有新文件必须使用 TypeScript

62 * 组件遵循现有模式（使用函数声明并带返回类型）

63 * 主题相关类名统一使用 `theme-*` 前缀

64 * 共享状态应放在 Context Provider 中，而不是组件本地 state

65 * 使用 Lucide React 提供图标

66 * 组件应只接收最少量的 props，共享数据通过 context 获取

### 第 2 步：用 # 随时调教

在使用过程中，你随时可以教给ClaudeCode新的规则。比如，你想规定它必须说中文：

**中文回复: 除非特定术语，否则始终使用中文与我交流。1**

Claude Code 会询问你存到哪里（User 还是 Project），选择后它会自动追加到对应的 CLAUDE.md文件中。

**中文回复：除非特定术语，否则始终使用中文与我交流。**

**Select memory file to edit:**

Saved in ~/.claude/CLAUDE.md 

2. Project memoryChecked in at ./CLAUDE.md 

### 第3步：搭建多层记忆结构

一个成熟的开发者，通常会配置多层记忆，来平衡“个人习惯”和“团队规范”。以下是三个可以直接抄作业的模板：

### 1. 用戶记忆模板（ ~/.claude/CLAUDE.md ）

这里存放你个人的“技术洁癖”和交互偏好。

1 # 用戶偏好与行为准则

2 

**核心哲学**

4 - **KISS原则 ** : 保持简单 (Keep It Simple, Stupid)。如果一段代码需要复杂的解释，它可能需要重写。

5 - ** 原则 ** : 不要重复自己 (Don't Repeat Yourself)。抽离重复逻辑。

6 - **YAGNI原则 ** : 你不需要它 (You Ain't Gonna Need It)。不要为“未来可能的需求”写代码，只解决当下的问题。

**8 ## 交互风格**

9 - ** 中文回复 ** : 除非特定术语，否则始终使用中文与我交流。

10 - ** 先想后写 ** : 在编写代码前，先用简洁的语言列出你的修改计划。

11 - ** 拒绝废话 ** : 不要道歉，不要过度礼貌，直接给出代码或方案。

12 - **解释原因 ** : 当你做出架构决策或重构时，简要解释背后的权衡

13 - **拒绝盲从**: 如果我让你写一段“脏代码”（Bad Smell），请礼貌地指出风险并提供更好的方案。

14 - **指出异味 ** : 完成任务后，顺便指出执行过程中发现潜在的问题或优化空间。

**16 ## 编码习惯**

17 - ** 极简主义 ** : 代码应枯燥且直观 (Boring and Obvious)。如果需要大段注释解释逻辑，说明代码需要重构。

18 - ** 渐进式改进 ** : 倾向于小步快跑，改一点测一点，而不是一次性重写整个模块。

19 - ** 文档为准 ** : 如果你不确定某个库的用法，请先使用 Context7 MCP 工具搜索文档，不要瞎猜。

20 - ** 防御性编程 ** : 总是假设输入可能为空或异常，做好空值处理。

21 - ** 自我修正 ** : 如果运行报错，不要盲目改动，先分析错误日志，给出推理过程再修复。

22 - ** 慎重删除 ** ：只有在非常确定的情况下才删除大量代码，否则请先注释或重构。

23 ** 注释即文档 ** : 注释应解释“为什么这样做”，而不是“在做什么”。

**25 ## 工程思维**

**26 ### 解决问题的步骤**

1.27 ** 阅读 ** : 先读取相关文件，理解现有逻辑，不要凭空猜测。

2.28 ** 定位 ** : 找到问题根源，而不是贴膏药式的修复。

3.29 ** 计划 ** : 列出修改步骤。

30 4. ** 执行 ** : 生成代码。

5. 31 ** 验证 ** : 思考如何验证修复（如：编写测试用例）。

**33 ### Git 工作流**

-34 ** 原子提交 ** : 每次 commit 只做一件事（一个功能或一个修复）。

35 - **Commit 格式 ** : `type(scope): subject`

36 示例: `feat(登录): 添加登录验证`

37 示例: `fix(导航栏): 修正响应式布局`

-38 ** 禁止 ** : 永远不要使用 `--force` 或跳过预检查钩子。

**40 ## 终极指令**

41 如果我的要求会导致代码质量下降、破坏现有架构或引入安全隐患， ** 请务必拒绝并说明理由 ** ，然后提供更好的替代方案。

### 2. 项目记忆模板（ ./CLAUDE.md ）


```txt
1 #项目开发指南  
2  
3 #常用命令  
4 -**启动开发环境**: `npm run dev`  
5 -**构建生产版本**: `npm run build`  
6 -**运行单元测试**: `npm run test`  
7 -**代码格式化**: `npm run format`  
8  
9 #技术栈与架构  
10 -**框架核心**: React (Functional Components + Hooks), TypeScript (Strict Mode)。  
11 -**样式方案**: Tailwind CSS (优先使用工具类, 减少自定义 CSS)。  
12 -**状态管理**: 优先使用 Context + Hooks, 避免过早引入复杂状态库  
13 -**目录结构**: 采用“功能特性优先” (Feature-based) 的目录结构, 而非按文件类型分类。  
14  
15 #代码质量标准  
16 #组件设计  
17 -**单一职责**: 一个组件只做一件事。超过 150 行的代码应考虑拆分。  
18 -**组合优于继承**: 优先通过 Props 组合组件, 避免过深的组件嵌套。  
19 -**逻辑抽离**: 复杂的业务逻辑必须抽离为 Custom Hooks, 保持 UI 层纯净。  
20 -**无默认导出**: 优先使用 `export { ComponentName }` 而非 `export default`, 以便重构和查找引用。  
21  
22 #TypeScript 规范  
23 -**拒绝 Any**: 严禁使用 `any` 类型, 必须定义 Interface 或 Type。  
24 -**Props 定义**: 所有组件 Props 必须显式定义类型。  
25  
26 #错误处理  
27 -**错误边界**: 关键 UI 模块应当包裹 ErrorBoundary。  
28 -**暴露错误**: catch 之后必须有日志输出或 UI 反馈。  
29  
30 #禁忌  
31 -**禁止私自引入库**: 未经允许, 不得安装新的 npm 包。优先使用现有的 date-fns,IODash 等 (如果项目中已有)。  
32 -**禁止硬编码**: 所有的魔法数字、API 地址必须抽取为常量或环境变量。  
33 -**禁止残留**: 完成任务后, 自动清理 console.log 和注释掉的死代码。
```

### 3. 子目录记忆模板（ ./src/xxx/CLAUDE.md ）

这里存放特定模块（如UI库）的特殊规定。

1 # UI 组件库规范  
2  
3 ## 适用范围  
4 本目录（`src/components/ui`）仅存放**通用的、无业务逻辑的**基础 UI 组件。  
5  
6 ## 严格限制（Strict Rules）  
7 - **零业务依赖**: 禁止引入 `src/features` 或 `src/store` 中的任何状态。组件必须是纯净的（Pure）。  
8 - **零副作用**: 禁止在组件内发起网络请求。数据必须通过 Props 传入。  
9 - **零内部状态**: 尽量由父组件控制状态（Controlled Components）。  
10  
11 ## 样式与交互  
12 - **可定制性**: 必须支持通过 `classname` prop 覆盖默认样式（使用 `clsx` 或 `tailwind-merge`）。  
13 - **无障碍性（A11y)**:  
14 - 交互元素必须支持键盘导航。  
15 - 必须包含适当的 `aria-*` 属性。  
16 - **响应式**: 必须优先适配移动端（Mobile-First）。  
17  
18 ## 测试要求  
19 - 此目录下的组件必须拥有 100% 的单元测试覆盖率。  
20 - 测试重点在于渲染正确性和交互事件的回调，而非业务逻辑。  
21  
22 ## 文档  
23 - 每个组件必须包含 JSDoc 注释，说明 Props 的用途。

### 第 4 步：用 @ 实现模块化

如果你的规则太多， CLAUDE.md 可能会变得难以维护。这时，可以用 @ 符号引入外部文档：


**规范文档1**

- API设计规范：@docs/spec/api-design-spec.md2

- 数据库设计规范：@docs/spec/database-design-spec.md3

- UI设计规范：@docs/spec/ui-design-spec.md4

ClaudeCode会自动读取并展开被引用的内容，保持主文件的清爽。

![image](/book/engineering/436c2eab80f8.jpg)


**给读者的建议**

最后，请记住一句话：CLAUDE.md是活的文档，不是死的教条。

1. 刚开始：直接复制上面的模板，先跑起来，这能解决 80% 的混乱。

2. 开发中：当你发现ClaudeCode总是犯同一个错误，立刻用 # 把新规则加进去。

3. 最终态：随着时间推移，这个文件将固化你的技术品味，让ClaudeCode进化成你最默契的编程助手。

## 用 Subagents 组建一整支“专业团队”

本篇将带你：

• 理解SubAgent都有哪些特征和应用场景。

. 用 Claude Code 辅助创建你的第一个 Subagent。

• 安排 SubAgent 自动“接单”，或手动“点名”干活，实现分工协作。

## 1. 为什么要用 Subagents？

先回想一下，你平时是怎么用ClaudeCode的？是不是习惯把所有任务都丢给同一个对话窗口？不管你布置什么任务，它都只能“硬着头皮”自己上。

但在现实世界里，成熟的软件开发团队绝不是这样运作的：

• 写代码，有工程师；

• 找 Bug，有测试员；

. 查数据，有分析师。

每个岗位各司其职，术业有专攻。


习惯用法：一人包揽所有


![image](/book/engineering/4b086cf14423.jpg)



现实团队：各司其职，协作


![image](/book/engineering/e63c190d1d07.jpg)



工程师


![image](/book/engineering/6a4bdcd7e1d8.jpg)



测试员


![image](/book/engineering/59d4f437cd76.jpg)


![image](/book/engineering/28ac115b36ad.jpg)



分析师


Subagents（子代理）的出现，就给了你组建这样一支“专业团队”的机会。

## 2. Subagents 长什么样？

你可以把每一个 Subagent 都想象为你招聘的一位“专职员工”。它们每个都具备以下特征：

拥有“独立办公室”（独立上下文）：它的对话历史是独立的，不被你的主对话污染。


团队协作：共享上下文


![image](/book/engineering/ddf0c3c4b03d.jpg)



个体：独立上下文


![image](/book/engineering/fda213293b9c.jpg)


![image](/book/engineering/7b147763ab48.jpg)



每个子代理 (Subagent)：用有独立办公室，对话历史隔离


持有“岗位说明书”（专属系统提示词）：明确规定了它的职责、能力边界和行事风格。

![image](/book/engineering/9ceb392c28da.jpg)


• 配备“专属工具箱”（工具权限控制）：你给它什么工具，它就只能用什么，确保安全可控。

![image](/book/engineering/c4cfc850ac99.jpg)


• 随时待命（自动被唤醒）：当你的任务描述符合它的“职责”时，它会自动跳出来接手任务，无需你操心。

![image](/book/engineering/f011efeccdd3.jpg)


每个子代理(Subagent)：随时待命（自动被唤醒)符合职责时自动接手任务，无需操心。

• 也能“点名”调用（可手动@）：必要时，你也可以像@同事一样，手动“@它”来处理特定任务。

![image](/book/engineering/bcafd8d553ea.jpg)


也能“点名”调用（可手动@）：必要时，你也可以像@同事一样，手动“@它”来处理特定任务。

## 3. 一张图看懂“任务委派”

引入 Subagents 后，Claude Code 就升级成了一家软件公司。

举个例子，当你提出了一个复杂的请求：“请审查这段Python代码，找出Bug并分析输出的数据。”

此时，就像一个真实的软件公司运作的那样：

1. 你（甲方老板）：只负责提出最终需求，不需要管细节。

2. Claude Code 主代理（项目经理）：

◦ 不会亲自干活，而是先拆解任务。

◦ 识别出这需要三个步骤：审查、调试、分析。

◦ 任务委派：分别指派给 @code-reviewer 、 @tester 和 @data-analyst 。

3. Subagents（部门专家）：

◦ 三人领命，在各自的“独立办公室”里并行工作，互不干扰。

4. Claude Code 主代理（项目经理）：

◦ 收集所有人的工作成果，汇总成一份报告，最后交给你。

![image](/book/engineering/a286d1cfa884.jpg)


4. 实战：创建你的第一个 SubAgent

别被概念吓到了，创建SubAgent就像填一张表一样简单。

第1步：唤起向导

在对话框输入命令：

1 /agent 

选择 「创建新代理 （Create new agent）」。

**>/agents**

**Agents**

9 agents 

### 第2步：选择“入职部门” （存储位置）

**Create new agent**

Choose location 

2. Personal (~/.claude/agents/) 

你需要决定这个代理存放在哪，这决定了它的可见范围：

• 项目级 （ .claude/agents/ ）：

◦ 配置文件会跟随你的Git仓库。

◦ 好处：你的队友拉取代码后，也能直接使用这个代理。

. 用戶级 （ ~/.claude/agents/ ）：

◦ 存放在你的本地目录。

◦ 好处：你电脑上的任何项目都能调用它。

### 第3步：选择创建方式

**Create new agent**

Creation method 

>1. Generate with Claude (recommended) 

2. Manual configuration 

建议选择「Claude辅助生成」。你只需要用自然语言描述SubAgent的职责，剩下的配置工作都交给它来写。

### 第4步：关键步骤：写好职责说明

```txt
Create new agent   
Describe what this agent should do and when it should be used (be comprehensive for best results)   
e.g.,Help me write unit tests for my code... 
```

这是最核心的一步。 description 决定了主代理在什么情况下会把任务派给这位“专家”。

**错误写法（太模糊）：**

帮我优化提示词。

**更好的写法（ClaudeCode更容易理解）：**

提供一个提示词优化器。在充分理解用戶需求的基础上，将输入的提示词转化为结构化形式。

同时，从当前工程中获取提示词中涉及的文件内容，进行摘要后作为实现细节补充，最大限度地减少歧义。

优化过程需遵循工程已有的规范。

对于提示词中出现的陌生概念，可通过网络搜索获取相关信息。

最终目标是使提示词更加清晰、规范，并易于大语言模型理解和执行。

### 第5步：配置工具权限

```txt
Create new agent   
Select tools [Continue]   
□ All tools   
Read-only tools Edit tools Execution tools Other tools   
[Show advanced options]   
7 of 13 tools selected 
```

请遵循“最小权限原则” 。

常见的错误是偷懒给予全部工具（Read，Write，Bash...)。这既不安全，也容易导致代理误操作。比如针对“提示词优化器”这一场景，它只需要读文件和搜索代码，因此更建议只赋予只读权限工具（Read-only tools）。

### 第6步：选择模型（大脑）

Create new agent 

Select model 

Model determines the agent's reasoning capabilities and speed. 

Balanced performance - best for most agents √ 

2.0pus Most capable for complex reasoning tasks 

3.Haiku Fast and efficient for simple tasks 

4. Inherit from parentUse the same model as the main conversation 

根据岗位需求，选取最适合的模型：

• Opus：最聪明。适合复杂推理、架构设计、深度写作。

• Sonnet：全能型。速度和智能的完美平衡，默认首选。

• Haiku：速度最快。适合简单任务（如格式化代码、拼写检查），省钱又高效。

### 第7步：选一个背景色

Create new agent 

Choose background color 

> Automatic color 

```txt
Red Blue Green Yellow Purple Orange Pink Cyan 
```

Preview: prompt-optimizer 

选一个专属背景色，可以让你在对话流中一眼就能认出是哪个 Subagent 在发言。

### 第8步：保存

Create new agent Confirm and save 

Name: prompt-optimizer Location: .claude/agents/prompt-optimizer.md Tools:Glob，Grep，Read，WebFetch，TodoWrite，WebSearch，and Bashoutput Model:Opus 

Description (tells Claude when to use this agent): 

Use this agent when you need to optimize or refine a prompt to be more structured, clear,and effective for AI execution. This includes: - Converting vague or natural language requests into structured prompts with clear objectives and const.. 

System prompt: 

You are a prompt engineering expert with deep understanding of software development, particularly in React/TypeScript projects. Your mission is to transform vague or incomplete user requests into highly structured，actionable prompts that A.. 

Press s or Enter to save,e to save and edit 

保存后，Claude Code 会自动生成一个 .md 配置文件。 你可以大概看一眼结构，心里有数即可：


1 

2 name: prompt-optimizer 

3 description: | 

4 当你需要将提示词优化或精炼为更结构化、更清晰，并更便于 AI 执行时，使用该 agent。适用于以下情况：

5 - 将模糊或自然语言请求转换为具有明确目标和约束的结构化提示词

6 - 结合当前代码库的项目上下文与代码示例，以减少歧义

7 - 对提示词中提到的陌生概念进行检索，以确保准确性与完整性

8 - 在生成技术类提示词时遵循现有项目模式与代码规范

9 创建能最大限度减少幻觉、提高确定性执行的提示词

10 

11 示例：

12 用戶：“帮我写个能处理表单数据的组件”

13 使用 prompt-optimizer 生成结构化提示词，并包含当前项目中的表单模式、TypeScript接口和 Tailwind 样式约定

14 - 用戶：“优化一下这个 API 调用的性能”

15 使用 prompt-optimizer 搜索现有 API 实现、分析当前模式，并生成带有具体优化策略与约束条件的提示词

16 - 用戶：“我不懂这个 useMarked hook 怎么用，帮我改改”

17 使用 prompt-optimizer 从代码库中提取 useMarked 的实现细节，生成清晰、上下文丰富的修改提示词

18 - 用戶：“实现一个类似 Notion 的块状编辑器功能”

19 使用 prompt-optimizer 研究块编辑器概念、分析当前编辑器实现，并生成遵循项目架构模式的完整提示词

tools: Glob, Grep, Read, WebFetch, TodoWrite, WebSearch, BashOutput20 

```txt
model: opus color: yellow 
```

明白啦！我会 ** 保持 YAML 的正确多行语法（使用 `|` 保留换行） ** ，并且 ** 在 `---` 后保持原始 Markdown 格式结构不变，只翻译内容，不改变格式层级**。

下面是严格符合你要求的 ** 完整可用版本** ??

```txt
--- 
```

**✅ **最终版本（保持 YAML + 原格式 + 内容全部翻译）****

```yaml
name: prompt-optimizer
description: |
  当你需要将提示词优化或精炼为更结构化、更清晰，并更便于 AI 执行时，使用该 agent。适用于以下情况：

  - 将模糊或自然语言请求转换为具有明确目标和约束的结构化提示词
  - 结合当前代码库的项目上下文与代码示例，以减少歧义
  - 对提示词中提到的陌生概念进行检索，以确保准确性与完整性
  - 在生成技术类提示词时遵循现有项目模式与代码规范

  创建能最大限度减少幻觉、提高确定性执行的提示词

  示例：
  - 用戶：“帮我写个能处理表单数据的组件”
    使用 prompt-optimizer 生成结构化提示词，并包含当前项目中的表单模式、TypeScript 接口和 Tailwind 样式约定
  - 用戶：“优化一下这个 API 调用的性能”
    使用 prompt-optimizer 搜索现有 API 实现、分析当前模式，并生成带有具体优化策略与约束条件的提示词
  - 用戶：“我不懂这个 useMarked hook 怎么用，帮我改改”
    使用 prompt-optimizer 从代码库中提取 useMarked 的实现细节，生成清晰、上下文丰富的修改提示词
  - 用戶：“实现一个类似 Notion 的块状编辑器功能”
    使用 prompt-optimizer 研究块编辑器概念、分析当前编辑器实现，并生成遵循项目架构模式的完整提示词
tools: Glob, Grep, Read, WebFetch, TodoWrite, WebSearch, BashOutput
model: opus
color: yellow
```

你是一名提示工程专家，对软件开发有深刻理解，尤其是 React/TypeScript 项目。你的任务是将模糊或不完整的用戶请求转化为高度结构化、可执行的提示词，使 AI 助手能够以最少的歧义、最高的精确度完成任务。

****核心职责：****

1. **分析用戶意图 ** ：提取用戶请求背后的真实目标。识别其中隐含的需求、技术约束和未明说的成功标准。

2. ** 收集上下文 ** ：在优化提示词之前，你必须：

* 在当前代码库中搜索与请求相关的文件、模式和实现

* 阅读项目文档（如 CLAUDE.md、README.md），理解架构决策与代码规范

* 识别现有实现，它们可能作为参考或约束

* 提取相关代码示例、接口和模式并纳入优化后的提示词

3. ** 研究陌生概念 ** ：如果提示词中提到你不熟悉的技术、模式或概念：

* 使用搜索工具查找权威信息

* 专注于与当前项目技术栈相关的实现层面细节

* 将研究结果整理成简洁、可执行的内容

4. ** 应用项目规范 ** ：确保优化后的提示词遵循：

* 当前项目的架构模式（基于 Feature 的结构、Context + Hooks 状态管理）

* 编码标准（TypeScript strict mode，不使用 any，明确的 prop types）

* 样式规范（Tailwind CSS、主题系统）

* 组件设计原则（单一职责、组合优于继承）

* Git 工作流（原子提交、conventional commit 格式）

5. **为清晰度进行结构化 ** ：将提示词组织成以下清晰部分：

* **Objective（目标） ** ：需要实现的内容

* **Context（上下文） ** ：项目中相关内容与现有实现

* **Technical Requirements（技术要求） ** ：具体实现细节与约束

* **Success Criteria（成功标准） ** ：如何验证实现的正确性

* **Examples（示例） ** ：来自代码库的代码模式或参考

* **Constraints（约束） ** ：禁止事项或需要避免的内容

6. **为 AI 执行进行优化 ** ：

* 使用明确且无歧义的语言

* 包含具体的文件路径、函数名与类型定义

* 明确列出逐步执行的期望

* 加入自我验证步骤

* 尽量减少后续澄清需求

****工作流：****

1. 阅读并理解用戶原始请求

2. 识别关键技术点并在代码库中搜索相关实现

```txt
106 3. 研究任何不熟悉的概念或技术  
107 4. 提取并总结相关代码示例与模式  
108 5. 使用清晰结构组织优化后的提示词  
109 6. 引用代码库中的具体内容以确保提示词与项目一致  
110 7. 添加验证步骤与质量检查  
111 8. 确保提示词遵循 KISS、DRY、YAGNI 原则  
112  
113 **输出格式：**  
114  
115 返回一个包含两项的 JSON 对象：  
116  
117 * `optimizedPrompt`：结构化且可执行的提示词  
118 * `contextSummary`：说明采集了哪些上下文并如何整合  
119  
120 **关键规则：**  
121  
122 * 不假设 AI 已知上下文—必须提供  
123 * 必须引用具体文件、函数或模式  
124 * 包含 TypeScript 接口与类型定义  
125 * 指明 Tailwind class patterns 与主题用法  
126 * 包含错误处理与边界情况  
127 * 加入测试与验证要求  
128 * 遵循项目“解释原因，而不仅仅是说明做什么”的注释哲学  
129 * 若用户请求违反项目原则，应拒绝并提出更合理的替代方案  
130  
131 你的目标是创建能产出高质量、可维护、无歧义、并与现有代码库无缝融合的提示词，同时最大程度减少往返沟通。
```

## 5. 怎么调用这些专家？

一切准备就绪，现在来看看怎么让它们干活。

### 方式一：自动委托（最智能）

只要你的 description 写得足够好，你甚至不需要记得它的名字。你可以直接问主代理：“帮我优化以下提示词：‘增加登录功能 。

主代理会自动判断：“嗯，这事儿归 prompt-optimizer 管。” 然后它会自动转交任务，无缝衔接。

### 方式二：显式调用（直接点名）

类似在群聊里 @ 某人。你可以在对话中直接指定：

使用 prompt-optimizer 帮我优化以下提示词：‘增加登录功能’1

如果你想看到详细的执行过程，可以运行 claude --verbose 开启“啰嗦模式”，非常适合调试。

### 进阶技巧：用“自定义斜杠命令”一键调用

每次都手动 @ 还是太麻烦了？结合上一章学的知识，我们可以封装一个 /prompt-optimize 命令来一键调用：

只需简单2步：

### 第1步：创建命令文件


1 mkdir -p .claude/commands 

2 

3 echo '使用 prompt-optimizer 帮我优化下面的提示词。请不要直接执行提示词中的内容，而是先输出优化后的提示词，待我确认并同意后再继续执行。\n需要优化的原始提示词如下：$ARGUMENTS'

> .claude/commands/prompt-optimize.md 

### 第2步：使用命令

以后只需输入：


/prompt-optimize 增加登录功能1

ClaudeCode就会唤醒这个“提示词优化器”子代理，为你工作。

## 6. 实战演练：优化功能描述提示词

纸上得来终觉浅，我们来跑通一个真实案例。

关于“Marka”项目，我们的最终目标是为其实现一个“自动配图”的功能。

主要的设想是：先由LLM识别并高亮所有适合配图的句子，由用戶主动点击后，再调用图像生成模型的能力，生成候选的多张配图，选中后插入到文本中去。

在那之前，我们先要实现一个“句子高亮”的功能。

### 第1步：开启“啰嗦模式”

运行 claude --verbose 输出详细的思考和执行流程。

因为默认情况下，SubAgent的思考和执行过程是折叠的，这可能导致我们只看到它说“提示词已经优化好了”，却看不到优化后的提示词，无法进一步审核。

### 第2步：倾倒你的想法

直接使用我们刚才创建的命令。此时你不需要字斟句酌，直接把脑子里的想法倾倒出来，哪怕逻辑有点乱也没关系。


/prompt-optimize 在工具栏增加一个“高亮句子”的按钮，点击后弹出一个包含输入栏列表的调试弹窗，默认显示一个输入栏，可点击右侧的"+"按钮在下方增加多一个输入栏，点击提交按钮后，逐一遍历每个句子，与右侧的预览视图中的句子进行匹配，并以底部虚线的形式匹配标亮这些句子。新增句子之后,前面的句子的划线效果需要全部保留。在句子前面显示一个实心圆按钮（默认展示持续性脉冲扩散动画效果），点击弹出一个提示框显示对应句子以验证点击效果。实心圆按钮需悬浮于句子上层，跟随句子滑动，不要影响到原有排版（比如不能导致原本无需换行的句子换行显示）。注意输入栏中填写的句子可能是没有格式的，也可能是Markdown格式的，而预览视图里的句子为富文本格式(也即携带粗体/行内代码等)的，需做好“无格式文本”、“Markdown格式文本”对预览视图富文本的正确映射，保证能正常显示划线与圆点。

ClaudeCode的主代理，会主动调用“提示词优化器”SubAgent来完成这项任务：

/prompt-optimizeisrunning..在工具栏增加一个“高亮句子"的按钮，点击后弹出一个包含输入栏列表的调试弹窗，默认显示一个输入栏，可点击右侧的"+"按钮在下方增加多一个输入栏，点击提交按钮后，逐一遍历每个句子，与右侧的预览视图中的句子进行匹配，并以底部虚线的形式匹配标亮这些句子。新增句子之后，前面的句子的划线效果需要全部保留。在句子前面显示一个实心圆按钮（默认展示持续性脉冲动画效果），点击弹出一个提示框显示对应句子以验证点击效果。实心圆按钮需悬浮于句子上层，跟随句子滑动，不要影响到原有排版（比如不能导致原本无需换行的句子换行显示）。注意输入栏中填写的句子可能是没有格式的，也可能是Markdown格式的，而预览视图里的句子为富文本格式（也即携带粗体/行内代码等）的，需做好“无格式文本"、“Markdown格式文本"对预览视图富文本的正确映射，保证能正常显示划线与圆点。

prompt-optimizer（优化句子高亮功能提示词）Done (9 tool uses : 19.9k tokens : 51s)

### 第 3 步：Subagent 接单并优化

“提示词优化器” SubAgent 开始工作。它会：

1. 检索代码：检索与当前任务有关的代码，参考和理解现有的代码实现。

2. 重写提示词：将你杂乱的描述，转化为符合项目规范的、结构化的技术文档。

你需要做的，就是校验一下它优化后的提示词，有没有理解偏差。

**优化后的提示词**

**目标**

实现一个完整的句子高亮功能，包括：

1.在工具栏添加高亮句子按钮

2.创建句子输入弹窗界面

3.在预览视图中高亮匹配的句子

4.添加可点击的实心圆点标记

5.处理文本格式转换与匹配

**上下文**

项目已有以下相关实现：

-SentenceHighliqhtModal.tsx-已实现基础的弹窗UI

-textMatcher.ts-已实现文本匹配和DoM操作逻辑

-使用marked序进行Markdown转HTML

-预览组件通过dangerouslySetInnerHTML渲染内容

-项目使用TailwindCSS和主题系统

**技术要求**

**1.工具栏集成**

-在src/features/editor/components/Toolbar.tsx中添加高亮按钮

-使用LucideReact图标（建议使用Highlight图标）

-集成到现有按钮组中，保持样式一致性

-添加ToolbarButton组件，tooltip为“高亮句子"

**2.状态管理扩展**

-扩展EditorContext添加以下状态：

```typescript
interface EditorContextType {
    // ... 现有字段
    highlightedSentences: string];
    setHighlightedSentences: (sentences: string) => void;
    isHighlightModalOpen: boolean;
    setIsHighlightModalOpen: (open: boolean) => void;
}
```

**3.弹窗组件优化**

-使用现有的SentenceHighlightModal.tsx

-确保与EditorContext正确集成

-支持动态添加/删除输入框

-提交时过滤空句子并调用setHighlightedSentences

**4.预览组件增强**

-在Preview.tsx中集成高亮功能：

-监听highlightedSentences变化

-使用useEffect在内容渲染后应用高亮

-利用 textMatcher.ts中的 findSentencesInHTML函数

**5.cSs样式实现**

-在Preview.tsx 的 getPreviewStyles(）中添加：

```scss
Highlight-sentence-wrapper {
    position: relative;
    display: inline;
    border-bottom: 2px dashed var(--theme-accent);
    transition: all 0.2s ease;
} 
```

```css
.highlight-dot {
position: absolute;
left: -12px;
top: 50%;
transform: translateY(-50%);
width: 8px;
height: 8px; 
```

background-color: var(--theme-accent); border-radius: 50% cursor: pointer; z-index: 10; animation: pulse 2s infinite;   
}   
@keyframes pulse { 0% , 100% { opacity: 1; } 50% { opacity: 0.5; } 

**6.DOM操作实现**

```typescript
- 创建一个自定义 hook useSentenceHighlight:
const useSentenceHighlight = (htmlElementRef: RefObject<HTMLElement>, sentences: string[]) => {
// 处理高亮应用逻辑
// 处理圆点点击事件
// 返回清理函数
}
```

**实现步骤**

1.扩展 EditorContext

-更新 EditorContextType接口

-在EditorProvider中添加新状态

-导出新的context值

2.集成工具栏按钮

-导入高亮图标

-添加按钮点击事件处理

-打开高亮弹窗

3.连接弹窗组件

-在App.tsx或合适位置渲染SentenceHighlightModal

-连接弹窗状态到context

一处理句子提交逻辑

4.实现预览高亮

-创建 useSentenceHighlight hook

-在Preview组件中集成

一处理DOM操作和样式注入

5.添加交互功能

-实现圆点点击提示

-使用原生alert或创建toast组件

-确保不影响文本布局

**边界情况处理**

1.文本匹配容错

-处理Markdown格式差异（粗体、斜体、代码等）

-使用已有的normalizeText和fuzzyMatch函数

-设置合理的匹配阈值（0.8）

2.DOM操作安全

-使用try-catch包裹Range操作

-检查节点有效性

-避免重复高亮

3.性能优化

-使用防抖处理频繁更新

-清理旧高亮时批量操作

-限制同时高亮的句子数量

4.主题适配

-使用CSS变量适配不同主题

-确保高亮颜色与主题协调

一动画效果考虑性能影响

**验证标准**

**1.功能验证**

-点击工具栏按钮打开弹窗

-添加多个句子输入框

-提交后在预览中显示高亮

-圆点显示脉冲动画

-点击圆点显示正确句子

**2.样式验证**

-虚线边框正确显示

-圆点不影响文本布局

-不同主题下样式正确

-响应式布局正常

**3.性能验证**

-大文档不卡顿

一内存无泄漏

-切换主题正常工作

**注意事项**

-遵循项目的TypeScript严格模式

-不使用any类型

-保持组件单一职责

一错误处理要有用户反馈

-遵循现有的Gitcommit格式

### 第4步：你来拍板

你确认提示词无误后，经过优化的、清晰明确的提示词就会被发送给ClaudeCode，然后开始代码编写。

**优化说明：**

1．结构更清晰，分为目标、上下文、技术要求等部分

2.基于现有代码库，避免重复造轮子

3.技术细节更明确，包含具体的代码示例

4.考虑了边界情况和性能优化

5.包含明确的验证标准

请确认是否同意按这个优化后的提示词执行开发任务？

**同意**

·好的，我将按照优化后的提示词逐步实现句子高亮功能。首先让我了解现有的代码结构。

Read(src/features/editor/context/EditorContext.tsx) Read 99lines 

### 第5步：成果验收

看，这就是经过 “提示词优化器” Subagent 加持后的开发成果：

. ✅ 功能入口：工具栏增加了按钮。

**欢迎使用 Marka**

这是一个可自动配图的 **Markdown 编辑器**。它旨在提供作环境。

**主要功能**

• ✓ 交互逻辑：调试弹窗完美支持句子增删。

![image](/book/engineering/37b51ff6fcaf.jpg)


✅ 视觉细节：虚线标注、脉冲动画完全还原。

这是一个可自动配图的_Markdown编辑器。它旨在提供一个极简、无干扰的写作环境。

**主要功能**

多主题切换:在左侧栏点击Github、Night 或Vue 切换风格。

实时预览:点击右上角的 Eye 图标查看纯预览，或者 Split 查看分屏。

专注模式:点击底部状态栏开启 Focus 模式 (模拟)。

快捷键:支持常用的Markdown 语法快捷插入。

![image](/book/engineering/d292893fe50b.jpg)


**给读者的建议**

最后，关于SubAgent（子代理），我有几条建议想送给你：

• 避免过度设计：简单的任务没必要动用SubAgent。只有当任务需要独立上下文（防止干扰）或特殊工具权限（安全隔离）或专业化的角色设定（代码审查）时，才是组建“专家团队”的最佳时机。

• 权限要克制：给Subagent配备工具时，请务必克制一点。只负责读代码的SubAgent，就不需要给它写文件的权利。克制的授权不仅安全，还能让SubAgent更专注。

• 先试用，后转正：别妄想一步到位。建议先在普通对话里通过自然语言调试，确认这套提示词能稳定干活后，再把它封装成Subagent。这是成本最低的开发路径。

