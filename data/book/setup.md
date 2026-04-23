旅行之前除了要做好攻略之外，也要准备好行囊。同样在开始 vibe coding 之旅之前，我们需要先做好编程工具环境等准备工作。本篇的内容就是为大家详细介绍应该如何准备各种编程相关的基础工具，为了避免过多工具/软件的引入可能会导致大家压力过大，因此本篇本着最小可用原则，提供给大家基础工具的安装与配置教程。帮助各位 0 基础的朋友也可以轻松踏上vibe coding之路

在 vibe coding 的旅程当中最核心的部分就是编程 IDE 了，因此第一部分我们重点给大家介绍几个主流的编程 IDE的安装与配置。

**工欲善其事，必先利其器**

对于我们每一位软件工程师来说，都要有自己顺手的 IDE 开发工具，它就是我们的武器。

一个好用的 IDE 不仅能提升我们的开发效率，还能让我们保持愉悦的心情，这样才是非常 Nice 的状态 ^_^

那么，什么是 IDE 呢 ？

IDE（Integrated Development Environment，`集成开发环境`）是含代码编辑器、关键词高亮、智能感应、智能纠错、格式美化、版本管理等功能于一身的 `"高级代码编辑器"`

每个 IT 工程师都要有自己顺手的 IDE，它是我们的武器

要理解无论使用什么 IDE 编写出来的代码，本质上都是 "白底黑字" 的，都是 "纯文字" 的

## Visual Studio Code

各种编程 IDE 中，首选推荐微软开源的 IDE 这就是大名鼎鼎的 VS Code（全称为Visual Studio Code），VS Code 以开源，易用以及插件生态支撑起非常强大的功能。因此我们首先推荐各位选择 VS Code 作为首选编程 IDE。它具有对 JavaScript，TypeScript 和 Node.js 的内置支持，并具有丰富的其他语言（例如 C++，C＃，Java，Python，PHP，Go），支持 Windows、Mac 和 Linux 系统。并具有以下优势：

轻量级但功能丰富

丰富的扩展插件生态系统

内置 Git 版本控制

智能代码补全

调试支持

免费开源

![](/book/setup/c0bc6cd94d8c.png)

### 下边我们开始玩转VSCode

### 访问官网下载安装包

首先，打开浏览器，访问 VSCode 官方网站：https://code.visualstudio.com/

### Windows 系统：

![](/book/setup/f9d50408b4bb.png)

### Mac系统：

![](/book/setup/1d9a74717ed7.png)

VSCode 官网会根据你的操作系统自动推荐合适的版本。你也可以点击按钮下方的 ，选择其他版本。

Windows 系统：提供 User Installer 和 System Installer 两种安装包

Mac 系统：提供 `.zip` 和 `.dmg` 两种安装包

Linux 系统：提供多种安装包格式

![](/book/setup/a95354a3da34.png)

点击下载按钮，等待浏览器完成下载过程。

**安装 VS Code**

**Windows 系统安装步骤**

运行安装程序：
找到下载的安装文件（通常是 `.exe` 文件），双击运行。

![](/book/setup/8acc4cb54e95.png)

阅读许可协议，勾选"我接受协议"，然后点击"下一步"。

选择安装位置：

安装目录文件所在，可选择、可默认

![](/book/setup/1da3396c7f3e.png)

选择你想要安装 VSCode 的文件夹路径，默认是在 C 盘的 Program Files 文件夹中。如果你想更改位置，可以点击"浏览"按钮选择其他路径。

选择开始菜单文件夹

你想在哪里放置程序的快捷方式，默认即可

![](/book/setup/f4424c03c824.png)

保持默认设置或自定义开始菜单中的文件夹名称，然后点击"下一步"。

选择附加任务

这一步，你可以选择一些额外的选项：

创建桌面图标

将"通过 Code 打开"添加到文件资源管理器菜单

将"通过 Code 打开"添加到目录资源管理器菜单

将 Code 注册为受支持的文件类型的编辑器

添加到 PATH（推荐）

建议全部勾选以获得更好的使用体验。

![](/book/setup/084bb4c1b6fa.png)

开始安装

