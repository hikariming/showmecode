**里程碑一：让世界看到你**

先把现有的喵宇宙部署到真正的网址上。不需要买服务器，不需要配置环境，几分钟就能搞定。

**里程碑二：给代码买份保险**

当你准备对代码进行"伤筋动骨"的改造时（比如从本地存储换到云端数据库），最怕的就是改坏了回不去。这时候Git就派上用场了⸺它是程序员的"时光机"，让你可以随时回退到之前的版本。

**里程碑三：给数据找个家**

告别浏览器那5MB的狭小空间，把猫咪信息存到真正的数据库里。你会理解什么是前后端分离，为什么需要这种架构。

**里程碑四：连接前端与后端**

修改代码让页面能从数据库读取数据。这个过程中，你会学习如何处理加载状态、网络错误⸺这些是区分"玩具"和"产品"的关键细节。

**里程碑五：每个人都有自己的领地**

实现用戶系统，让每个人只能管理自己的猫咪。你会深入理解安全策略，学习如何保护用戶数据。

**里程碑六：让社区活起来**

添加点赞和评论功能，让用戶之间可以互动。一个真正的社区就此诞生。

**里程碑七：颜值即正义**

重构 UI，让页面在手机和电脑上都能完美展示。学习响应式设计，告别"AI 味儿"的界面。

准备好了吗？那么让我们开始吧。

## 1. 让世界看到你

还记得入门章里你是怎么看自己的作品吗？双击打开HTML文件，或者用LiveServer预览。这种方式只适合你自己看⸺朋友要想看，你得把整个文件夹发过去，还得教他怎么打开。

真正的网站应该有一个网址，就像 https://www.miao.ai 这样。任何人只要在浏览器输入这个地址，就能看到你的作品。

如果按照传统的软件开发思路，这时候你就需要租一台云服务器，把生成好的网页和图片上传到服务器，配置可访问的端口，再购买一个域名，然后把域名的解析地址指向自己的服务器，为了让浏览器没有安全警告，可能还要申请一个https证书。听起来就头大是吧？

好在，现在有很多现成服务，帮我们简化这些事儿：比如 Vercel, Cloudfare, Netlify, Github 等等，因为后面咱们还需要用github来管理版本，这里就基于githubpage来发布自己的页面吧。

### 1.1 部署到 GitHub Pages

GitHubPages是GitHub组织提供的免费网页托管服务。它能把你的HTML文件变成一个真正可以访问的网站，就像打开百度、淘宝那样。

不过在启用githubpages之前，我们需要先把代码上传到GitHub。别担心，这个过程比你想象的简单得多。

### 1.1.1 第一步：注册 GitHub 账号

如果你还没有 GitHub 账号，先去 github.com 注册一个，

访问这个地址：https://github.com，点击右上角的"Signup"按钮，可以用个人邮箱，或者谷歌、苹果的三方账号注册一个新用戶。

**Sign up for GitHub**

![image](/book/webapp/b420a24f7651.jpg)


Continue with Google 

![image](/book/webapp/953f9ecc0eb5.jpg)


Continue with Apple 

or 

**Email**

**Password***

Password 

**Username***

**Your Country/Region**

Japan 

**Email preferences**

▫ Receive occasional product updates and announcements 

Create account > 

### 1.1.2 第二步：安装 GitHub CLI

GitHubCLI是GitHub官方提供的命令行工具。安装它并不是必须的，但是有了它以后，很多操作CC就可以帮我们做了，省去了在浏览器里头到处找设置的麻烦。

安装非常简单，对Claude说：

Claude Code 会根据你的操作系统自动执行安装命令：

- macOS：使用 Homebrew 安装

- Windows：使用 winget 或下载安装包

-Linux：使用包管理器安装

安装完成后，你还需要登录你的GitHub账号。对Claude说：

![image](/book/webapp/14a646398d16.jpg)


**帮我登录 GitHub CLI**

CC会引导你完成登录流程，列出一系列的选项，你只需要依次选择：

1. 选择 `GitHub.com`

2. 选择 `HTTPS`

3. 选择 `Yes` (Login with a web browser)

4. 复制终端显示的一次性代码 (One-time code)

5.按回车打开浏览器

6.在浏览器中粘贴代码并授权

**一个小插曲：授权卡住了？**

这里我遇到过一个坑，值得和你分享一下。当CC打开浏览器让你授权GitHubCLI时，我兴冲冲地点击了"Authorize"按钮，结果页面跳转到localhost，显示"无法访问此网站"。当时我愣了一下⸺这是啥情况？

其实这只是GitHubCLI在本地监听授权回调，但有时候浏览器和命令行之间的"接力棒"没传好。解决办法很简单：回到CC的终端窗口，按 Ctrl+C 取消当前流程，然后重新运行登录命令。第二次通常会顺利很多。

还有另一种情况：CC打开浏览器后，你发现需要重新登录GitHub。别担心，这很正常⸺可能CC启动的是系统默认浏览器，而你之前是在另一个浏览器里注册的。登录一下就好了，不影响后续使用。

**验证安装：**

想确认是否安装成功，可以对Claude说

![image](/book/webapp/7ddca39cccfd.jpg)


**检查 GitHub CLI 版本**

如果看到版本号(比如 gh version 2.40.0 )，说明安装成功了。

### 1.1.3 第三步：推送项目到 GitHub

现在要把你的喵宇宙项目上传到GitHub。对CC说：

![image](/book/webapp/30f382e75c8f.jpg)


帮我在GitHub上创建一个新仓库，名字叫miao，描述为"喵宇宙，猫猫的展示舞台"，然后上传

实际上，CC偷偷地执行了好多命令，比如：

```txt
git status #查看项目状态
```

```txt
git add . # 添加所有修改
```

```txt
git commit -m 'xxxxxxxx' # 提交一个版本
```

```txt
gh repo create miao --public --source=. --remote=origin --push #创建项目的远端仓库
```

```txt
git push #推送代码到远端仓库
```

不过咱们这里不用深究

Claude会自动帮你完成所有操作：创建仓库、添加文件、提交代码。完成后会给你一个链接，类似https://github.com/你的用戶名/miao 。

点击链接看看⸺你的代码已经在互联网上了！现在即使电脑坏了，代码也安全地保存在云端，这就是代码托管的意义。当然更美妙的还在后面。

### 1.1.4 第四步：启用 GitHub Pages

刚才还仅仅是把代码上传到了github，现在要真正启用免费的网站托管了。我们对cc说：

![image](/book/webapp/b566caa068f9.jpg)


把喵宇宙项目发布成人人可以访问的网站

CC会利用刚刚安装好的githubcli，调用一系列命令，来完成发布，可能要花上几分钟的时间，最后告诉你一个类似这样的网址： https://你的用戶名.github.io/miao/ 。

当然这里不借助CC，你也可以自己操作：

1：进入git设置页面

在仓库页面顶部，找到并点击 Settings（设置）标签。

2：找到 Pages 设置

在左侧菜单中，向下滚动找到Pages选项，点击进入。

3：选择发布源

在 "Source"（源）部分：

1. 点击下拉菜单，选择 Deploy from a branch（从分支部署）

2. 在 "Branch" 下拉菜单中选择 main

3.文件夹选择/(root)（根目录）

4. 点击 Save（保存）

4：等待部署完成

保存后，GitHub 会自动开始部署。页面顶部会显示：Your site is live at https://你的用戶

名.github.io/miao/

通常需要1-3分钟完成部署。你可以刷新页面查看状态。

5：访问你的在线网站

可以看到还挺繁琐的，是吧？这就是为什么我们前面要装一下githubcli，让CC帮我们完成这些繁琐做的步骤。

成就感时刻：你的猫咪展示卡片出现在了一个真正的网站上！

![image](/book/webapp/cfd386927365.jpg)


任何人只要有这个链接，都能访问你的作品。快把它发给朋友们吧！

咱们这里只是完成了最基础的部署，如果想了解更多“部署”方案，怎样适配不同的项目，海外和国内的区别，以及更高阶的知识，请移步《上线篇-让世界看到你的作品》。

## 2. 给代码买份保险

现在你的喵宇宙已经上线，朋友们都能看到可爱的猫咪了。但玩过一会儿后，你可能会发现一个尴尬的问题：怎么大家上传的照片和编辑的信息，彼此都看不到呢？

这是因为咱们之前，照片和信息都是保存在浏览器缓存中的，这些缓存仍然在本机，互相无法共享，在编程的世界，一切信息都是数据，所以为了能互相看到彼此的信息，我们还要实现数据的共享。

要解决这个问题，我们需要做一场"大手术"：把数据从浏览器搬到云端数据库。这会涉及大量代码改动，万一改坏了怎么办？

![image](/book/webapp/433b35696373.jpg)


版本管理（VersionControl）就是为了解决这个痛点而生的。在编程中，我们使用一个叫Git的工具来做这件事。Git是一个免费的版本管理工具，几乎所有程序员都在用它。这是一个命令行工具，不过ClaudeCode内置了Git支持，所以你完全不需要记忆那些复杂的命令。

### 2.1 为什么现在才学Git？

Git的操作有点复杂，所以我们一开始没有引入，但现在是学习它的时候了⸺因为你正面临一个真实的风险场景。Git就像游戏的存档功能：打Boss之前先存个档，失败了就读档重来。

现在我们要对代码进行"伤筋动骨"的改造，为了防止改坏了回不去，让我们启用这台"时光机"。

### 2.2 Git 的基本概念

Git虽然有很多复杂的功能，但它的核心概念却很简单。每次你完成一个小功能，觉得"嗯，这个版本不错，值得保存"，就可以做一次"提交"（Commit），就像按下游戏的存档按钮。提交时，你可以写一段说明，比如"添加了照片上传功能"，这样以后回看历史记录时，就能知道每个版本做了什么。所有的提交会形成一条历史记录链，你可以随时查看，甚至回退到任何一个之前的版本。

![image](/book/webapp/8101fc7a7923.jpg)


具体怎么操作呢？

