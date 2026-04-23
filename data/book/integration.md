**用 MCP 接入外部数据源与工具**

本篇将带你：

用最直观的对比，彻底看懂 MCP 与传统“函数调用”的本质区别。

利用 Context7 MCP，让 Claude Code 实时读取最新的技术文档。

利用 Playwright MCP，让 Claude Code 用自动化测试替代手动点点点。

## 1. 过去式：函数调用的局限性

在 MCP（Model Context Protocol，模型上下文协议）诞生之前，AI 想要使用外部工具，就只能依赖各家模型提供的 **函数调用（Function Calling）功能**。

简单来说，函数调用就像是 **“给 AI 临时塞了一本工具说明书”**。你需要把工具的定义写在提示词里，AI 看一眼，然后决定要不要用、怎么用。

![](/book/integration/c726d9b3e3f0.png)

这种方式虽然也能用，但有几个很明显的痛点：

![](/book/integration/74189a238d40.png)

**接口不统一：**每个工具都有自己独特的 API 定义。 每接入一个新工具，你都要写一套专门的“胶水代码”。这就像家里的每个电器都需要配一个特定形状的充电器，乱成一团。

![](/book/integration/677bd2d4d64e.png)

**生态割裂：**你辛苦为某个工具写的接口定义，换个模型可能就用不了； 别人写好的优质工具，你也没法直接拿来复用。 大家都在重复造轮子，生态之间竖起了高墙。

![](/book/integration/54e23b9ac3dc.png)

**上下文爆炸：**这是最致命的一点。 你必须把所有工具的状态、参数定义都塞进 Prompt 里。 工具一多，不仅烧钱（Token 消耗大），还极其容易撑爆上下文窗口，导致 AI 变笨。

## 2. 现在式：MCP到底解决了什么？

![](/book/integration/635acb67e142.png)

MCP 的核心奥义就是三个字：**标准化**。

它规范了应用程序向大语言模型提供外部上下文的方式。 如果说函数调用是“乱七八糟的专用充电器”，那么 **MCP 就是 AI 界的 USB-C 接口**。

**即插即用**：不管你是 Figma、GitHub 还是本地数据库，只要符合 MCP 标准，插上就能用。

**一次开发，到处运行**：开发者不需要再为每个模型重写连接代码。

**上下文分离**：工具的状态由独立的连接管理，不再占用宝贵的 Prompt 空间。

### 一张表看懂区别

**点击图片可查看完整电子表格**

## 3. 核心原理：MCP是如何工作的？

MCP 采用了经典的 **客户端-服务器 (Client-Server)** 架构。为了方便理解，我们可以把它想象成一家现代化公司的运作模式：

![](/book/integration/cd191d685af4.png)

**MCP 主机 (Host) = “老板” (如 Claude Code)** ：它是用户交互的入口，负责统筹全局，发号施令。

**MCP 服务器 (Server) =“外部专家” (如 Figma/GitHub)：** 它们是独立的进程，手里握着核心数据和专业工具，随时待命。

**MCP 客户端 (Client) =“联络专员”** ：老板 (Host) 会派出数名专员 (Client) 与数名专家 (Server) 建立 **一对一** 的连接，负责精准传话和提取数据。

**这种设计的最大好处是模块化。 **你想增加新能力？只需要“招聘”一个新的专家（接入新的 MCP Server）即可，完全不需要改动老板（Claude Code）的底层逻辑。

## 4. 实战1：用Context7MCP访问最新文档以接入功能

接下来，我们通过一个真实的应用场景，来体验 MCP 获取“外部数据源”的能力。

### 4.1LLM的“知识截止日期”

![](/book/integration/2d7ec1d45688.png)

众所周知，每一个发布的大语言模型，都有一个 **“知识截止日期”**。

模型在训练结束的那一刻，它的记忆就冻结了。比如，一个模型的知识截止在 **2024 年 6 月**。那么，6 月之后发布的新工具、新版本库、新 API 变更……它一概不知。

问题是，它也不会告诉你“我不知道”，而是会一本正经地胡说八道——这就是所谓的**“幻觉”**问题。

### 4.2传统解法的笨拙

为了解决这个问题，我们通常会把最新的官方文档复制下来，贴给模型，让它“照着写”。

确实这样输出的代码，可能会靠谱很多。但问题也来了：

![](/book/integration/8325d09ddaa4.png)