点击"安装"按钮开始安装过程。

![](/book/setup/eed1a84ac2ee.png)

完成安装

安装完成后，如果你想立即启动 VSCode，保持"启动 Visual Studio Code"的复选框被勾选，然后点击"完成"。

![](/book/setup/106d528948b5.png)

### Mac系统安装步骤：

双击下载的 `.zip` 文件，解压缩后会出现VSCode 图标的应用文件Visual Studio Code。

拖拽安装，将 代VSCode 图标的应用文件Visual Studio Code拖到 Applications 文件夹图标上。

![](/book/setup/9c5aec986b40.png)

 等待复制完成，然后从 Launchpad 或 Applications 文件夹启动 VSCode。

## 安装 VS Code 必装插件

![](/book/setup/401a6652465f.png)

打开 VS code 之后进入登录页面，我们会发现VS Code 界面默认的语言是英语，对于英语不好的小白同学来说必然压力山大，那么我们需要安装的第一个插件必然首先就是中文语言包，一键让所有按钮说明从英文变中文，中文语言包安装非常简单。

首先，在最左侧侧边栏找到 Extentions 图标，然后点击进入插件应用商店

![](/book/setup/54707622b4d8.png)

在插件商店中输入 Chinese，找到中文（简体）然后点击 Install 开始安装。

![](/book/setup/a9c7c5cf79b5.png)

安装完成后会提示重启 VS Code 并更换语言，这里只要点击重启即可。

![](/book/setup/46dd9e34a1fc.png)

再次打开 VS Code，从登录界面可以看出中文语言包已经安装好了。

![](/book/setup/cc83e1401b3b.png)

VSCode 的强大之处在于其丰富的插件生态系统。以下是一些推荐的通用插件：

在搜索框中输入插件名称，点击"安装"按钮。以下是一些推荐的插件：

Live Server：提供本地开发服务器

Prettier：代码格式化工具

Python：Python  编程语言

Python Debugger： Python 的代码 debug 工具

Path Intellisense：路径自动补全

GitLens：增强 Git 功能

Code Spell Checker：拼写检查

Remote SSH：远程服务器 ssh 连接工具，可以实现在本地连接服务器修改代码

## ClaudeCode：终端形式的编码智能体

安装好了IDE之后,我们

全局安装 Claude Code

### Windows 系统：

安装

1.打开下载权限

![](/book/setup/aaef46d0394d.png)

2.下载安装

3.win键+r 输入cmd

![](/book/setup/461fd39c42be.png)

4.点击设置

![](/book/setup/ff98bf86b56d.png)

5.启动默认终端设置

![](/book/setup/9a6365fff67f.png)

6.修改termianl管理员运行权限

![](/book/setup/79fa02ef07ca.png)

7.保存配置退出

![](/book/setup/f234babac359.png)

8.启动终端

![](/book/setup/eead600aa9e9.png)

9.输入脚本运行解限命令，选择Y就可以

```sql
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Currentuser
```

或者

```sql
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Remotesigned
```

![](/book/setup/175775630c72.png)

**解限验证**出现方框这个RemoteSigned

```sql
Get-ExecutionPolicy -List
```

![](/book/setup/51b4db312933.png)

**后续环境安装目录统一在英文名称下，不能出现中文和#这类特殊字符**

10.下载

![](/book/setup/2f21b4640bde.png)

11.git安装

![](/book/setup/3b0678fd629c.png)

![](/book/setup/5c3c4c49e4c6.png)

![](/book/setup/0c57ae320be4.png)

![](/book/setup/cfde769b9d95.png)

![](/book/setup/70a8e38a583f.png)

![](/book/setup/3a9d40e780ab.png)

![](/book/setup/76bbc652d57a.png)

![](/book/setup/09376b495cab.png)

![](/book/setup/eee4e21d7963.png)

![](/book/setup/a06a77bef332.png)

![](/book/setup/695524a1feb0.png)

![](/book/setup/9fdb7b38f120.png)

![](/book/setup/51d878145e0a.png)

![](/book/setup/0d33a29987a2.png)

![](/book/setup/701d43cfcf89.png)

