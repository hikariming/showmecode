![image](/book/engineering/5b7b31156447.jpg)



本章作者：卡夫卡


移动开发工程师


# ⽤CLAUDE.md构建“多层记忆系统”

本篇将带你：

. 让ClaudeCode真正记住你的项⽬规范与个⼈偏好。

. 掌握“三层记忆结构”，从容管理不同层级的特定规则。

# 1. 为什么我们需要“记忆系统”？

如果你⽤过早期版本的ChatGPT，⼀定有过这种“⻤打墙”般的体验：每次新建⼀个对话窗⼝，它都像刚认识你⼀样，把之前的⼀切忘得⼲⼲净净。

你不得不像复读机⼀样，⼀遍遍地重复着你的基本信息：“我是⼀名前端开发者”、“我习惯使⽤Vue框架”……

![image](/book/engineering/c1089ebfecec.jpg)


![image](/book/engineering/a2dad13f5059.jpg)


这就好⽐你招了⼀名有记忆缺陷的天才实习⽣。

他绝顶聪明，代码写得⻜快，逻辑⼀流。缺点是记性极差，你上次教他的内容，他转头就忘了。

⽽“记忆系统”的建⽴，就相当于你给这名实习⽣专⻔编写了⼀本《⼯作⼿册》。

有了它，他就能随时查阅、照章办事。⽆论何时何地，都能严格按照你预期的⽅式⼯作，不再⾃由散漫。

这样⼀来，他出错的次数少了，你的⾎压也稳了，⼯作⾃然更省⼼。

# 记忆系统=工作手册

![image](/book/engineering/27e43ba17bd8.jpg)


![image](/book/engineering/067f6ddcd826.jpg)


![image](/book/engineering/3ddce0f2b650.jpg)


# 2. 揭秘：为什么LLM是“⾦⻥记忆”？

为什么像ChatGPT这类强⼤的⼤语⾔模型（LLM），都会有这种“⾦⻥记忆”呢？

究其原因，从技术原理上讲，⼤语⾔模型本质上是⽆状态的（Stateless）。简单来说，就是模型本⾝不会存储任何对话历史。

每次你发送⼀条新的消息，系统实际上是把你之前所有的聊天记录，连同你的新消息，全部“打包”起来，⼀次性发送给模型。

# 大语言模型的无状态性 (Stateless)

# 场景一：单次会话

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

# 场景二：新会话（无状态）

![image](/book/engineering/d8dacf3df70f.jpg)


新窗口，直接提问

![image](/book/engineering/34e680fe340b.jpg)


我喜欢什么颜色？

![image](/book/engineering/4aa146fe0c7e.jpg)


AI模型 (无历史记录)

只发送[当前消息]

我不知道你喜欢什么颜色呢

原因：模型本身不存储对话历史。每次交互，系统将[全部记录 $+$ 新消息]打包发送。

这就像你和朋友聊天，每说⼀句话前，都得先把两⼈从认识第⼀天起的所有记录重读⼀遍。这种⽅式不仅昂贵（Token消耗⼤），⽽且受限于“上下⽂窗⼝”的⼤⼩，记忆注定是短暂且脆弱的。

ClaudeCode的解决⽅案就是：不再依赖脆弱的临时对话上下⽂，⽽是利⽤“⽂件系统”，跨越会话、跨越时间，将你的项⽬规范和个⼈偏好永久“固化”下来。

# 3. 核⼼⼤脑： CLAUDE.md

这个记忆系统的核⼼，就是⼀个看似普通的 Markdown ⽂件： CLAUDE.md 。它就是我们前⾯提到的、给 Claude Code 的那本《⼯作⼿册》。

⼀开始，ClaudeCode对你的代码库⼀⽆所知。现在，每次开启⼀个新的会话，它做的第⼀件事，就是扫描并阅读这个⽂件，把⾥⾯的重要信息刻进“脑⼦”⾥。

CLAUDE.md ⾥可以写些什么？

这份⼿册的内容包罗万象，规则越具体，执⾏效果越好：

<table><tr><td>分类</td><td>内容</td><td>示例</td></tr><tr><td>常用命令</td><td>教它学会你的工作流</td><td>启动开发环境: `npm run dev`</td></tr><tr><td>核心文件</td><td>帮它快速定位关键模块</td><td>通用 UI 组件库目录: `src/components/uit/`</td></tr><tr><td>代码风格</td><td>强迫它统一画风</td><td>防御性编程: 总是假设输入可能为空或异常, 做好空值处理。</td></tr><tr><td>Git 规范</td><td>保持提交历史整洁</td><td>Commit 格式 `type(scope): subject`</td></tr><tr><td>环境依赖</td><td>避免它乱用库</td><td>框架核心: React (Functional Components + Hooks), TypeScript (Strict Mode)。</td></tr><tr><td>避坑提示</td><td>防止它重复踩雷</td><td>禁止硬编码: 所有的魔法数字、API 地址必须抽取为常量或环境变量。</td></tr></table>

# 4. Claude Code 的“三层记忆系统”

Claude Code 的记忆系统设计得⾮常优雅，采⽤了⼀种类似 “洋葱” 的分层结构。

原则很简单：越靠近你当前的⼯作⽬录，记忆的“权重”就越⾼，优先级也越⾼。

