本篇将带你：

• 用最直观的对比，彻底看懂MCP与传统“函数调用”的本质区别。

• 利用 Context7 MCP，让 Claude Code 实时读取最新的技术文档。

• 利用 Playwright MCP，让 Claude Code 用自动化测试替代手动点点点。

## 1. 过去式：函数调用的局限性

在MCP（ModelContextProtocol，模型上下文协议）诞生之前，AI想要使用外部工具，就只能依赖各家模型提供的函数调用（FunctionCalling）功能。

简单来说，函数调用就像是“给AI临时塞了一本工具说明书”。你需要把工具的定义写在提示词里，AI看一眼，然后决定要不要用、怎么用。

![image](/book/integration/ce3d33833faf.jpg)


这种方式虽然也能用，但有几个很明显的痛点：

![image](/book/integration/3a0d7c9d5a2d.jpg)


接口不统一：每个工具都有自己独特的API定义。每接入一个新工具，你都要写一套专门的“胶水代码”。这就像家里的每个电器都需要配一个特定形状的充电器，乱成一团。

### 函数调用痛点：生态割裂

接口不通用，工具难复用，重复造轮子。

![image](/book/integration/035f6b2ef58d.jpg)


• 生态割裂：你辛苦为某个工具写的接口定义，换个模型可能就用不了；别人写好的优质工具，你也没法直接拿来复用。大家都在重复造轮子，生态之间竖起了高墙。

### 函数调用痛点：上下文爆炸

工具状态、参数全塞Prompt，Token消耗大，撑爆窗口，Al变笨。

![image](/book/integration/e89e72adf5c9.jpg)


• 上下文爆炸：这是最致命的一点。你必须把所有工具的状态、参数定义都塞进Prompt里。工具一多，不仅烧钱（Token消耗大），还极其容易撑爆上下文窗口，导致AI变笨。

## 2. 现在式：MCP到底解决了什么？

### MCP核心奥义：标准化

![image](/book/integration/ddc630d609de.jpg)



函数调用：乱七八糟专用充电器


![image](/book/integration/7c51a75d8984.jpg)


![image](/book/integration/32a02bb81199.jpg)



MCP:AI界USB-C接口


### 即插即用

![image](/book/integration/1d6acd06edaf.jpg)



本地数据库


符合标准，插上能用。

### 一次开发，到处运行

![image](/book/integration/8c6650ead176.jpg)



无需为每个模型重写代码。


### 上下文分离

![image](/book/integration/10a1395c0173.jpg)



工具状态


![image](/book/integration/41dfb89eefc9.jpg)



Prompt空间


状态独立，不占宝贵空间。

MCP的核心奥义就是三个字：标准化。

它规范了应用程序向大语言模型提供外部上下文的方式。如果说函数调用是“乱七八糟的专用充电器”，那么MCP就是AI界的USB-C接口。

• 即插即用：不管你是 Figma、GitHub 还是本地数据库，只要符合 MCP 标准，插上就能用。

. 一次开发，到处运行：开发者不需要再为每个模型重写连接代码。

• 上下文分离：工具的状态由独立的连接管理，不再占用宝贵的 Prompt 空间。

### 一张表看懂区别

<table><tr><td>对比维度</td><td>函数调用 (Function Calling)</td><td>MCP (模型上下文协议)</td></tr><tr><td>标准</td><td>各家自定义，互不兼容</td><td>统一的行业标准，跨平台互通</td></tr><tr><td>连接</td><td>临时注入到单次 Prompt 中</td><td>建立独立、持久的 Client-Server 连接</td></tr><tr><td>比喻</td><td>专用的、不可通用的充电 器</td><td>通用的 USB-C 接口</td></tr></table>

## 3. 核心原理：MCP是如何工作的？

MCP采用了经典的客戶端-服务器(Client-Server)架构。为了方便理解，我们可以把它想象成一家现代化公司的运作模式：

### MCP核心架构：客户端-服务器

模块化协作，灵活扩展

![image](/book/integration/d2fc37f4a5d2.jpg)


1. MCP 主机 (Host) = "老板" (如 Claude Code) ：它是用户交互的入口，负责统筹全局，发号施令。

2. MCP 服务器 (Server) = "外部专家"（如 Figma/GitHub）：它们是独立的进程，手里握着核心数据和专业工具，随时待命。

3. MCP 客户端 (Client) = "联络专员" ：老板 (Host) 会派出数名专员 (Client) 与数名专家 (Server) 建立一对一的连接，负责精准传话和提取数据。

这种设计的最大好处是模块化。你想增加新能力？只需要“招聘”一个新的专家（接入新的MCPServer）即可，完全不需要改动老板（ClaudeCode）的底层逻辑。

## 4. 实战1：用Context7MCP访问最新文档以接入功能

接下来，我们通过一个真实的应用场景，来体验 MCP 获取“外部数据源”的能力。

### 4.1LLM的“知识截止日期”

![image](/book/integration/ea4623090340.jpg)


众所周知，每一个发布的大语言模型，都有一个 “知识截止日期” 

模型在训练结束的那一刻，它的记忆就冻结了。比如，一个模型的知识截止在2024年6月。那么，6月之后发布的新工具、新版本库、新API变更……它一概不知。

问题是，它也不会告诉你“我不知道”，而是会一本正经地胡说八道⸺这就是所谓的“幻觉”问题。

### 4.2传统解法的笨拙

为了解决这个问题，我们通常会把最新的官方文档复制下来，贴给模型，让它“照着写”

确实这样输出的代码，可能会靠谱很多。但问题也来了：

![image](/book/integration/73850938cf36.jpg)


![image](/book/integration/3580fad1f454.jpg)


• 文档太长：动不动几十页，来回复制粘贴烦不烦？

• 信息分散：不同功能分散在不同页面，跳来跳去浪费时间。

• 容易出错：偷懒全贴进去？模型可能找不到重点；贴少了？代码又跑不通。

### 4.3 Context7 MCP：自动化的知识补给站

这种情况下，Context7MCP就是你的救星。

![image](/book/integration/05f052b87498.jpg)


它是一个能自动把“最新文档”喂给AI的工具。它能自动把你所需要的库、框架的最新文档、官方示例代码、API说明，整合进你的提示词里。

它不是简单的爬虫，而是"结构化提取 + 按需召回"。最终，它返回给模型的，是经过清洗的、模型最容易理解的格式。

### 第 1 步：获取 API Key

首先，登录 Context7 官网，注册并获取你的 API Key。