假设你现在的代码已经是一个稳定的版本，我们先做个"存档"。对CC说：

![image](/book/webapp/a9469018c53f.jpg)


帮我提交当前代码到Git，提交信息写："V1.0-基础版本上线"

CC会自动帮你完成所有操作⸺初始化Git仓库、添加文件、创建提交。整个过程你甚至不需要知道背后发生了什么。

如果你想查看之前做过哪些提交，可以说：

![image](/book/webapp/0d44483cdef7.jpg)


显示Git提交历史

你会看到一个列表，每一项都是一次提交，包含时间和说明信息：

1 IN: git log --oneline --decorate --graph 

OUT:2 * 9d49a2e (HEAD -> main) V1.0 - 基础版本上线

万一真的需要回退到之前的版本，也很简单，告诉CC：

![image](/book/webapp/786a150c8483.jpg)


回退到上一个提交

就可以了。

以后做新功能，建议养成“小步快跑”的习惯：每完成一个小改进就提交一次，甚至改个小bug也要做，不要等到做了很多功能才一次性提交。提交信息要写清楚做了什么，比如“添加了照片上传功

能”就比“更新代码”要好得多。这样，当你需要回看历史或者回退版本时，就能快速找到想要的那个点。

Git的能力远不止于此，它有一套很漂亮的多人协作概念，可以帮我们管理超大型的项目，想深入了解git 使用的同学可以查看 Scott Chacon 和 Ben Strab 写的书《Pro Git》或者知乎的这一篇长文档。

### 2.2.1 与 github 的关系

看到这里，你可能会有点晕：你这两章又是git，又是github，又是 github page 的，他们到底什么关系啊？这里就解释一下：

Git就像你手里的草稿本。写论文时你不会直接在正式稿纸上写，而是先在草稿本上反复修改、涂涂画画，记录每一次的改动。Git就是代码的草稿本，它记得你删了哪段、加了哪句，改错了还能翻回之前的版本。

GitHub像是老师的档案柜。你把草稿本上的定稿誊抄好，交上去存档。这样一来，哪怕你的草稿本丢了，档案柜里还有备份。而且如果有小组作业，大家都能从档案柜取阅、各自修改后再交回来。

GitHubPages则是班级门口的展示墙。老师从你交上去的论文中，挑出一部分直接贴到墙上，路过的人都能看到。你不需要再单独打印海报⸺只要论文在档案柜里，展示墙就会自动更新。

![image](/book/webapp/c6d7b06b8b91.jpg)


咱们第1章先把代码上传到了github，又通过githubpages搭建了网站，让所有人都可以访问；这一章在本地装了git，终于每一次修改都可以保存历史记录了。

## 3. 给数据找个家

现在来解决数据共享的问题。我们需要一个"云端大脑"⸺所有用戶的猫咪信息都保存在那里，任何人访问网站时，都能从这个大脑里读取数据。

### 3.1 前后端分离架构

这时候就要引入前后端的概念了。简单来说，我们要把自己的程序拆成两部分，一部分用来展示，还是运行在浏览器中，称为前端；一部分用来存储，放在一台共享的机器上（一般叫服务器），称为后

端。这样你和朋友们就可以通过这台服务器共享所有的猫猫照片了。

![image](/book/webapp/4a840bfd396a.jpg)


从图里可以看出：只要数据都存在中间这个服务器上，你和朋友们就可以共享所有猫猫照片了。

小贴士：你应该经常从新闻里看到，互联网企业招聘什么“前端程序员”、“后端程序员”之类的，说的就是他们各自擅长的编写在不同地方运行的程序。不过今天咱们这个ai打工人，可是个前后端通才，可以把所有工作都交给它。

### 3.2 数据存储

开始下一步之前，我们先思考一下，到底有哪些数据需要保存呢？

• 猫咪的名字

猫的信息，包括品种、年龄、性别、描述和标签

. 照片

这都是我们要保存的内容，哪怕不懂编程，凭直觉也能感觉到它们有些不同：名字和信息都是文本和数字信息，而照片是像素组成的图片。通常来说，保存文本和数字信息用到的技术叫数据库，而保存图片这类文件的技术叫做对象存储。

### 3.2.1 数据库存储（Database）

数据库里面保存数据的基本单元叫做表（table），它和我们平时使用的excel表很像，也是分为行列的，比如咱们的猫猫信息，就可以用这样的表来存储：


cats


<table><tr><td>编号</td><td>名字</td><td>品种</td><td>年龄</td><td>性别</td><td>描述</td><td>标签</td></tr><tr><td>1</td><td>小橘</td><td>橘猫</td><td>2</td><td>男</td><td>性格温顺，喜欢晒...</td><td>温顺、亲人、吃货</td></tr><tr><td>2</td><td>雪球</td><td>英短</td><td>1</td><td>女</td><td>优雅的小公主...</td><td>优雅、安静</td></tr></table>

### 3.2.2 文件存储（File Storage）

文件存储，也叫对象存储，它非常简单，就是前端可以把文件上传，服务器接收这个文件以后，保存起来，并且给它分配一个url 地址，这样所有人就都能从浏览器中访问这个文件了。URL大概长这个样子：

```html
https://vswrhnmhumfxgfrwpfwc.supabase.co/storage/v1/object/public/cat-images/6/1762661050243_tw65sc.png 
```

你可能会有一点疑惑：这个url，跟我们在GithubPage上部署自己的网页，获取的url很像啊，只是长一点？对，实际上他们的存储和访问技术也是很像的，HTML页面也是一个文件嘛。不过它们的使用场景还是有些不同：

之前我们的HTML页面，是由程序员（就是你呀）编写并上传的，一般用戶（比如你的朋友们）只是访问和查看。通常上传不会很频繁，毕竟需要编码更新了才会有一次上传嘛；总的文件数也不会太多；所以通过gitaction来处理就足够了，哪怕普通用命令行上传也完全够用

而对象存储的内容不同：设想一下，如果咱们的“喵宇宙”项目有了千百万的用戶，每时每刻都有人想上传自己爱喵的照片，就需要有专门的技术来应对这种非常频繁又大量的文件保存了，这就是对象存储的意义。

仔细看上面的url的话，还会发现：上传后的文件名，都有很长的一串字符

1762661050243_tw65sc.png ，看上去没什么意义，这也是对象存储的标准做法：通过特定的算法，保证上传后的文件，有自己“唯一”的名字，这样成千上万的文件之间就不会重名。

小贴士：我们以后看到技术相关的文章，可能会遇到一个词儿，叫数据持久化，其实它就是我们前面提到的数据存储⸺因为只有存起来，数据才不会消失，下次启动程序的时候，还能看到它们。这个词儿，是从作用的角度来表达数据存储的。从这个意义上说：之前我们提到的浏览器本地存储，本章节讲到的数据库和文件，都属于数据持久化的范畴，只是持久化的位置不同。

### 3.3 选择 Supabase

经典编程模式中，我们需要写后端程序来实现对数据库和对象存储的控制，然后再开放API接口给前端程序，相互沟通，整个过程变得比较复杂（当然也是有价值的，我们最终会把项目变成这种模式，但目前还不需要）。

对于很多练习性的小项目来说，我们难免会想：就不能让前端程序直接连接数据存储么？可以的，有需求就有供给：一些云服务厂商，就提供了这样面向互联网，前端可以直接访问的存储服务，其中的佼佼者就是supabase。可以说，几乎所有vibecoding的云服务商，都接入了supabase的数据存储能力，它就是ai编程时代的标配。

### 3.3.1 创建 Supabase 项目

1. 访问 supabase.com，用 GitHub 账号登录（方便权限联通）

2. 创建一个组织，比如叫 showmecode ，类型选 Personal ，付费计划选 Free

<table><tr><td colspan="2">Create a new organization
Organizations are a way to group your projects. Each organization can be configured with different team members and billing settings.</td></tr><tr><td rowspan="2">Name</td><td>showmecode</td></tr><tr><td>What&#x27;s the name of your company or team? You can change this later.</td></tr><tr><td rowspan="2">Type</td><td>Personal</td></tr><tr><td>What best describes your organization?</td></tr><tr><td rowspan="2">Plan</td><td>Free - $0/month</td></tr><tr><td>Which plan fits your organization&#x27;s needs best? Learn more.</td></tr><tr><td>Cancel</td><td>Create organization</td></tr></table>

3. 在组织内创建项目（Project），继续叫 miao ，设置密码，地区选择 Asia Pacific （亚太）

![image](/book/webapp/c17ee39d522e.jpg)


### 3.3.2 创建数据表

现在有了project，我们就可以创建数据表了。前面提到过，每个数据表就像我们的excel表格一样，每一列代表一种信息，每一行表达一条数据。我们往往先设计好表格，知道应该保存哪些信息，然后才逐渐一行行保存数据，就像下面这样，先定义一个空表格。

<table><tr><td>编号</td><td>名字</td><td>品种</td><td>年龄</td><td>性别</td><td>描述</td><td>标签</td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>

Supabase提供图形界面，让我们来定义表格，不过仍然有点复杂，好在数据库也有自己的语言，叫做SQL，即结构化查询语言。它是长得和英语很像，专门用来定义数据表和完成数据的增删改查（CRUD）。既然是语言，当然也可以找ai来帮忙，让它充当我们的”翻译官“。

注意这里我们引入了一个概念叫“主键”，它其实就等于上面表格里的编号，这些编号应该是唯一的，可以是数字，也可以是一长串字符（防止重复），因为数字比较简单，可以在插入数据的时候自动增长，我们这里特意告诉它用数字。

<table><tr><td>主键
编号</td><td>名字</td><td>品种</td><td>年龄</td><td>性别</td><td>描述</td><td>标签</td></tr><tr><td>1</td><td>小橘</td><td>橘猫</td><td>2</td><td>男</td><td>性格温顺，喜欢晒...</td><td>温顺、亲人、吃货</td></tr><tr><td>2</td><td>雪球</td><td>英短</td><td>1</td><td>女</td><td>优雅的小公主...</td><td>优雅、安静</td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>

