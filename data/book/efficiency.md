在不断打断你的“心流”，让VibeCoding变成了痛苦的

通过“并行开发”与“流程自动化”，将非创造性的工作剥离。让机器去处理那些重复、琐碎、易错的流程，你只专注于做决策。

◦ CustomCommands：化繁为简。把复杂的命令行封装成简单的 /slash 指令，让常用操作“一键直达” 。

◦ GitWorktree：多线程作战。不再受困于单一工作目录，像浏览器开多标签页一样同时处理多个功能分支，彻底告别 gitstash 的泥沼。

◦ GitHooks：自动执行动作。比如在代码提交前自动运行检查，把低级错误拦截在本地，确保每一行提交都是“干净”的。

## 用自定义斜杠命令封装常用提示词

本篇将带你：

• 学会如何把长提示词封装成只有一两个单词的命令；

• 利用 $ARGUMENTS 加参数，让命令变得灵活多变。

. 用 ! （执行脚本）和 @ （引用文件）为命令注入实时上下文。

## 1. 为什么我们需要“自定义命令”？

想象一下，你每天晨跑前都有一套固定的热身动作：压腿、拉伸、开合跳……动作繁琐，顺序还不能错。每天都得努力去回忆这一套动作，是不是很累？

有一天，你把这套动作录成一段语音指令，命名为 “ /warmup ”。从此以后，你只需要按一下播放键，身体跟着做就行了。

![image](/book/efficiency/f2f7d95c3c6e.jpg)



现在


![image](/book/efficiency/1093c6966c11.jpg)


![image](/book/efficiency/c1ad38ac2288.jpg)


![image](/book/efficiency/0ac1b01f4f0b.jpg)


自定义斜杠命令（SlashCommands）就是这个逻辑。

它能把你那些冗长、重复、容易出错的提示词，封装成一个简洁的单词。需要时，敲一下回车就能执行。

**它的核心价值在于：**

• 拒绝重复：一次编写，无限复用。告别每次手打几百字Prompt的痛苦。

![image](/book/efficiency/3519a7dea67d.jpg)


• 统一标准：确保团队里的每个人，在执行“代码审查”或“提交代码”时，都遵循完全一致的标准。

![image](/book/efficiency/4348c8c4278c.jpg)


• 自动感知：它可以在执行前，自动拉取 Git 状态、Diff 差异、文件内容。帮 Claude Code “把脉”，极大提高任务准确率。

![image](/book/efficiency/b1e6b1b61634.jpg)


• 灵活变通：支持传入参数，同一条命令可以适配修复Bug、写测试等多种场景。

![image](/book/efficiency/1983677f8586.jpg)


## 2. 基本语法与结构

### 2.1 文件放在哪？

所有的自定义命令本质上都是一个 Markdown 文件。它同样划分为了：

1. 用戶命令（存入 ~/.claude/commands/ ，全局生效）；

2. 项目命令（存入 .claude/commands/ ，仅本项目生效）。

举个例子： 如果文件名是 fix-issue.md ，你在对话框里调用的命令就是 /fix-issue 。

### 2.2 参数怎么填？

你可以在Markdown文件中预埋“坑位”，等待调用时填入内容：

• $ARGUMENTS ：全量参数。运行时，它会把你输入在命令后的所有文字，原封不动地替换进去。

• 1,2 , $3 ...：位置参数。如果你输入了多个词（用空格隔开），它们会依次对应第 1、第2、第3个参数。

## 3. 快速上手：创建你的第一个命令

光说不练假把式。我们来做一个最实用的实战：创建一个 /api-integration 命令，让 Claudecode帮我们自动对接任意第三方API。

### 第0步：准备好API文档

进入302.ai的「API超市」，找到你想要接入的模型（比如Gemini），点击「查看文档」并「复制页面」。

![image](/book/efficiency/efd21e17e785.jpg)


**Gemini**

![image](/book/efficiency/8d4fa40594e4.jpg)


**gemini-3-pro-preview**

Google出品

![image](/book/efficiency/0b23a7169a2f.jpg)


![image](/book/efficiency/d944e6dec7ad.jpg)


![image](/book/efficiency/b7f0e8046d29.jpg)