**Up-to-date Docs**

**for LLMs and Al code editors**

Chat with Docs 

**API Keys**

Create API Key... 

No API keys yet. Click here to generate your first API key

**Create New API Key**

API Key Name (optional) 

Cancel 

Create API Key 

**API Key Created Successfully**

O Save this key now. You won't see it again. 

Key Name 

Context7 API Key 

API Key 

ctx7sk-l 

;8074616 

![image](/book/integration/fe7b241acee4.jpg)


Done 

### 第 2 步：安装并启动 Context7 MCP 服务

Context7 贴心地提供了针对 Claude Code 的一键安装 MCP 方式。

**Connect**

Check the docs for installation 

MCP URL : mcp.context7.com/mcp 

API URL: context7.com/api/v2 @ 

![image](/book/integration/95b1d417d253.jpg)


Cursor 

![image](/book/integration/95af43498933.jpg)


Claude Code 

![image](/book/integration/35bea6610977.jpg)


VS Code 

![image](/book/integration/2446cd024e81.jpg)


W Windsurf 

![image](/book/integration/ebfc045f563d.jpg)


Gemini CLI 

More 

Remote 

Local 

claude mcp add --transport http context7 https://mcp.context7.com/mcp \ 

![image](/book/integration/8f0af0ea7047.jpg)


复制下面的命令，把 YOUR_API_KEY 替换成你刚才获取的那串字符，随后在终端执行。

**代码块**

1 claude mcp add --transport http context7 https://mcp.context7.com/mcp \ 

2 --header "CONTEXT7 API KEY: YOUR API KEY" 

```txt
- Marka % claudi mcp add --transport http context7 https://mcp.context7.com/mcp \
--header "CONTEXT7_API_KEY: ctx7sk-0 20d058074616"
Added HTTP MCP server context7 with URL: https://mcp.context7.com/mcp to local config
Headers: {
    "CONTEXT7_API_KEY": "ctx7sk-0d058074616"
}
File modified: /Users/kvak/.claude.json [project: /Users/kvak/] /Marka 
```

### 第3步：检查连接状态

接下来我们需要确认连接状态。运行检查命令：

**代码块**

claude mcp list1 

```txt
- Marka % claude mcp list Checking MCP server health...
zai-mcp-server: npx -y @z.ai/mcp-server - √ Connected playwright: npx @playwright/mcp@latest - √ Connected context7: https://mcp.context7.com/mcp (HTTP) - √ Connected 
```

在输出列表中，如果你看到 context7 的状态显示为 connected ，恭喜你，连接成功！

**第4步：更新最新文档**

Context7会不定时地对文档进行索引。如果发现索引的文档不是最新的（比如这里显示更新于一个月前），我们可以手动触发刷新。

点击下图中的刷新按钮：

**302.Al**

https://doc.302.ai/ 

![image](/book/integration/c3ad6e165764.jpg)


Completed 

Tokens: 96,812 

Snippets: 189 

Update: 1 month ago 

![image](/book/integration/7bf973c24439.jpg)


Context 

![image](/book/integration/2ae863d3149f.jpg)


Chat 

![image](/book/integration/ad682f86740b.jpg)


Benchmark 

59.4 

![image](/book/integration/e1dc5508c052.jpg)


![image](/book/integration/643d9d8f7ec1.jpg)


![image](/book/integration/134de38ae637.jpg)


**Show doc for..**

Code 

Show Results 

![image](/book/integration/f2ffb3027971.jpg)


Raw 

![image](/book/integration/9ebeef22b199.jpg)


Copy 

![image](/book/integration/36714b7ef578.jpg)


Link 

### Example API Request with Tool Use 

**Refresh Library Documentation**

302.Al 

https://doc.302.ai/ 

Guidelines 

**When to Refresh**

Refresh when docs are updated or you notice outdated code examples. 

**What It Does**

Re-crawls the same source to capture latest documentation and code. 

Cancel 

![image](/book/integration/d8c0b5f578dd.jpg)


Refresh Library 

随后，只需等待一段时间，再次查看时，Context7就会显示最新的抓取时间。这一步至关重要，它保证了AI拿到的是最新版本的“说明书”。

302.AI 

https://doc.302.ai/ 

![image](/book/integration/6ee559cc13e3.jpg)


Completed 

Tokens: 2,399,085 

Snippets: 6,205 

Update: 6 minutes ago 

现在，我们要为“Marka”项目完成关键的一步：接入Gemini图像生成API。

同样还是使用我们之前封装好的 /api-integration 命令，不过这次我们不再手动复制粘贴，而是直接命令 Claude Code 使用 Context7 MCP 去查阅文档：

**代码块**

使用 Context7 MCP 访问 $1 关于 $2 的 API 文档，创建一个完整的 API 调用封装。包括：1) 提取认证方式、请求方法、URL、请求体结构；2) 创建一个使用该API的简洁函数/类，支持传入动态参数；3) 添加错误处理和必要的类型定义；4) 在工具栏添加调试按钮，点击弹出完整的API调试窗口，可配置API Key、修改请求参数以及查看响应内容。

**我们在Claude Code 会话中输入：**

>/api-integrationisrunning..302.ai使用gemini-2.5-flash-image进行图像生成

·我将帮你集成 302.ai 的 gemini-2.5-flash-image 图像生成 API。让我先创建任务计划，然后查找相关文档。

●现在让我使用 Context7 查找 302.ai 的 API 文档：

context7 - resolve-library-id (McP)(libraryName: "302.ai") LAvailable Libraries: Each result includes: 

·我找到了 302.AI 的文档，让我获取其 API 文档：

context7-et-brarydocs(c)(cotextCompatibleibrary:"/ebsites/doc30ai"，ode:"cde",topic:"geminiiaegeatio") L###ImageGeneration-Google-Gemini Image Generation Source: https://doc.302.ai/313890156e0 0+1143lines(ctrl+ot.aexpind) 

·基于获取的文档，我已提取出关键的API信息：

**API配置信息**

认证方式： Bearer Token (Authorization header)

基础URL:https://api.302.ai

主要端点：

- /google/v1/models/gemini-2.5-flash-image - 图像生成和编辑

-/ws/api/v3/google/gemini-2.5-flash-image/text-to-image-文本转图像

现在让我创建类型定义和API封装：

注意观察ClaudeCode的执行过程，Context7MCP自动触发了两个核心动作：

• resolve_library_id ：根据你提供的模糊关键字，迅速定位到你具体指的是哪个包