<table><tr><td>层级</td><td>存放位置</td><td>用途</td><td>举例</td></tr><tr><td>用户记忆</td><td>\~/.claude/CLAUDE.md</td><td>全局偏好
你个人的编码习惯，对所有项
目生效。</td><td>渐进式改进：倾向于小步快
跑，改一点测一点，而不是一
次性重写整个模块。</td></tr><tr><td>项目记忆</td><td>\(/CLAUDE.md\)</td><td>团队共识
当前项目的特定规范。</td><td>样式方案：Tailwind CSS
（优先使用工具类，减少自定
义CSS）。</td></tr><tr><td>子目录记忆</td><td>\(/ui/CLAUDE.md\)</td><td>局部规则</td><td></td></tr></table>

Claude会像搜索⽂件⼀样，从你所在的⽬录开始，⼀层层向外递归查找，把所有相关的记忆拼凑成⼀个完整的上下⽂。

# Claude Code的递归记忆加载机制

# 系统如何查找并加载CLAUDE.md文件

# 阶段一：启动时向上递归加载

![image](/book/engineering/34da8d1a22d6.jpg)


![image](/book/engineering/4ff313aff290.jpg)


结果：/project，/foo，/bar记忆被立即加载

# 阶段二：访问时向下动态加载

![image](/book/engineering/2cdd7eec8112.jpg)


![image](/book/engineering/77ff6a2ba474.jpg)


![image](/book/engineering/910fb8e6014b.jpg)


结果：/components/CLAUDE.md才被动态加载

# 5. 实战演练：4步构建你的记忆系统

我们以⼀个随⼿VibeCoding出来的、名为“Marka”的Markdown编辑器应⽤为例，⼿把⼿带你构建记忆系统。

![image](/book/engineering/d99587ba2ee5.jpg)


# 第 1 步：⼀键初始化

我们不需要⼿动创建⽂件，只需要在对话框输⼊：

代码块

1 /init 

ClaudeCode会像⼀个经验丰富的架构师，⾃动扫描你的项⽬结构，为你在根⽬录⽣成⼀个初版的CLAUDE.md 。

# > /init is analyzing your codebase..

·我将分析代码库结构并创建 CLAUDE.md 文件，包含未来 Claude Code 实例所需的基本信息。

. Expore(Analyzeudebasesructurensm30s) 

. Read(package.json) Read30lines 

●已成功创建 CLAUDE.md 文件，内容涵盖了未来 Claude Code实例在该代码库中工作时所需的核心信息：

# 文件结构

1．开发命令-三个核心命令：dev、build、preview

2.架构概述-基于功能的模块化结构，重点介绍 features/editor、features/theme 和features/layout三大核心模块

3.状态管理- 使用 React Context API 的组件间通信模式

4.CSS主题系统-基于 CSS 变量的主题切换实现方式

5.开发指南-如何添加新功能及Markdown处理的最佳实践

6.关键约定-TypeScript使用、命名规范等

文档聚焦于"大局"架构，避免重复或显而易见的内容，同时保持简洁和可操作性。

你只需要看⼀眼，确认内容⽆误，或者微调其中的规则即可。

# 代码块

1 # CLAUDE.md 

此⽂件为 Claude Code（claude.ai/code）在处理本仓库代码时提供指导。2

3 

4 ## 项⽬概览

5 Marka 是⼀个基于 React 18 和 TypeScript 构建的极简 Markdown 编辑器，⽀持实时预览、主题切换，并采⽤简洁的按功能模块划分的架构设计。

6 

7 ## 开发命令

8 ``bash 

# 启动开发服务器9

npm run dev10 

# 构建⽣产版本11

```txt
npm run build # 预览生产构建  
npm run preview
```

# ## 架构

# ### 按功能模块划分的结构

代码库遵循按功能（feature-based）的⽬录结构，每个功能都在 `src/features/` 下独⽴封装：

* **`features/editor/`** - 核⼼ Markdown 编辑功能

$\star$ 组件：Toolbar、Editor、Preview

$\star$ Context：EditorContext 管理 markdown 内容、视图模式和编辑器状态

$\star$ Hook：useMarked 包装 marked 库，实现异步 markdown 解析

* **`features/theme/`** - 动态主题系统

$\star$ Context：ThemeContext 管理当前主题和 CSS 变量注⼊

$\star$ 内置 4 个可定制颜⾊与字体的主题

$\star$ 通过 JavaScript 注⼊ CSS 变量，实现运⾏时主题切换

* **`features/layout/`** - 应⽤布局组件

$\star$ Sidebar：可折叠侧边栏，包含主题切换器

$\star$ StatusBar：底部状态栏，包含字数统计和视图控制

# ### 状态管理

应⽤仅使⽤ React Context API：

* `useEditor()` —— 获取 markdown 内容（markdown）、视图模式（viewMode）、侧边栏状态（sidebarOpen）、⽂本编辑辅助⽅法（insertText）

* `useTheme()` —— 获取当前主题（activeTheme）与主题切换⽅法（setActiveTheme）

组件应使⽤这些 hooks 获取共享状态，⽽不是通过 props 传递。

# ### CSS 主题系统

主题通过 JavaScript 注⼊ CSS 变量实现。主题颜⾊作为 Tailwind 类名使⽤：

$\star$ 背景：`bg-theme-bg`

$\star$ ⽂本：`text-theme-text`

$\star$ 侧边栏：`bg-theme-sidebar`

$\star$ 边框：`border-theme-border`

$\star$ 强调⾊：`bg-theme-accent` / `text-theme-accent`

$\star$ 代码块：`bg-theme-code`

# ### 添加新功能

1. 在 `src/features/` 下创建新⽬录

2. 编写该功能的组件

3. 如需状态管理则创建对应的 context

4. 在 App.tsx 或相关⽗组件中进⾏集成

5. 遵循现有代码⻛格保持⼀致性

# ### Markdown 处理