**文档太长**：动不动几十页，来回复制粘贴烦不烦？

**信息分散**：不同功能分散在不同页面，跳来跳去浪费时间。

**容易出错**：偷懒全贴进去？模型可能找不到重点；贴少了？代码又跑不通。

### 4.3 Context7 MCP：自动化的知识补给站

这种情况下，**Context7 MCP** 就是你的救星。

![](/book/integration/ee772f05c15e.png)

它是一个能自动把“最新文档”喂给 AI 的工具。它能自动把你所需要的库、框架的**最新文档**、**官方示例代码**、**API 说明**，整合进你的提示词里。

**它不是简单的爬虫，而是“结构化提取 + 按需召回”。** 最终，它返回给模型的，是经过清洗的、模型最容易理解的格式。

### 第 1 步：获取 API Key

首先，登录 Context7 官网，注册并获取你的 API Key。

![](/book/integration/cad01968c120.png)

![](/book/integration/2ba967e49178.png)

![](/book/integration/f3a2e1233c80.png)

![](/book/integration/c79ebe62390a.png)

### 第 2 步：安装并启动 Context7 MCP 服务

Context7 贴心地提供了针对 Claude Code 的一键安装 MCP 方式。

![](/book/integration/022c8af26cfe.png)

复制下面的命令，把 `YOUR_API_KEY` 替换成你刚才获取的那串字符，随后在终端执行。

```markdown
claude mcp add --transport http context7 https://mcp.context7.com/mcp \
  --header "CONTEXT7_API_KEY: YOUR_API_KEY"
```

![](/book/integration/da9e5ea1002b.png)

### 第3步：检查连接状态

接下来我们需要确认连接状态。 运行检查命令：

```text
claude mcp list
```

![](/book/integration/478b9ba80171.png)

在输出列表中，如果你看到 `context7` 的状态显示为 `connected`，恭喜你，连接成功！

**第 4 步：更新最新文档**

Context7 会不定时地对文档进行索引。如果发现索引的文档不是最新的（比如这里显示更新于一个月前），我们可以手动触发刷新。

点击下图中的刷新按钮：

![](/book/integration/a959cc5869cf.png)

![](/book/integration/8bf1693d3055.png)

随后，只需等待一段时间，再次查看时，Context7 就会显示最新的抓取时间。 **这一步至关重要**，它保证了 AI 拿到的是最新版本的“说明书”。

![](/book/integration/b04aecc3fc1e.png)

**第 5 步：调用 Context7 MCP**

现在，我们要为“Marka”项目完成关键的一步：**接入 Gemini 图像生成 API**。

同样还是使用我们之前封装好的 `/api-integration` 命令，不过这次我们不再手动复制粘贴，而是**直接命令 Claude Code 使用 Context7 MCP 去查阅文档**：

```markdown
使用 Context7 MCP 访问 $1 关于 $2 的API文档，创建一个完整的API调用封装。包括：1) 提取认证方式、请求方法、URL、请求体结构；2) 创建一个使用该API的简洁函数/类，支持传入动态参数；3) 添加错误处理和必要的类型定义；4) 在工具栏添加调试按钮，点击弹出完整的API调试窗口，可配置API Key、修改请求参数以及查看响应内容。
```

我们在Claude Code 会话中输入：

![](/book/integration/0acbaf77d80d.png)

**注意观察 Claude Code 的执行过程**，Context7 MCP 自动触发了两个核心动作：

`resolve_library_id`：根据你提供的模糊关键字，迅速定位到你具体指的是哪个包

`get_library_docs`：紧接着，它直接拉取了该包的详细文档内容（不是网页搜索结果，而是真正的技术文档）

**第 6 步：成果验收**

没有任何人工干预，Claude Code 完美地理解了最新文档，按要求编写了代码、接入了 API，生成了一个可视化的调试窗口。

![](/book/integration/20f99e1b726b.png)

![](/book/integration/6dde72d1f1e6.png)

## 5. 实战2：用 Playwright MCP 执行自动化的端到端测试

体验完 MCP 获取“外部数据源”的能力后，接下来，我们通过另一个真实的应用场景，来体验 MCP 接入“外部工具”的能力。

我们将使用 **Playwright MCP**，看它是如何帮我们把原本需要“人工点点点”的测试工作，完全自动化的。

### 5.1 AI Coding时代，还需要测试吗？