• get_library_docs ：紧接着，它直接拉取了该包的详细文档内容（不是网页搜索结果，而是真正的技术文档）

**第6步：成果验收**

没有任何人工干预，ClaudeCode完美地理解了最新文档，按要求编写了代码、接入了API，生成了一个可视化的调试窗口。

**API配置**

API Key 

```txt
·· 
```

Base URL 

```txt
https://api.302.ai 
```

**山导出配置**

**导入配置**

**生成参数**

提示词

一只可爱的猫咪在太空船上

反向提示词

**API响应**

**复制**

```json
{
"candidates": [ { "content": { "parts": [ {"在线Data": { }, { "url": "https://file.302.ai/gpt/imgs/20251210/0c531b7b300e} ], "role": "model" }, "finishReason": "STOP"
] , "createTime": "2025-12-10T08:45:42.702373Z", "modelVersion": "gemini-2.5-flash-image", "responseId": "NjM5aaXvKvS54_UPntzYoAU", "usageMetadata": { "candidatesTokenCount": 1290, "candidatesTokensDetails": [ { "modality": "IMAGE", "tokenCount": 1200
```

![image](/book/integration/25b6bf3e334a.jpg)


## 5. 实战2：用 Playwright MCP 执行自动化的端到端测试

体验完MCP获取“外部数据源”的能力后，接下来，我们通过另一个真实的应用场景，来体验MCP接入“外部工具”的能力。

我们将使用PlaywrightMCP，看它是如何帮我们把原本需要“人工点点点”的测试工作，完全自动化的。

### 5.1 AI Coding时代，还需要测试吗？

很多人可能会问：“现在的AI写代码这么强，直接生成就可用，那我还需要做测试吗？”

答案可能有点反直觉：正因为现在代码是AI写的，所以“测试”才变得前所未有的重要。

我们可以把软件开发类比成“做菜”： “厨师炒完菜上桌前，总得先尝一口咸淡。”⸺这就是测试。


软件开发流程 (Software Development)


![image](/book/integration/11a26a22c60c.jpg)



厨师做菜流程 (Cooking Process)


![image](/book/integration/ecd78c4a52c5.jpg)


现在的AI，就像一个手速极快、但咸淡有时候可能把握不好的厨师：

他只能保证菜肯定做熟了（代码能跑起来，没有语法错误）C

. 但没法保证菜合你的口味（业务逻辑是否正确，符不符合预期）C

如果你完全不测试就直接上线，就像把一盘没尝过的菜直接端给客人。万一盐放多了（逻辑Bug），客人（用戶）可是会直接掀桌子的。

### 5.2只要“最小化测试”就够了

提到“软件测试”，你可能会想到复杂的测试框架和枯燥的调试步骤。好消息是：在AICoding时代，你不需要成为一名测试专家。

我们只需要遵循“最小化测试原则”就好了：

**Al Coding时代的「最小化测试原则」**

![image](/book/integration/326023310a2e.jpg)


![image](/book/integration/b31a2f89a5f6.jpg)


1. 改了旧的，测旧的：防止“按下葫芦起了瓢”，改了 A 导致 B 坏了。

2. 写了新的，测新的：验证新加的功能确实生效了。

而这些脏活累活，全都可以交给AI。

### 5.3测试的三种层次（从轻到重）

软件测试可以笼统分为三层。我们不需要全精通，只需要知道怎么指挥AI去做就好了。

![image](/book/integration/b2033f0bdfd6.jpg)


<table><tr><td>测试类型</td><td>测什么?</td><td>通俗比喻</td></tr><tr><td>单元测试(Unit Test)</td><td>一小块功能是否正常</td><td>检查车轮看看轮子转不转，气足不足。</td></tr><tr><td>集成测试(Integration Test)</td><td>多个功能连起来顺不顺</td><td>检查传动系统方向盘转动时，轮子能否跟着转动？</td></tr><tr><td>端到端测试(E2E Test)</td><td>整个App从头到尾能跑通吗</td><td>完整试驾把汽车开上道路，完整地跑一圈</td></tr></table>

对于现阶段的我们来说，最直观易懂、同时投入产出最高的就是端到端测试⸺让AI模拟真人去操作软件，看结果对不对。

### 5.4 什么是 Playwright？

Playwright 是一款强大的自动化测试工具。

它能完全模拟真人的操作：打开浏览器、点击按钮、输入文字、截屏验证，帮你完成那些枯燥的重复点点点操作。

如果把你的网站比作一家超市：

![image](/book/integration/146adc08fa15.jpg)


**它的工作方式**

按固定路线逛超市

![image](/book/integration/784413b76feb.jpg)



按固定路线逛超市


找商品、放进购物车

![image](/book/integration/f66b96ef8712.jpg)



找商品、放进购物车


→ 去结账一→ 一切正常 一切正常

![image](/book/integration/4c64d092a3a2.jpg)



去结账


![image](/book/integration/ec92a32cb011.jpg)


发现问题！

立刻报告

商品找不到？

结不了账？

![image](/book/integration/7bcd099a1fe3.jpg)


当你每次调整了货架商品的摆放（修改了代码），你最担心什么？

• 价格标得对不对？

顾客常买的东西还容不容易找到？

Playwright就像一个可以模拟顾客的“自动巡店机器人”：

• 它会按固定路线逛超市

• 它会找商品、放进购物车、去结账

• 每次货架一调整，就重新走一遍

• 一旦发现“商品找不到了”或“结不了账”，它会立刻告诉你。

**5.5 Playwright MCP：用“人话”指挥机器人**

原生的Playwright虽然好用，但门槛不低：你需要会写复杂的脚本，还需要维护这些脚本。

PlaywrightMCP的出现，则是彻底改变了玩法。

它就像是给这个“巡店机器人”装上了一个高级中控台，好处显而易见：

**Playwright MCP:**

**给“巡店机器人”装上高级中控台**

![image](/book/integration/32a6cf99488b.jpg)


![image](/book/integration/0a79e38625c0.jpg)



告别脚本


![image](/book/integration/3d6d5551cbe5.jpg)



抗干扰强


![image](/book/integration/b1289a643ac2.jpg)



传统截图定位：易报错


![image](/book/integration/8e4cc74d028d.jpg)



自我修复


![image](/book/integration/44fc4b5536c5.jpg)


告别脚本：你不用再写 page.click('.btn') ，只需要说“帮我点击购买按钮”。

抗干扰强：它使用结构化的页面信息，比传统的截图定位更精准，不会因为你微调了按钮位置就报错。