应⽤使⽤ `marked` 库进⾏ markdown 解析。`useMarked` hook 提供：

$\star$ 异步 markdown HTML 转换

$\star$ 错误处理

58 * ⾯向⼤⽂档的性能优化

59 

60 ### 关键约定

61 $\star$ 所有新⽂件必须使⽤ TypeScript

62 $\star$ 组件遵循现有模式（使⽤函数声明并带返回类型）

63 $\star$ 主题相关类名统⼀使⽤ `theme-*` 前缀

64 $\star$ 共享状态应放在 Context Provider 中，⽽不是组件本地 state

65 $\star$ 使⽤ Lucide React 提供图标

66 $\star$ 组件应只接收最少量的 props，共享数据通过 context 获取

# 第 2 步：⽤ # 随时调教

在使⽤过程中，你随时可以教给ClaudeCode新的规则。⽐如，你想规定它必须说中⽂：

代码块

# 中⽂回复: 除⾮特定术语，否则始终使⽤中⽂与我交流。1

Claude Code 会询问你存到哪⾥（User 还是 Project），选择后它会⾃动追加到对应的 CLAUDE.md⽂件中。

# 中文回复：除非特定术语，否则始终使用中文与我交流。

# Select memory file to edit:

Saved in ~/.claude/CLAUDE.md 

2. Project memoryChecked in at ./CLAUDE.md 

# 第3步：搭建多层记忆结构

⼀个成熟的开发者，通常会配置多层记忆，来平衡“个⼈习惯”和“团队规范”。以下是三个可以直接抄作业的模板：

# 1. ⽤⼾记忆模板（ ~/.claude/CLAUDE.md ）

这⾥存放你个⼈的“技术洁癖”和交互偏好。

代码块

1 # ⽤⼾偏好与⾏为准则

2 

## 核⼼哲学3

4 - **KISS原则 $\star \star$ : 保持简单 (Keep It Simple, Stupid)。如果⼀段代码需要复杂的解释，它可能需要重写。