17.检查git安装成功否

```text
git -v
```

![](/book/setup/3705de81806b.png)

**git提示以下错误**

```swift
PS
claude
v24
Claude Code on Windows requires git-bash https://git-scconm/downloads/win).If installed but not in PATH. set environment variable po
sullar to: CLAUDE CODE GIT_BASH_PATH C:/Program Fles/Git\bin/bash.exe
tingtoyourbash.exe.
解决办法:
1、重新安装git,使用默认路径
2、设置CLAUDE_CODE_GIT_BASH_PATH变量的值,值就是git的安装路径(windows环境变量设
置的地方)
```

18.安装node.js

https://nodejs.org/zh-cn

![](/book/setup/6c9812e8370c.png)

![](/book/setup/1bf944d7664e.png)

![](/book/setup/2848ac209ec4.png)

![](/book/setup/2f3af72ff709.png)

![](/book/setup/e553511064bd.png)

![](/book/setup/965ffdfbf42b.png)

![](/book/setup/136fe73ddc7a.png)

![](/book/setup/bdd757d0c91c.png)

![](/book/setup/0c7217a3c13e.png)

![](/book/setup/3f9bc23eba85.png)

19.验证node安装

开始安装之前需要先确认本机是否已经安装好了node工具包。确认方法为，在搜索栏中输入终端，然后打开终端

![](/book/setup/05bce727b4aa.png)

然后在终端中输入命令：

```text
node --version
```

如果有输出版本号，说明你已经安装好node了。

![](/book/setup/a44c6e4733fd.png)

验证npm安装

```text
npm -v
```

![](/book/setup/9119f8564d5a.png)

到这一步我们node就已经安装好了.

打开终端，然后输入npm 安装命令：

```text
npm install -g @anthropic-ai/claude-code
```

![](/book/setup/d585775f4aaa.png)

如果拉取速度过慢,可以ctrl+C终止进程,然后输入命令:

```text
npm config set registry https://registry.npmmirror.com
```

然后再输入npm 安装命令：

```text
npm install -g @anthropic-ai/claude-code
```

或者直接拉取:

```text
npm install -g @anthropic-ai/claude-code  --registry=https://registry.npmmirror.com
```

验证安装成功

```text
claude -v
```

![](/book/setup/ee07492d2535.png)

### Mac系统：

同样在终端中输入 npm 安装命令

```text
npm install -g @anthropic-ai/claude-code
```

![](/book/setup/66e2334bcce0.png)

## 在 VS Code 中安装 Claude Code 插件

打开 VS Code 的插件商店，然后输入 Claude Code

![](/book/setup/98d4919d9106.png)

这里只需要选择第一个 Claude Code for VS Code 这个，然后点击安装即可。

安装完成后，在右上角会出现一个橘黄色的 Claude 图标，点击即可进入对话窗口。

![](/book/setup/0454976693e9.png)

第一次在 VS Code 上打开 Claude Code 插件会提示让你登录。

![](/book/setup/1204966f0244.png)

到这一步，我们就需要通过购买第三方的 API KEY 的方式来调用国内外最先进的 AI 模型来帮我们实现各种任务了。

## 申请购买第三方 API Key

我们推荐访问 302ai 来采购国内外最先进大模型的 API Key 服务。地址为：https://302.ai/

![](/book/setup/372766efa997.png)

首先点击左上角的登录/注册按钮，先注册一个账号

![](/book/setup/0f184ee6a3a3.png)

注册完成之后登录账号，找到右上角管理后台，然后点击左侧的API Keys，然后点击去充值先充值。

![](/book/setup/7677f4426e90.png)

这里我们先在 API 名称输入一个名字，比如：showmecoding，然后点击添加 API KEY

![](/book/setup/bb4088ab4c27.png)

添加完成后就会在，当前页面的下方看到刚刚生成好的apikey 了。

![](/book/setup/e1442a2f56af.png)

请妥善保管好你的 API KEY 不要轻易泄露给他人，除API KEY 之外还有一个 BASE URL 也需要保存：

正式环境：https://api.302.ai/v1/

国内环境：https://api.302ai.cn/v1/