自我修复：如果测试挂了，它能根据报错信息，尝试自动修复测试脚本。

### 第 1 步：安装并启动 Playwright MCP 服务

同样，Playwright 也提供了针对 Claude Code 的一键安装 MCP 的方式。

代码块

claude mcp add playwright npx @playwright/mcp@latest1 

### 第2步：检查连接状态

安装完成后，确认 Playwright MCP 的连接状态。运行检查命令：

**代码块**

claude mcp list1 

确认 Playwright MCP 的状态显示为 connected 

### 第3步：实现剩余功能

在测试之前，我们先得有东西可测。

前面我们已经接入了Gemini的图像生成API，现在我们要把它整合进业务：点击生成图像，并在悬浮窗中展示。

这其中涉及的复杂前端交互，我们依然直接用自然语言描述，并使用“提示词优化器” SubAgent 优化：

**代码块**

/prompt-optimize 1. 将圆点按钮的牵引线延伸出来的功能弹框，重构为一个极简且高度现代化的悬浮指引样式，内部布局遵循分段式控件逻辑，从上到下分别为深灰色的无衬线标题（显示“句子识别与配图”功能生成的“配图理由”）、微弱的分割线、浅灰色的辅助说明文字（显示“句子识别与配图”功能生成的“生图提示词”）、暗色的水平分段式图标控件（目前暂只显示“生成图片”按钮）。2. 点击“生成图片”按钮后，调用已接入的302.ai提供的Gemini 图像生成 API，生成1张候选图片，生成完成后在图标控件下方插入原有的水平布局的候选图片列表（原有的Unsplash图片生成功能需移除），已生成的候选图片会一直保留且与对应高亮句子绑定，再次点击“生成图片”按钮追加到现有的候选图片列表后面。

ClaudeCode迅速完成了相应的界面重构与逻辑绑定：

![image](/book/integration/eb112396c8b0.jpg)


![image](/book/integration/dbec0778d121.jpg)


```markdown
**欢迎使用Marka**
```

这是一个可自动配图的**Markdown 编辑器**。它旨在提供一个极简、无干扰的写作环境。

！[AI生成图片－描述了编辑器的功能，可以配一张编辑器界面的图。]