5 - $\bigstar \bigstar \bigstar \bigstar \bigvee$ 原则 $^ { \star \star }$ : 不要重复⾃⼰ (Don't Repeat Yourself)。抽离重复逻辑。

6 - **YAGNI原则 $^ { \star \star }$ : 你不需要它 (You Ain't Gonna Need It)。不要为“未来可能的需求”写代码，只解决当下的问题。

# 8 ## 交互⻛格

9 - $^ { \star \star }$ 中⽂回复 $\star \star$ : 除⾮特定术语，否则始终使⽤中⽂与我交流。

10 - $^ { \star \star }$ 先想后写 $^ { \star \star }$ : 在编写代码前，先⽤简洁的语⾔列出你的修改计划。

11 - $^ { \star \star }$ 拒绝废话 $^ { \star \star }$ : 不要道歉，不要过度礼貌，直接给出代码或⽅案。

12 - **解释原因 $^ { \star \star }$ : 当你做出架构决策或重构时，简要解释背后的权衡

13 - **拒绝盲从**: 如果我让你写⼀段“脏代码”（Bad Smell），请礼貌地指出⻛险并提供更好的⽅案。

14 - **指出异味 $\star \star$ : 完成任务后，顺便指出执⾏过程中发现潜在的问题或优化空间。

# 16 ## 编码习惯

17 - $\star \star$ 极简主义 $\star \star$ : 代码应枯燥且直观 (Boring and Obvious)。如果需要⼤段注释解释逻辑，说明代码需要重构。

18 - $\star \star$ 渐进式改进 $\star \star$ : 倾向于⼩步快跑，改⼀点测⼀点，⽽不是⼀次性重写整个模块。

19 - $\star \star$ ⽂档为准 $\star \star$ : 如果你不确定某个库的⽤法，请先使⽤ Context7 MCP ⼯具搜索⽂档，不要瞎猜。

20 - $^ { \star \star }$ 防御性编程 $^ { \star \star }$ : 总是假设输⼊可能为空或异常，做好空值处理。

21 - $^ { \star \star }$ ⾃我修正 $^ { \star \star }$ : 如果运⾏报错，不要盲⽬改动，先分析错误⽇志，给出推理过程再修复。

22 - $\star \star$ 慎重删除 $^ { \star \star }$ ：只有在⾮常确定的情况下才删除⼤量代码，否则请先注释或重构。

23 $^ { \star \star }$ 注释即⽂档 $\star \star$ : 注释应解释“为什么这样做”，⽽不是“在做什么”。

# 25 ## ⼯程思维

# 26 ### 解决问题的步骤

1.27 $^ { \star \star }$ 阅读 $^ { \star \star }$ : 先读取相关⽂件，理解现有逻辑，不要凭空猜测。

2.28 $^ { \star \star }$ 定位 $\star \star$ : 找到问题根源，⽽不是贴膏药式的修复。

3.29 $\star \star$ 计划 $\star \star$ : 列出修改步骤。

30 4. $\star \star$ 执⾏ $\star \star$ : ⽣成代码。

5. 31 $\star \star$ 验证 $^ { \star \star }$ : 思考如何验证修复（如：编写测试⽤例）。

# 33 ### Git ⼯作流

-34 $\bigstar \bigstar$ 原⼦提交 $\star \star$ : 每次 commit 只做⼀件事（⼀个功能或⼀个修复）。

35 - **Commit 格式 $\star \star$ : `type(scope): subject`

36 ⽰例: `feat(登录): 添加登录验证`

37 ⽰例: `fix(导航栏): 修正响应式布局`

-38 $\star \star$ 禁⽌ $\star \star$ : 永远不要使⽤ `--force` 或跳过预检查钩⼦。

# 40 ## 终极指令

41 如果我的要求会导致代码质量下降、破坏现有架构或引⼊安全隐患， $\star \star$ 请务必拒绝并说明理由 $^ { \star \star }$ ，然后提供更好的替代⽅案。

# 2. 项⽬记忆模板（ ./CLAUDE.md ）

# 代码块

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

# 3. ⼦⽬录记忆模板（ ./src/xxx/CLAUDE.md ）

这⾥存放特定模块（如UI库）的特殊规定。

代码块

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
19 - 此目录下的组件必须拥有 $100\%$ 的单元测试覆盖率。  
20 - 测试重点在于渲染正确性和交互事件的回调，而非业务逻辑。  
21  
22 ## 文档  
23 - 每个组件必须包含 JSDoc 注释，说明 Props 的用途。

# 第 4 步：⽤ @ 实现模块化

如果你的规则太多， CLAUDE.md 可能会变得难以维护。这时，可以⽤ @ 符号引⼊外部⽂档：

# 代码块

# 规范⽂档1

- API设计规范：@docs/spec/api-design-spec.md2

- 数据库设计规范：@docs/spec/database-design-spec.md3

- UI设计规范：@docs/spec/ui-design-spec.md4

ClaudeCode会⾃动读取并展开被引⽤的内容，保持主⽂件的清爽。

![image](/book/engineering/436c2eab80f8.jpg)


# 给读者的建议

最后，请记住⼀句话：CLAUDE.md是活的⽂档，不是死的教条。

1. 刚开始：直接复制上⾯的模板，先跑起来，这能解决 $8 0 \%$ 的混乱。

2. 开发中：当你发现ClaudeCode总是犯同⼀个错误，⽴刻⽤ # 把新规则加进去。

3. 最终态：随着时间推移，这个⽂件将固化你的技术品味，让ClaudeCode进化成你最默契的编程助⼿。

# ⽤ Subagents 组建⼀整⽀“专业团队”

本篇将带你：

• 理解SubAgent都有哪些特征和应⽤场景。

. ⽤ Claude Code 辅助创建你的第⼀个 Subagent。

• 安排 SubAgent ⾃动“接单”，或⼿动“点名”⼲活，实现分⼯协作。

# 1. 为什么要⽤ Subagents？

先回想⼀下，你平时是怎么⽤ClaudeCode的？是不是习惯把所有任务都丢给同⼀个对话窗⼝？不管你布置什么任务，它都只能“硬着头⽪”⾃⼰上。

但在现实世界⾥，成熟的软件开发团队绝不是这样运作的：

• 写代码，有⼯程师；

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


Subagents（⼦代理）的出现，就给了你组建这样⼀⽀“专业团队”的机会。

# 2. Subagents ⻓什么样？

你可以把每⼀个 Subagent 都想象为你招聘的⼀位“专职员⼯”。它们每个都具备以下特征：

拥有“独⽴办公室”（独⽴上下⽂）：它的对话历史是独⽴的，不被你的主对话污染。


团队协作：共享上下文


![image](/book/engineering/ddf0c3c4b03d.jpg)



个体：独立上下文


![image](/book/engineering/fda213293b9c.jpg)


![image](/book/engineering/7b147763ab48.jpg)



每个子代理 (Subagent)：用有独立办公室，对话历史隔离


持有“岗位说明书”（专属系统提⽰词）：明确规定了它的职责、能⼒边界和⾏事⻛格。

![image](/book/engineering/9ceb392c28da.jpg)


• 配备“专属⼯具箱”（⼯具权限控制）：你给它什么⼯具，它就只能⽤什么，确保安全可控。

![image](/book/engineering/c4cfc850ac99.jpg)


• 随时待命（⾃动被唤醒）：当你的任务描述符合它的“职责”时，它会⾃动跳出来接⼿任务，⽆需你操⼼。

![image](/book/engineering/f011efeccdd3.jpg)


每个子代理(Subagent)：随时待命（自动被唤醒)符合职责时自动接手任务，无需操心。

• 也能“点名”调⽤（可⼿动@）：必要时，你也可以像@同事⼀样，⼿动“@它”来处理特定任务。

![image](/book/engineering/bcafd8d553ea.jpg)


也能“点名”调用（可手动@）：必要时，你也可以像@同事一样，手动“@它”来处理特定任务。

# 3. ⼀张图看懂“任务委派”

引⼊ Subagents 后，Claude Code 就升级成了⼀家软件公司。

举个例⼦，当你提出了⼀个复杂的请求：“请审查这段Python代码，找出Bug并分析输出的数据。”

此时，就像⼀个真实的软件公司运作的那样：

1. 你（甲⽅⽼板）：只负责提出最终需求，不需要管细节。

2. Claude Code 主代理（项⽬经理）：

◦ 不会亲⾃⼲活，⽽是先拆解任务。

◦ 识别出这需要三个步骤：审查、调试、分析。

◦ 任务委派：分别指派给 @code-reviewer 、 @tester 和 @data-analyst 。

3. Subagents（部⻔专家）：

◦ 三⼈领命，在各⾃的“独⽴办公室”⾥并⾏⼯作，互不⼲扰。

4. Claude Code 主代理（项⽬经理）：

◦ 收集所有⼈的⼯作成果，汇总成⼀份报告，最后交给你。

![image](/book/engineering/a286d1cfa884.jpg)


4. 实战：创建你的第⼀个 SubAgent

别被概念吓到了，创建SubAgent就像填⼀张表⼀样简单。

第1步：唤起向导

在对话框输⼊命令：

代码块

1 /agent 

选择 「创建新代理 （Create new agent）」。

# >/agents

# Agents

9 agents 

# 第2步：选择“⼊职部⻔” （存储位置）

# Create new agent

Choose location 

2. Personal (~/.claude/agents/) 

你需要决定这个代理存放在哪，这决定了它的可⻅范围：

• 项⽬级 （ .claude/agents/ ）：

◦ 配置⽂件会跟随你的Git仓库。

◦ 好处：你的队友拉取代码后，也能直接使⽤这个代理。

. ⽤⼾级 （ ~/.claude/agents/ ）：

◦ 存放在你的本地⽬录。

◦ 好处：你电脑上的任何项⽬都能调⽤它。

# 第3步：选择创建⽅式

# Create new agent

Creation method 

>1. Generate with Claude (recommended) 

2. Manual configuration 

建议选择「Claude辅助⽣成」。你只需要⽤⾃然语⾔描述SubAgent的职责，剩下的配置⼯作都交给它来写。

# 第4步：关键步骤：写好职责说明

```txt
Create new agent   
Describe what this agent should do and when it should be used (be comprehensive for best results)   
e.g.,Help me write unit tests for my code... 
```

这是最核⼼的⼀步。 description 决定了主代理在什么情况下会把任务派给这位“专家”。

# 错误写法（太模糊）：

帮我优化提⽰词。

# 更好的写法（ClaudeCode更容易理解）：

提供⼀个提⽰词优化器。在充分理解⽤⼾需求的基础上，将输⼊的提⽰词转化为结构化形式。

同时，从当前⼯程中获取提⽰词中涉及的⽂件内容，进⾏摘要后作为实现细节补充，最⼤限度地减少歧义。

优化过程需遵循⼯程已有的规范。

对于提⽰词中出现的陌⽣概念，可通过⽹络搜索获取相关信息。

最终⽬标是使提⽰词更加清晰、规范，并易于⼤语⾔模型理解和执⾏。

# 第5步：配置⼯具权限

```txt
Create new agent   
Select tools [Continue]   
□ All tools   
Read-only tools Edit tools Execution tools Other tools   
[Show advanced options]   
7 of 13 tools selected 
```

请遵循“最⼩权限原则” 。

常⻅的错误是偷懒给予全部⼯具（Read，Write，Bash...)。这既不安全，也容易导致代理误操作。⽐如针对“提⽰词优化器”这⼀场景，它只需要读⽂件和搜索代码，因此更建议只赋予只读权限⼯具（Read-only tools）。