很多人可能会问：“现在的 AI 写代码这么强，直接生成就可用，那我还需要做测试吗？”

答案可能有点反直觉：**正因为现在代码是 AI 写的，所以“测试”才变得前所未有的重要。**

我们可以把软件开发类比成“做菜”： **“厨师炒完菜上桌前，总得先尝一口咸淡。” —— 这就是测试。**

![](/book/integration/441ad2a445e8.png)

现在的 AI，就像一个**手速极快、但咸淡有时候可能把握不好**的厨师：

他只能保证菜肯定**做熟了**（代码能跑起来，没有语法错误）。

但没法保证菜**合你的口味**（业务逻辑是否正确，符不符合预期）。

如果你完全不测试就直接上线，就像把一盘没尝过的菜直接端给客人。万一盐放多了（逻辑 Bug），客人（用户）可是会直接掀桌子的。

### 5.2只要“最小化测试”就够了

提到“软件测试”，你可能会想到复杂的测试框架和枯燥的调试步骤。 **好消息是：在 AI Coding 时代，你不需要成为一名测试专家。**

我们只需要遵循 **“最小化测试原则”**就好了：

![](/book/integration/7b4806575173.png)

**改了旧的，测旧的**：防止“按下葫芦起了瓢”，改了 A 导致 B 坏了。

**写了新的，测新的**：验证新加的功能确实生效了。

而这些脏活累活，全都可以交给 AI。

### 5.3测试的三种层次（从轻到重）

软件测试可以笼统分为三层。我们不需要全精通，只需要知道怎么指挥 AI 去做就好了。

![](/book/integration/ff6cc3f47de7.png)

**点击图片可查看完整电子表格**

对于现阶段的我们来说，最直观易懂、同时投入产出最高的就是 **端到端测试** —— 让 AI 模拟真人去操作软件，看结果对不对。

### 5.4 什么是 Playwright？

Playwright 是一款强大的自动化测试工具。

它能完全模拟真人的操作：打开浏览器、点击按钮、输入文字、截屏验证，帮你完成那些枯燥的重复点点点操作。

如果把你的网站比作一家**超市**：

![](/book/integration/5d22507737d6.png)

当你每次调整了**货架商品的摆放**（修改了代码），你最担心什么？

价格标得对不对？

顾客常买的东西还容不容易找到？

Playwright 就像一个可以模拟顾客的“**自动巡店机器人”**：

它会按固定路线逛超市

它会找商品、放进购物车、去结账

每次货架一调整，就重新走一遍

一旦发现“商品找不到了”或“结不了账”，它会立刻告诉你。

**5.5 Playwright MCP：用“人话”指挥机器人**

原生的 Playwright 虽然好用，但门槛不低：你需要会写复杂的脚本，还需要维护这些脚本。

**Playwright MCP 的出现，则是彻底改变了玩法。**

它就像是给这个“巡店机器人”装上了一个**高级中控台**，好处显而易见：

![](/book/integration/aa547bd3d66a.png)

**告别脚本**：你不用再写 `page.click('.btn')`，只需要说“帮我点击购买按钮”。

**抗干扰强**：它使用结构化的页面信息，比传统的截图定位更精准，不会因为你微调了按钮位置就报错。

**自我修复**：如果测试挂了，它能根据报错信息，尝试自动修复测试脚本。

### 第 1 步：安装并启动 Playwright MCP 服务

同样，Playwright 也提供了针对 Claude Code 的一键安装 MCP 的方式。

```text
claude mcp add playwright npx @playwright/mcp@latest
```

### 第2步：检查连接状态

安装完成后，确认 Playwright MCP 的连接状态。运行检查命令：

```text
claude mcp list
```

确认 Playwright MCP 的状态显示为 `connected`**。**

### 第3步：实现剩余功能

在测试之前，我们先得有东西可测。

前面我们已经接入了 Gemini 的图像生成 API，现在我们要把它整合进业务：**点击生成图像，并在悬浮窗中展示。**

这其中涉及的复杂前端交互，我们依然直接用自然语言描述，并使用“提示词优化器” SubAgent 优化：