以上 2 个 URL 地址，请根据自己的网络环境选择一个保存即可。

更多API Key 文档的详细教程可以参考：https://help.302.ai/docs/API-jiao-cheng

## 在 Claude Code 中配置 第三方API Key

### WIndows系统:

购买好 API Key 后，返回到我们 vscode 的页面，在设置中搜索：Claude Code: Environment Variables

![](/book/setup/9822c99a2340.png)

然后点击这个在 setting.json,在打开的文档中编辑"claudeCode.environmentVariables"部分的环境变量

![](/book/setup/edaf03c475dc.png)

可以先复制如下内容,然后将ANTHROPIC_BASE_URL和ANTHROPIC_AUTH_TOKEN替换为前面从302AI购买的API Key和URL.

```json
  "claudeCode.environmentVariables": [
      {
          "name": "ANTHROPIC_BASE_URL",
          "value": "https://open.bigmodel.cn/api/anthropic"
      },
      {
          "name": "ANTHROPIC_AUTH_TOKEN",
          "value": "sk-c9e..."
      },
      {
          "name": "ANTHROPIC_MODEL",
          "value": "GLM-4.7"
      },
      {
          "name": "ANTHROPIC_SMALL_FAST_MODEL",
          "value": "GLM-4.7"
      }
  ]
```

这几个环境变量具体含义为:

```text
  1. ANTHROPIC_BASE_URL: 设置为302AI的API URL地址(如果是购买的智谱AI的coding plan用户可以不需要更改)
  2. ANTHROPIC_AUTH_TOKEN: 从302AI或者智谱AI coding plan购买API Key
  3. ANTHROPIC_MODEL: 主模型设置为GLM-4.7
  4. ANTHROPIC_SMALL_FAST_MODEL: 快速响应模型也设置为GLM-4.7
```

配置完成后,重新启动VS code,即可直接对话了.

![](/book/setup/e76951e13a6e.png)

### MacOS/Linux系统:

Mac系统用户可以在vscode最顶上的搜索栏中输入:~/.claude/settings.json,然后在vscode 中编辑,Linux系统可以用nano编辑器在终端中打开~/.claude/settings.json直接编辑

![](/book/setup/48e944edc461.png)

在打开的setting.json中复制粘贴如下内容,然后进行修改:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.302ai.cn/v1/",
    "ANTHROPIC_AUTH_TOKEN": "sk-HJ……",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "GLM-5",
    "CLAUDE_CODE_SUBAGENT_MODEL":"GLM-5"
  }
}
```

## 安装使用ccswitch配置Claude code

ccswitch是一个自动化帮助我们配置Claude code工具,方便对命令不熟悉的同学用最简单的方式实现APIkey的接入.

CC Switch 提供一个桌面应用来管理所有五个 CLI 工具。无需手动编辑配置文件，获得一个可视化界面，一键将供应商导入应用，一键在不同的供应商之间进行切换，内置 50+ 供应商预设、统一的 MCP, SKILLS 管理以及系统托盘即时切换功能——所有操作都基于可靠的 SQLite 数据库和原子写入机制，保护你的配置不被损坏。

下载地址:https://github.com/farion1231/cc-switch/releases/tag/v3.12.1

![](/book/setup/11fd09e93a6e.png)

windows用户选择红色安装包下载安装

mac用户选择蓝色安装包下载安装

![](/book/setup/10735d6de02d.png)

如前述在302官网上获取apikey,然后在cc-switch填写

![](/book/setup/14be6add3d56.png)

![](/book/setup/750fb8016c3d.png)

![](/book/setup/5ad820097ddc.png)

![](/book/setup/e11f1c7b2dc8.png)

![](/book/setup/c5714657b089.png)

```json
{
  "autoUpdatesChannel": "latest",
  "env": {
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "ANTHROPIC_BASE_URL": "https://api.302ai.cn/v1/",
    "ANTHROPIC_AUTH_TOKEN": "sk-HJ……",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "GLM-5",
    "CLAUDE_CODE_SUBAGENT_MODEL":"GLM-5"
  }
}
```

到这一步我们准备工作就已经基本完成了