# 第6步：选择模型（⼤脑）

Create new agent 

Select model 

Model determines the agent's reasoning capabilities and speed. 

Balanced performance - best for most agents √ 

2.0pus Most capable for complex reasoning tasks 

3.Haiku Fast and efficient for simple tasks 

4. Inherit from parentUse the same model as the main conversation 

根据岗位需求，选取最适合的模型：

• Opus：最聪明。适合复杂推理、架构设计、深度写作。

• Sonnet：全能型。速度和智能的完美平衡，默认⾸选。

• Haiku：速度最快。适合简单任务（如格式化代码、拼写检查），省钱⼜⾼效。

# 第7步：选⼀个背景⾊

Create new agent 

Choose background color 

> Automatic color 

```txt
Red Blue Green Yellow Purple Orange Pink Cyan 
```

Preview: prompt-optimizer 

选⼀个专属背景⾊，可以让你在对话流中⼀眼就能认出是哪个 Subagent 在发⾔。

# 第8步：保存

Create new agent Confirm and save 

Name: prompt-optimizer Location: .claude/agents/prompt-optimizer.md Tools:Glob，Grep，Read，WebFetch，TodoWrite，WebSearch，and Bashoutput Model:Opus 

Description (tells Claude when to use this agent): 

Use this agent when you need to optimize or refine a prompt to be more structured, clear,and effective for AI execution. This includes: - Converting vague or natural language requests into structured prompts with clear objectives and const.. 

System prompt: 

You are a prompt engineering expert with deep understanding of software development, particularly in React/TypeScript projects. Your mission is to transform vague or incomplete user requests into highly structured，actionable prompts that A.. 

Press s or Enter to save,e to save and edit 

保存后，Claude Code 会⾃动⽣成⼀个 .md 配置⽂件。 你可以⼤概看⼀眼结构，⼼⾥有数即可：

# 代码块

1 

2 name: prompt-optimizer 

3 description: | 

4 当你需要将提⽰词优化或精炼为更结构化、更清晰，并更便于 AI 执⾏时，使⽤该 agent。适⽤于以下情况：

5 - 将模糊或⾃然语⾔请求转换为具有明确⽬标和约束的结构化提⽰词

6 - 结合当前代码库的项⽬上下⽂与代码⽰例，以减少歧义

7 - 对提⽰词中提到的陌⽣概念进⾏检索，以确保准确性与完整性

8 - 在⽣成技术类提⽰词时遵循现有项⽬模式与代码规范

9 创建能最⼤限度减少幻觉、提⾼确定性执⾏的提⽰词

10 

11 ⽰例：

12 ⽤⼾：“帮我写个能处理表单数据的组件”

13 使⽤ prompt-optimizer ⽣成结构化提⽰词，并包含当前项⽬中的表单模式、TypeScript接⼝和 Tailwind 样式约定

14 - ⽤⼾：“优化⼀下这个 API 调⽤的性能”

15 使⽤ prompt-optimizer 搜索现有 API 实现、分析当前模式，并⽣成带有具体优化策略与约束条件的提⽰词

16 - ⽤⼾：“我不懂这个 useMarked hook 怎么⽤，帮我改改”