**于是我们得到类似这样一段语句：**

```sql
1 -- 创建猫咪信息表  
2 CREATE TABLE cats（  
3 id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, -- 编号  
4 name varchar NOT NULL, -- 名字  
5 breed varchar, -- 品种  
6 sex smallint CHECK (sex IN (1, 2)), -- 1=公，2=母  
7 age numeric, -- 年龄  
8 tags varchar, -- 逗号分隔的标签字符串  
9 description text, -- 描述  
10 images text[, -- 图片 URL 列表  
11 created_at timestamp DEFAULT NOW(), -- 创建时间  
12 updated_at timestamp DEFAULT NOW() -- 更新时间  
13 );  
14  
15
```

从英文的含义也可以看出，这里给每个列起了个名字，并且告诉数据库，它们的类型，下面的给出了详细的解释，现在不想看也没问题，可以略过：

id：编号，是每条数据的唯一标识（也就是提示词里的“主键”），这里我们选择用简单的数字来表示。

• name：猫猫的名字，类型选择varchar，就是长度不确定的文字，后面字数不定，又不是太长的文字，都可以用这个类型。这里多了一个NOTNULL标识，表示在插入一行数据的时候，名字必须得有，不允许记录一只没有名字的猫猫。

• breed：品种，也选择 varchar。（要想支持用戶选择品种的话，这里还需要更复杂的设计，不过目前暂时保存名字就好了）

• age：年龄，类型选择numeric，因为年龄不一定是整数，这里就不选int开头的类型了。

• sex：性别，类型选择int2。你可能有点奇怪，男/女不是文本么，为什么要选数字类型？这其实是常见的习惯，当可选项只有两个的时候，用0和1来表示，会简单清晰（什么？你觉得性别有128种？这不在本项目的考虑范围）。

description：描述，类型选择text，这里不用varchar，是因为描述有可能很长，而且通常不会用描述的文字来查找

• tags：标签，类型选择 varchar

created_at：创建时间，一般我们都会想记录一下数据是什么时候添加到数据库的，它有个缺省值now()，说明我们在保存数据的时候，不需要自己设置这个字段的值，supabase数据库会自动用当时的时间来存储

updated_at：和创建时间类似，只不过记录的是数据变更的时间

• images：用来保存照片的位置（注意不是照片文件，文件本身是要放在对象存储的），它的类型有点特别，虽然选择了text，齿轮图标激活的窗口里，还要选中”DefineasArray“，表示可以存储多张照片的位置：

在 supabase 的页面中侧边导航栏中，找到 SQL Editor：

![image](/book/webapp/5d230a889ea4.jpg)


点击 + ，创建一个空白标签页：

![image](/book/webapp/32e0a1e22aca.jpg)


把ai刚刚生成的语句贴进去，点击"run"，创建表的任务就完成啦。

![image](/book/webapp/ec87bd0b4e85.jpg)


小贴士：数据表和它的字段定义，也叫做数据结构，一般来说，在正式开发一个项目之前，我们需要先把数据结构定下来，它就是我们的“定海神针”，相当于一句话里的名词。

现在这个数据表，我们已经可以保存数据啦，它右侧会展示一个unrestricted图标，表示没有被权限设置保护起来，拿到链接的任何人都可以访问和修改，不过现在还不用担心。

![image](/book/webapp/e453f6c2df92.jpg)


cats 

Unrestricted 

点击这个表名，就能查看里面的数据，当然，现在还是空的。

如果我们点击这个表名右侧的三个竖向点，选择"Edittable"，就能看到刚刚创建的表结构了：

![image](/book/webapp/caf6abe3d49c.jpg)


![image](/book/webapp/8ff0186067eb.jpg)


可以看到，它跟我们生成语句中的列名，是一一对应的。

### 3.3.3 创建对象存储

回到项目界面，选择 "Storage"，进入存储的设置：

Last 60 minutes <Statistics for last 6O minutes 

![image](/book/webapp/7d05d689e8ca.jpg)


**Database**

2 

![image](/book/webapp/150d29a4b2fc.jpg)


![image](/book/webapp/2517fad60a49.jpg)


**Auth**

0 

![image](/book/webapp/3904737d8bf9.jpg)


**Storage**

Storage Requests 

6 

![image](/book/webapp/45fe1fd40f44.jpg)


![image](/book/webapp/da0d83af9f06.jpg)


**Realtime**

0 

需要在这里，给自己创建一个桶（bucket），所谓桶，就是个文件的容器，大概可以看做windows电脑上的C盘、D盘吧。

**Files**

General file storage for most types of digital content 

Buckets 

![image](/book/webapp/6e182df9cdf8.jpg)


![image](/book/webapp/34b417417b9b.jpg)


Sorted by created at 

![image](/book/webapp/46c65464555f.jpg)


Docs 

![image](/book/webapp/3a4fb90ff770.jpg)


New bucket 

NAME 

POLICIES 

![image](/book/webapp/96260e50b088.jpg)


cat-images 

![image](/book/webapp/644eb705199d.jpg)


我们给这个新桶起名叫 "cat-images"，打开 "public" 开关，让所有人都可以上传下载。

![image](/book/webapp/316df467cc36.jpg)


## 4. 连接前端与后端

现在准备工作都已经完成，可以修改页面代码，把图片保存到对象存储，信息保存到数据库啦。

### 4.1 更新 PRD 文档

首先我们来修改prd.md，把刚才新建的数据库表，补充到文件中：


更新 PRD.md