```markdown
/prompt-optimize 1. 将圆点按钮的牵引线延伸出来的功能弹框，重构为一个极简且高度现代化的悬浮指引样式，内部布局遵循分段式控件逻辑，从上到下分别为深灰色的无衬线标题（显示“句子识别与配图”功能生成的“配图理由”）、微弱的分割线、浅灰色的辅助说明文字（显示“句子识别与配图”功能生成的“生图提示词”）、暗色的水平分段式图标控件（目前暂只显示“生成图片”按钮）。2. 点击“生成图片”按钮后，调用已接入的302.ai提供的Gemini 图像生成 API，生成1张候选图片，生成完成后在图标控件下方插入原有的水平布局的候选图片列表（原有的Unsplash图片生成功能需移除），已生成的候选图片会一直保留且与对应高亮句子绑定，再次点击“生成图片”按钮追加到现有的候选图片列表后面。
```

Claude Code 迅速完成了相应的界面重构与逻辑绑定：

![](/book/integration/093c807adb14.png)

![](/book/integration/a241a824b884.png)

![](/book/integration/af6243a69d69.png)

### 第4步：配置权限，解放双手

为了让自动化测试流畅进行，而不是每一步都弹窗问你“是否允许操作浏览器做XX”，我们需要给 MCP 的权限稍微松下绑。

打开项目中的 `settings.local.json` 文件，在 `permissions-allow` 列表底部添加一行：

`"mcp__playwright"`

![](/book/integration/b01b24dbbfde.png)

这个操作意味着，现在我们授权了 Playwright MCP 可以自主执行浏览器的任意操作。

### 第 5 步：调用 Playwright MCP

现在，功能开发完成，MCP 就位，权限已开。是时候让 Playwright 帮我们完整跑一遍流程了。

在 Claude Code 会话输入以下指令：

```markdown
请调用 playwright mcp 帮我跑通这个端到端测试用例：
1. 高亮句子：先进入“句子识别与配图”界面，填入API Key（sk-xxx），点击“开始识别”，动态生成可配图的高亮句子，等待识别完成后，关闭“句子识别与配图”界面。
2. 生成图片：随便移动到一个高亮句子旁边的圆点交互按钮之上，在显示的弹窗上点击“生成图片”。等待图片生成完成。一旦图片生成完毕，立刻点击这张图片，让这张图以 Markdown 格式自动插入到当前文档的编辑器里，验证预览界面是否正确显示图片。
```

**接下来，请把双手离开键盘，看着屏幕即可：**

首先，Playwright MCP 会接收指令，自动弹出一个新的浏览器窗口，并打开我们的“Marka”应用。

![](/book/integration/3ddb19afc6f2.jpg)

随后，它会自己填入 API Key，然后点击“开始识别”，并耐心地等待识别完成。

![](/book/integration/d1d7d080e79a.png)

识别完成后，它会自动关闭当前的弹窗。

![](/book/integration/6116a9e4232f.png)

然后精准地模拟鼠标悬停在圆点按钮上，点击“生成图片”，并定时检查图片生成是否完毕。

![](/book/integration/d89bf15191e7.png)

![](/book/integration/bb1f214fa36e.png)

![](/book/integration/be5de7ec0353.png)

最后，它会点击图片，验证 Markdown 插入功能。

![](/book/integration/02f7b4476d27.png)

### 第6步：审查测试报告

测试结束后，Claude Code 会输出一份详细的报告，告诉你每一个步骤是否成功。

我们可以根据这份报告，规划我们下一步的动作。

![](/book/integration/84527943d1b7.png)

## 给读者的建议

最后，关于使用 MCP ，我有几条建议想送给你：

**告别“搬运工”思维：**当你发现自己频繁在内部流程和外部文档/工具之间来回操作时，就是寻找对应 MCP Server 的信号。无论是查阅文档（如 Context7）、读取设计参数（如 Figma），还是端到端测试（如 Playwright）。把**连接**的工作交给协议，把**思考**的时间留给自己。

**万物皆可连接：**Context7 和 Playwright 只是 MCP 生态的冰山一角。既然能连文档，自然也能连本地文件、连 GitHub 仓库、连数据库，甚至是你公司内部的私有系统。试着让 MCP 去触碰你工作流中那些原本封闭的数据孤岛。

**尝试“手搓”一个：**不要觉得搭建 MCP 很高深，其实它就是一个轻量级的 API 服务。如果你手头有特定的业务数据（比如内部的运维脚本、私有的知识库）想让 AI 操控，不妨试着自己写一个简单的 MCP Server。

## 用 Skills 丰富你的技能包