17 使⽤ prompt-optimizer 从代码库中提取 useMarked 的实现细节，⽣成清晰、上下⽂丰富的修改提⽰词

18 - ⽤⼾：“实现⼀个类似 Notion 的块状编辑器功能”

19 使⽤ prompt-optimizer 研究块编辑器概念、分析当前编辑器实现，并⽣成遵循项⽬架构模式的完整提⽰词

tools: Glob, Grep, Read, WebFetch, TodoWrite, WebSearch, BashOutput20 

```txt
model: opus color: yellow 
```

明⽩啦！我会 $\star \star$ 保持 YAML 的正确多⾏语法（使⽤ `|` 保留换⾏） $\star \star$ ，并且 $\star \star$ 在 `---` 后保持原始 Markdown 格式结构不变，只翻译内容，不改变格式层级**。

下⾯是严格符合你要求的 $\star \star$ 完整可⽤版本** ??

```txt
--- 
```

# ✅ **最终版本（保持 YAML $^ +$ 原格式 $^ +$ 内容全部翻译）**

```yaml
```
name: prompt-optimizer
description: | 
```

当你需要将提⽰词优化或精炼为更结构化、更清晰，并更便于 AI 执⾏时，使⽤该 agent。适⽤于以下情况：

- 将模糊或⾃然语⾔请求转换为具有明确⽬标和约束的结构化提⽰词

- 结合当前代码库的项⽬上下⽂与代码⽰例，以减少歧义

- 对提⽰词中提到的陌⽣概念进⾏检索，以确保准确性与完整性

- 在⽣成技术类提⽰词时遵循现有项⽬模式与代码规范

创建能最⼤限度减少幻觉、提⾼确定性执⾏的提⽰词

⽰例：

- ⽤⼾：“帮我写个能处理表单数据的组件”

使⽤ prompt-optimizer ⽣成结构化提⽰词，并包含当前项⽬中的表单模式、TypeScript接⼝和 Tailwind 样式约定

- ⽤⼾：“优化⼀下这个 API 调⽤的性能”

使⽤ prompt-optimizer 搜索现有 API 实现、分析当前模式，并⽣成带有具体优化策略与约束条件的提⽰词

- ⽤⼾：“我不懂这个 useMarked hook 怎么⽤，帮我改改”

使⽤ prompt-optimizer 从代码库中提取 useMarked 的实现细节，⽣成清晰、上下⽂丰富的修改提⽰词

- ⽤⼾：“实现⼀个类似 Notion 的块状编辑器功能”

使⽤ prompt-optimizer 研究块编辑器概念、分析当前编辑器实现，并⽣成遵循项⽬架构模式的完整提⽰词

tools: Glob, Grep, Read, WebFetch, TodoWrite, WebSearch, BashOutput 

```txt
model: opus color: yell 
```

你是⼀名提⽰⼯程专家，对软件开发有深刻理解，尤其是 React/TypeScript 项⽬。你的任务是将模糊或不完整的⽤⼾请求转化为⾼度结构化、可执⾏的提⽰词，使 AI 助⼿能够以最少的歧义、最⾼的精确度完成任务。

# **核⼼职责：**

1. **分析⽤⼾意图 $^ { \star \star }$ ：提取⽤⼾请求背后的真实⽬标。识别其中隐含的需求、技术约束和未明说的成功标准。

2. $\star \star$ 收集上下⽂ $\star \star$ ：在优化提⽰词之前，你必须：

$\star$ 在当前代码库中搜索与请求相关的⽂件、模式和实现

$\star$ 阅读项⽬⽂档（如 CLAUDE.md、README.md），理解架构决策与代码规范

$\star$ 识别现有实现，它们可能作为参考或约束

$\star$ 提取相关代码⽰例、接⼝和模式并纳⼊优化后的提⽰词

3. $\star \star$ 研究陌⽣概念 $\star \star$ ：如果提⽰词中提到你不熟悉的技术、模式或概念：

$\star$ 使⽤搜索⼯具查找权威信息

$\star$ 专注于与当前项⽬技术栈相关的实现层⾯细节

$\star$ 将研究结果整理成简洁、可执⾏的内容

4. $\star \star$ 应⽤项⽬规范 $\star \star$ ：确保优化后的提⽰词遵循：

$\star$ 当前项⽬的架构模式（基于 Feature 的结构、Context $^ +$ Hooks 状态管理）

$\star$ 编码标准（TypeScript strict mode，不使⽤ any，明确的 prop types）

$\star$ 样式规范（Tailwind CSS、主题系统）

$\star$ 组件设计原则（单⼀职责、组合优于继承）

$\star$ Git ⼯作流（原⼦提交、conventional commit 格式）

5. **为清晰度进⾏结构化 $^ { \star \star }$ ：将提⽰词组织成以下清晰部分：

* **Objective（⽬标） $\star \star$ ：需要实现的内容

* **Context（上下⽂） $^ { \star \star }$ ：项⽬中相关内容与现有实现

* **Technical Requirements（技术要求） $\star \star$ ：具体实现细节与约束

* **Success Criteria（成功标准） $\star \star$ ：如何验证实现的正确性

* **Examples（⽰例） $\star \star$ ：来⾃代码库的代码模式或参考

* **Constraints（约束） $\star \star$ ：禁⽌事项或需要避免的内容

6. **为 AI 执⾏进⾏优化 $^ { \star \star }$ ：

$\star$ 使⽤明确且⽆歧义的语⾔

$\star$ 包含具体的⽂件路径、函数名与类型定义

$\star$ 明确列出逐步执⾏的期望

$\star$ 加⼊⾃我验证步骤

$\star$ 尽量减少后续澄清需求

# **⼯作流：**

1. 阅读并理解⽤⼾原始请求

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

# 5. 怎么调⽤这些专家？

⼀切准备就绪，现在来看看怎么让它们⼲活。

# ⽅式⼀：⾃动委托（最智能）

只要你的 description 写得⾜够好，你甚⾄不需要记得它的名字。你可以直接问主代理：“帮我优化以下提⽰词：‘增加登录功能 。

主代理会⾃动判断：“嗯，这事⼉归 prompt-optimizer 管。” 然后它会⾃动转交任务，⽆缝衔接。

# ⽅式⼆：显式调⽤（直接点名）

类似在群聊⾥ @ 某⼈。你可以在对话中直接指定：

使⽤ prompt-optimizer 帮我优化以下提⽰词：‘增加登录功能’1

如果你想看到详细的执⾏过程，可以运⾏ claude --verbose 开启“啰嗦模式”，⾮常适合调试。

# 进阶技巧：⽤“⾃定义斜杠命令”⼀键调⽤

每次都⼿动 @ 还是太⿇烦了？结合上⼀章学的知识，我们可以封装⼀个 /prompt-optimize 命令来⼀键调⽤：

只需简单2步：

# 第1步：创建命令⽂件

# 代码块

1 mkdir -p .claude/commands 

2 

3 echo '使⽤ prompt-optimizer 帮我优化下⾯的提⽰词。请不要直接执⾏提⽰词中的内容，⽽是先输出优化后的提⽰词，待我确认并同意后再继续执⾏。\n需要优化的原始提⽰词如下：$ARGUMENTS'

> .claude/commands/prompt-optimize.md 

# 第2步：使⽤命令

以后只需输⼊：

# 代码块

/prompt-optimize 增加登录功能1

ClaudeCode就会唤醒这个“提⽰词优化器”⼦代理，为你⼯作。

# 6. 实战演练：优化功能描述提⽰词

纸上得来终觉浅，我们来跑通⼀个真实案例。

关于“Marka”项⽬，我们的最终⽬标是为其实现⼀个“⾃动配图”的功能。

主要的设想是：先由LLM识别并⾼亮所有适合配图的句⼦，由⽤⼾主动点击后，再调⽤图像⽣成模型的能⼒，⽣成候选的多张配图，选中后插⼊到⽂本中去。

在那之前，我们先要实现⼀个“句⼦⾼亮”的功能。

# 第1步：开启“啰嗦模式”

运⾏ claude --verbose 输出详细的思考和执⾏流程。

因为默认情况下，SubAgent的思考和执⾏过程是折叠的，这可能导致我们只看到它说“提⽰词已经优化好了”，却看不到优化后的提⽰词，⽆法进⼀步审核。

# 第2步：倾倒你的想法

直接使⽤我们刚才创建的命令。此时你不需要字斟句酌，直接把脑⼦⾥的想法倾倒出来，哪怕逻辑有点乱也没关系。

# 代码块

/prompt-optimize 在⼯具栏增加⼀个“⾼亮句⼦”的按钮，点击后弹出⼀个包含输⼊栏列表的调试弹窗，默认显⽰⼀个输⼊栏，可点击右侧的"+"按钮在下⽅增加多⼀个输⼊栏，点击提交按钮后，逐⼀遍历每个句⼦，与右侧的预览视图中的句⼦进⾏匹配，并以底部虚线的形式匹配标亮这些句⼦。新增句⼦之后,前⾯的句⼦的划线效果需要全部保留。在句⼦前⾯显⽰⼀个实⼼圆按钮（默认展⽰持续性脉冲扩散动画效果），点击弹出⼀个提⽰框显⽰对应句⼦以验证点击效果。实⼼圆按钮需悬浮于句⼦上层，跟随句⼦滑动，不要影响到原有排版（⽐如不能导致原本⽆需换⾏的句⼦换⾏显⽰）。注意输⼊栏中填写的句⼦可能是没有格式的，也可能是Markdown格式的，⽽预览视图⾥的句⼦为富⽂本格式(也即携带粗体/⾏内代码等)的，需做好“⽆格式⽂本”、“Markdown格式⽂本”对预览视图富⽂本的正确映射，保证能正常显⽰划线与圆点。

ClaudeCode的主代理，会主动调⽤“提⽰词优化器”SubAgent来完成这项任务：

/prompt-optimizeisrunning..在工具栏增加一个“高亮句子"的按钮，点击后弹出一个包含输入栏列表的调试弹窗，默认显示一个输入栏，可点击右侧的"+"按钮在下方增加多一个输入栏，点击提交按钮后，逐一遍历每个句子，与右侧的预览视图中的句子进行匹配，并以底部虚线的形式匹配标亮这些句子。新增句子之后，前面的句子的划线效果需要全部保留。在句子前面显示一个实心圆按钮（默认展示持续性脉冲动画效果），点击弹出一个提示框显示对应句子以验证点击效果。实心圆按钮需悬浮于句子上层，跟随句子滑动，不要影响到原有排版（比如不能导致原本无需换行的句子换行显示）。注意输入栏中填写的句子可能是没有格式的，也可能是Markdown格式的，而预览视图里的句子为富文本格式（也即携带粗体/行内代码等）的，需做好“无格式文本"、“Markdown格式文本"对预览视图富文本的正确映射，保证能正常显示划线与圆点。

prompt-optimizer（优化句子高亮功能提示词）Done (9 tool uses : 19.9k tokens : 51s)

# 第 3 步：Subagent 接单并优化

“提⽰词优化器” SubAgent 开始⼯作。它会：

1. 检索代码：检索与当前任务有关的代码，参考和理解现有的代码实现。

2. 重写提⽰词：将你杂乱的描述，转化为符合项⽬规范的、结构化的技术⽂档。

你需要做的，就是校验⼀下它优化后的提⽰词，有没有理解偏差。

# 优化后的提示词

# 目标

实现一个完整的句子高亮功能，包括：

1.在工具栏添加高亮句子按钮

2.创建句子输入弹窗界面

3.在预览视图中高亮匹配的句子

4.添加可点击的实心圆点标记

5.处理文本格式转换与匹配

# 上下文

项目已有以下相关实现：

-SentenceHighliqhtModal.tsx-已实现基础的弹窗UI

-textMatcher.ts-已实现文本匹配和DoM操作逻辑

-使用marked序进行Markdown转HTML

-预览组件通过dangerouslySetInnerHTML渲染内容

-项目使用TailwindCSS和主题系统

# 技术要求

# 1.工具栏集成

-在src/features/editor/components/Toolbar.tsx中添加高亮按钮

-使用LucideReact图标（建议使用Highlight图标）

-集成到现有按钮组中，保持样式一致性

-添加ToolbarButton组件，tooltip为“高亮句子"

# 2.状态管理扩展

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

# 3.弹窗组件优化

-使用现有的SentenceHighlightModal.tsx

-确保与EditorContext正确集成

-支持动态添加/删除输入框

-提交时过滤空句子并调用setHighlightedSentences

# 4.预览组件增强

-在Preview.tsx中集成高亮功能：

-监听highlightedSentences变化

-使用useEffect在内容渲染后应用高亮

-利用 textMatcher.ts中的 findSentencesInHTML函数

# 5.cSs样式实现

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

background-color: var(--theme-accent); border-radius: $50\%$ cursor: pointer; z-index: 10; animation: pulse 2s infinite;   
}   
@keyframes pulse { $0\%$ , $100\%$ { opacity: 1; } $50\%$ { opacity: 0.5; } 

# 6.DOM操作实现

```typescript
- 创建一个自定义 hook useSentenceHighlight:
const useSentenceHighlight = (htmlElementRef: RefObject<HTMLElement>, sentences: string[]) => {
// 处理高亮应用逻辑
// 处理圆点点击事件
// 返回清理函数
}
```

# 实现步骤

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

# 边界情况处理

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

# 验证标准

# 1.功能验证

-点击工具栏按钮打开弹窗

-添加多个句子输入框

-提交后在预览中显示高亮

-圆点显示脉冲动画

-点击圆点显示正确句子

# 2.样式验证

-虚线边框正确显示

-圆点不影响文本布局

-不同主题下样式正确

-响应式布局正常

# 3.性能验证

-大文档不卡顿

一内存无泄漏

-切换主题正常工作

# 注意事项

-遵循项目的TypeScript严格模式

-不使用any类型

-保持组件单一职责

一错误处理要有用户反馈

-遵循现有的Gitcommit格式

# 第4步：你来拍板

你确认提⽰词⽆误后，经过优化的、清晰明确的提⽰词就会被发送给ClaudeCode，然后开始代码编写。

# 优化说明：

1．结构更清晰，分为目标、上下文、技术要求等部分

2.基于现有代码库，避免重复造轮子

3.技术细节更明确，包含具体的代码示例

4.考虑了边界情况和性能优化

5.包含明确的验证标准

请确认是否同意按这个优化后的提示词执行开发任务？

# 同意

·好的，我将按照优化后的提示词逐步实现句子高亮功能。首先让我了解现有的代码结构。

Read(src/features/editor/context/EditorContext.tsx) Read 99lines 

# 第5步：成果验收

看，这就是经过 “提⽰词优化器” Subagent 加持后的开发成果：

. $\mathbb { C }$ 功能⼊⼝：⼯具栏增加了按钮。

# 欢迎使用 Marka

这是一个可自动配图的 **Markdown 编辑器**。它旨在提供作环境。

## 主要功能

• $\mathbb { V }$ 交互逻辑：调试弹窗完美⽀持句⼦增删。

![image](/book/engineering/37b51ff6fcaf.jpg)


$\mathbb { C }$ 视觉细节：虚线标注、脉冲动画完全还原。

这是一个可自动配图的_Markdown编辑器。它旨在提供一个极简、无干扰的写作环境。

# 主要功能

多主题切换:在左侧栏点击Github、Night 或Vue 切换风格。

实时预览:点击右上角的 Eye 图标查看纯预览，或者 Split 查看分屏。

专注模式:点击底部状态栏开启 Focus 模式 (模拟)。

快捷键:支持常用的Markdown 语法快捷插入。

![image](/book/engineering/d292893fe50b.jpg)


# 给读者的建议

最后，关于SubAgent（⼦代理），我有⼏条建议想送给你：

• 避免过度设计：简单的任务没必要动⽤SubAgent。只有当任务需要独⽴上下⽂（防⽌⼲扰）或特殊⼯具权限（安全隔离）或专业化的⻆⾊设定（代码审查）时，才是组建“专家团队”的最佳时机。

• 权限要克制：给Subagent配备⼯具时，请务必克制⼀点。只负责读代码的SubAgent，就不需要给它写⽂件的权利。克制的授权不仅安全，还能让SubAgent更专注。

• 先试⽤，后转正：别妄想⼀步到位。建议先在普通对话⾥通过⾃然语⾔调试，确认这套提⽰词能稳定⼲活后，再把它封装成Subagent。这是成本最低的开发路径。