```txt
1 ### 连接串  
2 ...  
3 postgreSQL://postgres:[YOUR_PASSWORD]@db.xxxxxsupabase.co:5432/postgres  
4 ...  
5 ### 表结构  
6 `'sql  
7 create table publiccats (
```

```txt
8 idbigintgeneratedby defaultasidentitynotnull,   
9 namecharactervaryingnotnull,   
10 breed character varying null,   
11 agenumeric null,   
12 sexsmallint null,   
13 description text null,   
14 tags character varying null,   
15 created_at timestampwith time zone not null default now(),   
16 updated_at timestampwithouttime zone null default now(),   
17 images text[]null,   
18 constraintcat_pkeyprimarykey(id)   
19 ）TABLESPACEpg_default;   
20 RLS策略配置：   
22 数据库已配置公开访问策略，允许所有人读写。
```

注意：连接串的具体值在 Supabase 后台 **Database > Connect** 里获取。

![image](/book/webapp/49b2e7828cb9.jpg)


表达表结构的 SQL 语句，刚才是 ai 帮我们生成的，我们也可以在 cats 表菜单项的 "copy tableschema" 中获取：

![image](/book/webapp/3c1a56a8fb27.jpg)


SQL是一种数据库专用的语言，告诉数据库如何查询和处理数据。几乎所有的关系型数据库，都支持标准的SQL语言。想初步了解的同学，可以阅读廖雪峰老师的SQL简介。

### 4.2 让 AI 改造代码

### 4.2.1 连接数据库

现在我们就可以让CC做一次深度修改了：

有的时候，就是“话越少，事儿越大”：这次CC工作了很久，终于得到一个新页面，它在启动的时候，会首先初始化数据库连接：


```txt
1 //Supabase configuration - Supabase 配置  
2 //TODO：请在Supabase Dashboard > Settings > API中获取正确的anon key  
3 //参考supabase-config-guide.md文件获取详细步骤  
4 const SUPABASE_URL = 'https://vswrhnhmhumfxgfrwpfwc.supabase.co';  
5 const SUPABASE_ANON_KEY = '【supabase annon key here」；//请替换为实际的anon key  
6  
7 // Initialize Supabase client - 初始化Supabase客户端  
8 let supabase = null;  
9 let supabaseEnabled = false;  
10  
11 try{  
12 if (SUPABASE_ANON_KEY != '【supabase annon key here】')  
13 {  
14 supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);  
15 supabaseEnabled = true;  
16 console.log('√Supabase客户端已初始化');  
17 } else{  
18 console.warn('△Supabase未配置，请在代码中设置SUPABASE_ANON_KEY');  
19 console.warn('参考supabase-config-guide.md获取配置方法');  
20 } catch (error){  
21 console.error('Supabase初始化失败：', error);  
22 }
```

### 4.2.2 关于安全

细心的你，如果看了上面访问数据库的代码，可能会想："把密钥直接写在代码里，这安全吗？"这是个好问题。Supabase提供的是AnonKey（匿名密钥），它本身就是为了公开使用设计的，只能访问你允许公开的数据。但即便如此，养成"环境变量"的意识也很重要。

在真实的生产项目中，我们会把这类配置放在环境变量里，而不是直接写在代码中。虽然前端代码最终还是会暴露这些密钥（因为浏览器需要它们来发起请求），但这种做法至少让配置管理更清晰，也方便在不同环境（开发/测试/生产）之间切换。

目前我们使用公开访问策略（RLS未启用）来快速验证功能。在实际产品中，你应该配置行级安全策略（RLS），限制用戶只能访问自己的数据。我们稍后就会做这个改进。

### 4.2.3 排错时刻：数据库连不上？

刚刚改造完数据库链接的时候，我期待刷新，结果⸺一片空白。浏览器控制台（按F12打开）里赫然显示一行红字：

Supabase 初始化失败: Invalid API key1

"什么情况？我明明复制了 anon key 啊？"

当然继续求助于CC：

![image](/book/webapp/3013f49adfc2.jpg)


帮我检查一下 Supabase 配置，页面显示"Supabase 初始化失败: Invalid API key"

CC让我仔细检查代码，结果发现自己在粘贴的时候，不小心把key末尾的字符截断了⸺原来复制的时候漏掉了最后几位。我把key重新从Supabase后台复制了一遍，这次特意多选了几个字符确认选中了全部内容，粘贴进去，刷新页面，错误解决了。

还有一个常见的坑：anonkey和projectURL不匹配。Supabase会在你创建项目时给你一组配置，但如果你同时开了多个项目，很容易搞混。如果你看到 Failed to fetch 或 404 Not Found的错误，先检查一下URL是不是对应当前这个项目。

### 4.2.4 加载数据：从数据库读取

加载猫猫数据的时候，也不再从浏览器缓存中读取，而是直接读数据库了。看着改造后的代码，你可能会觉得有些陌生。与其我直接讲解每一行代码，不如教你一个更实用的方法：让AI当你的代码向导。

### 4.2.4.1 第一步：建立整体认知

与其直接跳进代码的海洋，不如先让AI给你一个鸟瞰图。打开你的 index.html 文件，然后问AI：

![image](/book/webapp/de6625cee8a1.jpg)


这个文件看起来好大，能帮我理解一下整体结构吗？就像给一个完全不懂代码的人解释样。

CC会很贴心地通过比喻和类比，帮你快速理解：

当然可以！想象这个文件就像一场舞台剧。当大幕拉开，有三个团队默契配合，为观众呈现精彩的演出：

HTML（舞台监督）：负责搭建整个舞台的骨架⸺哪里放登录按钮、哪里展示猫咪卡片、哪里是评论区。就像舞台监督拿着蓝图，告诉工人哪里搭景、哪里放道具。

CSS（服装造型师）：负责所有视觉呈现⸺卡片用什么颜色、按钮有没有圆角、字体多大、间距多少。就像造型师为演员设计服装、化妆、打光，让整个舞台看起来赏心悦目。

JavaScript（导演）：负责编排所有动作和剧情⸺点击按钮会触发什么、数据从哪里来、页面如何响应用戶的操作。就像导演指挥演员什么时候上场、说什么台词、怎么互动。

你看，这样一问，原本密密麻麻的代码突然有了清晰的轮廓。你不需要记住每个细节，但要记住这三个"部门"各自负责什么。当问题出现时，你就能大致判断：这是造型问题（CSS）、布景问题（HTML），还是剧情编排问题（JavaScript）。

![image](/book/webapp/fcf7d1860164.jpg)


### 4.2.4.2 第二步：追踪一个完整流程

知道了整体结构，接下来我们跟着一个具体的功能走一遍，看看代码是怎么协作的。我们选择最基础的场景：用戶打开页面，看到猫咪卡片。

这时候，你可以这样问AI：

![image](/book/webapp/c2f023556861.jpg)


我想理解用戶从打开页面到看到猫咪卡片的完整流程，能一步步给我讲解吗？每一步都告诉我：发生了什么、为什么要这样做、如果这里出错了会有什么现象。

AI：好的，让我们跟随一位叫小美的用戶，看看她打开你的应用后会发生什么：

**> 第1步：浏览器加载页面**

小美的浏览器开始下载你的 index.html 文件。这时候就像剧院开门，观众入场。如果这一步出问题（比如文件找不到），她会看到"404页面不存在"的错误。

**> 第 2 步：解析 HTML 和 CSS**

浏览器读取HTML，搭建页面骨架；读取CSS，给页面穿上"衣服"。这时候页面看起来已经成型了，但还没有数据。如果CSS加载失败，页面会变成"素颜"⸺所有元素挤在一起，没有颜色。

**>第3步：检查登录状态**

JavaScript开始运行，首先问数据库："这位访客之前来过吗？"如果小美登录过，右上角会显示"欢迎回来"；如果没登录，显示"登录/注册"按钮。这一步出问题，可能会看到"加载中"一直转圈。

**>第4步：获取猫咪数据**

JavaScript向数据库发送请求："请给我所有猫咪的信息。"数据库返回一个列表，包含每只猫的名字、年龄、照片等。如果这里出问题（比如网络断了、数据库连接失败），页面会显示"暂无猫咪"或空白。

**>第5步：渲染卡片**

JavaScript拿到数据后，开始"组装"卡片。它为每只猫创建一个卡片元素，填入照片、名字、描述，然后插入到页面上。这时候小美终于看到猫咪了！如果这里出错，可能看到数据但排版混乱。

**>第6步：绑定交互事件**

最后，JavaScript给每个按钮"注入灵魂"⸺点赞按钮知道被点击后要做什么、评论框知道怎么弹出。这一步出问题，页面看起来正常，但点击按钮没反应。

![image](/book/webapp/c53c9ea8d3bf.jpg)


通过这样的对话，你不仅知道了流程，还知道了每个环节可能出什么问题。这比单纯读代码有用多了，因为你在学习"诊断"的能力。

小练习，让AI解释解释下面这段从数据库读取猫咪数据的代码吧。

```javascript
1 async function loadCatsFromDatabase() {  
2 if (!supabaseEnabled || !supabase) {  
3 console.warn('Supabase 未启用，使用默认数据');  
4 return null;  
5 }  
6 try {
```

8 const{data，error} = awaitsupabase 9 .from('cats') 10 .select('\*') 11 .order('id'，{ascending:true}); 12 13 if (error){ 14 console(error('从数据库加载失败：'，error); 15 return null; 16 } 17 18 return data.map(dbCat → （{ 19 //转换数据格式... 20 }）; 21 } catch (error){ 22 console.error('加载数据时出错：'，error); 23 return null; 24 } 25 }

### 4.2.5 填充猫猫数据

此时我们打开页面，不要吃惊，一只猫猫都没了?? 原因很简单，咱们的数据库中，cats表还是空的呢。

我们当然可以在supabase页面里，点击cats表，手工编辑几只猫猫的信息，不过既然有ai帮我们干活，那还是偷个懒吧，直接说：

![image](/book/webapp/bfde650f6d59.jpg)


现在项目已经可以连接 supabase了，帮我原来的演示数据，都插入到 supabase 表中

CC会贴心地帮我们创建一个工具页面，这是个独立的页面，专门用来初始化数据：

![image](/book/webapp/c940213b95fd.jpg)


**插入演示数据到 Supabase**

说明：此工具将把 index.html 中的 6 只猫咪演示数据插入到 Supabase 数据库中。

**开始插入数据**

**清空数据库**

**查看数据库数据**

页面已加载，Supabase 客户端已初始化

正在加载数据库数据..

√找到6条记录

**数据库中的猫咪：**

![image](/book/webapp/83159979f2c5.jpg)


小橘2岁－橘猫-性格温顺，喜欢晒太阳，对小鱼干没有抵抗力。是个不折不扣的吃货.. (10, 7) 

![image](/book/webapp/a54d40786e7f.jpg)


雪 01岁-英国短毛猫－优雅的小公主，毛色雪白纯净，眼睛是漂亮的蓝色。喜欢安静的球环境...

![image](/book/webapp/d0845f674083.jpg)


虎3岁-美国短毛猫-活力十足的运动健将，喜欢爬高上低，对逗猫棒和激光笔非常感(ID:斑兴趣...

![image](/book/webapp/f3beb7c63eca.jpg)


布1.5岁－布偶猫-拥有深蓝色的眼睛和柔软的长毛，性格温柔体贴，是完美的陪伴型丁猫

![image](/book/webapp/052ed11a47e0.jpg)


黑炭4岁-黑猫-全身乌黑发亮，眼睛在黑暗中会发出神秘的绿光。性格独立，但对主... (ID:5)

![image](/book/webapp/921218db517c.jpg)


奶2.5岁-暹罗猫-拥有独特的重点色花纹和蓝宝石般的眼睛。性格活泼，喜欢与人交(ID:茶流.

插入演示数据成功后，咱们的index.html就会恢复成最初的样子，看起来一切好像没有变化，但当你联系朋友们，就会发现情况不一样：无论你编辑的信息，还是朋友编辑的，都可以随时让对方看到啦！只不过，猫猫的照片还不行，需要下一步来解决。

### 4.2.6 图片上传：保存到对象存储

用同样的方法，共享图片的存储。首先编辑prd.md，增加下面两句：

1 ### Supabase Storage 

**配置：**

**Storage Bucket**: `cat-images`2 

3 - 用于存储猫咪照片

4 - Public bucket（公开访问）

- 文件组织：`{猫咪id}/{当前时间}_{随机字符串}.{文件扩展名}`5

首先确认存储桶的名字，是我们之前创建的 cat-images ，然后指定文件名。因为对象存储本质上，就是在上传/下载文件，而上传后的文件，不会保留原来的名字了（要不然所有人都上传，存储文件夹就很容易重名），所以这里我们给上传后的文件名，定了个规矩：都是按照 猫咪 id 做文件夹， 当前时间 + 随机字符串 做文件名。

然后再跟CC说：

![image](/book/webapp/42a9daa8316e.jpg)


现在，可以把照片存储，也修改为存在 supabase storage 了

于是文件上传的代码也改变了，变成了下面这个函数：


1 /\*\*   
2 \*Upload image to Supabase Storage   
3 \*上传图片到Supabase Storage   
4 \* @param{File} file - Image file   
5 \* @param {number} catId - Cat ID   
6 \* @returns{Promise<string>} - Public URL of uploaded image   
7 \*/   
8 async function uploadImagestoStorage(file,catId){   
9 if(!supabaseEnabled ||!supabase){   
10 console(error('uploadImageToStorage:Supabase未启用');   
11 throw new Error('Supabase未启用');   
12 }   
13   
14 //Generate unique filename-生成唯一文件名   
15 const timestamp = Date-now();   
16 const fileExt = file.name.split’.'.).pop();   
17 const randomStr = Math.random().substring(36).substring(7);   
18 const fileName = '\{timestamp}{randomStr}.${fileExt}\};   
19 constfilePath = '\$\{fileName\}';   
20   
21 console.log('uploadImagestoStorage：文件路径 = {\filePath\});   
22 console.log('uploadImagestoStorage：文件大小 = {\file.size}bytes\};   
23 console.log('uploadImagestoStorage：文件类型 = {\file.type\});   
24   
25 //Upload file-上传文件   
26 console.log('uploadImagestoStorage：调用 supabase(storage.upload()...');   
27 const{data,error} = await supabase(storage   
28 .from('cat-images')   
29 .upload(filePath,file,{ cacheControl:'3600',   
31 upsert: false

32 }）;  
33  
34 if (error) {  
35 console(error('uploadImageToStorage:上传失败', error);  
36 console.error('uploadImageToStorage:错误详情：'，JSON.stringify(error，null，2));  
37 throw error;  
38 }  
39  
40 console.log('uploadImageToStorage:上传成功', data);  
41  
42 //GetpublicURL-获取公开URL  
43 const{data:urlData} = supabase.Storage.  
44 .from('cat-images')  
45 .getPublicUrl(filePath);  
46  
47 const publicUrl = urlData(publicUrl;  
48 console.log('uploadImageToStorage:公开URL = ${publicUrl}）;  
49  
50 return publicUrl;  
51 }

**核心就是这一句：**

1 const{data，error} = awaitsupabase storing   
2 .from('cat-images')   
3 .upload(filePath，file，{   
4 cacheControl: '3600'，   
5 updert：false   
6 }）; 

把选中的文件，上传到我们事先创建好的 cat-images 桶中。

**踩坑实录：图片怎么传不上去？**

当你兴冲冲地点击"上传照片"，选了一张超可爱的猫咪GIF，结果⸺页面弹出一个红色错误提示：Bucket not found 。当时就懵了，"bucket？什么 bucket？我明明创建了 cat-images 啊？"

这时候别自己瞎折腾，直接问CC：

![image](/book/webapp/b50f85feb8db.jpg)


图片上传失败，提示 "Bucket not found"，帮我排查一下

CC会帮你检查bucket名称是否匹配、权限策略是否正确配置，甚至自动帮你生成需要执行的SQL语句。

经过 CC 提示，你仔细检查 Supabase 后台，才发现问题：之前创建的 bucket 名叫 cat-images但代码里写的是 cat-image （少了个 s）。就这一个字母的差别，如果没有CC的帮助，真不知道要花多少时间。

CC还会很贴心的给出更多检查建议：

```txt
Supabase 创建 bucket 默认是私有的，需要从左侧菜单进入 Storage > Policies，给 images bucket 添加一条允许匿名用户上传的策略。如果你看到 Unauthorized 或Forbidden 的错误，很可能是权限没配好。
```

### 4.2.7 处理错误：优雅地失败

网络请求可能会失败⸺用戶的手机信号不好，或者Supabase服务暂时不可用。这时候不应该让页面崩溃，而应该给用戶清晰的反馈。

![image](/book/webapp/432b095e3fb1.jpg)


想象一下这个场景：你的朋友兴冲冲地打开你分享的喵宇宙链接，结果只看到一片空白，或者更糟糕的，页面卡死了。她可能会以为网站坏了，直接关掉，再也不会回来。这种情况太可惜了，因为我们完全可以用更优雅的方式处理错误。

对CC说：

![image](/book/webapp/b800108c807f.jpg)


网络请求可能会失败，帮我添加错误处理机制。当加载数据出错时，给用戶可爱友好的提示，而不是让页面崩溃或者一片空白。

CC 会帮你改造数据加载的代码，添加完善的错误处理。比如把 loadCatsFromDatabase 包装成这样：

```txt
1 async function loadCatsWithErrorHandling() {  
2 try {  
3 showLoading(); 
```

4 const cats = await loadCatsFromDatabase();   
5   
6 if (cats === null）{   
7 showError('加载失败，请检查网络连接后刷新页面');   
8 return;   
9 }   
10   
11 renderCats(cats);   
12 } catch (error){   
13 showError('出错了：' + error.message);   
14 }   
15 }

还会添加一个友好的错误提示组件：


```javascript
1 function showError(message) {
2 //显示一个友好的错误提示，而不是console.error
3 document.getElementById('cardsContainer').innerHTML = ` <div class="error-container">
5 <p> {{message}} </p>
6 <button onclick="location.Reload(){
7 } </div>
8 ;
```

现在，你可以故意测试一下这个效果。比如，把网络断开，然后刷新页面。你会看到：

![image](/book/webapp/5fde0b24c214.jpg)


再试一次瞄~

一个可爱的猫咪表情，配上清晰的提示文字，这比冷冰冰的白屏或者浏览器默认的错误页要好多了。其实这里有个小窍门：错误提示也是用戶体验的一部分。想象一下，当你去一家餐厅，点完菜后服务员失踪了，你根本不知道菜什么时候上来，会不会来。这种不确定感最让人焦虑。错误提示也一样告诉用戶发生了什么，以及他可以做什么，这种"掌控感"能大大降低挫败感。

### 4.2.8 给用戶反馈：Loading 状态

说到等待，还有一个场景需要处理：当数据还在加载时，页面不应该一片空白。

你可能有过这种经历：打开一个网页，等了3秒钟还是白屏，于是你怀疑网站是不是挂了，直接关掉。但其实数据正在加载，只是没有任何视觉反馈。这种"沉默的等待"会让用戶很不安。

专业的应用会显示 Loading 动画或骨架屏，告诉用戶"数据正在路上"。

让我们告诉 CC：

![image](/book/webapp/1c47611d9bc6.jpg)


页面刚打开的时候还是一片空白，过一会儿猫猫数据才能显示出来，这个时段应该展示个加载动画。


CC 会在数据加载期间显示一个旋转的 Loading 动画：



```html
1   
2 function showLoading() {   
3 document.getElementById('cardsContainer').innerHTML =   
4 <div class="loading-container">   
5 <div class="loadingSpinner"></div>   
6 <p>正在加载猫咪...</p>   
7 </div>   
8 ；   
9 }
```

效果大概是这样的：一个跳动的猫猫头像，配上"正在加载猫咪..."之类的文字。看起来是个小细节，但这正是区分"玩具"和"产品"的关键。

![image](/book/webapp/1593f957f6a2.jpg)


猫咪们正在赶来...

你可能会想："用戶真的会注意到这些吗？"答案是：不会。好的设计就是让用戶"无感"⸺他不会意识到Loading动画的存在，但如果没有它，用戶一定会感觉到"哪里不对劲"。这就像电影中的背景音乐，观众不会刻意去听，但它塑造了整体的氛围。

现在你可以刷新页面看看效果。首先出现的是Loading动画，然后猫咪卡片逐渐显示出来。这种流畅的过渡让体验变得专业而舒适。

### 4.2.9 享受共享时光

现在，让我们再次提交所有的修改，访问已发布好的网页，上传自己真实的猫猫照片，和朋友们一起享受美好时光吧！

反正我已经上传了：

![image](/book/webapp/83e10b9bedbe.jpg)


**喵宇宙**

![image](/book/webapp/7e46adcd2b1e.jpg)


![image](/book/webapp/d2e19dc3a3d0.jpg)


![image](/book/webapp/6182deab7130.jpg)


![image](/book/webapp/ccc42307c926.jpg)


![image](/book/webapp/ee9270e1f273.jpg)


![image](/book/webapp/44a2f0d3dfd3.jpg)


### 4.3 项目演进的思路

写到这里，我想和你聊聊vibecoding里的一个核心心法⸺怎么让项目稳稳地往前推进，而不是在某个环节把自己绕晕。

你可能已经感觉到了：我们每一次都是发现项目的一个小小的不足，然后把它补齐，而不会一次性实现所有的功能。

这就是 vibe coding 最重要的规律：一次只攻一个山头。

比如刚才连接数据库这件事，第一轮对话我们先让代码跑通⸺能从数据库读出数据、能显示在页面上，就算胜利。这时候页面可能很简陋，错误处理也不完善，甚至Loading状态都没有，没关系，第一轮的目标就是"通"。

等到基本流程跑顺了，第二轮我们再回来打磨细节：加个旋转的Loading动画，处理一下网络失败的情况，优化一下图片加载的体验。每一轮都是在上一次的基础上做refinement（细化），而不是另起炉灶搞新功能。

还有一种情况特别常见⸺代码改着改着，突然发现之前的思路有问题，或者AI生成了太多代码，你已经看不太懂了。这时候别硬撑，关掉当前对话，新开一个session。把刚才验证过的、确定好用的版本作为起点，把要做的改进说清楚，重新开始。这就像下棋时推倒重摆，不是为了否定之前的努力，而是让大脑清空缓存，轻装上阵。

这种"小步快跑、频繁存档"的节奏，和传统的软件开发很不一样。以前我们习惯先做完整的需求分析、画架构图、写技术方案，一切都想清楚了才动手。但vibecoding的乐趣恰恰在于边做边想⸺让AI快速把想法变成看得见的东西，然后根据实际效果决定下一步往哪走。

说到这你可能会问：怎么判断一个功能是不是"做完了"？我的标准是：能用就行。Loading状态有了，错误提示有了，基本的交互逻辑通了，就可以先放一放。perfectionism（完美主义）是vibecoding的大敌，因为明天你很可能又有新想法，或者发现更好的实现方式。

现在我们的喵宇宙已经能读写数据库了，这是一个重要的里程碑。先停下来，把玩一下，确认没什么大问题，然后再往下走⸺去搞定用戶登录和权限管理。这种稳扎稳打的感觉，比一口气冲到底然后被一堆 bug 淹没，要舒服多了。

## 5. 专属领地

到目前为止，我们的喵宇宙已经实现了你和朋友之间的共享，不过它还有不足：每个人都有自己的猫猫呀，我创建的猫咪信息和上传的照片，怎么别人也能修改？对，这当然不行。聪明的你肯定会想到，应该有个用戶登录/注册的功能吧？这样上传的猫猫就有归属了，每个人只能修改自己上传的，不能改别人的。

### 5.1 用戶管理流程

用戶管理，本来有一整套挺复杂的逻辑，涉及用戶、角色、权限分配之类的，幸运的是，supabase已经帮我们内置好了。

让我们回到 supabase 的管理页面，在左侧菜单中选择 authentication

![image](/book/webapp/70edbfa9534c.jpg)


然后，在二级菜单中选择 Sign In / Providers

![image](/book/webapp/374653db0f5f.jpg)


重点配置一下 Users Signups 部分，也就是注册的能力：

**User Signups**

Allow new users to sign up 

![image](/book/webapp/d7b52ef48693.jpg)


Allow manual linking 

![image](/book/webapp/d854a0956f8d.jpg)


Allow anonymous sign-ins 

![image](/book/webapp/a64ee0f336bb.jpg)


Confirm email 

![image](/book/webapp/ed9aea5b549b.jpg)


**Auth Providers**

Authenticate your users through a suite of providers and login methods 

![image](/book/webapp/4ed2444dc3e7.jpg)


Email 

![image](/book/webapp/94eb31e09990.jpg)


Phone 

![image](/book/webapp/de867e25dd2d.jpg)


SAML 2.0 

![image](/book/webapp/c51c408cef2f.jpg)


Web3 Wallet 

![image](/book/webapp/602ace90cdd4.jpg)


Apple 

![image](/book/webapp/cc8f8d295d21.jpg)


> 

> 

> 

> 

> 

• Allow new users to sign up：这个一定要选中，允许新用戶自行注册，这样朋友们才能开心玩儿起来

• Confirmemail：当用戶使用邮箱注册的时候，是否要发一封邮件，让用戶确认？一般来说，还是要选中的，防止用戶随意用无效的邮箱注册，如果忘记密码，也有了找回的依据。

• Email：这个注册选项当然要选中，这是最方便的注册方式；Phone就是短信注册，基本都是国外的运营商，在国内不太好用，而且发短信肯定要按条付费的，就不选了。除此之外，还有Web3钱包和一大堆三方认证的方式，可按需要选择。

### 5.1.1 实现用戶系统

对 Claude 说：

**生成配置规则**

执行完成后，会发现 CC 除了修改了 index.html，还生成了一个文档： supabase-config-guide.md ；如果没有生成类似文档的话，那最好加一句要求：

![image](/book/webapp/187057f1aa69.jpg)


**帮我生成调整 supabase 表结构和访问规则的语句**

这个文档的里的语句，需要在supabase的SQLEditor里执行：

![image](/book/webapp/7f3abf1c34ab.jpg)


它大概有这样几个作用：

1. 给原来的cats表增加一个列：user_id，记录每只猫咪到底属于哪个用戶；

2. 修改原来对数据库和对象存储的的访问策略：不再允许所有用戶随便修改，而是更精细地控制；

3. 创建一个profiles表，存储用戶的头像之类的信息（这些在标准认证的users表中不存在）。执行完这些语句之后，你会发现cats表旁边，红色的unrestricted字样不见了。

### 5.1.1.1 新增登录/注册功能

现在重新刷新页码，就能看到页面右上角多了两个按钮：

登录

注册

点击“注册”，真的可以创建一个新用戶：

![image](/book/webapp/6b5d3ec3eb2e.jpg)


甚至输入完正确的邮箱和密码，点击注册以后，真的会收到一封确认邮件（这得益于supabase完善的用戶管理机制，要不咱们还得去找邮件服务器）：

**Confirm Your Signup D收件箱 ×**

![image](/book/webapp/c1c88181939e.jpg)


Supabase Auth <noreply@mail.app.supabase.io> 

发送至我

![image](/book/webapp/34d948302479.jpg)


**此邮件似乎是用英语撰写的**

翻译成中文

![image](/book/webapp/d1f0524a2d27.jpg)


**Confirm your signup**

Follow this link to confirm your user: 

Confirm your mail 

确认后，这个邮箱/密码就可以用于登录了，登录成功后，右上角的区域，会展示我们的邮箱，而且多出一个添加猫咪的按钮。

![image](/book/webapp/eee69832058c.jpg)


添加猫咪

![image](/book/webapp/e9b28ad9ce8e.jpg)


从这里添加的，就是属于自己的猫咪了：按照提示依次填写猫咪信息，再上传照片后，就能得到一只新的猫猫了：

![image](/book/webapp/39d2e6e65ad0.jpg)


**小e**

**银渐层**

小吃货，什么都想吃

5岁

公

粘人，掉毛

![image](/book/webapp/8b2a648b63ae.jpg)


**编辑信息**

**Debug时间：怎么登录后什么都看不到了？**

刚刚修改完成后，你想看看之前添加的演示数据，结果⸺页面上居然又空空如也了，一只猫都没有。"完了，是不是刚才执行SQL语句的时候把数据删了？"

打开浏览器的控制台（F12），发现满屏的红色错误：

1 new row violates row-level security policy for table "cats" 

赶紧告诉CC：

![image](/book/webapp/0ca954b03d14.jpg)


登录后看不到猫咪数据，控制台提示"new row violates row-level security policy for table"cats"，帮我处理一下

CC一通分析后，发现原来是RLS（行级安全）策略在"捣乱"。之前没开用戶系统时，cats表是公开访问的；现在加了user_id字段和RLS策略，但之前那些演示数据没有user_id，数据库就拒绝了查询请求。

然后给出两种方案：要么给旧数据补上默认的 user_id，要么修改 RLS 策略让没有 user_id 的数据也能被查看。我们选第二种，毕竟演示数据本来就是给大家看的。

## 6. 社区功能

现在我们的喵宇宙已经支持多用戶，每个人都可以上传和管理自己的猫咪。但是一个真正的社区，不应该只是单向的展示，还需要互动！让我们为猫咪添加点赞和评论功能，让用戶之间可以交流互动。

### 6.1.1 功能规划

我们要实现两个核心的社区互动功能：

. 点赞功能 👍 ：用戶可以为喜欢的猫咪点赞，每只猫只能点赞一次

• 评论功能 … ：用戶可以发表评论，分享对猫咪的想法和感受

这两个功能都需要：

1. 新的数据库表来存储数据

2. RLS策略来控制权限

3. 前端UI来展示和操作

下面我们一一来看做了那些修改。

### 6.1.2 数据库设计

首先要在数据库中，有位置把点赞和评论都存起来，跟CC说：

![image](/book/webapp/78af67a6e49e.jpg)


帮我在在Supabase中创建表，用来保存对猫猫的点赞和评论。

结果是这样两张新表：

likes表：存储点赞记录

• cat_id : 猫咪ID（外键关联到 cats 表）

? user_id : 用戶ID（外键关联到 auth.users）

联合唯一约束：保证一个用戶只能对一只猫点赞一次

comments表：存储评论

cat_id : 猫咪ID

• user_id : 用戶ID 

• content : 评论内容

• created_at : 创建时间

提示：想一想，为什么不能用原来的cats表，来保存这些信息，而是需要创建两张新表呢？想不明白的话，可以问问ai。

CC 还会生成一个 SQL 配置脚本（类似 setup-interactions.sql ），在 Supabase SQL Editor中执行即可。配置脚本会自动创建以下RLS策略：

**likes 表：**

• 查看权限：所有人（包括未登录用戶）

• 添加权限：仅登录用戶，且只能以自己的身份点赞

• 删除权限：只能删除自己的点赞

**comments 表：**

• 查看权限：所有人（包括未登录用戶）

• 添加权限：仅登录用戶，且只能以自己的身份发表

• 修改/删除权限：只能操作自己的评论

这些策略确保了数据安全，防止用戶伪造他人身份进行操作。

（如果CC偶尔没有想到，那就指点它单独生成权限配置的脚本）

### 6.1.3 功能实现

下面实现功能仍然是熟悉的配方，跟CC说一句话任务：

![image](/book/webapp/f5cfca537ca2.jpg)


帮我实现社区互动功能：点赞和评论。要求：

1.每个用戶对每只猫只能点赞一次

2.所有人都可以查看点赞和评论

3.只有登录用戶可以点赞和评论

刷新页面后，你会发现每个猫咪卡片底部多了一个互动区域：

![image](/book/webapp/f66f373d7ce3.jpg)


**雪球**

**英国短毛猫**

优雅的小公主，毛色雪白纯净，眼睛是漂亮的蓝色。喜欢安静的环境，偶尔会高冷。

1岁

母

优雅

安静

高冷

![image](/book/webapp/7fc36e24cd41.jpg)


![image](/book/webapp/89d8d183d9d5.jpg)


**查看评论√**

写下你的评论...

发送

**点赞功能：**

1. 点击 👍 按钮即可点赞

2. 已点赞的按钮会变成红色

3. 再次点击可以取消点赞

4. 实时显示点赞数量

**评论功能：**

1. 点击查看评论按钮展开评论区

2. 可以看到其他用戶的评论

3. 登录用戶可以在输入框中发表评论

4. 评论按时间倒序排列（最新的在上面）

5. 显示评论者的用戶名和发表时间

### 6.1.4 体验社区功能

现在，让我们试试新功能：

1. 点赞其他用戶的猫咪：找一只可爱的猫咪，点击 👍 按钮

2. 发表评论：在评论框中输入你的想法，比如"好可爱的猫猫！"

3. 查看互动：看看其他用戶给你的猫咪点赞和评论了吗？

![image](/book/webapp/20e95e78a502.jpg)


有了这些互动功能，喵宇宙终于变成了一个真正的社区！用戶可以为喜欢的猫咪点赞表达喜爱，可以发表评论分享感受，可以看到自己的猫咪受欢迎程度，还可以与其他爱猫的朋友们交流互动。

### 6.2 RLS：产品级安全

RLS（行级安全）是PostgreSQL数据库的一个强大功能。简单来说，它让数据库在返回数据前先问一句："这个用戶有权看这条记录吗？"

我们的策略配置是：

• 所有人都能查看所有猫咪（社交属性）

• 但只有猫咪的主人才能修改或删除

这是一种从"完全开放"到"精细控制"的安全升级。在实际产品中，你可以根据需求配置更复杂的策略，比如：

• 允许管理员管理所有数据

• 允许用戶设置某些内容为私密

• 限制用戶每天只能发布一定数量的内容

## 7. 颜值即正义

到现在，喵宇宙的功能已经相当完整了。但你可能已经审美疲劳了⸺好吧，现在的页面真的称不上美，不但配色单一，看起来有一股浓浓的"AI味儿"，而且也没有针对手机显示优化过。

### 7.1 响应式设计：适配移动端

既然要把链接发给朋友看，就得考虑他们多半是用手机打开的。你可能记得我们在入门篇创建第一个页面的时候，它就是可以在手机端展示的，不过后面呢又做了那么多修改，我们从来也没有针对手机端再做过优化，如果你跟着教程走到现在，很可能它在手机上已经面目全非了。当然如果你运气好的话，没准看起来还不错⸺这是强大的ai模型在背后默默替我们操心。

无论如何，咱们心里要有个数：页面不是自动就能在手机端展示的很好的，它需要一种响应式设计来适配。

响应式设计（ResponsiveDesign）就是让页面在不同设备上都能良好显示的技术。

最基础的响应式设计使用MediaQueries，说白了就是不同大小屏幕展示成不同的样式，类似下面这样：

```scss
1 /*默认样式：手机端 \*/  
2 .cards-grid{  
3 display:grid;  
4 grid-template-columns:1fr;/\*单列\*/  
5 gap:16px;  
6 }  
7  
8 /\*平板端：屏幕宽度大于768px\*/  
9 @media（min-width:768px）{  
10 .cards-grid{  
11 grid-template-columns:repeat(2，1fr)；/\*两列\*/
```

```txt
12 }  
13 }  
14  
15 /\*桌面端：屏幕宽度大于1024px\*/  
16 @media（min-width:1024px）{  
17 .cards-grid{  
18 grid-template-columns:repeat(3，1fr)；/\*三列\*/  
19 }  
20 }
```

这样，猫咪卡片在手机上单列显示，在平板上双列，在电脑上是三列网格。这就是响应式设计的核心思想。我们会在下面的UI重构中，对AI明确提出这个要求。

### 7.2 UI 重构

现在让我们彻底重构页面设计。得益于 AI，这个原本繁重的任务可以在 30 分钟内完成。

### 7.2.1 第一步：提取设计规范

找到一个值得模仿的网站。这里我选择v0的app浏览页面，它正好通过卡片展示应用集合，跟我们的需求很接近。

对 Claude 说：

![image](/book/webapp/a76fac251516.jpg)


**背景**

当前项目叫喵宇宙，是一个vibecoding演示项目，但是页面设计需要改进。

#角色 

你是一名拥有丰富前端工程经验的资深设计工程师。

#任务

重新设计UI，请根据项目特色，参照https://v0.app/的设计语言，编写一段详细、结构化的AICodingPrompt，用于发送给AI编码工具。生成的Prompt中必须包含对"设计细节"的详细描述（如圆角大小、阴影质感、交互动效），而不是罗列功能。

AI会生成详尽的设计规范文档，包括颜色、字体、间距、动效等所有细节。

```txt
UI Design Style for Miao 
```

```txt
1 # 喷宇宙（VibeCoding）UI 重设计：v0.app 设计语言对齐版 AI Coding Prompt
```

2 

```txt
3 参考设计语言：['https://v0.app/'](https://v0.app/)
```

4 

```txt
5 > 目标：在**不破坏现有功能与 JS 选择器**的前提下，把 `index.html` 的视觉与交互质感升级到接近 v0 的“极简、强排版、轻边框、柔阴影、克制动效”。
```

```html
>  
>当前项目形态：**单文件静态页**（`index.html` 内含大量 `<style>` + `<script>`），核心模块包括：  
> - 顶部认证栏：`#authBar`（登录/注册/添加猫咪/登出）  
> - 认证弹窗：`#authModal`  
> - 主容器与列表：`.container`、`.title`、`#cardsContainer.cards-grid`  
> - 猫咪卡片（渲染与交互依赖 class）：`.cat-card` 及其内部结构（上传、轮播、GIF、评论、编辑）
```

**1) 你要扮演的角色**

你是一名资深 **Design Engineer**。请对项目「喵宇宙」进行 UI 系统化重设计与落地实现，输出可直接运行的静态页面。

**2) 绝对约束（非常重要）**

**2.1 不允许破坏的选择器（否则 JS 会失效）**

除非你同时修改 JS 逻辑并确保功能不回归，否则 ** 不要改名/删除 ** 以下 id/class（允许新增class 作为扩展）：

- **认证相关**
```markdown
- `#authBar`, `#authLoggedOut`, `#authLoggedIn`  
- `#loginButton`, `#signupButton`, `#logoutButton`, `#addCatButton`  
- `#authModal`, `#authForm`, `#authEmail`, `#authPassword`,  
`#authSubmitButton`  
- `#authSwitchText`, `#authSwitchLink`, `#authMessage`, `#modalTitle`,  
`#modalSubtitle`, `#userEmail` 
```

**列表与卡片**
```txt
- `#cardsContainer`, '.cards-grid', '.cat-card'
- '.cat-image-container', '.cat-image', '.cat-badge'
- '.upload-button', '.file-input', '.gif-button'
- '. carousel-nav', '. carousel-btn', '.prev-btn', '.next-btn', '. carousel-
indicator'
- '.cat-info', '.cat-name', '.cat-breed', '.cat-description', '.cat-stats',
'.stat-item', '.stat-label', '.stat-value'
- '.cat-tags', '.tag'
- '.edit-button', '.edit-input', '.edit-actions', '.save-button', '.cancel-
button'
- '.cat-interactions', '.interaction-hours', '.interaction-btn', '.like-
btn', '.comment-btn'
- '.comments-section', '.comments-toggle', '.comments-list', '.comment-
form', '.comment-input', '.comment-submit', '.no/comments' 
```

**2.2 工程约束**

- 项目保持**零构建**：继续使用静态 `index.html`（允许拆分为 `styles.css` / `ui.css`与少量 `ui.js`，但必须保持可直接打开运行）。

- 允许结构性优化 DOM（新增语义分区/包装容器），但要保持现有功能区（认证、卡片、交互）完整可用。

动效要克制：不要霓虹、不要大面积强渐变背景、不要重阴影。

**3) 现状 v0 风格：信息架构对齐（基于当前页面内容）**

当前页面主要只有“标题 + 猫咪卡片网格”。 请在不破坏卡片渲染逻辑的前提下， 引入 v0 风格的首

**3.1 顶部导航（复用 `#authBar`）**

把现有 `.auth-bar` 视觉升级为 v0 风格顶栏：

- **高度 ** ：64px

**背景 ** ：`rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)`

- **分割线 ** ：底部 1px `rgba(0,0,0,0.08)`（不要厚重阴影）

- **布局 **
- 左侧：`.auth-bar-logo`（「喵宇宙」文字标识， ** 不要渐变文字 ** ，用纯色 + 字重体现高级感）

- 中间：新增轻量导航链接（可选）：`产品` / `文档` / `验证清单`（指向仓库已有文档，如`docs/`、`VERIFICATION_CHECKLIST.md`）

右侧：复用现有按钮区域（登录/注册 或 用戶信息/添加猫咪/登出）

按钮风格（替换当前“胶囊渐变按钮”）：

**Primary 按钮 ** （如 注册、添加猫咪）：背景 `#111827`（近黑），文字白色

- **Secondary / Ghost**（如 登录、登出）：透明背景 + 1px 边框

- **圆角**：10px（按钮），高度 36px，左右 padding 12–14px

- **hover**：背景轻微加深/边框增强 + `transform: translateY(-1px)`（非常轻）

- **active**：`transform: translateY(0) scale(0.98)` 

**3.2 Hero 区（新增，但不替换卡片列表）**

在 `.container` 内部、`.title` 之前新增一个 Hero 区块（建议 `section.hero`），表达项目特色并提升“产品感”：

- 主标题（替换/弱化当前 `.title` 的 emoji 风格）：保留「喵宇宙」但更产品化，例如：

- H1：`喵宇宙`（40–44px，字重 700，字距 -0.02em）

- 副标题：`用 Supabase 管理你的猫咪卡片：上传照片、轮播、评论、互动。`（13–15px，弱化色）

- 核心输入（可选增强）：一个“搜索/筛选”输入框（不要求实现复杂功能，可只做 UI 与未来扩展），但必须做出 v0 风格质感：

- 高度 52px，圆角 12px，1px 边框 + 极浅阴影

focus ring：`0 0 0 4px rgba(79,70,229,0.18)` 

下方 chips（胶囊小标签）：`最受欢迎` / `新成员` / `待领养` / `我的猫咪`

Hero 与网格之间留白 56–72px

**3.3 卡片网格（复用 `#cardsContainer.cards-grid`）**

保持渲染容器不变，但升级布局与密度：

- **页面背景**：从当前`body`强渐变改成 v0 的干净底色
- `body`背景：`#FAFAFA`；主内容面：`#FFFFFF`
- **网格**：桌面3列（`minmax(0,1fr)`），间距16-20px；平板2列；移动1列
- **容器宽度**：1120px（max），左右padding 24px（移动16px）

**4) 视觉系统（Design Tokens，必须落地为 CSS 变量）**

在 `:root` 定义 tokens（浅色为主，可选深色模式）：

**4.1 圆角**

```markdown
- `--radius-lg: 14px;` (卡片)
- `--radius-md: 12px;` (输入/面板)
- `--radius-sm: 10px;` (按钮)
```

**4.2 边框与阴影（关键：轻、柔、短）**

```txt
- 边框：`--border: rgba(0,0,0,0.08);`  
- 默认阴影：`--shadow-sm: 0 1px 2px rgba(0,0,0,0.06);`  
- 悬浮阴影：`--shadow-md: 0 8px 24px rgba(0,0,0,0.10);`
```

**4.3 字体与颜色**

```txt
- 字体：系统栈即可（目前已是系统栈，保留）
- 文本色：
- `--fg: #0A0A0A;`
- `--fg-muted: rgba(10,10,10,0.65);`
- `--fg-faint: rgba(10,10,10,0.45);`
- 强调色（用于 focus/少量高亮）：`--accent: #4F46E5;`
```

**4.4 动效**

```txt
统一曲线：`--ease: cubic-bezier(0.2, 0.8, 0.2, 1);`  
hover 160-220ms，面板 220-320ms
```

**5) 组件级改造细则（严格对齐现有 class）**

```markdown
## 5.1 .cat-card (核心组件)
把当前“偏花哨”的卡片做成 v0 风格“轻边框 + 柔阴影 + 强信息层级”:
- **卡片结构不变**
- (.cat-image-container + '.cat-info'), 只改样式
- **卡片外观**
- 背景 #FFF', 边框 1px 'var(--border)', 圆角 'var(--radius-lg)'
- 默认 `box-shadow: var(--shadow-sm)`
- hover: `transform: translateY(-2px) + 'box-shadow: var(--shadow-md) + 边框略增强 (例如 'rgb(0,0,0,0.10)')'
- hover 动画 200ms + 'var(--ease)'
## 5.2 图片区 .cat-image-container / .cat-image
```

图片固定比例（建议 16:9 或 4:3），`object-fit: cover`

图片圆角与卡片一致（内圆角 12px）

图片 hover 轻微 `scale(1.02)`（不要超过 1.03）

**5.3 徽标 `.cat-badge`**

- 改成小号 pill 标签：

- 高度 24px，圆角 999px

背景 `rgba(17,24,39,0.92)`，文字白色 12px

位置保持在图片左上角，但要有 12px 内边距

**5.4 图片操作按钮 `.upload-button / .gif-button / .carousel-btn`**

统一成 v0 风格的“图标按钮/轻按钮”：

- 不要 emoji 作为主视觉（允许保留 emoji，但要更小、更克制）

- **按钮尺寸**

图标按钮： 40×40 ，圆角 999px，边框 1px

普通小按钮：高度 32px ，圆角 10px

- **交互 ** 

hover：背景 `rgba(0,0,0,0.04)`，边框增强

active：`scale(0.98)` 

**5.5 信息区 `.cat-info`**

重排排版层级（不改 DOM 结构）：

`.cat-name`：18–20px，字重 650–700

`.cat-breed`：13px，`--fg-muted` 

`.cat-description`：14–15px，行高 1.6，最多显示 3 行（可用 line-clamp）

`.cat-stats`：做成更“表格式”的两列小块，背景轻微区隔（例如 `#FCFCFC`） + 1px 边框

- `.tag`：改成更轻的 pill（高度 24px ，圆角 999px，边框 1px，背景近透明）

**5.6 编辑态 `.editing`（保持现有逻辑）**

编辑态要“像产品表单”：

- `.edit-input`：高度 40px / 32px （small/tiny），圆角 12px/10px

focus ring：同上

- `.save-button` 为 primary，`.cancel-button` 为 secondary

**5.7 评论区 `.comments-section`**

把“查看评论”按钮做成轻量 disclosure：

- `.comments-toggle`：文字按钮 + 小箭头旋转动效（用 `transform`）

- `.comments-list`：作为可折叠面板，背景 `#FCFCFC`，圆角 12px ，1px 边框

- `.comment-input` 与 `.comment-submit` 对齐同一行，整体像 v0 的 input + button 组合

**5.8 认证弹窗 `#authModal`**

把当前“厚重大阴影 + 大圆角”改成 v0 风格：

- 遮罩：`rgba(0,0,0,0.45)`，blur 轻一点

弹窗面板：

- 宽 420px（max），圆角 16px

阴影：比卡片略强但不夸张（`0 20px 60px rgba(0,0,0,0.18)`）

- 标题 20–22px，副标题 13–14px

- 表单输入统一 token（边框、focus ring）

动画：从 `opacity:0; translateY(8px); scale(0.98)` 到正常（240ms）

**6) 布局与全局背景（解决“当前很丑”的核心点）**

把 `body` 从当前渐变 + 居中对齐（`align-items:center`）调整为标准页面流：

`body`：`min-height: 100vh; background: #FAFAFA; color: var(--fg);` 

去掉强渐变背景，去掉强居中布局（否则导航会很怪）

- 主内容从顶部开始，`#authBar` 固定顶部；`.container` 作为页面主容器

**7) 可访问性与细节一致性（必须实现）**

- 为所有按钮/链接/输入加 `:focus-visible`（明显但不刺眼的 ring）

- icon button 点击热区至少 40×40 

- 文本对比度：正文对比 ≥ 4.5:1 ≥ 

- hover 不引起布局抖动（不要改变 border 厚度导致跳动，可用 box-shadow/outline）

**8) 交付物（你需要输出什么）**

请直接在仓库中落地修改，至少包含：

`index.html`：结构更清晰（可新增 `section.hero` 等），但保留关键 id/class

- 样式建议拆分到：`styles.css`（或 `ui.css`）并在 `index.html` 引用

（可选）`ui.js`：仅当你需要补充少量交互（例如 chips 仅填充搜索框）才新增；不要重写现有业务逻辑

**9) 验收清单（你改完自检）**

- 第一眼像 v0：背景干净、留白充足、排版克制、卡片轻阴影 + 轻边框

`#authBar` 与 `#authModal` 交互不坏：登录/注册切换、提示信息正常显示

- 猫咪卡片功能全可用：上传、多图轮播、GIF、评论、编辑（owner 逻辑不回归）

响应式：桌面 3 列 / 平板 2 列 / 移动 1 列；间距舒适

### 7.2.2 第二步：应用新设计

有了设计规范后，一句话就能让AI重构页面：

![image](/book/webapp/a8464c08f0de.jpg)


现在，根据设计文档，改写页面吧

你会看到页面焕然一新：

**瞄宇宙**

7 

如果某些细节还需要调整，可以继续提要求：

![image](/book/webapp/bba15752626d.jpg)


猫猫卡片的图片可以再高一点，名字和介绍区可以压缩，可以加个蒙版放入图片内，要保证文字可以阅读

最终效果：

**瞄宇宙**

7 

![image](/book/webapp/419fe61abe74.jpg)


![image](/book/webapp/a80556b01036.jpg)


**雪球**


英国短毛猫


![image](/book/webapp/7826e129cf82.jpg)


### 7.2.3 修复现场：样式改了，功能怎么崩了？

UI重构后，我发现页面确实变好看了，但点击"编辑"按钮却没有任何反应。"是不是重构的时候把JavaScript 搞坏了？"

打开浏览器的开发者工具（F12），切换到 Console 面板，发现一条黄色警告：

1 Uncaught TypeError: Cannot read property 'classList' of null 

2 at HTMLButtonElement.editCat 

这时候不要慌，也不要急着回滚所有改动。把问题抛给CC：

![image](/book/webapp/21d72530db7e.jpg)


点击编辑按钮没有反应，控制台显示：

```txt
Uncaught TypeError: Cannot read property '<classList' of null at HTMLButtonElement_editCat 
```

帮我检查一下是什么原因。

CC会快速定位到问题所在：原来是元素被嵌套进新的容器后原来的相对定位逻辑失效了。修复通常很简单⸺要么恢复原来的DOM结构，要么更新JS中的选择器路径。

这次教训告诉我：UI重构不只是"改皮肤"，它可能会触动页面的"骨骼结构"。每次重构后，都要把核心功能点一遍：添加、编辑、删除、上传图片、点赞评论...确保"新衣服"不会妨碍"身体动作"。

### 7.3 确认移动端效果

重构完成后，一定要在不同设备上测试。在浏览器中按F12打开开发者工具，点击左上角的设备切换图标，可以模拟手机和平板的显示效果。

top → Filter
[debug-etadata] enter inject script test ✓ 用户已登录：songofhawk@gmail.com
Auth state changed: INITIAL_SESSION ✓ 用户已登录：songofhawk@gmail.com
从数据库加载了8只猫咪
正在查询用户邮箱，user_ids: ['7ee71a86-d513-4d15-b1c0-8f433824c212']
查询到的 profiles: [\{...\}]
映射：7ee71a86-d513-4d15-b1c0-8f433824c212 -> songofhawk@gmail.com
添加邮箱后的评论：[\{...\}]

确认猫咪卡片在手机上：

• 单列显示，宽度合适

. 文字大小可读

• 按钮点击区域足够大（至少44x44像素）

. 图片加载速度可接受

![image](/book/webapp/6b7f1440ad14.jpg)


如果我们把这个页面发给手机，会发现打开后的效果是一样的。

## 8. 写在最后

走到这里，回头看看我们一路做过的事情，可能会有点恍惚⸺这真的是我亲手做出来的吗？从最开始那个只能在自己电脑上运行的猫咪卡片，到现在这个能支持多用戶、有点赞评论、有完整登录系统的社区应用，变化确实挺大的。

现在的喵宇宙，已经算是一个"真正的产品"了。它有用戶系统，有数据存储，有社区互动，甚至还有了点设计感。但这远远不是终点。你可以继续往里面加功能：搜索、筛选、猫咪排行榜、用戶关注、消息通知……可能性是无限的。更重要的是，你现在拥有的不只是这一个项目，而是一套能力：你知道怎么从零开始搭建一个Web应用，怎么把它部署到云端，怎么让用戶真正用起来。

这套能力能做的事情太多了。你可以给女朋友做一个纪念日倒计时页面，可以给社团做一个活动报名系统，可以给家里的小生意做一个展示网站，甚至可以试着把那个在脑子里转了很久的创业想法做出来。AI编程时代最棒的地方就在于，你不需要先花三年时间学会写代码，才能开始做这些东西。你可以边做边学，在做中学，在学中做。

编程这件事，说到底和学骑自行车、学做饭没什么区别。一开始可能会摔跤，可能会把菜炒糊，但只要多试几次，手脚就会慢慢记住那种感觉。现在你已经骑上这辆自行车了，虽然还不够稳，虽然还会摇摇晃晃，但你已经在路上了。

接下来去哪里，完全由你决定。也许你想把喵宇宙做得更完善，也许你想做一个完全不同的东西，也许你只是想先休息一段时间，消化一下学到的东西。无论选择什么，都没问题。重要的是，你知道自己有能力把想法变成现实⸺这种感觉，一旦拥有，就再也不会失去。

那么，我们下一章见，或者，也许在某一个你自己创造的项目里见。