(https://file.302.ai/gpt/imgs/20251214/ddd39646207f439eb497740 ae793bb4d.png) 

```markdown
## 主要功能
```

1．**多主题切换**：在左侧栏点击‘Github`、`Night或`Vue’切换风格。

2．**实时预览**：点击右上角的‘Eye’图标查看纯预览，或者‘Split’查看分屏。

3．**专注模式**：点击底部状态栏开启 Focus 模式 (模拟)。

4．**快捷键**：支持常用的 Markdown 语法快捷插入。

```txt
语法演示
```

```txt
代码块
```

```txt
``javascript 
```

```javascript
function hello() { 
```

```javascript
console log("Hello World!"); 
```

**欢迎使用Marka**

这是一个可自动配图的Markdown编辑器。它旨在提供一个极简、无干扰的写作环境。

![image](/book/integration/2b061f37b0a8.jpg)


### 第4步：配置权限，解放双手

为了让自动化测试流畅进行，而不是每一步都弹窗问你“是否允许操作浏览器做XX”，我们需要给MCP的权限稍微松下绑。

打开项目中的 settings.local.json 文件，在 permissions-allow 列表底部添加一行：

```txt
"mp__playwright" 
```

![image](/book/integration/06d8a1e2bf95.jpg)


![image](/book/integration/2295b26514f2.jpg)


这个操作意味着，现在我们授权了PlaywrightMCP可以自主执行浏览器的任意操作。

### 第 5 步：调用 Playwright MCP

现在，功能开发完成，MCP就位，权限已开。是时候让Playwright帮我们完整跑一遍流程了。

在 Claude Code 会话输入以下指令：

请调用 playwright mcp 帮我跑通这个端到端测试用例：

2 1. 高亮句子：先进入“句子识别与配图”界面，填入API Key（sk-xxx），点击“开始识别”，动态生成可配图的高亮句子，等待识别完成后，关闭“句子识别与配图”界面。

3 2. 生成图片：随便移动到一个高亮句子旁边的圆点交互按钮之上，在显示的弹窗上点击“生成图片”。等待图片生成完成。一旦图片生成完毕，立刻点击这张图片，让这张图以 Markdown 格式自动插入到当前文档的编辑器里，验证预览界面是否正确显示图片。

**接下来，请把双手离开键盘，看着屏幕即可：**

1. 首先，PlaywrightMCP会接收指令，自动弹出一个新的浏览器窗口，并打开我们的“Marka”应用。

![image](/book/integration/b104fa6e0226.jpg)


2. 随后，它会自己填入APIKey，然后点击“开始识别”，并耐心地等待识别完成。

![image](/book/integration/0b7598161b72.jpg)


**3. 识别完成后，它会自动关闭当前的弹窗。**

![image](/book/integration/9d15de0d3cf9.jpg)


4. 然后精准地模拟鼠标悬停在圆点按钮上，点击“生成图片”，并定时检查图片生成是否完毕。

![image](/book/integration/64fa6d958427.jpg)


![image](/book/integration/30d362624e47.jpg)


![image](/book/integration/59c082006c74.jpg)


**5. 最后，它会点击图片，验证Markdown插入功能。**

![image](/book/integration/622874464e87.jpg)


### 第6步：审查测试报告

测试结束后，ClaudeCode会输出一份详细的报告，告诉你每一个步骤是否成功。

我们可以根据这份报告，规划我们下一步的动作。

![image](/book/integration/f5b32b5a3057.jpg)


## 给读者的建议

最后，关于使用MCP，我有几条建议想送给你：

• 告别“搬运工”思维：当你发现自己频繁在内部流程和外部文档/工具之间来回操作时，就是寻找对应MCPServer的信号。无论是查阅文档（如Context7）、读取设计参数（如Figma），还是端到端测试（如Playwright）。把连接的工作交给协议，把思考的时间留给自己。

• 万物皆可连接：Context7和Playwright只是MCP生态的冰山一角。既然能连文档，自然也能连本地文件、连GitHub仓库、连数据库，甚至是你公司内部的私有系统。试着让MCP去触碰你工作流中那些原本封闭的数据孤岛。

• 尝试“手搓”一个：不要觉得搭建MCP很高深，其实它就是一个轻量级的API服务。如果你手头有特定的业务数据（比如内部的运维脚本、私有的知识库）想让AI操控，不妨试着自己写一个简单的 MCP Server。

## 用 Skills 丰富你的技能包

本篇将带你：

. 理解AgentSkills如何像“科学忍具”一样赋予你“即插即用”的能力。

• 学会从官方市场下载 Skill，或利用 skill-creator 徒手打造 Skill。

. 实战演练：用Skill做一个防误删保护Hook，以及手搓一个GitWorktree工作流Skill。

## 1. 《博人传》中的“科学忍具”

先来看一段概念演示：

https://www.bilibili.com/video/BV1ny4y1n7AA?t=0.9 

想象一下，你是木叶村的一名普通下忍，会的忍术寥寥无几，查克拉量也少得可怜。

突然有一天，高层甩给了你一个 S 级任务：统领防线，全歼来敌。

换做平时，这绝对是送命题。但所幸，你生活在《博人传》的年代，这个年代，开发出了一种名为“科学忍具”的装备。

不需要你苦练忍术，只需要把封印了忍术的小型卷轴插上去，轻轻一按开关，就能释放S级忍术！

![image](/book/integration/2c16c1007836.jpg)


## 2. Claude Code 中 的 Skills

而在 Claude Code 的世界里，也有这样一套“科学忍具”，它的名字叫 Agent Skills。

不需要ClaudeCode预先“学会”某个领域的深奥知识，只要给它插上对应的Skill，它就能立刻变身该领域的专家。

科学忍具的精髓是“可插拔的技能包”。而ClaudeCode中的Skills，就相当于是“数字化”的科学忍具。只不过它不再是物理卷轴，而是一个个结构清晰的文件夹：

**SKILL.md**

![image](/book/integration/8d2527ca9fd1.jpg)


说明书：定义功能、输入输出与触发条件。

**resources/**

![image](/book/integration/3f9ae0e9067e.jpg)


材料库：模板、规则等辅助材料。

![image](/book/integration/5a81fecc4888.jpg)


![image](/book/integration/62a5f21a03f8.jpg)


![image](/book/integration/4936e5057193.jpg)


**Claude Code Agent Skills**

数字化科学忍具

![image](/book/integration/f48e9622f6ce.jpg)


![image](/book/integration/4be49a787c9d.jpg)


**scripts/**

![image](/book/integration/75146628cf6a.jpg)


脚本：执行逻辑，完成任务的核心代码。

**调用方式**

![image](/book/integration/22c460084ba8.jpg)


自动识别：智能分析对话，按需加载技能。

**代码块**

1 my-skill/ 

2 ─ ?? SKILL.md # 说明书：告诉 Claude 这是个什么技能、怎么用？

3 ?? scripts/ # 脚本库：Python/Bash 脚本，技能的具体执行

4 ?? resources/ # 资源库：模板、参考文档、预设规则

ClaudeCode会根据对话理解，自动识别需要加载和使用哪个技能包。

**核心机制对比**

<table><tr><td>维度</td><td>科学忍具</td><td>Agent Skills</td><td>类比说明</td></tr><tr><td>能力载体</td><td>机器+卷轴</td><td>文件夹(说明+脚本+资源)</td><td>都是把能力封装，便于非专业人员使用</td></tr><tr><td>激活方式</td><td>人按机器、插卷轴</td><td>Claude Code 根据对话判断是否调用</td><td>主体不同：前者人触发，后者模型触发</td></tr><tr><td>即插即用</td><td>会操作机器即可施放忍术</td><td>搭载 Skill, Claude Code 即可使用技能</td><td>核心能力相似：不依赖本体熟练度</td></tr><tr><td>升级与维护</td><td>卷轴可更换/电容可重充</td><td>scripts/resources 可更新</td><td>都可以迭代改进</td></tr></table>

## 3. 如何安装 Skills？

**方式A：官方插件市场**

Anthropic 官方维护了一个“军火库”：anthropics/skills。 这里面的 skill 琳琅满目，从搞艺术创作、写代码测试，到企业级工作流，应有尽有。

### 第1步：注册市场：

在 Claude Code 的对话框里输入：

```bash
/plugin marketplace add anthropics/skills
```

或者在终端窗口输入：

```bash
cd ~/.claude/plugins/marketplaces/
git clone https://github.com/anthropics/skills.git anthropics-skills
claude plugin marketplace add anthropics/skills
```

- Marka % cd ~/.claude/plugins/marketplaces/
  - git clone https://github.com/anthropics/skills.git anthropics-skills
  - claude plugin marketplace add anthropics/skills
  - Cloning into 'anthropics-skills'...
  - remote: Enumerating objects: 376, done.
  - remote: Counting objects: 100% (250/250), done.
  - remote: Compressing objects: 100% (174/174), done.
  - remote: Total 376 (delta 103), reused 76 (delta 76), pack-reused 126 (from 3)
  - Receiving objects: 100% (376/376), 3.05 MiB | 12.00 KiB/s, done.
  - Resolving deltas: 100% (106/106), done.
  - Adding marketplace...
  - SSH not configured, cloning via HTTPS: https://github.com/anthropics/skills.git
  - Updating existing marketplace cache...
  - Successfully added marketplace: anthropic-agent-skills 

### 第2步：挑选 Skills：

1. 在 Claude Code 运行 plugin 命令。

2. 选择 document-skills 或 example-skills

Discover Installed Marketplaces Errors (tab to cycle)   
Discover plugins   
document-skills · anthropic-agent-skills Collection of document processing suite including Excel, ...

```txt
> o example-skills · anthropic-agent-skills Collection of example skills demonstrating various capabi... 
```

```txt
Space: (de)select · Enter: details · Esc: back 
```

3. 选择安装范围，这里我们选择项目级的 project scope

```txt
Discover Installed Marketplaces Errors (tab to cycle) 
```

```txt
Plugin details 
```

```txt
example-skills 
```

```txt
from anthropic-agent-skills 
```

```txt
Collection of example skills demonstrating various capabilities including skill creation, MCP building, visual design, algorithmic art, internal communications, web testing, artifact building, Slack GIFs, and theme styling 
```

⚠ Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change. See each plugin's homepage for more information.

```txt
Install for you (user scope)  
> Install for all collaborators on this repository (project scope)  
Install for you, in this repo only (local scope)  
Back to plugin list 
```

安装完成后，你只需要在对话框里喊一句：“用PDFSkill帮我提取这个表单”，ClaudeCode就会自动调用对应的Skills开始工作。

**方式B：手动安装**

如果以上的安装步骤失败，还有一个简单粗暴的方法：将整个库下载为 .zip 文件后解压，复制所有或某几个 skill 文件夹到 ~/.claude/skills 目录下即可。

这种方法也适用于从网上下载了别人做好的Skill包的情况。

## 4. 实战演练1：使用官方Skills做一个防误删保护Hook

在之前的章节中，我们介绍了Hook（钩子），提到了可以用它来检查和拦截ClaudeCode的敏感操作。

但要实现这一类型的 Hook， 通常需要自己写脚本，比较繁琐。 现在有了 Agent Skills，我们只需要动动嘴就好了。

任务目标：防止ClaudeCode误操作，删除了项目之外的重要文件（ rm -rf PTSD患者福音）。

### 第 1 步：安装 Skills

找到官方库里的 hook-development 文件夹，把它复制到你的 ~/.claude/skills 目录。

### 第2步：下达指令

直接告诉 Claude Code 你的需求：

**代码块**

请使用 hook-development 添加一个Hook，存储在.claude/settings.json，在监听 ClaudeCode 执行 Bash 命令时触发。该 Hook 需要：

1.通过标准输入（stdin）接收包含事件数据的 JSON 请求2

2.检测要执行的 Bash 命令是否为 rm -rf 及其相关的变体3

4 3.检测要操作的是否是当前工程目录外的文件，如是，立即拦截，并通过标准输出（stdout）返回一个 JSON 响应

4.JSON 响应需包含：拒绝执行的标记位、具体原因（危险操作）、以及对用戶的警告提示5

可以看到，ClaudeCode准确地使用了Skill，按要求创建了Hook，还会自行编写脚本来验证功能。

>使用 hook-development创建一个Hook，在监听 Claude Code 执行 Bash 命令时触发。该Hook需要：

1.读取标准输入（stdin）获取命令数据

2.检测命令是否为rm-rf以及相关的变体

3.如果匹配，立即拦截，并通过标准输出（stdout）返回一个 JSON响应

4.JSON响应需包含：拒绝执行的说明、具体原因（危险操作）、以及对用户的警告提示

·我将为您创建一个Hook来拦截危险的rm-rf命令。让我使用hook-development技能来获取详细指导。

. Skill(hook-development) 

·现在我将为您创建一个拦截rm -rf命令的Hook。基于指导文档，我将创建一个PreToolUse Hook来监听Bash命令并拦截危险操作。

Bash(mkdir -p hooks/scripts) L (No content) 

. Write(hooks/scripts/block-dangerous-rm.sh)Wrote 85 lines to hooks/scripts/block-dangerous-rm.sh#!/bin/bashset -euo pipefail#读取标准输入获取命令数据

·现在让我创建一个测试脚本来验证Hook的功能：

```txt
Write(hooks/test-dangerous-rm.json)  
L Wrote 11 lines to hooks/test-dangerous-rm.json{ "session_id": "test-session", "transcript_path": "/tmp/test-transcript.txt", "cwd": "/Users/kvak/Labs/antigravity_demos/Marka", "permission_mode": "ask", "hook_event_name": "PreToolUse", "tool_name": "Bash", "tool_input": { "command": "rm -rf /" } +1 line (ctrl+o to expand) 
```

```txt
- Bash(cat hooks/test-dangerous-rm.json | CLAUDE_PLUGIN_ROOT=/Users/kvak/Labs/antigravity-demos/Marka bash  
  hooks/scripts/block-dangerous-rm.sh)  
    {  
        "continue": false,  
        "systemMessage": "危险操作拦截：检测到潜在的破坏性删除命令",  
        ... +9 lines (ctrl+o to expand)
```

·现在测试一些安全的命令，确保Hook不会误拦截：

```txt
Write(hooks/test-safe-command.json) L Wrote 11 lines to hooks/test-safe-command.json { "session_id": "test-session", "transcript_path": "/tmp/test-transcript.txt", "cwd": "/Users/kvak/Labs/antigravity_demo/Marka", "permission_mode": "ask", "hook_event_name": "PreToolUse", "tool_name": "Bash", "tool_input": { "command": "ls -la" } +1 line (ctrl+o to expand) 
```

```txt
- Bash(cat hooks/test-safe-command.json | CLAUDE_PLUGIN_ROOT=/Users/kvak/Labs/antigravity-demos/Marka bash
    hooks/scripts/block-dangerous-rm.sh)
    \{ "continue": true 
```

2计我测试更多的负险会会变体：

**· Hook创建完成**

已成功创建一个危险命令拦截Hook，具有以下特性：

**核心功能**

- PreToolUse Hook:在执行Bash命令前进行拦截

－精确匹配：使用正则表达式匹配真正的危险命令

-JSON响应：返回标准格式的拦截响应，包含拒绝原因和建议

**拦截的危险命令**

- rm -rf /、rm -rf .、rm -rf */ 等破坏性操作

-系统关键目录删除：/etc、/usr、/var、/home 等

－ 特权删除： sudo rm -rf /

－用户主目录删除：$HOME、~

**文件结构**

hooks/ hooks.json # Hook 配置文件 scripts/ block-dangerous-rm.sh # 拦截脚本 README.md # 使用说明

**使用方法**

1．重启Claude Code以加载Hook

2.尝试执行危险命令时会自动拦截

3.安全命令正常执行，不影响工作流

Hook已通过测试验证，能够准确拦截危险命令同时允许正常的文件删除操作。

### 第3步：手动验证

我们来试探一下这套防护系统是否生效。新开一个对话，故意让它删除用戶目录下的某个文件。

可以看到，我们这个操作被当场拦截，并输出了一段警告提示。

**>删除/Users/kvak/.claude/test**

Bash(rm -rf /Users/kvak/.claude/test) 

LPreToolUse:Bash says:！危险操作已拦截：检测到尝试删除项目目录外的文件。

目标路径:/Users/kvak/.claude/test

为了保护您的系统安全，此操作已被阻止。如需删除项目外文件，请手动在终端中执行。

LPreToolUse:Bash hook stopped continuation:Execution stopped by hook 

(No content) 

看，通过 hook-development ，我们极大地简化了开发复杂Hook的步骤。

## 5. 实战演练2:自己动手做一个Skill

之前我们尝试了 Git Worktree + 多窗口来做并行开发，但实际操作起来，还是有点繁琐的。那能不能做成一个 Skill，让 Claude Code 自己去管理这些分身呢？

我们使用官方 Skills 提供的 skill-creator ，来辅助我们创建这样一个 Skill。

### 第 1 步：召唤辅助

输入以下指令：

**代码块**

请使用 skill-creator 协助我创建一个用 git worktree 搭配多窗口 claude code 来并行开发的工作流skill。

它会像一名产品经理一样，先跟你确认需求细节，然后规划Skills内容结构。

>请使用 skill-creator 协助我创建一个用 git worktree 搭配多窗口 claude code来并行开发的工作流skill。

. Skill(skill-creator) 

·我需要了解你的具体需求来创建这个技能。

关于 Git Worktree + Claude Code 多窗口并行开发工作流

**请描述你的使用场景：**

1．你希望这个工作流解决什么问题？

－同时在不同分支上开发不同功能？

－避免频繁切换分支的上下文丢失？

-在多个 claude Code 窗口中独立工作？

2．具体的使用场景有哪些？

-一边在 main 分支修 hotfix，一边在 feature 分支开发新功能？

-同时处理多个相关的 feature 分支？

－在不同窗口中测试不同的实现方案？

3.你期望的自动化程度？

-完全自动化的worktree 创建和管理？

－提供模板化的命令集合？

－还是指导性的工作流程？

4.是否有特定的 Git工作流偏好？

-GitFlow? 

- GitHub Flow? 

-自定义流程？

5.当前最大的痛点是什么？

-手动管理 worktree 的复杂性？

－记住每个 worktree 对应的分支？

－同步更改时的冲突处理？

请提供一些具体的例子，比如：

-"我经常需要在修复buq的同时开发新功能"

-"我希望能够同时测试两个不同的实现方案"

-"我想要隔离不同的开发环境，避免互相干扰"

>1.同时在不同分支上开发不同功能、避免频繁切换分支的上下文丢失、在多个Claude Code窗口中独立工作  
2.同时处理多个相关的feature分支、在不同窗口中测试不同的实现方案  
3.完全自动化的worktree创建和管理手动管理worktree的复杂性  
4.GitFlow  
5.手动管理worktree的复杂性、同步更改时的冲突处理  
具体的例子  
-“我经常需要在修复bug的同时开发新功能”  
-“我希望能够同时测试两个不同的实现方案”  
-“我想要隔离不同的开发环境，避免互相干扰”

**·需求分析**

基于你的描述，这个技能需要支持：

**核心功能**

1．自动化 worktree 管理 -创建、列出、删除 worktree

2.分支与 worktree关联-跟踪哪个worktree 对应哪个分支

3.GitFlow集成-支持feature、release、hotfix分支类型

4.多窗口开发支持－为每个 worktree启动独立的claudeCode实例

**使用场景**

- 同时开发 feature/A 和 feature/B

- 在develop 分支修bug，同时在 feature 分支开发新功能

- 测试两种不同的实现方案 (feature/experiment-1 和 feature/experiment-2)

**·技能内容结构设计**

**Scripts（自动化脚本）**

1.worktree_manager-py - 核心 worktree 管理脚本

-创建新的worktree

-列出所有worktree 及其状态

-删除worktree

－检测和解决冲突

2.claude_launcher.py - Claude Code 窗口启动器

-在指定worktree中启动 Claude Code

-管理多个ClaudeCode实例

3.gitflow_helper.py- GitFlow 辅助脚本

-创建 feature/release/hotfix 分支并关联worktree

今并回士线时的+ree清理

**第 2 步：Skill 生成**

确认无误后，它开始编写对应的自动化脚本、参考文档和模板文件。

·让我创建核心脚本和文档：

```txt
- Write(\~/.claude/skills/git-worktree-claude/scripts/worktree-manager.py)  
    L Wrote 343 lines to  
        ...././..claude/skills/git-worktree-claude/scripts/worktree-manager.py  
        #!/usr/bin/env python3  
    ......"Git Worktree Manager - 自动化管理 git worktree 的核心脚本  
    支持创建、列出、删除 worktree，以及检测冲突  
    ......"import os  
    import sys  
    import subprocess  
    import json  
    ... +333 lines (ctrl+o to expand)
```

```txt
- Write(\~/.claude/skills/git-worktree-claude/scripts/claude launcher.py)  
    L Wrote 287 lines to  
        ..../..claude/skills/git-worktree-claude/scripts/claude launcher.py  
        #!/usr/bin/env python3  
        ....  
    Claude Code Launcher - 管理多个 Claude Code 实例的启动器  
    支持在指定 worktree 中启动独立的 Claude Code 会话  
    ....  
    import os  
    import sys  
    import json  
    import subprocess  
    ... +277 lines (ctrl+o to expand)
```

创建 git-worktree-claude 技能...（esc to interrupt · ctrl+t to show todos）

创建完成后，它会向我们展示这个Skill的用法。

**技能创建完成**

我已经成功创建了 git-worktree-claude 技能，它是一个完整的 Git Worktree 与 Claude Code 集成解决方案。

**技能内容**

**Scripts（自动化脚本）：**

```txt
- worktreemanager.py - 管理worktree的创建、列表、删除和冲突检测
- claude launcher.py - 启动和管理多个Claude Code实例
- gitflowhelper.py - GitFlow工作流集成，自动化分支和worktree管
```

**References (参考文档）:**

```txt
- worktreeworkflow.md - 详细工作流程指南和最佳实践
- troubleshooting.md - 故障排除和恢复流程
```

**Assets (资源文件）:**

```txt
- claude alias template.sh - Shell 别名和快捷命令模板
```

**主要功能**

**1．自动化 worktree 管理**

-为每个分支创建独立的工作目录

-跟踪和管理所有 worktree 状态

－检测和处理冲突

**2.claude Code 会话管理**

- 在每个 worktree 中启动独立的 Claude Code 实例

－管理活动会话列表

-支持自定义窗口标题

**3.GitFlow集成**

- 支持 feature、release、hotfix 分支

－自动创建关联的worktree

－完成时自动清理环境

**使用示例**

```txt
**开发新功能（自动创建 worktree 和启动 Claude）  **
python3 gitflowhelper.py feature user-authentication
```

**# 同时开发另一个功能**

```txt
python3 gitflowhelper.py feature payment-integration 
```

**# 查看所有活动会话**

```txt
python3 claude launcher.py list 
```

### 第3步：一键施法

见证奇迹的时刻到了。我们来试验一下这个新创建出来的Skill，要求它同时开发两个功能：

请使用 git-worktree-claude skill 同时开发以下两个功能:

1. 工具栏添加一个按钮，点击打开一个窗口，允许自定义图片风格提示词，保存后会将该提示词作为 Gemini 图像生成 API 的 Prompt 的前缀。

2. 悬浮在圆点按钮时延伸出来的功能弹框，不要自动关闭，提供一个关闭按钮，点击才关闭，否则出现后就会一直持续显示。

不同于之前我们需要多开终端窗口、手动输入命令，这个Skill是通过调度子代理（SubAgents）来实现的。

1. 它自动创建了两个Worktree目录

2. 通过“Task”工具启动了两个后台子代理

3. 分别派发任务给这两个子代理。

4. 自己作为“包工头”，在主代理监控进度。

>请使用git-worktree-claudeskill同时开发以下两个功能：

1.工具栏添加一个按钮，点击打开一个窗口，允许自定义图片风格提示词，保存后会将该提示词作为Gemini 图像生成 API 的 Prompt 的前缀。

2.悬浮在圆点按钮时延伸出来的功能弹框，不要自动关闭，提供一个关闭按钮，点击才关闭，否则出现后就会一直持续显示。

·我将使用 git-worktree-claude skill 来同时开发这两个功能。首先让我创建一个待办事项列表来跟踪任务进度。

·现在开始使用 git-worktree-claude skill:

. Skill(git-worktree-claude) 

·现在让我使用 git-worktree-claude 来创建并行开发环境。首先检查当前项目状态：

Task(在custom-image-style分支开发功能1)Backgrounded agent (t to manage : ctrl+o to expand)

Task(在popup-fix分支开发功能2)LBackgrounded agent (tto manage : ctrl+o to expand)

·两个功能正在并行开发中。让我检查一下进度：

Task Output(non-blocking） aea257a Task is still runing. 

Task Output(non-blocking） adec86d Task isstill runing. 

·两个代理都在正常工作中。让我等待它们完成任务：

Task Output aea257a Task is stilt runin.. 

Task Output adec86d TasRead output (ctrl+o to expand) 

·现在让我检查功能1的完成情况：

Task Output aea257a在custom-image-style分支开发功能1Waiting for task (esc to give additional instructions)

* 功能1:工具栏添加自定义图片风格提示词按钮和窗口. (esc to interrupt·ctrl+t to show todos)LNext：测试并整合两个功能

最后，两个子任务全部完成，自动合并代码，清理Worktree。整个过程，行云流水。

. Bash(cd /Users/kvak/Labs/antigravity_demos/worktrees/feature/popup-fix && git add -A &&git commit-m "fix(ui)：修改悬浮弹框为手动关闭模式..)L[feature/popup-fix 0279062] fix(ui):修改悬浮弹框为手动关闭模式2 files changed，25 insertions(+)，23 deletions(-)

·现在让我将这两个功能合并到主分支：

● Bash(cd /Users/kvak/Labs/antigravity_demos/Marka && git merge feature/custom-image-style --no-ff) L Merge made by the 'ort' strategy. node_modules/.vite/deps/_metadata.json 651 node_modules/.vite/deps/lucide-react.js 19543 

Bash(git merge feature/popup-fix --no-ff) Merge made by the 'ort' strategy. .../editor/components/ImageSelectionCard.tsx 26 +++++++++++++ src/features/editor/hooks/useSentenceHighlight.tsx 22 +++++ 2 files changed, 25 insertions(+), 23 deletions(-)

Bash(npm run build) > marka@0.0.0 build > vite build

·最后清理 worktree:

• Bash(git worktree remove .-/worktrees/feature/custom-image-style && git worktree remove /worktrees/feature/popup-fix) Running PreToolUsehoo... Running... 

打开浏览器一看，两个功能都完美实现了。

描述了编辑器的功能，可以配一张展×示编辑器界面的图。

A clean and modern Markdown editor 

**生成图片**

}。它旨在提供一个极简、无干执

**主要功能**

多主题切换O在左侧栏点击 Github、Night 或 Vue 切换风格。

实时预览:点击右上角的 Eye 图标查看纯预览，或者 Split 查看分屏。

专注模式O点击底部状态栏开启Focus模式 (模拟)。

快捷键：支持常用的Markdown 语法快捷插入。

**语法演示**

![image](/book/integration/1548bd262bed.jpg)


#欢迎使用 Marka

这是一个可自动配图的**Markdown 编辑器**。它旨在提供一个极简、无干扰的写作环境。

！[AI生成图片－描述了编辑器的功能，可以配一张展示编辑器界面的图。](https://file.302.ai/gpt/imgs/20251215/808da86fcd2b4203ae6b87292cdcc207.png)

##主要功能

1．**多主题切换**：在左侧栏点击‘Github`、`Night或‘Vue’切换风格。

2．**实时预览**：点击右上角的‘Eye图标查看纯预览，或者‘Split’查看分屏。

3． **专注模式**：点击底部状态栏开启 Focus 模式 (模拟)。

4．**快捷键**：支持常用的 Markdown 语法快捷插入。

##语法演示

###代码块

```snap
```
```
```
```
```
```
```
```
```
```
```
```
`` 
```

**欢迎使用Marka**

这是一个可自动配图的Markdown编辑器。它旨在提供一个极简、无干扰的写作环境。

![image](/book/integration/6c558fe308bf.jpg)


Graph

![image](/book/integration/2a7e3ab72972.jpg)


![image](/book/integration/4bf62a748a06.jpg)


Merge branch 'feature/popup-fix' into feature/auto_add_image... C? feature/auto_ad.. 

fix(ui):修改悬浮弹框为手动关闭模式（

Merge branch 'feature/custom-image-style' into feature/auto_add_images 

feat(editor):添加自定义图片风格功能（

## 给读者的建议

最后，关于使用Skills，我有几条建议想送给你：

官方市场是宝库： anthropics/skills 仓库里不仅有代码，更有 Anthropic 工程师对于“如何设计好工具”的思考。多去翻翻那些官方Skill的 SKILL.md ，你会学到很多关于PromptEngineering 和工具设计的思路。

• 不要重复造轮子：在自己动手创建一个Skill之前，先去官方仓库或第三方仓库搜一下。大概率你会发现，已经有人把轮子造好了，而且比你造得圆。

• Skill的本质是“SOP”：如果你发现团队里有一些固定的、可复用的流程，别光只在提示词强调。用 skill-creator 把这个流程封装成一个Skill。把规范变成工具，比把规范写在文档里有效一万倍。