本篇将带你：

理解 Agent Skills 如何像“科学忍具”一样赋予你“即插即用”的能力。

学会从官方市场下载 Skill，或利用 `skill-creator` 徒手打造 Skill。

实战演练：用 Skill 做一个防误删保护 Hook ，以及手搓一个 Git Worktree 工作流 Skill。

## 1. 《博人传》中的“科学忍具”

先来看一段概念演示：

**[该类型的内容暂不支持下载]**

想象一下，你是木叶村的一名普通下忍，会的忍术寥寥无几，查克拉量也少得可怜。

突然有一天，高层甩给了你一个 S 级任务：**统领防线，全歼来敌。**

换做平时，这绝对是送命题。但所幸，你生活在《博人传》的年代，这个年代，开发出了一种名为 **“科学忍具”** 的装备。

**不需要你苦练忍术，只需要把封印了忍术的小型卷轴插上去，轻轻一按开关，就能释放 S 级忍术！**

![](/book/integration/a3475aeeeedd.png)

## 2. Claude Code 中 的 Skills

而在 Claude Code 的世界里，也有这样一套“科学忍具”，它的名字叫** Agent Skills**。

**不需要 Claude Code 预先“学会”某个领域的深奥知识，只要给它插上对应的 Skill，它就能立刻变身该领域的专家。**

科学忍具的精髓是 **“可插拔的技能包”**。而 Claude Code 中 的 Skills，就相当于是“数字化”的科学忍具。只不过它不再是物理卷轴，而是一个个结构清晰的文件夹：

![](/book/integration/8197b85d7ad5.png)

```markdown
📂 my-skill/
├── 📜 SKILL.md      # 说明书：告诉 Claude 这是个什么技能、怎么用？
├── 🛠️ scripts/      # 脚本库：Python/Bash 脚本，技能的具体执行
└── 📦 resources/    # 资源库：模板、参考文档、预设规则
```

Claude Code 会根据对话理解，自动识别需要加载和使用哪个技能包。

**核心机制对比**

**点击图片可查看完整电子表格**

## 3. 如何安装 Skills？

**方式A：官方插件市场**

Anthropic 官方维护了一个“军火库”：。 这里面的 skill 琳琅满目，从搞艺术创作、写代码测试，到企业级工作流，应有尽有。

### 第1步：注册市场：

在 Claude Code 的对话框里输入：

```text
/plugin marketplace add anthropics/skills
```

或者在终端窗口输入：

```bash
cd ~/.claude/plugins/marketplaces/
git clone https://github.com/anthropics/skills.git anthropics-skills
claude plugin marketplace add anthropics/skills
```

![](/book/integration/d8e936e78191.png)

### 第2步：挑选 Skills：

在 Claude Code 运行 `plugin` 命令。

选择 `document-skills` 或 `example-skills`

![](/book/integration/b06e993dee86.png)

选择安装范围，这里我们选择项目级的 `project scope`。

![](/book/integration/7f41272f3e8c.png)

安装完成后，你只需要在对话框里喊一句：“用 PDF Skill 帮我提取这个表单”，Claude Code 就会自动调用对应的 Skills 开始工作。

**方式 B：手动安装**

如果以上的安装步骤失败，还有一个简单粗暴的方法： 将整个库下载为 `.zip` 文件后解压，复制所有或某几个 skill 文件夹到 `~/.claude/skills` 目录下即可。

**这种方法也适用于从网上下载了别人做好的 Skill 包的情况。**

## 4. 实战演练1：使用官方Skills做一个防误删保护Hook

在之前的章节中，我们介绍了 **Hook（钩子）**，提到了可以用它来检查和拦截 Claude Code 的敏感操作。

但要实现这一类型的 Hook， 通常需要自己写脚本，比较繁琐。 现在有了 Agent Skills，我们只需要动动嘴就好了。

**任务目标：** 防止 Claude Code 误操作，删除了项目之外的重要文件（`rm -rf` PTSD 患者福音）。

### 第 1 步：安装 Skills

找到官方库里的 `hook-development` 文件夹，把它复制到你的 `~/.claude/skills` 目录。

### 第2步：下达指令

直接告诉 Claude Code 你的需求：