[ 输入:$2/1M tokens 起

输出:$12/1M tokens 起

![image](/book/efficiency/ab491ffaf3eb.jpg)


**gemini-2.5-flash-lite.-...**

基于gemini-2.5-flash-lite进一步迭代优化的预览版

![image](/book/efficiency/de94b9008408.jpg)


![image](/book/efficiency/988b1e749c11.jpg)


![image](/book/efficiency/024619ae2f5b.jpg)


[ 输入: $0.1/1M tokens

输出: $0.4/1M tokens

![image](/book/efficiency/d599381ba529.jpg)


**gemini-2.5-flash-previe..**

Google出品

![image](/book/efficiency/262d8677aa99.jpg)


![image](/book/efficiency/ff6cf30b0e96.jpg)


![image](/book/efficiency/6cc075a34a85.jpg)


输出:$2.5/1M tokens

**Chat (聊天)**

**复制页面**

![image](/book/efficiency/d6fa1c73a821.jpg)


正式环境

https://api.302.ai/v1/chat/col 

Run in Apifox 

**@以 Markdown 格式查看**

![image](/book/efficiency/20924b07ddbc.jpg)


LLMs.txt 

**支持模型:**

gemini-exp-1114 

gemini-exp-1121 

gemini-exp-1206 

gemini-2.0-flash-exp 

gemini-2.0-flash-thinking-exp-1219 

gemini-2.0-flash-thinking-exp-01-21 

gemini-2.0-flash 

新建一个 docs/api/302ai/gemini.md 文件，把刚刚复制的内容粘贴进去。


```txt
1 # Chat（聊天）  
2  
3 ## OpenAPI Specification  
4  
5 ``yaml  
6 openapi: 3.0.1  
7 info:  
8 title:  
9 description:  
10 version: 1.0.0  
11 paths:  
12 /chat/completions:  
13 post:  
14 summary: Chat（聊天）  
15 deprecated: false  
16 description:"支持模型：\ngemini-exp-1114\ngemini-exp-1121\ngemini-exp-1206\ngemini-2.0-flash-exp\ngemini-2.0-flash-thinking-exp-1219\ngemini-2.0-flash-thinking-exp-01-21\t\ngemini-2.0-flash\ngemini-2.0-flash-lite-preview-02-05\ngemini-2.0-pro-exp-02-05\ngemini-2.5-pro-exp-03-25\ngemini-2.5-pro-preview-03-25\ngemini-2.5-flash-preview-04-17\ngemini-2.5-pro-preview-05-06\ngemini
```

2.5-pro-preview-05-06-thinking（展示思考过程）\ngemini-2.5-flash-preview-05-20\ngemini-2.5-flash-preview-05-20-nothink（强制关闭思考）\ngemini-2.5-pro-preview-06-05\ngemini-2.5-pro-preview-06-05-thinking（展示思考过程）\ngemini-2.5-pro\t\ngemini-2.5-flash\t\ngemini-2.5-flash-lite-preview-06-17\ngemini-3-pro-preview\n\n\n注意：我们对API的格式进行了改造，兼容了OpenAI的API格式 
** 价格请查看：https://302.ai/price**"

```yaml
tags:  
- 语言大模型/Gemini  
parameters:  
- name: Content-Type  
    in: header  
    description:  
    required: true  
    example: application/json  
    schema:  
        type: string  
- name: Accept  
    in: header  
    description:  
    required: true  
    example: application/json  
    schema:  
        type: string  
- name: Authorization  
    in: header  
    description:  
    required: false  
    example: Bearer {{YOUR_API_KEY}}  
    schema:  
        type: string  
requestBody:  
    content:  
        application/json  
    schema:  
        type: object  
    properties:  
        model:  
            type: string  
            description: >-  
                要使用的模型的ID。有关哪些模型适用于聊天API的详细信息，请参阅[模型端点兼容性表。]  
(https://platform.openai.com/docs/models/model-endpoint-compatibility)  
    messages:  
        type: array  
    items:  
        type: object  
    properties:
```

role: type:string content: type:string x-apifox-orders: -role -content description: → 以[聊天格式] (https://platform.openai.com/docs/guides/chat/introduction)生成聊天完成的消息。 temperature: type:integer description: > 使用什么采样温度，介于0和2之间。较高的值（如0.8）将使输出更加 随机，而较低的值（如 0.2）将使输出更加集中和确定。我们通常建议改变这个或`top_p`但不是 两者。 top_p: type:integer description: → 一种替代温度采样的方法，称为核采样，其中模型考虑具有top_p概率质量 的标记的结果。所以0.1意味着只考虑构成前 10% 概率质量的标记。我们通常建议改变这个或`temperature`但不是两 者。 'n': type:integer description：为每个输入消息生成多少个聊天完成选项。 stream: type:boolean description: → 如果设置，将发送部分消息增量，就像在ChatGPT 中一样。当令牌可用时，令牌将作为纯数据[服务器发送事件] (https://developer.mozill.org/en-US/docs/Web/API/Server- sent_events/Using_server-sent_events#Eventstreams_format)\`data: [DONE]\`发送，流由消息终止。[有关示例代码] (https://github.com/openai/openai- cookbook/blob/main/examples/How_to_STREAM_completions.ipynb)，请参阅 OpenAI Cookbook。 stop: type:string description:API将停止生成更多令牌的最多4个序列。 max_tokens: type:integer description：聊天完成时生成的最大令牌数。输入标记和生成标记的总长 度受模型上下文长度的限制。 presence_penalty: type:Number

description: > 

-2.0 和 2.0 之间的数字。正值会根据到目前为止是否出现在文本中来惩罚

新标记，从而增加模型谈论新主题的可能性。

[查看有关频率和存在惩罚的更多信息。]

```txt
(https://platform.openai.com/docs/api-reference/parameter-details) 
```

```yaml
frequency_penalty: type: number description: >- 
```

-2.0 和 2.0 之间的数字。正值会根据新标记在文本中的现有频率对其进行

惩罚，从而降低模型逐字重复同一行的可能性。

[查看有关频率和存在惩罚的更多信息。]

```txt
(https://platform.openai.com/docs/api-reference/parameter-details) 
```

logit.bias: type:'null' description: → 

修改指定标记出现在完成中的可能性。 接受一个 json 对象，该对象将标

记（由标记器中的标记 ID 指定）映射到从

-100 到 100 的关联偏差值。从数学上讲，偏差会在采样之前添加到模型生

成的 logits

中。确切的效果因模型而异，但 -1 和 1 之间的值应该会减少或增加选择的

可能性；像 -100 或 100

这样的值应该导致相关令牌的禁止或独占选择。

user: type:string description: → 

代表您的最终用戶的唯一标识符，可以帮助 OpenAI

监控和检测滥用行为。[了解更多]

```txt
(https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids)。 
```

```yaml
required:  
- model  
- messages  
x-apifox-orders: 
```

```txt
- model  
- messages  
- temperature  
- top_p  
- 'n' 
```

```txt
- stream
- stop
- max_tokens 
```

```txt
- presence_penalty
- frequency_penalty
- logit.bias
- user 
```

```txt
example: model: gemini-1.5-pro messages: 
```

- role: user 

content: 你是谁

responses: 

'200': 

description: '' 

content: 

application/json: 

schema: 

type: object 

properties: 

id: 

type: string 

object: 

type: string 

created: 

type: integer 

choices: 

type: array 

items: 

type: object 

properties: 

index: 

type: integer 

message: 

type: object 

properties: 

role: 

type: string 

content: 

type: string 

required: 

- role 

- content 

x-apifox-orders: 

- role 

- content 

finish_reason: 

type: string 

x-apifox-orders: 

- index 

- message 

- finish_reason 

usage: 

type: object 

properties: 

prompt_tokens: 

type: integer 

```yaml
completion_tokens: type:integer total_tokens: type:integer required: -prompt_tokens -completion_tokens -total_tokens x-apifox-orders: -prompt_tokens -completion_tokens -total_tokens required: -id -object -created -choices -usage x-apifox-orders: -id -object -created -choices -usage headers:{} x-apifox-name:OK security:[] x-apifox folder:语言大模型/Gemini x-apifox-status:released x-run-in-apifox:https://app.apifox.com/web/project/4012774 apis/api- 147522041-run   
components: schemas:{} securitySchemes: apiKeyAuth: type:apikey in: header name:Authorization servers:-url:https://api.302.ai description：正式环境 -url:https://api.302ai.cn description：国内中转   
security：[]
```

### 第 1 步：创建命令目录

打开终端（Terminal），输入以下命令，给命令文件安个家：

mkdir -p .claude/commands1 

### 第 2 步：编写命令逻辑

现在，我们要告诉ClaudeCode如何处理这份文档。在终端输入以下命令：

echo "基于提供的API文档（$ARGUMENTS），创建一个完整的API调用封装。包括：1) 提取认证方式、请求方法、URL、请求体结构；2) 创建一个使用该API的简洁函数/类，支持传入动态参数；3) 添加错误处理和必要的类型定义；4) 在工具栏添加调试按钮，点击弹出完整的API调试窗口，可配置API Key、修改请求参数以及查看响应内容。" > .claude/commands/api-integration.md

**它会自动生成一个 .md 文件：**

![image](/book/efficiency/b51e634ce6ed.jpg)


.claude>commands → api-integration.md基于提供的API文档代码片段，为创建一个完整的API调用封装。包括：1）提取认证方式、请求方法、URL、请求体结构；2）创建一个使用该API的简洁函数/类，支持传入动态参数；3）添加错误处理和必要的类型定义；4)提供调试入口和完整的调试页面以验证API是否调通。代码应该开箱即用。  
2 IforCommand,  forAgent

### 第3步：一键调用

接下来，在ClaudeCode的对话框中输入：

/api-integration docs/api/302ai/gemini.md1 

### 第4步：见证效果

ClaudeCode在接收参数，组装成完整的指令后，就会开始工作。

它会读取你指定的API文档，快速生成一个可用的API调用封装，并提供一个可视化的调试窗口。

**> /api-integration is running... docs/api/302ai/gemini.md**

·我将为你基于API文档创建一个完整的API调用封装。让我先读取文档内容，然后进行实现。

. Read(docs/api/302ai/gemini.md) Read 224lines 

·现在让我查看项目结构，了解如何集成这个API封装：

Search(pattern: "src/**/*.tsx") L Found 10 files (ctrl+o to expand) 

·好的，我已成功实现完整的API调用封装。让我总结一下所完成的工作：

**完成的工作**

**1.创建了API封装模块和类型定义 (src/features/editor/api/)**

- types.ts:定义了完整的TypeScript类型

-请求接口：ChatRequest，ChatMessage

-响应接口：ChatResponse，ChatChoice，ChatUsage

-错误接口：ChatAPIError

－支持的模型列表（26个Gemini模型版本）

gemini.ts: 实现了GeminiAPI类

- 封装了 chat/completions API 调用

-支持自定义API Key和Base URL

－ 提供默认值（temperature=0.7，top_p=1等）

－包含验证方法：validateApiKey () ,isModelSupported()

**2．创建了API调试窗口组件 (APIDebugWindow.tsx)**

完整的调试界面包含：

-API Key 配置：可输入和保存Bearer Token

-模型选择：下拉框选择26个支持的模型

-参数调整：温度（0-2）实时调整

顺利的话，我们就可以在运行起来的页面的工具栏处，找到调试入口。

![image](/book/efficiency/f9bf42c1bc27.jpg)


**欢迎使用 Marka**

这是一个可自动配图的 **Markdown 编辑器**。它旨？作环境。

**主要功能**

点击入口，会弹出一个可视化调试窗口（注意，实际生成的页面可能有所不同）：

![image](/book/efficiency/cddb0d337c79.jpg)


先设置好你的 302.ai API Key：

![image](/book/efficiency/4238a5444b91.jpg)


再点击「保存」按钮，这一步会把302.ai APIKey保存在浏览器本地存储中，不用每次都重新输入：

![image](/book/efficiency/b78efeeba9d3.jpg)


点击「发送请求」按钮，查看是否有正确响应：

![image](/book/efficiency/56a2c78c195c.jpg)


恭喜你，你只用了一行命令，就完成了复杂的API接入工作。

![image](/book/efficiency/5ed3dab67df2.jpg)


现在，“Marka”项目已经具备了与大语言模型交互的能力，这将为我们后续添加“自动配图”功能打下基础。

## 4. 进阶：使用Frontmatter配置“说明书”

想让你的命令更专业？可以在文件顶部添加 Frontmatter （元数据），相当于一份“配置说明书”。


1 2 allowed-tools: Bash(git add *), Bash(git status *), Bash(git commit *) 

3 argument-hint: [更改的内容]

4 description: 创建一条 Git 提交记录。

5 model: claude-3-5-sonnet-20240620 

6 

字段解析：

<table><tr><td>字段</td><td>作用</td><td>为什么重要?</td></tr><tr><td>description</td><td>命令描述</td><td>当你输入/时，它会显示在自动补全列表中，提醒你这个命令是干嘛的。</td></tr><tr><td>argument-hint</td><td>参数提示</td><td>当你输入 /commit 后，输入框会浅色显示[提交信息]，防止你不知道该填什么。</td></tr><tr><td>allowed-tools</td><td>权限控制</td><td>这里指定了该命令允许执行哪些工具。建议写明确切的命令模板（如 git add *），而不是赋予它所有权限。</td></tr><tr><td>model</td><td>指定模型</td><td>强制该命令使用特定的模型版本执行（可选）。</td></tr></table>

## 5. 高级技巧：注入上下文

这是自定义命令最强大的部分，分为“静态”和“动态”两种。

### 5.1 技巧 1：使用 @ 注入“静态知识”

当我们每次都需要ClaudeCode参考一些固定的文档（如流程、规范）时，可以使用 @文件路径 来实现。

**场景：基于规范的“代码找茬”**

A. 首先，把以下这份《API 接口设计规范》保存到 docs/spec 目录下。


```txt
1 # API 接口设计规范  
2  
3 ## 命名与文件结构 (Naming & Structure)  
4 - **文件命名**: 按照领域/资源命名，例如 `userService.ts`，`orderService.ts`。  
5 - **函数命名**: 采用 `动词 + 名词` 的形式，动作明确。  
6 - `fetchUser` / `getUser`（获取）  
7 - `createUser` / `submitOrder`（创建）  
8 - `updateProfile`（更新）  
9 - `deleteItem`（删除）  
10 - **类型定义**: 所有的 Request 参数和 Response 响应都必须有对应的 TypeScript Interface 定义，且通常与 API 函数在同一文件中导出，或引用统一的 `types` 目录。  
11  
12 ## 编码标准 (Coding Standards)  
13 ## 1. 强类型契约  
14 - **禁止 `any`**：必须为每一个 API 调用的返回值定义明确的 Interface。
```

```txt
15 -**DTO模式**：如果后端返回的数据结构混乱，必须在此层进行清洗（Transform），返回给前端组件的一定是干净、驼峰命名的标准数据。  
16  
17 #2.请求封装  
18 -**使用统一实例**：必须导入并使用项目统一配置的HTTP客户端实例（如`src/utilities/http.ts`中的axisinstance)，禁止直接使用`fetch`或新建axis实例。  
19 -**RESTful风格**：遵循REST语义，正确使用GET/POST/PUT/DELETE方法。  
20  
21 #3.错误处理  
22 -**透传错误**：除非需要进行特定格式的转换，否则不要在此层`catch`错误。让错误抛出，交给调用方（ReactQuery或UI组件）处理。  
23  
24 #4.注释补充  
25 -**注释即文档**：每个导出函数上方必须有注释，说明该接口对应后端哪个URL以及主要用途。  
26  
27 #5.参数定义  
28 -**参数解构**：如果参数超过2个，请使用对象解构作为函数参数。
```

B. 然后，创建一个新的命令 review_api.md ：


我是一名编程初学者，请帮我优化 `$ARGUMENTS` 下的接口代码。1

请参考 @docs/spec/api-design-spec.md 作为最佳实践标准。2

3 

请一步步分析我的代码：4

1.5 ** 指出不足 ** ：告诉我哪里写得不好，违反了哪条规范？

2.6 ** 解释原因 ** ：为什么规范里要求这样做？（例如：这样做对维护有什么好处？）

3.7 ** 演示优化 ** ：展示重构后的代码，并加上详细注释。

当你调用 /review_api 时，Claude Code 会先去阅读 @ 引用的规范文件。

**>/review-api is running... src/features/editor/api Read docs/spec/api-design-spec.md (28 lines)**

· 我来帮你优化 src/features/editor/api下的接口代码。让我先查看现有的代码，然后逐步分析和优化。

* 读取并分析现有 API 代码... (esc to interrupt · ctrl+t to show todos)L Next：对照规范指出不符合项

然后，它会拿着这把“尺子”，去衡量我们刚刚对接第三方API时实现的代码，指出有哪里不符合规范，并告诉你如何改进。

**□ 问题分析报告**

**1命名不符合规范**

**违反的规范：**

－规范要求"函数命名：采用 动词 + 名词 的形式"-规范要求"按照领域/资源命名，例如 userService.ts，orderService.ts"

**你的代码问题：**

gemini.ts 文件名使用品牌名而非领域 (应该是 chatService.ts)class GeminiAPI也是品牌名，违反领域驱动设计原则- chatCompletions方法签名不符合动词优先原则

**为什么这是问题？**

假设下个月你要切换到OpenAI，或支持多个 LLM服务商，你的文件名和类名会误导开发者，让他们以为只能用于Gemini。同理，如果将来要改为“生成摘要"功能，方法名chatCompletions也毫无意义。

正确做法：命名应该是抽象的领域概念，而非具体的实现细节。

**G 优化后的代码**

重构方案：使用函数式编程替代类

基于规范，我重构为更精简的模块结构：

```typescript
// src/features/editor/api/chatService.ts  
import { http } from '...//.utils/http'; // 使用统一的 http 实例  
import type { ChatRequest, ChatResponse, ChatError } from './types';  
const API_BASE_URL = import.meta_env.VITE_CHAT_API_BASE_URL || 'https://api.302.ai';  
const DEFAULT_MODEL = import.meta_env.VITE_CHAT_DEFAULT_MODEL || 'gemini-2.5-flash';  
/**  
* 发起 AI 对话请求  
*  
* @endpoint POST /chat/completions  
* @description 调用大语言模型生成回复  
* @example  
* ` ` typescript  
* const response = await createChatCompletion({  
* messages: [{ role: 'user', content: '你好']}  
* });  
* ` `  
*/  
export async function createChatCompletion(request: ChatRequest):  
    Promise<ChatResponse> {  
        const response = await http.post<ChatResponse>/<chat/completions>, {  
            model: DEFAULT_MODEL,  
            temperature: 0.7,  
        }  
    }
```

**5.2技巧2：使用 注入“实时动态”**

这是自定义命令最强大的功能，没有之一。

通过 !command 格式，可以让 Claude Code 在执行提示词前，先在你的电脑上运行一段 Bash 脚本。

这个脚本的输出结果，会被自动捕获，作为上下文的一部分，一起传递给ClaudeCode。

**场景示例：自动生成Git提交信息**

A. 首先，创建以下文件： ~/.claude/commands/git-commit.md


```txt
1 ---  
2 allowed-tools: Bash.git add:\*), Bash.git status:\*, Bash.git commit:\*  
3 description: 根据当前的 Git 状态生成一条提交信息并提交代码。  
4 ---  
5 #上下文信息  
6 -当前Git状态：!`git status`  
7 -当前代码变更（暂存区与工作区）：!`git diff HEAD`  
8 -当前所在分支：!`git branch --show-current`  
9 -最近10条提交记录：!`git log --oneline -10`  
10  
11 #你的任务  
12 请基于以上的代码变更和项目历史，为我撰写一条清晰、规范的Git提交信息并提交代码。
```

B.接着，只需输入 /git-commit ，剩下的都会帮你自动完成：

1. 执行命令：帮你跑 git status 和 git diff 

**> /git-commit is runnin..**

Allowed 3 tools for this command 

·我来为你撰写一条合适的 Git 提交信息。

```txt
- Bash.git status)  
    - On branch main  
Changes not staged for commit:  
    (use "git add <file>..." to update what will be committed)  
    ... +12 lines (ctrl+o to expand) 
```

- Bash.git log --oneline -n 5) └ 75c02d9 + add CLAUDE.md / 0fb7711 + init 

```txt
- Bash.git add src/Marka.json src/components/APIDebugPanel.json docs/src/api/.claude/&&git rm --cached node Modules/.vite/deps/_metadata.json) Running... 
```

```batch
- Bash.git diff --cached --stat)  
L Waiting... 
```

2. 获取修改：看了你改了哪些文件、哪几行代码。

**. Bash(git diff --cached --stat)**

.claude/comands/api-integration.md 1+ docs/api/302ai/gemini.md 224+++++   
node Modules/.vite/deps/_metadata.json 50---- src/Marka.css 20-- src/api/GeminiAPI.js 202 ++   
src/components/APIDebugPanel.css 460 ++   
6 files changed,906 insertions (+) ,51 deletions(-) 

3. 最终产出：结合变更内容和历史记录，生成一条提交信息： feat(api): 集成 302.aiGemini API 。

```markdown
- Bash.git commit -m "$(cat <<'EOF'
  feat api): 集成302.ai Gemini API调试工具...
[main 872bd41] feat api): 集成302.ai Gemini API调试工具
6 files changed, 906 insertions(+), 51 deletions(-)
create mode 100644 .claude/commands/api-integration.md
... +4 lines (ctrl+o to expand)
```

```txt
- Bash.git status)  
    - On branch main  
        Untracked files:  
            (use "git add <file>..." to include in what will be committed)  
            ... +3 lines (ctrl+o to expand) 
```

·已完成提交。提交信息规范且详细：

feat(api):集成302.ai Gemini API调试工具

- 添加完整的Gemini API客户端封装 (src/api/GeminiAPI.js)

-支持OpenAI兼容格式

-包含重试逻辑和超时处理

-提供连接测试功能

-支持所有官方Gemini模型

- 创建交互式API调试面板 (src/components/ApiDebugPanel.jsx)

-可配置API密钥和请求参数

-实时发送请求并查看响应

－支持JSON和格式化两种视图

-自动保存配置到localStorage

－ 在主工具栏添加API调试入口

-新增Terminal图标按钮

－模态窗口展示调试界面

-添加API文档和集成指南

-docs/api/302ai/gemini.md 包含完整0penAPI规范

-.claude/commands/api-integration.md 提供后续集成指引

提交内容：

-6个文件变更，906行新增，51行删除

-添加了API客户端、调试面板、文档等核心功能

-Vite的元数据文件被自动删除（这是正常的缓存文件）

![image](/book/efficiency/cfed0154aa57.jpg)


**给读者的建议**

最后，关于自定义命令，我有几条建议想送给你：

痛点即信号：不要为了写命令而写命令。当你发现自己第三次手动输入同一段冗长的提示词时，那就是创建新命令的最佳时机。

先僵化，后优化：不要一上来就追求完美支持各种参数。先针对具体问题写一个“一次性”脚本。发现好用后，再把变量替换成 $ARGUMENTS 变成通用工具。

• 独乐乐不如众乐乐：如果你正在和别人协作，可以把命令提交到 Git 仓库

( .claude/commands/ )。你的队友拉取到代码后，也能立刻拥有这套强大的工具箱。 一人栽树，全队乘凉。

## 用 Hook 构建一个“自动化代码生产线”

本篇将带你：

• 搞懂Hook（钩子）到底是个什么黑科技。

• 了解Hook能在ClaudeCode里自动帮你跑腿做哪些事。

• 亲手配置你的第一个自动化Hook，从此告别重复劳动。

## 1. Hook 是什么？

我们先来回顾一个熟悉的场景：每次写完代码，你是不是都要手动执行一系列“收尾工作”？比如格式化、测试、生成文档、提交Git

![image](/book/efficiency/25a8df3eeb75.jpg)


这些事单做都不难，但它们麻烦、重复、且容易忘记。

如果有一个系统，能在你写完代码的那一刻，自动替你完成这些琐事，是不是就省心多了？

Hook的作用，就是让ClaudeCode变成这个“贴心的自动化助手” 。

你可以把Hook想象成家里门口的衣帽架：

衣帽架 = ClaudeCode的整个自动化流程（已经设计好结构和节点）

? 一个个钩子 = Hook事件点（系统预留的“可以挂东西的位置”）

你挂上去的物品 = 你想自动执行的任务（脚本、命令、检查）

衣帽架本体不动，但你可以往每个钩子挂任意东西：雨伞、围巾、包、钥匙……

Hook系统也是同理：不同节点的“钩子”已经准备好了，你只要把你的自动化逻辑“挂”上去就行。


Hook：自动化流程的“衣帽架”


![image](/book/efficiency/91efc5aebc52.jpg)


这样一来，你不用修改ClaudeCode的源码，就能将自己的个性化行为“挂”上去，实现深度定制。

## 2. 为什么要用 Hook？

有人可能会问：“直接在提示词里告诉ClaudeCode不就行了吗？为什么要搞这么复杂？”

我们用一个现实中的生活场景来解释。

• 你对助理说：“以后发邮件前，麻烦帮我检查一下拼写。”⸺这是“建议”。助理忙起来可能会忘记，或者检查得不仔细。

• 你在邮件系统里设置了一条“规则”：“点击‘发送’按钮时，强制执行拼写检查。如果不通过，禁止发送。”⸺这就是Hook， 100% 自动触发。

**方法A（提示词）-建议**

![image](/book/efficiency/1db302a1f4c4.jpg)


**方法B（Hook）-规则**

![image](/book/efficiency/723195dc7878.jpg)



Hook：自动化的硬性规则


对比总结一下：

<table><tr><td>特性</td><td>提示词</td><td>Hook</td></tr><tr><td>可靠性</td><td>依赖 LLM 理解，可能忘记</td><td>100% 自动触发，代码级可靠</td></tr><tr><td>持久性</td><td>新会话可能需要重复说</td><td>配置一次，终身生效</td></tr><tr><td>适用场景</td><td>风格建议、一次性任务</td><td>重复性、流程化、必须执行的任务</td></tr><tr><td>本质</td><td>建议</td><td>自动化代码</td></tr></table>

## 3. Claude Code 会话的生命周期

要使用Hook，你得知道Hook都能挂在哪里。ClaudeCode的每一次会话都会经过一系列的关键节点，就像人的一生有不同的阶段：

<table><tr><td>事件</td><td>触发时机</td><td>能拿来说什么（举例）</td></tr><tr><td>SessionStart</td><td>新会话开始时</td><td>自动加载项目环境、读取配置</td></tr><tr><td>UserPromptSubmit</td><td>用户提交输入后</td><td>预处理用户输入、自动补充上下文</td></tr><tr><td>PreToolUse</td><td>Claude 准备用某个工具之前</td><td>安全检查：拒绝危险指令（比如rm -rf/）</td></tr><tr><td>PostToolUse</td><td>工具执行完毕之后</td><td>自动化：自动格式化、跑测试、触发子任务</td></tr><tr><td>PreCompact</td><td>Claude 要压缩上下文时</td><td>自动备份对话、打个快照</td></tr><tr><td>Notification</td><td>需要提醒用户时</td><td>播放系统音效、发送系统通知</td></tr><tr><td>Stop/SubagentStop</td><td>子代理任务结束时</td><td>自动生成任务总结、归档日志</td></tr><tr><td>SessionEnd</td><td>会话结束时</td><td>清理临时文件、释放资源</td></tr></table>

在这些事件点上，你都能挂上自己的 Hook。

## 4. Hook配置长什么样？

Hook 是通过一个 JSON 文件来配置的，本质上就是简单的“三段式”：

1. When：什么事件？

2. Where：针对哪个工具？

3. What：执行什么命令？

示例配置：每次ClaudeCode改完代码，自动帮我检查代码风格。


```txt
1 {   
2 "hooks": {   
3 "PostToolUse": [ // 1. When: 工具用完之后   
4 {   
5 "catcher": "Write|Edit", // 2. Where: 仅限“写”和“改”文件的操作   
6 "hooks": [   
7 {   
8 "type": "command",   
9 "command": "$CLADE Projekt_DIR/.claude/hooks/check-style.sh" //
```

```txt
10 }   
11 ]   
12 1   
13 1   
14 1   
15 1 
```

这个配置的含义是：

“嘿 Claude Code，每次你写完或改完文件（ PostToolUse + Write|Edit ），请立刻执行check-style.sh 这个脚本，帮我看看代码写得规不规范。

## 5. Hook 的“耳”与“口” (I/O)

Hook 不是“闷头干活”的，它可以和 Claude Code 进行双向通信。

### 5.1 听 ：Claude Code 告诉你发生了什么

当 Hook 被触发时，Claude Code 会通过标准输入 （stdin） 传给你一个 JSON 数据包。

**输入示例 （PreToolUse）：**


```txt
1 {   
2 "session_id": "...",   
3 "hook_event_name": "PreToolUse",   
4 "tool_name": "Write",   
5 "tool_input": {   
6 "file_path": "/path/to/file",   
7 "content": "...   
8 }   
9 } 
```

这个数据包的含义是：

“我要开始写文件了！ 文件名是 /src/main.js ， 内容是 ...”

你的脚本就可以读取这些信息，判断 file_path 是不是敏感文件， content 是否违规等。

### 5.2 说 ：你告诉 Claude Code 该做什么

你的脚本分析完数据后，可以通过打印（stdout）一个JSON来回应ClaudeCode。

**输出示例 （PreToolUse）：**

你的脚本分析完数据后，发现代码里有敏感词，于是回复：


```txt
1 {   
2 "hookSpecificOutput":{   
3 "hookEventName":"PreToolUse",   
4 "permissionDecision":"deny",//拒绝执行！   
5 "permissionDecisionReason":"生产环境禁止输出日志。" //理由   
6 }   
7 }
```

这个数据包的含义是：

“停！代码里有敏感词 console.log ，拒绝执行！理由是：生产环境禁止输出日志。 99

收到这个回复后，ClaudeCode就会立即停止工具调用，并把你的拒绝理由展示给用戶。

## 6. 实战演练：做一个“防卡死”提示音

接下来，我们来做一个简单但极其实用的 Hook。

痛点：有时候ClaudeCode需要你授权（比如运行命令），但你切出去看网页了，导致它一直在傻等。

目标：当需要授权时，显示一个通知并播放一段音频，提醒你切回来授权操作。就像《火影忍者》中的逆通灵之术把位于妙木山的鸣人召唤回战场一样。

![image](/book/efficiency/1f9320c64ccd.jpg)


### 第1步：唤起配置菜单

在 Claude Code 中输入：

/hooks1 

系统会列出所有可配置的事件列表。

**>/hooks**

**Hook Configuration**

Hooks are shell commands you can register to run during Claude Code processing. Docs 

· Each hook event has its own input and output behavior 

· Multiple hooks can be registered per event， executed in parallel 

·Any changes to hooks outside of /hooks require a restart 

·Timeout: 60 seconds 

△ Hooks execute shell commands with your full user permissions.This can pose security risks， so only use hooks from trusted sources. 

Learn more: https://code.claude.com/docs/en/hooks 

**Select hook event :**

> 1. PreToolUse - Before tool execution 

2.PostToolUse - After tool execution 

3.PostToolUseFailure - After tool execution fails 

4.Notification - When notifications are sent 

↓5. UserPromptSubmit - When the user submits a prompt 

### 第2步：选择事件

选择 Notification 事件。

**Notification - Tool Matchers**

Exit code 0 - stdout/stderr not shown Other exit codes - show stderr to user only 

这里会要求你选择一个匹配器（matcher）：


Add new matcher for Notification


```txt
Input to command is JSON with notification message and type. Exit code 0 - stdout/stderr not shown Other exit codes - show stderr to user only 
```


Possible matcher values for field notification_type:


```python
permission_prompt, idle_prompt, auth_success, elucidation_dialog 
```


Tool matcher:



Example Matchers:


```txt
Write (single tool) 
```

```txt
Write|Edit (multiple tools) 
```

```txt
- Web.* (regex pattern) 
```

• permission_prompt - Claude Code 的权限请求通知

idle_prompt - Claude 等待用戶输入时的通知（空闲 60 秒以上）

. auth_success - 身份验证成功通知

• elicitation_dialog - Claude Code 需要 MCP 工具输入时的通知

我们填入 permission_prompt，之后选择添加一个新的 Hook：


Notification - Matcher: permission_prompt


```txt
Input to command is JSON with notification message and type. Exit code 0 - stdout/stderr not shown Other exit codes - show stderr to user only 
```

```txt
> 1. + Add new hook... No hooks configured yet 
```

### 第3步：添加命令（以macOS为例）

Event: Notification - When notifications are sent 

Input to command is JSoN with notification message and type. Exit code 0 - stdout/stderr not shown 

Matcher: permission_prompt 

Command : 

Examples: 

·jq -r :\(.tool_input.command)-"\(.tool_input.description //"No description")" >> ~/.claude/bash-command-log.txt 

·/usr/local/bin/security_check.sh ·python3~/hooks/validate_changes.py 

在输入框中，我们可以搞怪点，粘贴以下命令，这会分别调用系统API来播放音频和显示通知。

afplay sounds/reverse_ummoning_jutsu.mp3 | osascript -e 'display notification1 

![image](/book/efficiency/74cc0249e59c.jpg)


![image](/book/efficiency/adc1d8736809.jpg)


![image](/book/efficiency/a96fd6f6c4d7.jpg)


![image](/book/efficiency/c7b8dff55bdd.jpg)


逆通灵之术！！

![image](/book/efficiency/b1f899812144.jpg)


![image](/book/efficiency/710959482873.jpg)


![image](/book/efficiency/28cbea708e15.jpg)


th title "Naruto！！"' 

### 第4步：保存位置

选择保存到 Project （当前项目） 或 User （全局）。 建议先存到 Project 试运行。

**Save hook configuration**

Event: Notification - When notifications are sent  
Matcher: permission_prompt  
Command: afplay sounds/reverse_unmoning_jutsu.mp3 | osascript -e 'display'  
notification":   :   逆通灵之术！！   with title "Naruto!!"

Where should this hook be saved? 

1. Project settings (local) Saved in .claude/settings.local.json  
> 2. Project settings Checked in at .claude/settings.json  
3. User settings Saved in at ~ .claude/settings.json 

![image](/book/efficiency/fe701ae849f2.jpg)


### 第 5 步：测试 Hook

下次遇到需要授权的操作时，你电脑应该会同时发出一声“逆通灵之术！”，并在右上角显示一条通知提醒。

![image](/book/efficiency/f2a5b03a866a.jpg)


至此，恭喜你已经成功配置了你的第一个Hook！

**给读者的建议**

最后，关于Hook（钩子），我有几条建议想送给你：

文档不如代码：文档是给人看的，人会犯错；Hook是给机器跑的，机器永远忠诚。把“软性的建议”变成“硬性的机制”，是提升工程质量最稳健的方式。

• 先警告，后拦截：配置初期，建议先让Hook仅输出警告，不要直接阻断流程。等确认规则没有误判后，再开启强制拦截，避免误杀正常操作。

. 保持轻量：Hook是同步执行的。一定要保持脚本的轻量和极速，千万别在这里跑耗时的大任务（如全量打包），否则ClaudeCode会慢到让你怀疑人生。

## 用 Git Worktree 开启“影分身”模式

本篇将带你：

了解为什么简单地“多开终端”解决不了并行开发的问题

• 像鸣人一样，用 Git Worktree 创建多个“影分身”工作区

• 同时指挥两个ClaudeCode实例，互不干扰地处理任务

**并行任务的“翻车”现场**

先代入一个你可能经历过的场景：

你正沉浸在代码的世界里，灵感如泉涌。突然，两个需求同时砸到了你头上：

• 任务A：开发一个新的“深色模式” （需改动配置文件）。

• 任务 B：紧急修复线上的版本号 Bug（也需改动配置文件）（

你的第一反应也许是：

“这有何难？我开两个终端窗口，启动两个ClaudeCode实例，一边做一个，不就行了？ ”

听起来很稳，对吧？但这里藏着一个致命的陷阱：如果这两个任务，修改的是同一个文件、甚至同一段代码，会发生什么？

我们来推演一下可能发生的“惨剧”：

![image](/book/efficiency/5b3aa03105f8.jpg)


**结果：版本号对了，深色模式被覆盖了。功能丢失。**

1. 任务 A 把配置文件里的 theme 改成了 "dark" 。

2. 任务 B 把配置文件里的 version 改成了 "1.2" 。

3. A先保存：文件变成了“深色主题” 

4. B后保存：由于B读取文件时，里面还没有深色主题的代码。B一保存，直接就覆盖了整个文件。

结果就是：线上版本号改对了，但A辛辛苦苦写的“深色模式”代码，被彻底抹除了。更可怕的是，你可能直到上线后才发现功能丢了。

要解决这个问题，我们需要一个能力：让每个任务在自己的独立空间里运行，互不干扰，就像平行宇宙一样。

这就是Git派上用场的地方。

**版本控制的基石：Git**

如果你完全没了解过Git，也不要紧，记住这个简单类比：

Git = 程序员的“游戏存档系统” 。

玩游戏时，你肯定有过这种操作：

打Boss前：先存个档，以此为基准。

• 打输了？读取存档，满血复活。

• 想走另一条剧情线？另存一个新档，放心大胆地去试。


游戏存档系统


![image](/book/efficiency/e5a2d878f535.jpg)



Git=程序员的“游戏存档系统”


![image](/book/efficiency/03354a387737.jpg)


在Git里，Commit（提交）就是那个“存档按钮” 

每一次Commit，Git都会把你当前所有的代码状态打包，生成一个独一无二的快照。

有了它，你就能让ClaudeCode放手去改代码。改错了？一键回滚。改乱了？瞬间还原。

**Git Worktree 是什么？**

如果你看过《火影忍者》，你就能理解GitWorktree。它和“影分身”的设定几乎完美对应。

1. 本体 = .git 文件夹

首先，在影分身术里，有且只有一个“施术者本体”，也就是唯一真实存在的忍者。

对应到 Git 里，这个“本体”就是唯一的 .git 文件夹。它是所有历史记录和元数据的源头。

**本体/核心**

![image](/book/efficiency/e725d53a9089.jpg)


施术者本体

(唯一的、真实的忍者)

![image](/book/efficiency/261cd4517b2d.jpg)


唯一的.git仓库历史

2. 施术 = git worktree add

影分身会消耗查克拉，制造出多个实体分身；

Git worktree 也类似，只不过它不是靠查克拉，而是通过一条简单的 git worktree add 命令，生成多个互相独立的工作目录。

**分身/副本**

![image](/book/efficiency/1ce79f27c759.jpg)



消耗查克拉制造出的实体分身


![image](/book/efficiency/ca38e193d329.jpg)



执行命令创建出的独立工作目录


### 3. 独立行动 = 独立目录

这些分身都能独立行动，他们可以分头侦察、修炼或战斗；

而每个worktree也存在于不同的目录里，能各自独立承担一项任务：修Bug、做实验、新建功能……互不干扰。

**独立工作**

![image](/book/efficiency/eddcb1385b63.jpg)


![image](/book/efficiency/9919588a3dca.jpg)


![image](/book/efficiency/bbd379db642b.jpg)



Feature A Dev


![image](/book/efficiency/a3e70ab2ef94.jpg)



Bug Fix B


![image](/book/efficiency/91c6559029c5.jpg)



是 (有独立意识，可分头执行任务)


![image](/book/efficiency/39400f2379b3.jpg)



Experiment C



是(可在不同目录中，并行开发）


### 4. 分身隔离 ≅ 代码隔离

隔离性同样强。一个影分身被击败，不会影响本体；

一个worktree里的代码怎么切、怎么改，也不会影响其他目录。

**隔离性**

![image](/book/efficiency/a41a62048163.jpg)


极高 (一个分身被打败，不影响本体)

![image](/book/efficiency/60169b45779b.jpg)


完全隔离 (代码修改不影响其他目录)

### 5. 经验回流 = Merge

当任务完成后，影分身解除时所有经验会回流到本体；

worktree 也一样，你可以用 git merge 把各个分身的成果合并回主分支，让主仓库获得所有进度。

**成果回收**

![image](/book/efficiency/4012ff4e9dd7.jpg)


分身解除后，经验记忆回归本体

![image](/book/efficiency/eb22d9f1f002.jpg)


通过git merge将代码变更合并回主分支

所以，在火影忍者的世界里，影分身是鸣人用来同时修炼、搜集情报、协同战斗的核心技能；

而在软件开发的世界里，Gitworktree则是开发者用来并行开发、紧急修复、多任务代码实验的王牌工具。

**经典应用**

![image](/book/efficiency/2d1a846ad357.jpg)


鸣人用来同时修炼、搜集情报、协同作战

![image](/book/efficiency/ef2bcce64d9e.jpg)


开发者用来并行开发、紧急修复、多任务实验

**实战演练：15 分钟带你“多线战斗”**

接下来，还是围绕着为“Marka”应用添加“自动配图”功能，我们将使用ClaudeCode+Worktree，尝试同时推进两个新的子任务：

. 任务1：让LLM自动识别文章里哪些句子适合配图。

• 任务2：显示候选图片，手动选择图片插入到文章中。

### 第 1 步：蓄力（初始化）

首先，请确保你的电脑上已经安装了 Git。 （官网下载： https://git-scm.com/downloads)

在项目根目录下，使用 git init 命令初始化仓库。

git init 1 

这会创建一个 .git 隐藏文件夹，用于追踪所有的版本历史。

许多 IDE（如 VSCode）都内置了 Git 支持，直接点击“初始化仓库”，效果是一样的。

![image](/book/efficiency/a59013453776.jpg)


需要注意的是，GitWorktree是从你当前的 HEAD （可以理解为最新的存档点）检出代码的。如果你手头有改了一半还没存的代码，新的工作目录里是不会有的。

所以，请务必先使用我们前面章节封装好的 /git-commit 命令，，把手头的工作全部提交。

就像鸣人施术前要调整查克拉一样，先确保你的主仓库是完整的，没有未提交的文件。

还有一点，还记得我们在前面章节用Hook做了一个“防卡死”提示音吗？如果想让ClaudeCode在任务完成后通知你，可以直接编辑 settings.json 文件，在 matcher 字段增加一个idle_prompt 配置。

![image](/book/efficiency/39252d678a74.jpg)


### 第 2 步：召唤影分身（创建 worktree）

现在，我们要为不同的任务创建专属的工作目录。为了保持主目录整洁，建议把所有分身都放在一个.trees 文件夹里。


**召唤分身 1：LLM识别可配图句子1**

git worktree add .trees/feature_llm_recognizes_sentences2 

**召唤分身 2：手动将图片插入文章4**

git worktree add .trees/feature_manually_insert_images5 

● Marka % git worktree add .trees/feature_llm_recognizes_sentences 

Preparing worktree (new branch'feature_llm_recognizes_sentences') 

Updating files: 100% (5950/5950)，done. 

HEADis now at 267a3c2 feat(editor):实现句子高亮功能

Marka % git worktree add .trees/feature_manually_insert_images 

Preparing worktree (new branch'feature_manually_insert_images') 

Updating files: 100% (5950/5950)，done. 

HEAD is now at 267a3c2 feat(editor):实现句子高亮功能

O Marka % 

就像鸣人结印后产生数个影分身一样，执行过后，你会看到，项目里多了一个 .trees 文件夹，里面躺着两份完整的代码拷贝。

![image](/book/efficiency/b8abd2c1ceba.jpg)


### 第3步：分头行动（并行开发）

接下来，我们要为每个任务分配一个独立的ClaudeCode实例。

你可以新开两个终端窗口，或直接使用IDE的“拆分终端”功能，这样左右并排，更方便观察。

![image](/book/efficiency/229cd34854e1.jpg)


• 终端A（左侧）：


1 cd .trees/feature_llm_recognizes_sentences 

2 claude 

• 终端B（右侧）：


cd .trees/feature_manually_insert_images1 

claude2 

![image](/book/efficiency/ad873465a3f9.jpg)


就像鸣人指挥每个影分身去不同战场一样，你会看到，两个独立的ClaudeCode会话分别在各自的目录中响应。

### 第4步：战术会商（启用PlanMode）

别急着冲锋。先按下 Shift + Tab 切到“规划模式（PlanMode）”，或者使用我们前面章节实现的“提示词优化器”SubAgent。

目的都是为了让ClaudeCode先列出详细的执行计划，而不是上来就改代码。

接下来，分别下达以下指令。不用怕，在规划模式的帮助下，哪怕你的需求描述很糙，ClaudeCode也能帮你梳理清楚。

**• 终端A输入：**


修改API调试窗口，改为将整篇Markdown格式的原文发送LLM，由LLM返回一个JSON列表，每个JSON对象包含“可配图句子”、“可配图理由”、“生图提示词”3个字段，需要校验好JSON格式，确保只返回JSON而没有其他冗余文本，JSON格式不正确的话要发起重试，最多3次。在请求成功之后，遍历所有“可配图句子”，在预览视图中找到对应的句子将其高亮。

**. 终端B输入：**


在现有的“圆点按钮”组件上增加交互，当鼠标悬停时圆点停止闪烁。鼠标悬停时，一条连接线应从圆点水平延伸并动画显示，最终连接到一个淡入的卡片布局，需要确保卡片布局始终在预览视图，

不会溢出。卡片布局内需要横向显示3张候选图片，图片采用正方形容器，缩放显示。点击图片时插入到左侧的Markdown编辑区域，插入位置位于圆点按钮对应句子的句号后面。

![image](/book/efficiency/cf6413f41e74.jpg)


ClaudeCode可能会主动向你询问一些关键细节，来确保实现方案准确：

![image](/book/efficiency/c48090f29dec.jpg)


![image](/book/efficiency/10ebce3526c6.jpg)


澄清完所有问题后，ClaudeCode会启动Plan代理来设计实现方案，给出3‒10步的详细计划清单。

![image](/book/efficiency/f13fea9575e0.jpg)


就像分身在出征前先各种制定战术、分析敌情，不盲目冲锋一样，

### 第 5 步：放权执行（开启 Accept Edit ）

确认计划无误后，选择 Yes, and auto-accept edits ，授权 Claude Code 文件编辑权限，让它能够自动执行。

**文件修改清单**

大型定义

2. /src/features/editor/components/APIDebugWindow.tsx-主功能实现(重命名）

-状态管理

4. /src/features/editor/components/Toolbar.tsx－按钮更新

Would you like to proceed? 

2. Yes，and manually approve edits 

3. Type here to tell Claude what to change 

ctrl-g to edit in Vim 

- src/features/editor/context/EditorContext.tsx 

- src/features/editor/components/Preview.tsx 

**预期效果**

1．鼠标悬停在圆点上时，动画停止

2.连接线从圆点延伸到图片卡片

3.卡片智能定位，不会溢出预览区域

4.点击图片，自动插入到对应句子后面

5.使用Markdown引用格式，便于管理和维护

Would you like to proceed? 

>1. Yes，and auto-accept edits 

2. Yes，and manually approve edits 

3. Type here to tell Claude what to change 

就像鸣人让分身在战场上自动执行既定战术，而不需要每一招都回头确认一样。

### 第6步：分身战斗（并行修改）

此时，你会看到两个终端飞速滚动，分别执行各自的任务。

Problems 

Output 

Debug Console 

Terminal 

·第二个任务完成！现在开始第三个任务 -改造核心组件：

Bash(mv src/features/editor/components/APIDebug Window.tsx src/features/editor/components/S entenceRecognitionWindow.tsx) L(No content) 

Write(src/features/editor/components/SentenceRe cognitionwindow.tsx) 

LUpdated src/features/editor/components/s entenceRecognitionWindow.tsxwith 244 additions and i10 removals 

import React，{useState} from'react' 

import{X，Send，Code， Terminal,RotateCw }from'lucide-react' 

import{X，Send，Image， RotateCw，Copy，Alertcircle } from'lucide-react' 

import{ createChatCompletion, qetSupportedModels}from 1../api/chatService' 

4 import{ChatRequest， ChatResponse 

node 

日助

× 

·现在开始实现功能。首先创建Todo列表来跟踪进度

·让我开始创建所需的文件和服务：

· Write(src/features/editor/services/imageService .ts) 

LWrote 146 lines to src/features/editor/s ervices/imageService.ts 

/** 

*图片搜索服务

* 集成外部API（Unsplash）获取图片*/

interface ImageResult { 

id: string; 

uri:'string; 

thumbnailurl: string; description: string; 

.… +*136 lines (ctrl+o to expand) 

Write(src/features/editor/utils/textPositionFin der.ts) 

_Wrote 23i lines to src/features/editor/u tils/textPositionFinder.ts 

/** 

* 文本定位工具

就像分身各自与敌人厮杀，一个硬拼近战，一个潜行远程制敌一样。

由于我们前面设置了提示音，所以我们就不必死盯着屏幕。当听到提示音时，就说明已经完成任务了。

![image](/book/efficiency/540037754b3c.jpg)


### 第7步：提交战果（Commit）

在 Claude Code 提示完成任务后，建议先在各自的终端窗口，把项目运行起来验证一下。

如果不符合预期，直接在对应的ClaudeCode会话中继续对话调整。

最后两个任务呈现的结果如下：

**任务1：LLM识别可配图句子**

![image](/book/efficiency/5f0148007acc.jpg)


```markdown
**欢迎使用 Marka**
```

这是一个可自动配图的 **Markdown 编辑器**。它旨在提供一个极简、无干扰的写作环境。

```markdown
**主要功能**
```

```txt
1. **多主题切换**: 在左侧栏点击 `Github`、`Night` 或 `Vue` 切换风格。
```

```txt
2. **实时预览**: 点击右上角的 `Eye` 图标查看纯预览, 或者 `Split` 查看分屏。
```

```txt
3. **专注模式**：点击底部状态栏开启 Focus 模式（模拟）。
```

```txt
4. **快捷键**：支持常用的 Markdown 语法快捷插入。
```

```markdown
**语法演示**
```

```txt
```

```txt
```
javascript
function hello() {
    console.log("Hello, World!");
} 
```

```txt
**列表**
```

**欢迎使用Marka**

这是一个可自动配图的Markdown编辑器。它旨在提供一个极简、无干扰的写作环境。

**主要功能**

多主题切按在左侧栏点击Github、Night 或Vue 切换风格。实时预览：点击右上角的Eye图标查看纯预览，或者Split查看分屏。

专注模式O点击底部状态栏开启Focus模式 (模拟)。

快捷键：支持常用的Markdown语法快捷插入。

**语法演示**


```javascript
function hello() { console.log("Hello, World!"); } 
```

**任务2：手动将图片插入文章**

**欢迎使用Marka**

这是一个可自动配图的Markdown编辑器

的写作环境。

![image](/book/efficiency/3b8eab412a16.jpg)


选择图片：

![image](/book/efficiency/09173d0e19da.jpg)


![image](/book/efficiency/9a9f5ae56ed8.jpg)


![image](/book/efficiency/86d70519216d.jpg)


点击查看：它旨在提供一个极简、无干扰的写作环境。

**主要功能**

多主题切换:在左侧栏点击 Github、Night 或 Vue 切换风格。实时预览:点击右上角的 Eye 图标查看纯预览，或者 Split 查看分屏。

#欢迎使用Marka

这是一个可自动配图的**Markdown 编辑器**。它旨在提供一个极简、无干扰的写作环境。

！[它旨在提供一个极简 无干扰的写作环境 相关图片 1](https://picsum.photos/400/400?random=415158)

##主要功能

1．**多主题切换**：在左侧栏点击‘Github`、`Night’或‘Vue’切换风格。

2．**实时预览**：点击右上角的‘Eye图标查看纯预览，或者‘Split’查看分屏。

3．**专注模式**：点击底部状态栏开启 Focus 模式 (模拟)。

4．**快捷键**：支持常用的 Markdown 语法快捷插入。

#语法演示

###代码块

```javascript function hello(）{ console.log("Hello，World!"); 

**欢迎使用Marka**

这是一个可自动配图的Markdown编辑器。它旨在提供一个极简、无干扰的写作环境。

![image](/book/efficiency/a75dc682d5f0.jpg)


确认无误后，我们需要在两个终端里分别执行前面封装的 /git-commit 命令。

**> /git-commit is runin..**

Allowed 3 tools for this command 

·基于代码变更内容，我来创建一个清晰规范的Git提交信息并提交代码：

Bash(git commit -m "feat(editor):实现句子识别与配图功能..L[feature_llm_recognizes_sentences ade7911] feat(editor)：实现句子识别与配图功能6files changed，520 insertions(+)，298

. Bash(git status) Lon branch feature_llm_recognizes_sentenc es Changes not staged for commit: 

. √提交成功！

已成功提交代码 提交信息：

**/git-commit is running..**

LAllowed 3 tools for this command 

·我来为您撰写一个更准确的提交信息：

Bash(git commit -m "feat(editor):实现句子高亮圆点图片插入功能.）L[feature_manually_insert_images 40e7ad3]feat(editor):实现句子高亮圆点图片插入功能8 files changed，883 insertions(+)，10... +12 

Bash(git status) LOn branch feature_manually_insert_images Changes not staged for commit: (use "git add <file>..." to update wha 

·完美！提交已成功完成。这次的提交信息更加准确和详细：

你会看到，两个ClaudeCode实例分别提交了新的代码记录。

就像分身把获取的经验沉淀下来，但这些经验还未回到本体。

### 第 8 步：经验回流 （Merge）

回到主项目根目录（不要在 .trees 目录下），让ClaudeCode在主会话中，替你合并代码并处理冲突。

1 "使用 Git Merge 命令合并.tree目录下的所有worktree，并自行处理任何可能的合并冲突。"

你会看到，Claude Code 会自动执行 git merge 操作，将所有独立的开发成果汇集到一起。

```txt
>使用GitMerge命令合并.tree目录下的所有worktree，并自行处理任何可能的合并冲突。
```

·我来帮你合并 .tree 目录下的所有 worktree。首先让我检查当前的 Git 状态和 worktree 配置。

- Bash.git worktree list) ▫ /Users/kvak/Labs/antigravity_demos/Marka  
ture/auto_add_images] / Users/kvak/Labs/antigravity_demos/Marka/.trees/features_lliM_recognizes_ssentences ade7911 [fea  
... +3 lines (ctrl+o to expand) 

·发现了2个 worktree 分支：

1. feature_llm_recognizes_sentences (ade7911) 

2. feature_manually_insert_images (40e7ad3) 

让我检查这些分支的详细信息和主分支：

如果有冲突，ClaudeCode会分析代码逻辑，尝试自动解决（比如保留双方合理的修改）。

·有合并冲突！让我查看并解决冲突：

Bash(git status) 

```txt
On branch feature/auto_add_images You have unmerged paths. (fix conflicts and run "git commit") ... +19 lines (ctrl+o to expand) 
```

·让我检查冲突文件：

```txt
- Read(src/features/editor/context/EditorContext.tsx)  
    - Read 173 lines 
```

```txt
- Read(src/features/editor/types.ts)  
  - Read 55 lines 
```

·我看到了冲突。需要在两个文件中同时保留两个功能。让我解决冲突：

```txt
Update(src/features/editor/context/EditorContext.tsx)  
Updated src/features/editor/context/EditorContext.tsx with 1 addition and 4 removals  
152 editorRef,  
153 highlightedSentences, setHighlightedSentences,  
154 isHighlightModalOpen, setIsHighlightModalOpen,  
155 - <----HEAD  
155 recognitionResults, setRecognitionResults,  
156 recognitionStatus, setRecognitionStatus,  
157 - isRecognitionWindowOpen, setIsRecognitionWindowOpen  
158 -  
157 + isRecognitionWindowOpen, setIsRecognitionWindowOpen,  
158 insertImageAfterSentence  
159 -> feature_manually_insert_images  
159 }>> 
```

最终合并完成，你会看到主分支拥有了“LLM识别”和“手动插图”两个功能的所有代码。

·合并完成总结

已成功合并.tree 目录下的所有 worktree:

**合并结果**

1. feature_llm_recognizes_sentences - 已合并无冲突

2.feature_manually_insert_images-合并时有冲突，已解决

**解决的冲突**

- EditorContext.tsx- 保留了两个功能的完整实现

- types.ts - 合并了接口定义，添加了 ImageResult 类型

**当前状态**

- 所有 worktree 分支已合并到 feature/auto_add_images

－冲突已解决并提交

- worktree已清理删除

-.trees 目录已移除

**最新提交**

0c3e1d0 Merge branch 'feature_manually_insert_images' into feature/auto_add_images 

bfd7laa Merge branch 'feature_llm_recognizes_sentences'into feature/auto_add_images 

项目现在包含了完整的句子识别、配图和图片插入功能。

就像分身解除，所有分身的经验（commit）被回传给本体，鸣人学习了各分身在战场上的所得一样。

**给读者的建议**

最后，关于使用GitWorktree并行开发，我有几条建议想送给你：

• CPU调度思维：Worktree的核心价值在于打破线性等待。当左边窗口的ClaudeCode正在写代码时，你应该立刻去右边窗口规划新任务。学会像CPU调度线程一样调度你的ClaudeCode，填满所有等待的空隙。

• 大胆试错：别指望自己能小心翼翼不改错文件。Worktree提供了物理隔离的沙盒，这让你在修改代码时心理负担降为零。既然影响不到主分支，那就大刀阔斧地去试错吧。

阅后即焚，保持清爽：影分身用完是要解除的。任务合并完成后，那些临时目录就成了废纸。养成随手清理的好习惯，不要让临时分身变成硬盘里的“僵尸” 。