```markdown
请使用 hook-development 添加一个Hook，存储在.claude/settings.json，在监听 Claude Code 执行 Bash 命令时触发。该 Hook 需要：
1.通过标准输入（stdin）接收包含事件数据的 JSON 请求
2.检测要执行的 Bash 命令是否为 rm -rf 及其相关的变体
3.检测要操作的是否是当前工程目录外的文件，如是，立即拦截，并通过标准输出（stdout）返回一个 JSON 响应
4.JSON 响应需包含：拒绝执行的标记位、具体原因（危险操作）、以及对用户的警告提示
```

可以看到，Claude Code 准确地使用了 Skill，按要求创建了 Hook，还会自行编写脚本来验证功能。

![](/book/integration/12cf6b1aaf61.png)

![](/book/integration/4d3ffbdb775c.png)

![](/book/integration/ea8c9a7f7e54.png)

![](/book/integration/71ee6fff2a57.png)

### 第3步：手动验证

我们来试探一下这套防护系统是否生效。新开一个对话，故意让它删除用户目录下的某个文件。

可以看到，我们这个操作被当场拦截，并输出了一段警告提示。

![](/book/integration/7608a4471361.png)

看，通过 `hook-development`，我们极大地简化了开发复杂 Hook 的步骤。

## 5. 实战演练2:自己动手做一个Skill

之前我们尝试了 **Git Worktree + 多窗口** 来做并行开发，但实际操作起来，还是有点繁琐的。 那能不能做成一个 Skill，让 Claude Code 自己去管理这些分身呢？

我们使用官方 Skills 提供的 `skill-creator`，来辅助我们创建这样一个 Skill。

### 第 1 步：召唤辅助

输入以下指令：

```markdown
请使用 skill-creator 协助我创建一个用 git worktree 搭配多窗口 claude code 来并行开发的工作流skill。
```

它会像一名产品经理一样，先跟你确认需求细节，然后规划 Skills 内容结构。

![](/book/integration/84445fe76844.png)

![](/book/integration/8fc07bbdf768.png)

**第 2 步：Skill 生成**

确认无误后，它开始编写对应的自动化脚本、参考文档和模板文件。

![](/book/integration/a25877ef3611.png)

创建完成后，它会向我们展示这个 Skill 的用法。

![](/book/integration/5f9298183916.png)

### 第3步：一键施法

见证奇迹的时刻到了。我们来试验一下这个新创建出来的 Skill，要求它同时开发两个功能：

请使用 git-worktree-claude skill 同时开发以下两个功能: 

工具栏添加一个按钮，点击打开一个窗口，允许自定义图片风格提示词，保存后会将该提示词作为 Gemini 图像生成 API 的 Prompt 的前缀。

悬浮在圆点按钮时延伸出来的功能弹框，不要自动关闭，提供一个关闭按钮，点击才关闭，否则出现后就会一直持续显示。

不同于之前我们需要多开终端窗口、手动输入命令，这个 Skill 是**通过调度子代理（SubAgents）来实现的**。

它自动创建了两个 Worktree 目录

通过“Task”工具启动了两个后台子代理

分别派发任务给这两个子代理。

自己作为“包工头”，在主代理监控进度。

![](/book/integration/1f05804b90ab.png)

![](/book/integration/49713128b3cd.png)

最后，两个子任务全部完成，自动合并代码，清理 Worktree。 整个过程，行云流水。

![](/book/integration/661a46f1bb4f.png)

打开浏览器一看，两个功能都完美实现了。

![](/book/integration/0436a8e193f9.png)

![](/book/integration/56a949d97d94.png)

![](/book/integration/97057fb02f5c.png)

![](/book/integration/6ca11b8475e0.png)

## 给读者的建议

最后，关于使用 Skills，我有几条建议想送给你：

**官方市场是宝库：**`anthropics/skills` 仓库里不仅有代码，更有 Anthropic 工程师对于“如何设计好工具”的思考。多去翻翻那些官方 Skill 的 `SKILL.md`，你会学到很多关于 Prompt Engineering 和工具设计的思路。

**不要重复造轮子：**在自己动手创建一个 Skill 之前，先去官方仓库或第三方仓库搜一下。大概率你会发现，已经有人把轮子造好了，而且比你造得圆。

**Skill 的本质是“SOP”：**如果你发现团队里有一些固定的、可复用的流程，别光只在提示词强调。用 `skill-creator` 把这个流程封装成一个 Skill。**把规范变成工具，比把规范写在文档里有效一万倍。**
