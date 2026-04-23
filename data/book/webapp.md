![image](/book/webapp/e18e944d550d.jpg)



本章作者：蓝星



后端开发工程师



# ⾥程碑⼀：让世界看到你

先把现有的喵宇宙部署到真正的⽹址上。不需要买服务器，不需要配置环境，⼏分钟就能搞定。

# ⾥程碑⼆：给代码买份保险

当你准备对代码进⾏"伤筋动⻣"的改造时（⽐如从本地存储换到云端数据库），最怕的就是改坏了回不去。这时候Git就派上⽤场了⸺它是程序员的"时光机"，让你可以随时回退到之前的版本。

# ⾥程碑三：给数据找个家

告别浏览器那5MB的狭⼩空间，把猫咪信息存到真正的数据库⾥。你会理解什么是前后端分离，为什么需要这种架构。

# ⾥程碑四：连接前端与后端

修改代码让⻚⾯能从数据库读取数据。这个过程中，你会学习如何处理加载状态、⽹络错误⸺这些是区分"玩具"和"产品"的关键细节。

# ⾥程碑五：每个⼈都有⾃⼰的领地

实现⽤⼾系统，让每个⼈只能管理⾃⼰的猫咪。你会深⼊理解安全策略，学习如何保护⽤⼾数据。

# ⾥程碑六：让社区活起来

添加点赞和评论功能，让⽤⼾之间可以互动。⼀个真正的社区就此诞⽣。

# ⾥程碑七：颜值即正义

重构 UI，让⻚⾯在⼿机和电脑上都能完美展⽰。学习响应式设计，告别"AI 味⼉"的界⾯。

准备好了吗？那么让我们开始吧。

# 1. 让世界看到你

还记得⼊⻔章⾥你是怎么看⾃⼰的作品吗？双击打开HTML⽂件，或者⽤LiveServer预览。这种⽅式只适合你⾃⼰看⸺朋友要想看，你得把整个⽂件夹发过去，还得教他怎么打开。

真正的⽹站应该有⼀个⽹址，就像 https://www.miao.ai 这样。任何⼈只要在浏览器输⼊这个地址，就能看到你的作品。

如果按照传统的软件开发思路，这时候你就需要租⼀台云服务器，把⽣成好的⽹⻚和图⽚上传到服务器，配置可访问的端⼝，再购买⼀个域名，然后把域名的解析地址指向⾃⼰的服务器，为了让浏览器没有安全警告，可能还要申请⼀个https证书。听起来就头⼤是吧？

好在，现在有很多现成服务，帮我们简化这些事⼉：⽐如 Vercel, Cloudfare, Netlify, Github 等等，因为后⾯咱们还需要⽤github来管理版本，这⾥就基于githubpage来发布⾃⼰的⻚⾯吧。

# 1.1 部署到 GitHub Pages

GitHubPages是GitHub组织提供的免费⽹⻚托管服务。它能把你的HTML⽂件变成⼀个真正可以访问的⽹站，就像打开百度、淘宝那样。

不过在启⽤githubpages之前，我们需要先把代码上传到GitHub。别担⼼，这个过程⽐你想象的简单得多。

# 1.1.1 第⼀步：注册 GitHub 账号

如果你还没有 GitHub 账号，先去 github.com 注册⼀个，

访问这个地址：https://github.com，点击右上⻆的"Signup"按钮，可以⽤个⼈邮箱，或者⾕歌、苹果的三⽅账号注册⼀个新⽤⼾。

# Sign up for GitHub

![image](/book/webapp/b420a24f7651.jpg)


Continue with Google 

![image](/book/webapp/953f9ecc0eb5.jpg)


Continue with Apple 

or 

# Email

# Password*

Password 

# Username*

# Your Country/Region

Japan 

# Email preferences

$\sqsubset$ Receive occasional product updates and announcements 

Create account > 

# 1.1.2 第⼆步：安装 GitHub CLI

GitHubCLI是GitHub官⽅提供的命令⾏⼯具。安装它并不是必须的，但是有了它以后，很多操作CC就可以帮我们做了，省去了在浏览器⾥头到处找设置的⿇烦。

安装⾮常简单，对Claude说：

Claude Code 会根据你的操作系统⾃动执⾏安装命令：

- macOS：使⽤ Homebrew 安装

- Windows：使⽤ winget 或下载安装包

-Linux：使⽤包管理器安装

安装完成后，你还需要登录你的GitHub账号。对Claude说：

![image](/book/webapp/14a646398d16.jpg)


# 帮我登录 GitHub CLI

CC会引导你完成登录流程，列出⼀系列的选项，你只需要依次选择：

1. 选择 `GitHub.com`

2. 选择 `HTTPS`

3. 选择 `Yes` (Login with a web browser)

4. 复制终端显⽰的⼀次性代码 (One-time code)

5.按回⻋打开浏览器

6.在浏览器中粘贴代码并授权

# ⼀个⼩插曲：授权卡住了？

这⾥我遇到过⼀个坑，值得和你分享⼀下。当CC打开浏览器让你授权GitHubCLI时，我兴冲冲地点击了"Authorize"按钮，结果⻚⾯跳转到localhost，显⽰"⽆法访问此⽹站"。当时我愣了⼀下⸺这是啥情况？

其实这只是GitHubCLI在本地监听授权回调，但有时候浏览器和命令⾏之间的"接⼒棒"没传好。解决办法很简单：回到CC的终端窗⼝，按 Ctrl+C 取消当前流程，然后重新运⾏登录命令。第⼆次通常会顺利很多。

还有另⼀种情况：CC打开浏览器后，你发现需要重新登录GitHub。别担⼼，这很正常⸺可能CC启动的是系统默认浏览器，⽽你之前是在另⼀个浏览器⾥注册的。登录⼀下就好了，不影响后续使⽤。

# 验证安装：

想确认是否安装成功，可以对Claude说

![image](/book/webapp/7ddca39cccfd.jpg)


# 检查 GitHub CLI 版本

如果看到版本号(⽐如 gh version 2.40.0 )，说明安装成功了。

# 1.1.3 第三步：推送项⽬到 GitHub

现在要把你的喵宇宙项⽬上传到GitHub。对CC说：

![image](/book/webapp/30f382e75c8f.jpg)


帮我在GitHub上创建⼀个新仓库，名字叫miao，描述为"喵宇宙，猫猫的展⽰舞台"，然后上传

实际上，CC偷偷地执⾏了好多命令，⽐如：

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

不过咱们这⾥不⽤深究

Claude会⾃动帮你完成所有操作：创建仓库、添加⽂件、提交代码。完成后会给你⼀个链接，类似https://github.com/你的⽤⼾名/miao 。

点击链接看看⸺你的代码已经在互联⽹上了！现在即使电脑坏了，代码也安全地保存在云端，这就是代码托管的意义。当然更美妙的还在后⾯。

# 1.1.4 第四步：启⽤ GitHub Pages

刚才还仅仅是把代码上传到了github，现在要真正启⽤免费的⽹站托管了。我们对cc说：

![image](/book/webapp/b566caa068f9.jpg)


把喵宇宙项⽬发布成⼈⼈可以访问的⽹站

CC会利⽤刚刚安装好的githubcli，调⽤⼀系列命令，来完成发布，可能要花上⼏分钟的时间，最后告诉你⼀个类似这样的⽹址： https://你的⽤⼾名.github.io/miao/ 。

当然这⾥不借助CC，你也可以⾃⼰操作：

1：进⼊git设置⻚⾯

在仓库⻚⾯顶部，找到并点击 Settings（设置）标签。

2：找到 Pages 设置

在左侧菜单中，向下滚动找到Pages选项，点击进⼊。

3：选择发布源

在 "Source"（源）部分：

1. 点击下拉菜单，选择 Deploy from a branch（从分⽀部署）

2. 在 "Branch" 下拉菜单中选择 main

3.⽂件夹选择/(root)（根⽬录）

4. 点击 Save（保存）

4：等待部署完成

保存后，GitHub 会⾃动开始部署。⻚⾯顶部会显⽰：Your site is live at https://你的⽤⼾

名.github.io/miao/

通常需要1-3分钟完成部署。你可以刷新⻚⾯查看状态。

5：访问你的在线⽹站

可以看到还挺繁琐的，是吧？这就是为什么我们前⾯要装⼀下githubcli，让CC帮我们完成这些繁琐做的步骤。

成就感时刻：你的猫咪展⽰卡⽚出现在了⼀个真正的⽹站上！

![image](/book/webapp/cfd386927365.jpg)


任何⼈只要有这个链接，都能访问你的作品。快把它发给朋友们吧！

咱们这⾥只是完成了最基础的部署，如果想了解更多“部署”⽅案，怎样适配不同的项⽬，海外和国内的区别，以及更⾼阶的知识，请移步《上线篇-让世界看到你的作品》。

2. 给代码买份保险

现在你的喵宇宙已经上线，朋友们都能看到可爱的猫咪了。但玩过⼀会⼉后，你可能会发现⼀个尴尬的问题：怎么⼤家上传的照⽚和编辑的信息，彼此都看不到呢？

这是因为咱们之前，照⽚和信息都是保存在浏览器缓存中的，这些缓存仍然在本机，互相⽆法共享，在编程的世界，⼀切信息都是数据，所以为了能互相看到彼此的信息，我们还要实现数据的共享。

要解决这个问题，我们需要做⼀场"⼤⼿术"：把数据从浏览器搬到云端数据库。这会涉及⼤量代码改动，万⼀改坏了怎么办？

![image](/book/webapp/433b35696373.jpg)


版本管理（VersionControl）就是为了解决这个痛点⽽⽣的。在编程中，我们使⽤⼀个叫Git的⼯具来做这件事。Git是⼀个免费的版本管理⼯具，⼏乎所有程序员都在⽤它。这是⼀个命令⾏⼯具，不过ClaudeCode内置了Git⽀持，所以你完全不需要记忆那些复杂的命令。

# 2.1 为什么现在才学Git？

Git的操作有点复杂，所以我们⼀开始没有引⼊，但现在是学习它的时候了⸺因为你正⾯临⼀个真实的⻛险场景。Git就像游戏的存档功能：打Boss之前先存个档，失败了就读档重来。

现在我们要对代码进⾏"伤筋动⻣"的改造，为了防⽌改坏了回不去，让我们启⽤这台"时光机"。

# 2.2 Git 的基本概念

Git虽然有很多复杂的功能，但它的核⼼概念却很简单。每次你完成⼀个⼩功能，觉得"嗯，这个版本不错，值得保存"，就可以做⼀次"提交"（Commit），就像按下游戏的存档按钮。提交时，你可以写⼀段说明，⽐如"添加了照⽚上传功能"，这样以后回看历史记录时，就能知道每个版本做了什么。所有的提交会形成⼀条历史记录链，你可以随时查看，甚⾄回退到任何⼀个之前的版本。

![image](/book/webapp/8101fc7a7923.jpg)


具体怎么操作呢？

假设你现在的代码已经是⼀个稳定的版本，我们先做个"存档"。对CC说：

![image](/book/webapp/a9469018c53f.jpg)


帮我提交当前代码到Git，提交信息写："V1.0-基础版本上线"

CC会⾃动帮你完成所有操作⸺初始化Git仓库、添加⽂件、创建提交。整个过程你甚⾄不需要知道背后发⽣了什么。

如果你想查看之前做过哪些提交，可以说：

![image](/book/webapp/0d44483cdef7.jpg)


显⽰Git提交历史

你会看到⼀个列表，每⼀项都是⼀次提交，包含时间和说明信息：

# 代码块

1 IN: git log --oneline --decorate --graph 

OUT:2 $\star$ 9d49a2e (HEAD -> main) V1.0 - 基础版本上线

万⼀真的需要回退到之前的版本，也很简单，告诉CC：

![image](/book/webapp/786a150c8483.jpg)


回退到上⼀个提交

就可以了。

以后做新功能，建议养成“⼩步快跑”的习惯：每完成⼀个⼩改进就提交⼀次，甚⾄改个⼩bug也要做，不要等到做了很多功能才⼀次性提交。提交信息要写清楚做了什么，⽐如“添加了照⽚上传功

能”就⽐“更新代码”要好得多。这样，当你需要回看历史或者回退版本时，就能快速找到想要的那个点。

Git的能⼒远不⽌于此，它有⼀套很漂亮的多⼈协作概念，可以帮我们管理超⼤型的项⽬，想深⼊了解git 使⽤的同学可以查看 Scott Chacon 和 Ben Strab 写的书《Pro Git》或者知乎的这⼀篇⻓⽂档。

# 2.2.1 与 github 的关系

看到这⾥，你可能会有点晕：你这两章⼜是git，⼜是github，⼜是 github page 的，他们到底什么关系啊？这⾥就解释⼀下：

Git就像你⼿⾥的草稿本。写论⽂时你不会直接在正式稿纸上写，⽽是先在草稿本上反复修改、涂涂画画，记录每⼀次的改动。Git就是代码的草稿本，它记得你删了哪段、加了哪句，改错了还能翻回之前的版本。

GitHub像是⽼师的档案柜。你把草稿本上的定稿誊抄好，交上去存档。这样⼀来，哪怕你的草稿本丢了，档案柜⾥还有备份。⽽且如果有⼩组作业，⼤家都能从档案柜取阅、各⾃修改后再交回来。

GitHubPages则是班级⻔⼝的展⽰墙。⽼师从你交上去的论⽂中，挑出⼀部分直接贴到墙上，路过的⼈都能看到。你不需要再单独打印海报⸺只要论⽂在档案柜⾥，展⽰墙就会⾃动更新。

![image](/book/webapp/c6d7b06b8b91.jpg)


咱们第1章先把代码上传到了github，⼜通过githubpages搭建了⽹站，让所有⼈都可以访问；这⼀章在本地装了git，终于每⼀次修改都可以保存历史记录了。

# 3. 给数据找个家

现在来解决数据共享的问题。我们需要⼀个"云端⼤脑"⸺所有⽤⼾的猫咪信息都保存在那⾥，任何⼈访问⽹站时，都能从这个⼤脑⾥读取数据。

# 3.1 前后端分离架构

这时候就要引⼊前后端的概念了。简单来说，我们要把⾃⼰的程序拆成两部分，⼀部分⽤来展⽰，还是运⾏在浏览器中，称为前端；⼀部分⽤来存储，放在⼀台共享的机器上（⼀般叫服务器），称为后

端。这样你和朋友们就可以通过这台服务器共享所有的猫猫照⽚了。

![image](/book/webapp/4a840bfd396a.jpg)


从图⾥可以看出：只要数据都存在中间这个服务器上，你和朋友们就可以共享所有猫猫照⽚了。

⼩贴⼠：你应该经常从新闻⾥看到，互联⽹企业招聘什么“前端程序员”、“后端程序员”之类的，说的就是他们各⾃擅⻓的编写在不同地⽅运⾏的程序。不过今天咱们这个ai打⼯⼈，可是个前后端通才，可以把所有⼯作都交给它。

# 3.2 数据存储

开始下⼀步之前，我们先思考⼀下，到底有哪些数据需要保存呢？

• 猫咪的名字

猫的信息，包括品种、年龄、性别、描述和标签

. 照⽚

这都是我们要保存的内容，哪怕不懂编程，凭直觉也能感觉到它们有些不同：名字和信息都是⽂本和数字信息，⽽照⽚是像素组成的图⽚。通常来说，保存⽂本和数字信息⽤到的技术叫数据库，⽽保存图⽚这类⽂件的技术叫做对象存储。

# 3.2.1 数据库存储（Database）

数据库⾥⾯保存数据的基本单元叫做表（table），它和我们平时使⽤的excel表很像，也是分为⾏列的，⽐如咱们的猫猫信息，就可以⽤这样的表来存储：


cats


<table><tr><td>编号</td><td>名字</td><td>品种</td><td>年龄</td><td>性别</td><td>描述</td><td>标签</td></tr><tr><td>1</td><td>小橘</td><td>橘猫</td><td>2</td><td>男</td><td>性格温顺，喜欢晒...</td><td>温顺、亲人、吃货</td></tr><tr><td>2</td><td>雪球</td><td>英短</td><td>1</td><td>女</td><td>优雅的小公主...</td><td>优雅、安静</td></tr></table>

# 3.2.2 ⽂件存储（File Storage）

⽂件存储，也叫对象存储，它⾮常简单，就是前端可以把⽂件上传，服务器接收这个⽂件以后，保存起来，并且给它分配⼀个url 地址，这样所有⼈就都能从浏览器中访问这个⽂件了。URL⼤概⻓这个样⼦：

```html
https://vswrhnmhumfxgfrwpfwc.supabase.co/storage/v1/object/public/cat-images/6/1762661050243_tw65sc.png 
```

你可能会有⼀点疑惑：这个url，跟我们在GithubPage上部署⾃⼰的⽹⻚，获取的url很像啊，只是⻓⼀点？对，实际上他们的存储和访问技术也是很像的，HTML⻚⾯也是⼀个⽂件嘛。不过它们的使⽤场景还是有些不同：

之前我们的HTML⻚⾯，是由程序员（就是你呀）编写并上传的，⼀般⽤⼾（⽐如你的朋友们）只是访问和查看。通常上传不会很频繁，毕竟需要编码更新了才会有⼀次上传嘛；总的⽂件数也不会太多；所以通过gitaction来处理就⾜够了，哪怕普通⽤命令⾏上传也完全够⽤

⽽对象存储的内容不同：设想⼀下，如果咱们的“喵宇宙”项⽬有了千百万的⽤⼾，每时每刻都有⼈想上传⾃⼰爱喵的照⽚，就需要有专⻔的技术来应对这种⾮常频繁⼜⼤量的⽂件保存了，这就是对象存储的意义。

仔细看上⾯的url的话，还会发现：上传后的⽂件名，都有很⻓的⼀串字符

1762661050243_tw65sc.png ，看上去没什么意义，这也是对象存储的标准做法：通过特定的算法，保证上传后的⽂件，有⾃⼰“唯⼀”的名字，这样成千上万的⽂件之间就不会重名。

⼩贴⼠：我们以后看到技术相关的⽂章，可能会遇到⼀个词⼉，叫数据持久化，其实它就是我们前⾯提到的数据存储⸺因为只有存起来，数据才不会消失，下次启动程序的时候，还能看到它们。这个词⼉，是从作⽤的⻆度来表达数据存储的。从这个意义上说：之前我们提到的浏览器本地存储，本章节讲到的数据库和⽂件，都属于数据持久化的范畴，只是持久化的位置不同。

# 3.3 选择 Supabase

经典编程模式中，我们需要写后端程序来实现对数据库和对象存储的控制，然后再开放API接⼝给前端程序，相互沟通，整个过程变得⽐较复杂（当然也是有价值的，我们最终会把项⽬变成这种模式，但⽬前还不需要）。

对于很多练习性的⼩项⽬来说，我们难免会想：就不能让前端程序直接连接数据存储么？可以的，有需求就有供给：⼀些云服务⼚商，就提供了这样⾯向互联⽹，前端可以直接访问的存储服务，其中的佼佼者就是supabase。可以说，⼏乎所有vibecoding的云服务商，都接⼊了supabase的数据存储能⼒，它就是ai编程时代的标配。

# 3.3.1 创建 Supabase 项⽬

1. 访问 supabase.com，⽤ GitHub 账号登录（⽅便权限联通）

2. 创建⼀个组织，⽐如叫 showmecode ，类型选 Personal ，付费计划选 Free

<table><tr><td colspan="2">Create a new organization
Organizations are a way to group your projects. Each organization can be configured with different team members and billing settings.</td></tr><tr><td rowspan="2">Name</td><td>showmecode</td></tr><tr><td>What&#x27;s the name of your company or team? You can change this later.</td></tr><tr><td rowspan="2">Type</td><td>Personal</td></tr><tr><td>What best describes your organization?</td></tr><tr><td rowspan="2">Plan</td><td>Free - $0/month</td></tr><tr><td>Which plan fits your organization&#x27;s needs best? Learn more.</td></tr><tr><td>Cancel</td><td>Create organization</td></tr></table>

3. 在组织内创建项⽬（Project），继续叫 miao ，设置密码，地区选择 Asia Pacific （亚太）

![image](/book/webapp/c17ee39d522e.jpg)


# 3.3.2 创建数据表

现在有了project，我们就可以创建数据表了。前⾯提到过，每个数据表就像我们的excel表格⼀样，每⼀列代表⼀种信息，每⼀⾏表达⼀条数据。我们往往先设计好表格，知道应该保存哪些信息，然后才逐渐⼀⾏⾏保存数据，就像下⾯这样，先定义⼀个空表格。

<table><tr><td>编号</td><td>名字</td><td>品种</td><td>年龄</td><td>性别</td><td>描述</td><td>标签</td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>

Supabase提供图形界⾯，让我们来定义表格，不过仍然有点复杂，好在数据库也有⾃⼰的语⾔，叫做SQL，即结构化查询语⾔。它是⻓得和英语很像，专⻔⽤来定义数据表和完成数据的增删改查（CRUD）。既然是语⾔，当然也可以找ai来帮忙，让它充当我们的”翻译官“。

注意这⾥我们引⼊了⼀个概念叫“主键”，它其实就等于上⾯表格⾥的编号，这些编号应该是唯⼀的，可以是数字，也可以是⼀⻓串字符（防⽌重复），因为数字⽐较简单，可以在插⼊数据的时候⾃动增⻓，我们这⾥特意告诉它⽤数字。

<table><tr><td>主键
编号</td><td>名字</td><td>品种</td><td>年龄</td><td>性别</td><td>描述</td><td>标签</td></tr><tr><td>1</td><td>小橘</td><td>橘猫</td><td>2</td><td>男</td><td>性格温顺，喜欢晒...</td><td>温顺、亲人、吃货</td></tr><tr><td>2</td><td>雪球</td><td>英短</td><td>1</td><td>女</td><td>优雅的小公主...</td><td>优雅、安静</td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>

# 于是我们得到类似这样⼀段语句：

# 代码块

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

从英⽂的含义也可以看出，这⾥给每个列起了个名字，并且告诉数据库，它们的类型，下⾯的给出了详细的解释，现在不想看也没问题，可以略过：

id：编号，是每条数据的唯⼀标识（也就是提⽰词⾥的“主键”），这⾥我们选择⽤简单的数字来表⽰。

• name：猫猫的名字，类型选择varchar，就是⻓度不确定的⽂字，后⾯字数不定，⼜不是太⻓的⽂字，都可以⽤这个类型。这⾥多了⼀个NOTNULL标识，表⽰在插⼊⼀⾏数据的时候，名字必须得有，不允许记录⼀只没有名字的猫猫。

• breed：品种，也选择 varchar。（要想⽀持⽤⼾选择品种的话，这⾥还需要更复杂的设计，不过⽬前暂时保存名字就好了）

• age：年龄，类型选择numeric，因为年龄不⼀定是整数，这⾥就不选int开头的类型了。

• sex：性别，类型选择int2。你可能有点奇怪，男/⼥不是⽂本么，为什么要选数字类型？这其实是常⻅的习惯，当可选项只有两个的时候，⽤0和1来表⽰，会简单清晰（什么？你觉得性别有128种？这不在本项⽬的考虑范围）。

description：描述，类型选择text，这⾥不⽤varchar，是因为描述有可能很⻓，⽽且通常不会⽤描述的⽂字来查找

• tags：标签，类型选择 varchar

created_at：创建时间，⼀般我们都会想记录⼀下数据是什么时候添加到数据库的，它有个缺省值now()，说明我们在保存数据的时候，不需要⾃⼰设置这个字段的值，supabase数据库会⾃动⽤当时的时间来存储

updated_at：和创建时间类似，只不过记录的是数据变更的时间

• images：⽤来保存照⽚的位置（注意不是照⽚⽂件，⽂件本⾝是要放在对象存储的），它的类型有点特别，虽然选择了text，⻮轮图标激活的窗⼝⾥，还要选中”DefineasArray“，表⽰可以存储多张照⽚的位置：

在 supabase 的⻚⾯中侧边导航栏中，找到 SQL Editor：

![image](/book/webapp/5d230a889ea4.jpg)


点击 $^ +$ ，创建⼀个空⽩标签⻚：

![image](/book/webapp/32e0a1e22aca.jpg)


把ai刚刚⽣成的语句贴进去，点击"run"，创建表的任务就完成啦。

![image](/book/webapp/ec87bd0b4e85.jpg)


⼩贴⼠：数据表和它的字段定义，也叫做数据结构，⼀般来说，在正式开发⼀个项⽬之前，我们需要先把数据结构定下来，它就是我们的“定海神针”，相当于⼀句话⾥的名词。

现在这个数据表，我们已经可以保存数据啦，它右侧会展⽰⼀个unrestricted图标，表⽰没有被权限设置保护起来，拿到链接的任何⼈都可以访问和修改，不过现在还不⽤担⼼。

![image](/book/webapp/e453f6c2df92.jpg)


cats 

Unrestricted 

点击这个表名，就能查看⾥⾯的数据，当然，现在还是空的。

如果我们点击这个表名右侧的三个竖向点，选择"Edittable"，就能看到刚刚创建的表结构了：

![image](/book/webapp/caf6abe3d49c.jpg)


![image](/book/webapp/8ff0186067eb.jpg)


可以看到，它跟我们⽣成语句中的列名，是⼀⼀对应的。

# 3.3.3 创建对象存储

回到项⽬界⾯，选择 "Storage"，进⼊存储的设置：

Last 60 minutes <Statistics for last 6O minutes 

![image](/book/webapp/7d05d689e8ca.jpg)


# Database

2 

![image](/book/webapp/150d29a4b2fc.jpg)


![image](/book/webapp/2517fad60a49.jpg)


# Auth

0 

![image](/book/webapp/3904737d8bf9.jpg)


# Storage

Storage Requests 

6 

![image](/book/webapp/45fe1fd40f44.jpg)


![image](/book/webapp/da0d83af9f06.jpg)


# Realtime

0 

需要在这⾥，给⾃⼰创建⼀个桶（bucket），所谓桶，就是个⽂件的容器，⼤概可以看做windows电脑上的C盘、D盘吧。

# Files

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


我们给这个新桶起名叫 "cat-images"，打开 "public" 开关，让所有⼈都可以上传下载。

![image](/book/webapp/316df467cc36.jpg)


# 4. 连接前端与后端

现在准备⼯作都已经完成，可以修改⻚⾯代码，把图⽚保存到对象存储，信息保存到数据库啦。

# 4.1 更新 PRD ⽂档

⾸先我们来修改prd.md，把刚才新建的数据库表，补充到⽂件中：


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

注意：连接串的具体值在 Supabase 后台 **Database $>$ Connect** ⾥获取。

![image](/book/webapp/49b2e7828cb9.jpg)


表达表结构的 SQL 语句，刚才是 ai 帮我们⽣成的，我们也可以在 cats 表菜单项的 "copy tableschema" 中获取：

![image](/book/webapp/3c1a56a8fb27.jpg)


SQL是⼀种数据库专⽤的语⾔，告诉数据库如何查询和处理数据。⼏乎所有的关系型数据库，都⽀持标准的SQL语⾔。想初步了解的同学，可以阅读廖雪峰⽼师的SQL简介。

# 4.2 让 AI 改造代码

# 4.2.1 连接数据库

现在我们就可以让CC做⼀次深度修改了：

有的时候，就是“话越少，事⼉越⼤”：这次CC⼯作了很久，终于得到⼀个新⻚⾯，它在启动的时候，会⾸先初始化数据库连接：


代码块


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

# 4.2.2 关于安全

细⼼的你，如果看了上⾯访问数据库的代码，可能会想："把密钥直接写在代码⾥，这安全吗？"这是个好问题。Supabase提供的是AnonKey（匿名密钥），它本⾝就是为了公开使⽤设计的，只能访问你允许公开的数据。但即便如此，养成"环境变量"的意识也很重要。

在真实的⽣产项⽬中，我们会把这类配置放在环境变量⾥，⽽不是直接写在代码中。虽然前端代码最终还是会暴露这些密钥（因为浏览器需要它们来发起请求），但这种做法⾄少让配置管理更清晰，也⽅便在不同环境（开发/测试/⽣产）之间切换。

⽬前我们使⽤公开访问策略（RLS未启⽤）来快速验证功能。在实际产品中，你应该配置⾏级安全策略（RLS），限制⽤⼾只能访问⾃⼰的数据。我们稍后就会做这个改进。

# 4.2.3 排错时刻：数据库连不上？

刚刚改造完数据库链接的时候，我期待刷新，结果⸺⼀⽚空⽩。浏览器控制台（按F12打开）⾥赫然显⽰⼀⾏红字：

代码块

Supabase 初始化失败: Invalid API key1

"什么情况？我明明复制了 anon key 啊？"

当然继续求助于CC：

![image](/book/webapp/3013f49adfc2.jpg)


帮我检查⼀下 Supabase 配置，⻚⾯显⽰"Supabase 初始化失败: Invalid API key"

CC让我仔细检查代码，结果发现⾃⼰在粘贴的时候，不⼩⼼把key末尾的字符截断了⸺原来复制的时候漏掉了最后⼏位。我把key重新从Supabase后台复制了⼀遍，这次特意多选了⼏个字符确认选中了全部内容，粘贴进去，刷新⻚⾯，错误解决了。

还有⼀个常⻅的坑：anonkey和projectURL不匹配。Supabase会在你创建项⽬时给你⼀组配置，但如果你同时开了多个项⽬，很容易搞混。如果你看到 Failed to fetch 或 404 Not Found的错误，先检查⼀下URL是不是对应当前这个项⽬。

# 4.2.4 加载数据：从数据库读取

加载猫猫数据的时候，也不再从浏览器缓存中读取，⽽是直接读数据库了。看着改造后的代码，你可能会觉得有些陌⽣。与其我直接讲解每⼀⾏代码，不如教你⼀个更实⽤的⽅法：让AI当你的代码向导。

# 4.2.4.1 第⼀步：建⽴整体认知

与其直接跳进代码的海洋，不如先让AI给你⼀个⻦瞰图。打开你的 index.html ⽂件，然后问AI：

![image](/book/webapp/de6625cee8a1.jpg)


这个⽂件看起来好⼤，能帮我理解⼀下整体结构吗？就像给⼀个完全不懂代码的⼈解释样。

CC会很贴⼼地通过⽐喻和类⽐，帮你快速理解：

当然可以！想象这个⽂件就像⼀场舞台剧。当⼤幕拉开，有三个团队默契配合，为观众呈现精彩的演出：

HTML（舞台监督）：负责搭建整个舞台的⻣架⸺哪⾥放登录按钮、哪⾥展⽰猫咪卡⽚、哪⾥是评论区。就像舞台监督拿着蓝图，告诉⼯⼈哪⾥搭景、哪⾥放道具。

CSS（服装造型师）：负责所有视觉呈现⸺卡⽚⽤什么颜⾊、按钮有没有圆⻆、字体多⼤、间距多少。就像造型师为演员设计服装、化妆、打光，让整个舞台看起来赏⼼悦⽬。

JavaScript（导演）：负责编排所有动作和剧情⸺点击按钮会触发什么、数据从哪⾥来、⻚⾯如何响应⽤⼾的操作。就像导演指挥演员什么时候上场、说什么台词、怎么互动。

你看，这样⼀问，原本密密⿇⿇的代码突然有了清晰的轮廓。你不需要记住每个细节，但要记住这三个"部⻔"各⾃负责什么。当问题出现时，你就能⼤致判断：这是造型问题（CSS）、布景问题（HTML），还是剧情编排问题（JavaScript）。

![image](/book/webapp/fcf7d1860164.jpg)


# 4.2.4.2 第⼆步：追踪⼀个完整流程

知道了整体结构，接下来我们跟着⼀个具体的功能⾛⼀遍，看看代码是怎么协作的。我们选择最基础的场景：⽤⼾打开⻚⾯，看到猫咪卡⽚。

这时候，你可以这样问AI：

![image](/book/webapp/c2f023556861.jpg)


我想理解⽤⼾从打开⻚⾯到看到猫咪卡⽚的完整流程，能⼀步步给我讲解吗？每⼀步都告诉我：发⽣了什么、为什么要这样做、如果这⾥出错了会有什么现象。

AI：好的，让我们跟随⼀位叫⼩美的⽤⼾，看看她打开你的应⽤后会发⽣什么：

# $>$ 第1步：浏览器加载⻚⾯

⼩美的浏览器开始下载你的 index.html ⽂件。这时候就像剧院开⻔，观众⼊场。如果这⼀步出问题（⽐如⽂件找不到），她会看到"404⻚⾯不存在"的错误。

# > 第 2 步：解析 HTML 和 CSS

浏览器读取HTML，搭建⻚⾯⻣架；读取CSS，给⻚⾯穿上"⾐服"。这时候⻚⾯看起来已经成型了，但还没有数据。如果CSS加载失败，⻚⾯会变成"素颜"⸺所有元素挤在⼀起，没有颜⾊。

# >第3步：检查登录状态

JavaScript开始运⾏，⾸先问数据库："这位访客之前来过吗？"如果⼩美登录过，右上⻆会显⽰"欢迎回来"；如果没登录，显⽰"登录/注册"按钮。这⼀步出问题，可能会看到"加载中"⼀直转圈。

# >第4步：获取猫咪数据

JavaScript向数据库发送请求："请给我所有猫咪的信息。"数据库返回⼀个列表，包含每只猫的名字、年龄、照⽚等。如果这⾥出问题（⽐如⽹络断了、数据库连接失败），⻚⾯会显⽰"暂⽆猫咪"或空⽩。

# >第5步：渲染卡⽚

JavaScript拿到数据后，开始"组装"卡⽚。它为每只猫创建⼀个卡⽚元素，填⼊照⽚、名字、描述，然后插⼊到⻚⾯上。这时候⼩美终于看到猫咪了！如果这⾥出错，可能看到数据但排版混乱。

# >第6步：绑定交互事件

最后，JavaScript给每个按钮"注⼊灵魂"⸺点赞按钮知道被点击后要做什么、评论框知道怎么弹出。这⼀步出问题，⻚⾯看起来正常，但点击按钮没反应。

![image](/book/webapp/c53c9ea8d3bf.jpg)


通过这样的对话，你不仅知道了流程，还知道了每个环节可能出什么问题。这⽐单纯读代码有⽤多了，因为你在学习"诊断"的能⼒。

⼩练习，让AI解释解释下⾯这段从数据库读取猫咪数据的代码吧。

# 代码块

```javascript
1 async function loadCatsFromDatabase() {  
2 if (!supabaseEnabled || !supabase) {  
3 console.warn('Supabase 未启用，使用默认数据');  
4 return null;  
5 }  
6 try {
```

8 const{data，error} $\equiv$ awaitsupabase 9 .from('cats') 10 .select('\*') 11 .order('id'，{ascending:true}); 12 13 if (error){ 14 console(error('从数据库加载失败：'，error); 15 return null; 16 } 17 18 return data.map(dbCat $\Rightarrow$ （{ 19 //转换数据格式... 20 }）; 21 } catch (error){ 22 console.error('加载数据时出错：'，error); 23 return null; 24 } 25 }

# 4.2.5 填充猫猫数据

此时我们打开⻚⾯，不要吃惊，⼀只猫猫都没了?? 原因很简单，咱们的数据库中，cats表还是空的呢。

我们当然可以在supabase⻚⾯⾥，点击cats表，⼿⼯编辑⼏只猫猫的信息，不过既然有ai帮我们⼲活，那还是偷个懒吧，直接说：

![image](/book/webapp/bfde650f6d59.jpg)


现在项⽬已经可以连接 supabase了，帮我原来的演⽰数据，都插⼊到 supabase 表中

CC会贴⼼地帮我们创建⼀个⼯具⻚⾯，这是个独⽴的⻚⾯，专⻔⽤来初始化数据：

![image](/book/webapp/c940213b95fd.jpg)


# 插入演示数据到 Supabase

说明：此工具将把 index.html 中的 6 只猫咪演示数据插入到 Supabase 数据库中。

# 开始插入数据

# 清空数据库

# 查看数据库数据

页面已加载，Supabase 客户端已初始化

正在加载数据库数据..

√找到6条记录

# 数据库中的猫咪：

![image](/book/webapp/83159979f2c5.jpg)


小橘2岁－橘猫-性格温顺，喜欢晒太阳，对小鱼干没有抵抗力。是个不折不扣的吃货.. $( 1 0 ; 7 )$ 

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

插⼊演⽰数据成功后，咱们的index.html就会恢复成最初的样⼦，看起来⼀切好像没有变化，但当你联系朋友们，就会发现情况不⼀样：⽆论你编辑的信息，还是朋友编辑的，都可以随时让对⽅看到啦！只不过，猫猫的照⽚还不⾏，需要下⼀步来解决。

# 4.2.6 图⽚上传：保存到对象存储

⽤同样的⽅法，共享图⽚的存储。⾸先编辑prd.md，增加下⾯两句：

# 代码块

1 ### Supabase Storage 

# 配置：

**Storage Bucket**: `cat-images`2 

3 - ⽤于存储猫咪照⽚

4 - Public bucket（公开访问）

- ⽂件组织：`{猫咪id}/{当前时间}_{随机字符串}.{⽂件扩展名}`5

⾸先确认存储桶的名字，是我们之前创建的 cat-images ，然后指定⽂件名。因为对象存储本质上，就是在上传/下载⽂件，⽽上传后的⽂件，不会保留原来的名字了（要不然所有⼈都上传，存储⽂件夹就很容易重名），所以这⾥我们给上传后的⽂件名，定了个规矩：都是按照 猫咪 id 做⽂件夹， 当前时间 $^ +$ 随机字符串 做⽂件名。

然后再跟CC说：

![image](/book/webapp/42a9daa8316e.jpg)


现在，可以把照⽚存储，也修改为存在 supabase storage 了

于是⽂件上传的代码也改变了，变成了下⾯这个函数：


代码块


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
15 const timestamp $=$ Date-now();   
16 const fileExt $=$ file.name.split’.'.).pop();   
17 const randomStr $=$ Math.random().substring(36).substring(7);   
18 const fileName $=$ '\$\{timestamp\}_${randomStr}.${fileExt}\};   
19 constfilePath $=$ '\$\{fileName\}';   
20   
21 console.log('uploadImagestoStorage：文件路径 $=$ {\filePath\});   
22 console.log('uploadImagestoStorage：文件大小 $=$ {\file.size}bytes\};   
23 console.log('uploadImagestoStorage：文件类型 $=$ {\file.type\});   
24   
25 //Upload file-上传文件   
26 console.log('uploadImagestoStorage：调用 supabase(storage.upload()...');   
27 const{data,error} $=$ await supabase(storage   
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
43 const{data:urlData} $\equiv$ supabase.Storage.  
44 .from('cat-images')  
45 .getPublicUrl(filePath);  
46  
47 const publicUrl $\equiv$ urlData(publicUrl;  
48 console.log('uploadImageToStorage:公开URL $=$ ${publicUrl}）;  
49  
50 return publicUrl;  
51 }

# 核⼼就是这⼀句：

# 代码块

1 const{data，error} $\equiv$ awaitsupabase storing   
2 .from('cat-images')   
3 .upload(filePath，file，{   
4 cacheControl: '3600'，   
5 updert：false   
6 }）; 

把选中的⽂件，上传到我们事先创建好的 cat-images 桶中。

# 踩坑实录：图⽚怎么传不上去？

当你兴冲冲地点击"上传照⽚"，选了⼀张超可爱的猫咪GIF，结果⸺⻚⾯弹出⼀个红⾊错误提⽰：Bucket not found 。当时就懵了，"bucket？什么 bucket？我明明创建了 cat-images 啊？"

这时候别⾃⼰瞎折腾，直接问CC：

![image](/book/webapp/b50f85feb8db.jpg)


图⽚上传失败，提⽰ "Bucket not found"，帮我排查⼀下

CC会帮你检查bucket名称是否匹配、权限策略是否正确配置，甚⾄⾃动帮你⽣成需要执⾏的SQL语句。

经过 CC 提⽰，你仔细检查 Supabase 后台，才发现问题：之前创建的 bucket 名叫 cat-images但代码⾥写的是 cat-image （少了个 s）。就这⼀个字⺟的差别，如果没有CC的帮助，真不知道要花多少时间。

CC还会很贴⼼的给出更多检查建议：

```txt
Supabase 创建 bucket 默认是私有的，需要从左侧菜单进入 Storage > Policies，给 images bucket 添加一条允许匿名用户上传的策略。如果你看到 Unauthorized 或Forbidden 的错误，很可能是权限没配好。
```

# 4.2.7 处理错误：优雅地失败

⽹络请求可能会失败⸺⽤⼾的⼿机信号不好，或者Supabase服务暂时不可⽤。这时候不应该让⻚⾯崩溃，⽽应该给⽤⼾清晰的反馈。

![image](/book/webapp/432b095e3fb1.jpg)


想象⼀下这个场景：你的朋友兴冲冲地打开你分享的喵宇宙链接，结果只看到⼀⽚空⽩，或者更糟糕的，⻚⾯卡死了。她可能会以为⽹站坏了，直接关掉，再也不会回来。这种情况太可惜了，因为我们完全可以⽤更优雅的⽅式处理错误。

对CC说：

![image](/book/webapp/b800108c807f.jpg)


⽹络请求可能会失败，帮我添加错误处理机制。当加载数据出错时，给⽤⼾可爱友好的提⽰，⽽不是让⻚⾯崩溃或者⼀⽚空⽩。

CC 会帮你改造数据加载的代码，添加完善的错误处理。⽐如把 loadCatsFromDatabase 包装成这样：

# 代码块

```txt
1 async function loadCatsWithErrorHandling() {  
2 try {  
3 showLoading(); 
```

4 const cats $=$ await loadCatsFromDatabase();   
5   
6 if (cats $= = =$ null）{   
7 showError('加载失败，请检查网络连接后刷新页面');   
8 return;   
9 }   
10   
11 renderCats(cats);   
12 } catch (error){   
13 showError('出错了：' + error.message);   
14 }   
15 }

还会添加⼀个友好的错误提⽰组件：


代码块


```javascript
1 function showError(message) {
2 //显示一个友好的错误提示，而不是console.error
3 document.getElementById('cardsContainer').innerHTML = ` <div class="error-container">
5 <p> {{message}} </p>
6 <button onclick="location.Reload(){
7 } </div>
8 ;
```

现在，你可以故意测试⼀下这个效果。⽐如，把⽹络断开，然后刷新⻚⾯。你会看到：

![image](/book/webapp/5fde0b24c214.jpg)


再试一次瞄~

⼀个可爱的猫咪表情，配上清晰的提⽰⽂字，这⽐冷冰冰的⽩屏或者浏览器默认的错误⻚要好多了。其实这⾥有个⼩窍⻔：错误提⽰也是⽤⼾体验的⼀部分。想象⼀下，当你去⼀家餐厅，点完菜后服务员失踪了，你根本不知道菜什么时候上来，会不会来。这种不确定感最让⼈焦虑。错误提⽰也⼀样告诉⽤⼾发⽣了什么，以及他可以做什么，这种"掌控感"能⼤⼤降低挫败感。

# 4.2.8 给⽤⼾反馈：Loading 状态

说到等待，还有⼀个场景需要处理：当数据还在加载时，⻚⾯不应该⼀⽚空⽩。

你可能有过这种经历：打开⼀个⽹⻚，等了3秒钟还是⽩屏，于是你怀疑⽹站是不是挂了，直接关掉。但其实数据正在加载，只是没有任何视觉反馈。这种"沉默的等待"会让⽤⼾很不安。

专业的应⽤会显⽰ Loading 动画或⻣架屏，告诉⽤⼾"数据正在路上"。

让我们告诉 CC：

![image](/book/webapp/1c47611d9bc6.jpg)


⻚⾯刚打开的时候还是⼀⽚空⽩，过⼀会⼉猫猫数据才能显⽰出来，这个时段应该展⽰个加载动画。


CC 会在数据加载期间显⽰⼀个旋转的 Loading 动画：



代码块


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

效果⼤概是这样的：⼀个跳动的猫猫头像，配上"正在加载猫咪..."之类的⽂字。看起来是个⼩细节，但这正是区分"玩具"和"产品"的关键。

![image](/book/webapp/1593f957f6a2.jpg)


猫咪们正在赶来...

你可能会想："⽤⼾真的会注意到这些吗？"答案是：不会。好的设计就是让⽤⼾"⽆感"⸺他不会意识到Loading动画的存在，但如果没有它，⽤⼾⼀定会感觉到"哪⾥不对劲"。这就像电影中的背景⾳乐，观众不会刻意去听，但它塑造了整体的氛围。

现在你可以刷新⻚⾯看看效果。⾸先出现的是Loading动画，然后猫咪卡⽚逐渐显⽰出来。这种流畅的过渡让体验变得专业⽽舒适。

# 4.2.9 享受共享时光

现在，让我们再次提交所有的修改，访问已发布好的⽹⻚，上传⾃⼰真实的猫猫照⽚，和朋友们⼀起享受美好时光吧！

反正我已经上传了：

![image](/book/webapp/83e10b9bedbe.jpg)


# 喵宇宙

![image](/book/webapp/7e46adcd2b1e.jpg)


![image](/book/webapp/d2e19dc3a3d0.jpg)


![image](/book/webapp/6182deab7130.jpg)


![image](/book/webapp/ccc42307c926.jpg)


![image](/book/webapp/ee9270e1f273.jpg)


![image](/book/webapp/44a2f0d3dfd3.jpg)


# 4.3 项⽬演进的思路

写到这⾥，我想和你聊聊vibecoding⾥的⼀个核⼼⼼法⸺怎么让项⽬稳稳地往前推进，⽽不是在某个环节把⾃⼰绕晕。

你可能已经感觉到了：我们每⼀次都是发现项⽬的⼀个⼩⼩的不⾜，然后把它补⻬，⽽不会⼀次性实现所有的功能。

这就是 vibe coding 最重要的规律：⼀次只攻⼀个⼭头。

⽐如刚才连接数据库这件事，第⼀轮对话我们先让代码跑通⸺能从数据库读出数据、能显⽰在⻚⾯上，就算胜利。这时候⻚⾯可能很简陋，错误处理也不完善，甚⾄Loading状态都没有，没关系，第⼀轮的⽬标就是"通"。

等到基本流程跑顺了，第⼆轮我们再回来打磨细节：加个旋转的Loading动画，处理⼀下⽹络失败的情况，优化⼀下图⽚加载的体验。每⼀轮都是在上⼀次的基础上做refinement（细化），⽽不是另起炉灶搞新功能。

还有⼀种情况特别常⻅⸺代码改着改着，突然发现之前的思路有问题，或者AI⽣成了太多代码，你已经看不太懂了。这时候别硬撑，关掉当前对话，新开⼀个session。把刚才验证过的、确定好⽤的版本作为起点，把要做的改进说清楚，重新开始。这就像下棋时推倒重摆，不是为了否定之前的努⼒，⽽是让⼤脑清空缓存，轻装上阵。

这种"⼩步快跑、频繁存档"的节奏，和传统的软件开发很不⼀样。以前我们习惯先做完整的需求分析、画架构图、写技术⽅案，⼀切都想清楚了才动⼿。但vibecoding的乐趣恰恰在于边做边想⸺让AI快速把想法变成看得⻅的东西，然后根据实际效果决定下⼀步往哪⾛。

说到这你可能会问：怎么判断⼀个功能是不是"做完了"？我的标准是：能⽤就⾏。Loading状态有了，错误提⽰有了，基本的交互逻辑通了，就可以先放⼀放。perfectionism（完美主义）是vibecoding的⼤敌，因为明天你很可能⼜有新想法，或者发现更好的实现⽅式。

现在我们的喵宇宙已经能读写数据库了，这是⼀个重要的⾥程碑。先停下来，把玩⼀下，确认没什么⼤问题，然后再往下⾛⸺去搞定⽤⼾登录和权限管理。这种稳扎稳打的感觉，⽐⼀⼝⽓冲到底然后被⼀堆 bug 淹没，要舒服多了。

# 5. 专属领地

到⽬前为⽌，我们的喵宇宙已经实现了你和朋友之间的共享，不过它还有不⾜：每个⼈都有⾃⼰的猫猫呀，我创建的猫咪信息和上传的照⽚，怎么别⼈也能修改？对，这当然不⾏。聪明的你肯定会想到，应该有个⽤⼾登录/注册的功能吧？这样上传的猫猫就有归属了，每个⼈只能修改⾃⼰上传的，不能改别⼈的。

# 5.1 ⽤⼾管理流程

⽤⼾管理，本来有⼀整套挺复杂的逻辑，涉及⽤⼾、⻆⾊、权限分配之类的，幸运的是，supabase已经帮我们内置好了。

让我们回到 supabase 的管理⻚⾯，在左侧菜单中选择 authentication

![image](/book/webapp/70edbfa9534c.jpg)


然后，在⼆级菜单中选择 Sign In / Providers

![image](/book/webapp/374653db0f5f.jpg)


重点配置⼀下 Users Signups 部分，也就是注册的能⼒：

# User Signups

Allow new users to sign up 

![image](/book/webapp/d7b52ef48693.jpg)


Allow manual linking 

![image](/book/webapp/d854a0956f8d.jpg)


Allow anonymous sign-ins 

![image](/book/webapp/a64ee0f336bb.jpg)


Confirm email 

![image](/book/webapp/ed9aea5b549b.jpg)


# Auth Providers

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

• Allow new users to sign up：这个⼀定要选中，允许新⽤⼾⾃⾏注册，这样朋友们才能开⼼玩⼉起来

• Confirmemail：当⽤⼾使⽤邮箱注册的时候，是否要发⼀封邮件，让⽤⼾确认？⼀般来说，还是要选中的，防⽌⽤⼾随意⽤⽆效的邮箱注册，如果忘记密码，也有了找回的依据。

• Email：这个注册选项当然要选中，这是最⽅便的注册⽅式；Phone就是短信注册，基本都是国外的运营商，在国内不太好⽤，⽽且发短信肯定要按条付费的，就不选了。除此之外，还有Web3钱包和⼀⼤堆三⽅认证的⽅式，可按需要选择。

# 5.1.1 实现⽤⼾系统

对 Claude 说：

# ⽣成配置规则

执⾏完成后，会发现 CC 除了修改了 index.html，还⽣成了⼀个⽂档： supabase-config-guide.md ；如果没有⽣成类似⽂档的话，那最好加⼀句要求：

![image](/book/webapp/187057f1aa69.jpg)


# 帮我⽣成调整 supabase 表结构和访问规则的语句

这个⽂档的⾥的语句，需要在supabase的SQLEditor⾥执⾏：

![image](/book/webapp/7f3abf1c34ab.jpg)


它⼤概有这样⼏个作⽤：

1. 给原来的cats表增加⼀个列：user_id，记录每只猫咪到底属于哪个⽤⼾；

2. 修改原来对数据库和对象存储的的访问策略：不再允许所有⽤⼾随便修改，⽽是更精细地控制；

3. 创建⼀个profiles表，存储⽤⼾的头像之类的信息（这些在标准认证的users表中不存在）。执⾏完这些语句之后，你会发现cats表旁边，红⾊的unrestricted字样不⻅了。

# 5.1.1.1 新增登录/注册功能

现在重新刷新⻚码，就能看到⻚⾯右上⻆多了两个按钮：

登录

注册

点击“注册”，真的可以创建⼀个新⽤⼾：

![image](/book/webapp/6b5d3ec3eb2e.jpg)


甚⾄输⼊完正确的邮箱和密码，点击注册以后，真的会收到⼀封确认邮件（这得益于supabase完善的⽤⼾管理机制，要不咱们还得去找邮件服务器）：

# Confirm Your Signup D收件箱 ×

![image](/book/webapp/c1c88181939e.jpg)


Supabase Auth <noreply@mail.app.supabase.io> 

发送至我

![image](/book/webapp/34d948302479.jpg)


# 此邮件似乎是用英语撰写的

翻译成中文

![image](/book/webapp/d1f0524a2d27.jpg)


# Confirm your signup

Follow this link to confirm your user: 

Confirm your mail 

确认后，这个邮箱/密码就可以⽤于登录了，登录成功后，右上⻆的区域，会展⽰我们的邮箱，⽽且多出⼀个添加猫咪的按钮。

![image](/book/webapp/eee69832058c.jpg)


添加猫咪

![image](/book/webapp/e9b28ad9ce8e.jpg)


从这⾥添加的，就是属于⾃⼰的猫咪了：按照提⽰依次填写猫咪信息，再上传照⽚后，就能得到⼀只新的猫猫了：

![image](/book/webapp/39d2e6e65ad0.jpg)


# 小e

# 银渐层

小吃货，什么都想吃

5岁

公

粘人，掉毛

![image](/book/webapp/8b2a648b63ae.jpg)


# 编辑信息

# Debug时间：怎么登录后什么都看不到了？

刚刚修改完成后，你想看看之前添加的演⽰数据，结果⸺⻚⾯上居然⼜空空如也了，⼀只猫都没有。"完了，是不是刚才执⾏SQL语句的时候把数据删了？"

打开浏览器的控制台（F12），发现满屏的红⾊错误：

代码块

1 new row violates row-level security policy for table "cats" 

赶紧告诉CC：

![image](/book/webapp/0ca954b03d14.jpg)


登录后看不到猫咪数据，控制台提⽰"new row violates row-level security policy for table"cats"，帮我处理⼀下

CC⼀通分析后，发现原来是RLS（⾏级安全）策略在"捣乱"。之前没开⽤⼾系统时，cats表是公开访问的；现在加了user_id字段和RLS策略，但之前那些演⽰数据没有user_id，数据库就拒绝了查询请求。

然后给出两种⽅案：要么给旧数据补上默认的 user_id，要么修改 RLS 策略让没有 user_id 的数据也能被查看。我们选第⼆种，毕竟演⽰数据本来就是给⼤家看的。

# 6. 社区功能

现在我们的喵宇宙已经⽀持多⽤⼾，每个⼈都可以上传和管理⾃⼰的猫咪。但是⼀个真正的社区，不应该只是单向的展⽰，还需要互动！让我们为猫咪添加点赞和评论功能，让⽤⼾之间可以交流互动。

# 6.1.1 功能规划

我们要实现两个核⼼的社区互动功能：

. 点赞功能 $\textcircled { > }$ ：⽤⼾可以为喜欢的猫咪点赞，每只猫只能点赞⼀次

• 评论功能 $\cdots$ ：⽤⼾可以发表评论，分享对猫咪的想法和感受

这两个功能都需要：

1. 新的数据库表来存储数据

2. RLS策略来控制权限

3. 前端UI来展⽰和操作

下⾯我们⼀⼀来看做了那些修改。

# 6.1.2 数据库设计

⾸先要在数据库中，有位置把点赞和评论都存起来，跟CC说：

![image](/book/webapp/78af67a6e49e.jpg)


帮我在在Supabase中创建表，⽤来保存对猫猫的点赞和评论。

结果是这样两张新表：

likes表：存储点赞记录

• cat_id : 猫咪ID（外键关联到 cats 表）

? user_id : ⽤⼾ID（外键关联到 auth.users）

联合唯⼀约束：保证⼀个⽤⼾只能对⼀只猫点赞⼀次

comments表：存储评论

cat_id : 猫咪ID

• user_id : ⽤⼾ID 

• content : 评论内容

• created_at : 创建时间

提⽰：想⼀想，为什么不能⽤原来的cats表，来保存这些信息，⽽是需要创建两张新表呢？想不明⽩的话，可以问问ai。

CC 还会⽣成⼀个 SQL 配置脚本（类似 setup-interactions.sql ），在 Supabase SQL Editor中执⾏即可。配置脚本会⾃动创建以下RLS策略：

# likes 表：

• 查看权限：所有⼈（包括未登录⽤⼾）

• 添加权限：仅登录⽤⼾，且只能以⾃⼰的⾝份点赞

• 删除权限：只能删除⾃⼰的点赞

# comments 表：

• 查看权限：所有⼈（包括未登录⽤⼾）

• 添加权限：仅登录⽤⼾，且只能以⾃⼰的⾝份发表

• 修改/删除权限：只能操作⾃⼰的评论

这些策略确保了数据安全，防⽌⽤⼾伪造他⼈⾝份进⾏操作。

（如果CC偶尔没有想到，那就指点它单独⽣成权限配置的脚本）

# 6.1.3 功能实现

下⾯实现功能仍然是熟悉的配⽅，跟CC说⼀句话任务：

![image](/book/webapp/f5cfca537ca2.jpg)


帮我实现社区互动功能：点赞和评论。要求：

1.每个⽤⼾对每只猫只能点赞⼀次

2.所有⼈都可以查看点赞和评论

3.只有登录⽤⼾可以点赞和评论

刷新⻚⾯后，你会发现每个猫咪卡⽚底部多了⼀个互动区域：

![image](/book/webapp/f66f373d7ce3.jpg)


# 雪球

# 英国短毛猫

优雅的小公主，毛色雪白纯净，眼睛是漂亮的蓝色。喜欢安静的环境，偶尔会高冷。

1岁

母

优雅

安静

高冷

![image](/book/webapp/7fc36e24cd41.jpg)


![image](/book/webapp/89d8d183d9d5.jpg)


# 查看评论√

写下你的评论...

发送

# 点赞功能：

1. 点击 $\textcircled { > }$ 按钮即可点赞

2. 已点赞的按钮会变成红⾊

3. 再次点击可以取消点赞

4. 实时显⽰点赞数量

# 评论功能：

1. 点击查看评论按钮展开评论区

2. 可以看到其他⽤⼾的评论

3. 登录⽤⼾可以在输⼊框中发表评论

4. 评论按时间倒序排列（最新的在上⾯）

5. 显⽰评论者的⽤⼾名和发表时间

# 6.1.4 体验社区功能

现在，让我们试试新功能：

1. 点赞其他⽤⼾的猫咪：找⼀只可爱的猫咪，点击 $\textcircled { > }$ 按钮

2. 发表评论：在评论框中输⼊你的想法，⽐如"好可爱的猫猫！"

3. 查看互动：看看其他⽤⼾给你的猫咪点赞和评论了吗？

![image](/book/webapp/20e95e78a502.jpg)


有了这些互动功能，喵宇宙终于变成了⼀个真正的社区！⽤⼾可以为喜欢的猫咪点赞表达喜爱，可以发表评论分享感受，可以看到⾃⼰的猫咪受欢迎程度，还可以与其他爱猫的朋友们交流互动。

# 6.2 RLS：产品级安全

RLS（⾏级安全）是PostgreSQL数据库的⼀个强⼤功能。简单来说，它让数据库在返回数据前先问⼀句："这个⽤⼾有权看这条记录吗？"

我们的策略配置是：

• 所有⼈都能查看所有猫咪（社交属性）

• 但只有猫咪的主⼈才能修改或删除

这是⼀种从"完全开放"到"精细控制"的安全升级。在实际产品中，你可以根据需求配置更复杂的策略，⽐如：

• 允许管理员管理所有数据

• 允许⽤⼾设置某些内容为私密

• 限制⽤⼾每天只能发布⼀定数量的内容

# 7. 颜值即正义

到现在，喵宇宙的功能已经相当完整了。但你可能已经审美疲劳了⸺好吧，现在的⻚⾯真的称不上美，不但配⾊单⼀，看起来有⼀股浓浓的"AI味⼉"，⽽且也没有针对⼿机显⽰优化过。

# 7.1 响应式设计：适配移动端

既然要把链接发给朋友看，就得考虑他们多半是⽤⼿机打开的。你可能记得我们在⼊⻔篇创建第⼀个⻚⾯的时候，它就是可以在⼿机端展⽰的，不过后⾯呢⼜做了那么多修改，我们从来也没有针对⼿机端再做过优化，如果你跟着教程⾛到现在，很可能它在⼿机上已经⾯⽬全⾮了。当然如果你运⽓好的话，没准看起来还不错⸺这是强⼤的ai模型在背后默默替我们操⼼。

⽆论如何，咱们⼼⾥要有个数：⻚⾯不是⾃动就能在⼿机端展⽰的很好的，它需要⼀种响应式设计来适配。

响应式设计（ResponsiveDesign）就是让⻚⾯在不同设备上都能良好显⽰的技术。

最基础的响应式设计使⽤MediaQueries，说⽩了就是不同⼤⼩屏幕展⽰成不同的样式，类似下⾯这样：

# 代码块

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

这样，猫咪卡⽚在⼿机上单列显⽰，在平板上双列，在电脑上是三列⽹格。这就是响应式设计的核⼼思想。我们会在下⾯的UI重构中，对AI明确提出这个要求。

# 7.2 UI 重构

现在让我们彻底重构⻚⾯设计。得益于 AI，这个原本繁重的任务可以在 30 分钟内完成。

# 7.2.1 第⼀步：提取设计规范

找到⼀个值得模仿的⽹站。这⾥我选择v0的app浏览⻚⾯，它正好通过卡⽚展⽰应⽤集合，跟我们的需求很接近。

对 Claude 说：

![image](/book/webapp/a76fac251516.jpg)


# # 背景

当前项⽬叫喵宇宙，是⼀个vibecoding演⽰项⽬，但是⻚⾯设计需要改进。

#⻆⾊ 

你是⼀名拥有丰富前端⼯程经验的资深设计⼯程师。

#任务

重新设计UI，请根据项⽬特⾊，参照https://v0.app/的设计语⾔，编写⼀段详细、结构化的AICodingPrompt，⽤于发送给AI编码⼯具。⽣成的Prompt中必须包含对"设计细节"的详细描述（如圆⻆⼤⼩、阴影质感、交互动效），⽽不是罗列功能。

AI会⽣成详尽的设计规范⽂档，包括颜⾊、字体、间距、动效等所有细节。

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

# ## 1) 你要扮演的⻆⾊

你是⼀名资深 **Design Engineer**。请对项⽬「喵宇宙」进⾏ UI 系统化重设计与落地实现，输出可直接运⾏的静态⻚⾯。

# ## 2) 绝对约束（⾮常重要）

# ### 2.1 不允许破坏的选择器（否则 JS 会失效）

除⾮你同时修改 JS 逻辑并确保功能不回归，否则 $\star \star$ 不要改名/删除 $\star \star$ 以下 id/class（允许新增class 作为扩展）：

# - **认证相关**

```markdown
- `#authBar`, `#authLoggedOut`, `#authLoggedIn`  
- `#loginButton`, `#signupButton`, `#logoutButton`, `#addCatButton`  
- `#authModal`, `#authForm`, `#authEmail`, `#authPassword`,  
`#authSubmitButton`  
- `#authSwitchText`, `#authSwitchLink`, `#authMessage`, `#modalTitle`,  
`#modalSubtitle`, `#userEmail` 
```

# **列表与卡⽚**

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

# ### 2.2 ⼯程约束

- 项⽬保持**零构建**：继续使⽤静态 `index.html`（允许拆分为 `styles.css` / `ui.css`与少量 `ui.js`，但必须保持可直接打开运⾏）。

- 允许结构性优化 DOM（新增语义分区/包装容器），但要保持现有功能区（认证、卡⽚、交互）完整可⽤。

动效要克制：不要霓虹、不要⼤⾯积强渐变背景、不要重阴影。

# ## 3) 现状 v0 ⻛格：信息架构对⻬（基于当前⻚⾯内容）

当前⻚⾯主要只有“标题 $^ +$ 猫咪卡⽚⽹格”。 请在不破坏卡⽚渲染逻辑的前提下， 引⼊ v0 ⻛格的⾸

# ### 3.1 顶部导航（复⽤ `#authBar`）

把现有 `.auth-bar` 视觉升级为 v0 ⻛格顶栏：

- **⾼度 $\star \star$ ：64px

**背景 $\star \star$ ：`rgba(255,255,255,0.85)` $^ +$ `backdrop-filter: blur(12px)`

- **分割线 $^ { \star \star }$ ：底部 1px `rgba(0,0,0,0.08)`（不要厚重阴影）

# - **布局 $\star \star$

- 左侧：`.auth-bar-logo`（「喵宇宙」⽂字标识， $\star \star$ 不要渐变⽂字 $\star \star$ ，⽤纯⾊ $^ +$ 字重体现⾼级感）

- 中间：新增轻量导航链接（可选）：`产品` / `⽂档` / `验证清单`（指向仓库已有⽂档，如`docs/`、`VERIFICATION_CHECKLIST.md`）

右侧：复⽤现有按钮区域（登录/注册 或 ⽤⼾信息/添加猫咪/登出）

按钮⻛格（替换当前“胶囊渐变按钮”）：

**Primary 按钮 $\star \star$ （如 注册、添加猫咪）：背景 `#111827`（近⿊），⽂字⽩⾊

- **Secondary / Ghost**（如 登录、登出）：透明背景 $^ +$ 1px 边框

- **圆⻆**：10px（按钮），⾼度 36px，左右 padding 12–14px

- **hover**：背景轻微加深/边框增强 $^ +$ `transform: translateY(-1px)`（⾮常轻）

- **active**：`transform: translateY(0) scale(0.98)` 

# ### 3.2 Hero 区（新增，但不替换卡⽚列表）

在 `.container` 内部、`.title` 之前新增⼀个 Hero 区块（建议 `section.hero`），表达项⽬特⾊并提升“产品感”：

- 主标题（替换/弱化当前 `.title` 的 emoji ⻛格）：保留「喵宇宙」但更产品化，例如：

- H1：`喵宇宙`（40–44px，字重 700，字距 -0.02em）

- 副标题：`⽤ Supabase 管理你的猫咪卡⽚：上传照⽚、轮播、评论、互动。`（13–15px，弱化⾊）

- 核⼼输⼊（可选增强）：⼀个“搜索/筛选”输⼊框（不要求实现复杂功能，可只做 UI 与未来扩展），但必须做出 v0 ⻛格质感：

- ⾼度 52px，圆⻆ 12px，1px 边框 $^ +$ 极浅阴影

focus ring：`0 0 0 4px rgba(79,70,229,0.18)` 

下⽅ chips（胶囊⼩标签）：`最受欢迎` / `新成员` / `待领养` / `我的猫咪`

Hero 与⽹格之间留⽩ 56–72px

# ### 3.3 卡⽚⽹格（复⽤ `#cardsContainer.cards-grid`）

保持渲染容器不变，但升级布局与密度：

- **页面背景**：从当前`body`强渐变改成 $v0$ 的干净底色
- `body`背景：`#FAFAFA`；主内容面：`#FFFFFF`
- **网格**：桌面3列（`minmax(0,1fr)`），间距16-20px；平板2列；移动1列
- **容器宽度**：1120px（max），左右padding 24px（移动16px）

# ## 4) 视觉系统（Design Tokens，必须落地为 CSS 变量）

在 `:root` 定义 tokens（浅⾊为主，可选深⾊模式）：

# ### 4.1 圆⻆

```markdown
- `--radius-lg: 14px;` (卡片)
- `--radius-md: 12px;` (输入/面板)
- `--radius-sm: 10px;` (按钮)
```

# ### 4.2 边框与阴影（关键：轻、柔、短）

```txt
- 边框：`--border: rgba(0,0,0,0.08);`  
- 默认阴影：`--shadow-sm: 0 1px 2px rgba(0,0,0,0.06);`  
- 悬浮阴影：`--shadow-md: 0 8px 24px rgba(0,0,0,0.10);`
```

# ### 4.3 字体与颜⾊

```txt
- 字体：系统栈即可（目前已是系统栈，保留）
- 文本色：
- `--fg: #0A0A0A;`
- `--fg-muted: rgba(10,10,10,0.65);`
- `--fg-faint: rgba(10,10,10,0.45);`
- 强调色（用于 focus/少量高亮）：`--accent: #4F46E5;`
```

# ### 4.4 动效

```txt
统一曲线：`--ease: cubic-bezier(0.2, 0.8, 0.2, 1);`  
hover 160-220ms，面板 220-320ms
```

# ## 5) 组件级改造细则（严格对⻬现有 class）

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

图⽚固定⽐例（建议 16:9 或 4:3），`object-fit: cover`

图⽚圆⻆与卡⽚⼀致（内圆⻆ 12px）

图⽚ hover 轻微 `scale(1.02)`（不要超过 1.03）

# ### 5.3 徽标 `.cat-badge`

- 改成⼩号 pill 标签：

- ⾼度 24px，圆⻆ 999px

背景 `rgba(17,24,39,0.92)`，⽂字⽩⾊ 12px

位置保持在图⽚左上⻆，但要有 12px 内边距

# ### 5.4 图⽚操作按钮 `.upload-button / .gif-button / .carousel-btn`

统⼀成 v0 ⻛格的“图标按钮/轻按钮”：

- 不要 emoji 作为主视觉（允许保留 emoji，但要更⼩、更克制）

- **按钮尺⼨**

图标按钮： $4 \Theta \times 4 \Theta$ ，圆⻆ 999px，边框 1px

普通⼩按钮：⾼度 $3 2 { \mathsf { p } } \times$ ，圆⻆ 10px

- **交互 $\star \star$ 

hover：背景 `rgba(0,0,0,0.04)`，边框增强

active：`scale(0.98)` 

# ### 5.5 信息区 `.cat-info`

重排排版层级（不改 DOM 结构）：

`.cat-name`：18–20px，字重 650–700

`.cat-breed`：13px，`--fg-muted` 

`.cat-description`：14–15px，⾏⾼ 1.6，最多显⽰ 3 ⾏（可⽤ line-clamp）

`.cat-stats`：做成更“表格式”的两列⼩块，背景轻微区隔（例如 `#FCFCFC`） $^ +$ 1px 边框

- `.tag`：改成更轻的 pill（⾼度 $2 4 { \mathsf { p } } \times$ ，圆⻆ 999px，边框 1px，背景近透明）

# ### 5.6 编辑态 `.editing`（保持现有逻辑）

编辑态要“像产品表单”：

- `.edit-input`：⾼度 $4 0 \mathsf { p x } / 3 2 \mathsf { p x }$ （small/tiny），圆⻆ 12px/10px

focus ring：同上

- `.save-button` 为 primary，`.cancel-button` 为 secondary

# ### 5.7 评论区 `.comments-section`

把“查看评论”按钮做成轻量 disclosure：

- `.comments-toggle`：⽂字按钮 $^ +$ ⼩箭头旋转动效（⽤ `transform`）

- `.comments-list`：作为可折叠⾯板，背景 `#FCFCFC`，圆⻆ $\mathtt { 1 2 p \times }$ ，1px 边框

- `.comment-input` 与 `.comment-submit` 对⻬同⼀⾏，整体像 v0 的 input $^ +$ button 组合

# ### 5.8 认证弹窗 `#authModal`

把当前“厚重⼤阴影 $^ +$ ⼤圆⻆”改成 v0 ⻛格：

- 遮罩：`rgba(0,0,0,0.45)`，blur 轻⼀点

弹窗⾯板：

- 宽 420px（max），圆⻆ 16px

阴影：⽐卡⽚略强但不夸张（`0 20px 60px rgba(0,0,0,0.18)`）

- 标题 20–22px，副标题 13–14px

- 表单输⼊统⼀ token（边框、focus ring）

动画：从 `opacity:0; translateY(8px); scale(0.98)` 到正常（240ms）

# ## 6) 布局与全局背景（解决“当前很丑”的核⼼点）

把 `body` 从当前渐变 $^ +$ 居中对⻬（`align-items:center`）调整为标准⻚⾯流：

`body`：`min-height: 100vh; background: #FAFAFA; color: var(--fg);` 

去掉强渐变背景，去掉强居中布局（否则导航会很怪）

- 主内容从顶部开始，`#authBar` 固定顶部；`.container` 作为⻚⾯主容器

# ## 7) 可访问性与细节⼀致性（必须实现）

- 为所有按钮/链接/输⼊加 `:focus-visible`（明显但不刺眼的 ring）

- icon button 点击热区⾄少 $4 \Theta \times 4 \Theta$ 

- ⽂本对⽐度：正⽂对⽐ $\ge ~ 4 . 5 : 1$ $\geq$ 

- hover 不引起布局抖动（不要改变 border 厚度导致跳动，可⽤ box-shadow/outline）

# ## 8) 交付物（你需要输出什么）

请直接在仓库中落地修改，⾄少包含：

`index.html`：结构更清晰（可新增 `section.hero` 等），但保留关键 id/class

- 样式建议拆分到：`styles.css`（或 `ui.css`）并在 `index.html` 引⽤

（可选）`ui.js`：仅当你需要补充少量交互（例如 chips 仅填充搜索框）才新增；不要重写现有业务逻辑

# ## 9) 验收清单（你改完⾃检）

- 第⼀眼像 v0：背景⼲净、留⽩充⾜、排版克制、卡⽚轻阴影 $^ +$ 轻边框

`#authBar` 与 `#authModal` 交互不坏：登录/注册切换、提⽰信息正常显⽰

- 猫咪卡⽚功能全可⽤：上传、多图轮播、GIF、评论、编辑（owner 逻辑不回归）

响应式：桌⾯ 3 列 / 平板 2 列 / 移动 1 列；间距舒适

# 7.2.2 第⼆步：应⽤新设计

有了设计规范后，⼀句话就能让AI重构⻚⾯：

![image](/book/webapp/a8464c08f0de.jpg)


现在，根据设计⽂档，改写⻚⾯吧

你会看到⻚⾯焕然⼀新：

# 瞄宇宙

7 

如果某些细节还需要调整，可以继续提要求：

![image](/book/webapp/bba15752626d.jpg)


猫猫卡⽚的图⽚可以再⾼⼀点，名字和介绍区可以压缩，可以加个蒙版放⼊图⽚内，要保证⽂字可以阅读

最终效果：

# 瞄宇宙

7 

![image](/book/webapp/419fe61abe74.jpg)


![image](/book/webapp/a80556b01036.jpg)


# 雪球


英国短毛猫


![image](/book/webapp/7826e129cf82.jpg)


# 7.2.3 修复现场：样式改了，功能怎么崩了？

UI重构后，我发现⻚⾯确实变好看了，但点击"编辑"按钮却没有任何反应。"是不是重构的时候把JavaScript 搞坏了？"

打开浏览器的开发者⼯具（F12），切换到 Console ⾯板，发现⼀条⻩⾊警告：

# 代码块

1 Uncaught TypeError: Cannot read property 'classList' of null 

2 at HTMLButtonElement.editCat 

这时候不要慌，也不要急着回滚所有改动。把问题抛给CC：

![image](/book/webapp/21d72530db7e.jpg)


点击编辑按钮没有反应，控制台显⽰：

```txt
Uncaught TypeError: Cannot read property '<classList' of null at HTMLButtonElement_editCat 
```

帮我检查⼀下是什么原因。

CC会快速定位到问题所在：原来是元素被嵌套进新的容器后原来的相对定位逻辑失效了。修复通常很简单⸺要么恢复原来的DOM结构，要么更新JS中的选择器路径。

这次教训告诉我：UI重构不只是"改⽪肤"，它可能会触动⻚⾯的"⻣骼结构"。每次重构后，都要把核⼼功能点⼀遍：添加、编辑、删除、上传图⽚、点赞评论...确保"新⾐服"不会妨碍"⾝体动作"。

# 7.3 确认移动端效果

重构完成后，⼀定要在不同设备上测试。在浏览器中按F12打开开发者⼯具，点击左上⻆的设备切换图标，可以模拟⼿机和平板的显⽰效果。

top $\nrightarrow$ Filter
[debug-etadata] enter inject script test $\checkmark$ 用户已登录：songofhawk@gmail.com
Auth state changed: INITIAL_SESSION $\checkmark$ 用户已登录：songofhawk@gmail.com
从数据库加载了8只猫咪
正在查询用户邮箱，user_ids: ['7ee71a86-d513-4d15-b1c0-8f433824c212']
查询到的 profiles: [\{...\}]
映射：7ee71a86-d513-4d15-b1c0-8f433824c212 -> songofhawk@gmail.com
添加邮箱后的评论：[\{...\}]

确认猫咪卡⽚在⼿机上：

• 单列显⽰，宽度合适

. ⽂字⼤⼩可读

• 按钮点击区域⾜够⼤（⾄少44x44像素）

. 图⽚加载速度可接受

![image](/book/webapp/6b7f1440ad14.jpg)


如果我们把这个⻚⾯发给⼿机，会发现打开后的效果是⼀样的。

# 8. 写在最后

⾛到这⾥，回头看看我们⼀路做过的事情，可能会有点恍惚⸺这真的是我亲⼿做出来的吗？从最开始那个只能在⾃⼰电脑上运⾏的猫咪卡⽚，到现在这个能⽀持多⽤⼾、有点赞评论、有完整登录系统的社区应⽤，变化确实挺⼤的。

现在的喵宇宙，已经算是⼀个"真正的产品"了。它有⽤⼾系统，有数据存储，有社区互动，甚⾄还有了点设计感。但这远远不是终点。你可以继续往⾥⾯加功能：搜索、筛选、猫咪排⾏榜、⽤⼾关注、消息通知……可能性是⽆限的。更重要的是，你现在拥有的不只是这⼀个项⽬，⽽是⼀套能⼒：你知道怎么从零开始搭建⼀个Web应⽤，怎么把它部署到云端，怎么让⽤⼾真正⽤起来。

这套能⼒能做的事情太多了。你可以给⼥朋友做⼀个纪念⽇倒计时⻚⾯，可以给社团做⼀个活动报名系统，可以给家⾥的⼩⽣意做⼀个展⽰⽹站，甚⾄可以试着把那个在脑⼦⾥转了很久的创业想法做出来。AI编程时代最棒的地⽅就在于，你不需要先花三年时间学会写代码，才能开始做这些东西。你可以边做边学，在做中学，在学中做。

编程这件事，说到底和学骑⾃⾏⻋、学做饭没什么区别。⼀开始可能会摔跤，可能会把菜炒糊，但只要多试⼏次，⼿脚就会慢慢记住那种感觉。现在你已经骑上这辆⾃⾏⻋了，虽然还不够稳，虽然还会摇摇晃晃，但你已经在路上了。

接下来去哪⾥，完全由你决定。也许你想把喵宇宙做得更完善，也许你想做⼀个完全不同的东西，也许你只是想先休息⼀段时间，消化⼀下学到的东西。⽆论选择什么，都没问题。重要的是，你知道⾃⼰有能⼒把想法变成现实⸺这种感觉，⼀旦拥有，就再也不会失去。

那么，我们下⼀章⻅，或者，也许在某⼀个你⾃⼰创造的项⽬⾥⻅。

# 第五部分：秩序篇-建⽴⼯程规范

![image](/book/webapp/260e791edb8c.jpg)



本章作者：卡夫卡


移动开发工程师

# [核⼼痛点]

“Vibe Coding 节省下来的‘思考成本’，未来会以‘维护成本’的形式，连本带利收回来。 ”

你已经掌握了VibeCoding的基本窍门，一开始进展飞快，功能像搭积木一样往上叠，每天都有不断累积的成就感；但接着代码开始就变得只能加、不能动，小改一行就牵一片，只能不断打补丁；再往后，你逐渐不敢重构、不敢删代码、不敢升级依赖，改需求前都只能祈祷；最后项目表面还在“迭代”，实际上是在和历史遗留问题僵持，而你已经说不清系统真正是怎么运转的，只剩下一句—“能跑就别动它” 

# [解决⽅案]

真正的⼯业级产品，对于稳定性与⻓期可维护性有着很⾼的要求。当VibeCoding的代码量不断膨胀，如果不想让项⽬变成“屎⼭代码”，就必须建⽴⼯程规范。

# [关键⾏动]

CLAUDE.md：制定项⽬“宪法”，强制AI必须遵守特定的编码规范。

SubAgent：分⽽治之，把不同类型的任务分配给特定领域的专家。

# ⽤CLAUDE.md构建“多层记忆系统”

本篇将带你：

. 让ClaudeCode真正记住你的项⽬规范与个⼈偏好。

. 掌握“三层记忆结构”，从容管理不同层级的特定规则。

# 1. 为什么我们需要“记忆系统”？

如果你⽤过早期版本的ChatGPT，⼀定有过这种“⻤打墙”般的体验：每次新建⼀个对话窗⼝，它都像刚认识你⼀样，把之前的⼀切忘得⼲⼲净净。

你不得不像复读机⼀样，⼀遍遍地重复着你的基本信息：“我是⼀名前端开发者”、“我习惯使⽤Vue 框架”

![image](/book/webapp/9108de33ca28.jpg)


![image](/book/webapp/76bd2e847809.jpg)


这就好⽐你招了⼀名有记忆缺陷的天才实习⽣。

他绝顶聪明，代码写得⻜快，逻辑⼀流。缺点是记性极差，你上次教他的内容，他转头就忘了。

⽽“记忆系统”的建⽴，就相当于你给这名实习⽣专⻔编写了⼀本《⼯作⼿册》。

有了它，他就能随时查阅、照章办事。⽆论何时何地，都能严格按照你预期的⽅式⼯作，不再⾃由散漫。

这样⼀来，他出错的次数少了，你的⾎压也稳了，⼯作⾃然更省⼼。

# 记忆系统=工作手册

![image](/book/webapp/c29c4bceb956.jpg)


![image](/book/webapp/10842e808ccc.jpg)


![image](/book/webapp/a6b7aeb1a622.jpg)


# 2. 揭秘：为什么LLM是“⾦⻥记忆”？

为什么像ChatGPT这类强⼤的⼤语⾔模型（LLM），都会有这种“⾦⻥记忆”呢？

究其原因，从技术原理上讲，⼤语⾔模型本质上是⽆状态的（Stateless）。简单来说，就是模型本⾝不会存储任何对话历史。

每次你发送⼀条新的消息，系统实际上是把你之前所有的聊天记录，连同你的新消息，全部“打包”起来，⼀次性发送给模型。

# 大语言模型的无状态性 (Stateless)

# 场景一：单次会话

![image](/book/webapp/5d2a1e382e20.jpg)


你好，我叫小明，我喜欢蓝色

你好呀小明

![image](/book/webapp/4ed9b807b1ae.jpg)


![image](/book/webapp/044df8413cf3.jpg)


我喜欢什么颜色？

![image](/book/webapp/3c137f746fab.jpg)


Al模型 (获得临时上下文)

将[完整会话]打包发送

你喜欢蓝色

# 场景二：新会话 (无状态)

![image](/book/webapp/a70022e2a486.jpg)


新窗口，直接提问

![image](/book/webapp/9713b261d95e.jpg)


我喜欢什么颜色？

![image](/book/webapp/aa59a6c5f8af.jpg)


AI模型 (无历史记录)

只发送[当前消息]

我不知道你喜欢什么颜色呢

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

![image](/book/webapp/4144db8a5502.jpg)


![image](/book/webapp/8ae5a6d7786a.jpg)


结果：/project，/foo，/bar记忆被立即加载

# 阶段二：访问时向下动态加载

![image](/book/webapp/d1a61f897fc5.jpg)


![image](/book/webapp/b8e8be9c2ebe.jpg)


![image](/book/webapp/80058d92c9f5.jpg)


结果：/components/CLAUDE.md才被动态加载

# 5. 实战演练：4步构建你的记忆系统

我们以⼀个随⼿VibeCoding出来的、名为“Marka”的Markdown编辑器应⽤为例，⼿把⼿带你构建记忆系统。

![image](/book/webapp/4710a8e07cfd.jpg)


# 第 1 步：⼀键初始化

我们不需要⼿动创建⽂件，只需要在对话框输⼊：

代码块

1 /init 

ClaudeCode会像⼀个经验丰富的架构师，⾃动扫描你的项⽬结构，为你在根⽬录⽣成⼀个初版的CLAUDE.md 。

# > /init is analyzing your codebase..

·我将分析代码库结构并创建 CLAUDE.md 文件，包含未来 Claude Code 实例所需的基本信息。

. Expore(Analyzeudebasesructurens2m30s) 

. Read(package. json) Read30lines 

●已成功创建 CLAUDE.md 文件，内容涵盖了未来 Claude Code实例在该代码库中工作时所需的核心信息：

# 文件结构

1．开发命令-三个核心命令：dev、build、preview

2.架构概述-基于功能的模块化结构，重点介绍 features/editor、features/theme 和features/layout 三大核心模块

3.状态管理- 使用 React Context API 的组件间通信模式

4.CSS主题系统-基于CSS变量的主题切换实现方式

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

npm run build 

# 预览⽣产构建

npm run preview 

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

Select memory file to edit: 

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

![image](/book/webapp/65c6fa6e3e6d.jpg)


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


![image](/book/webapp/8374f559e01e.jpg)



现实团队：各司其职，协作


![image](/book/webapp/3012ec30bad2.jpg)



工程师


![image](/book/webapp/95ec6ee774b2.jpg)



测试员


![image](/book/webapp/b33d4ebb70ce.jpg)


![image](/book/webapp/2e5bdb83728f.jpg)



分析师


Subagents（⼦代理）的出现，就给了你组建这样⼀⽀“专业团队”的机会。

# 2. Subagents ⻓什么样？

你可以把每⼀个 Subagent 都想象为你招聘的⼀位“专职员⼯”。它们每个都具备以下特征：

拥有“独⽴办公室”（独⽴上下⽂）：它的对话历史是独⽴的，不被你的主对话污染。


团队协作：共享上下文


![image](/book/webapp/d92e4790de1f.jpg)



个体：独立上下文


![image](/book/webapp/45f47a2aaa0b.jpg)


![image](/book/webapp/062115bbff41.jpg)



每个子代理 (Subagent)：用有独立办公室，对话历史隔离


持有“岗位说明书”（专属系统提⽰词）：明确规定了它的职责、能⼒边界和⾏事⻛格。

![image](/book/webapp/8e32f644f970.jpg)


• 配备“专属⼯具箱”（⼯具权限控制）：你给它什么⼯具，它就只能⽤什么，确保安全可控。

![image](/book/webapp/eb31dc5e0720.jpg)


• 随时待命（⾃动被唤醒）：当你的任务描述符合它的“职责”时，它会⾃动跳出来接⼿任务，⽆需你操⼼。

![image](/book/webapp/a5356062fd29.jpg)


每个子代理(Subagent)：随时待命（自动被唤醒)符合职责时自动接手任务，无需操心。

• 也能“点名”调⽤（可⼿动@）：必要时，你也可以像@同事⼀样，⼿动“@它”来处理特定任务。

![image](/book/webapp/87431c517678.jpg)


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

![image](/book/webapp/dd7468e31e2f.jpg)


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

2.Personal (~/.claude/agents/) 

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

2.Manual configuration 

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
Select tools   
[Continue]   
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

# Create new agent

Confirm and save 

Name: prompt-optimizer 

Location: .claude/agents/prompt-optimizer.md 

Tools:Glob，Grep，Read，WebFetch，TodoWrite，WebSearch，and BashOutput 

Model: Opus 

Description (tells Claude when to use this agent): 

Use this agent when you need to optimize or refine a prompt to be more structured, clear,and effective for AI execution.This includes: 

- Converting vague or natural language requests into structured prompts with clear objectives and const.. 

# System prompt:

You are a prompt engineering expert with deep understanding of software development, particularly in React/TypeScript projects. Your mission is to transform vague or incomplete user requests into highly structured， actionable prompts that A.. 

Press s or Enter to save，e to save and edit 

保存后，Claude Code 会⾃动⽣成⼀个 .md 配置⽂件。 你可以⼤概看⼀眼结构，⼼⾥有数即可：

# 代码块

1 

name: prompt-optimizer2 

3 description: | 

4 当你需要将提⽰词优化或精炼为更结构化、更清晰，并更便于 AI 执⾏时，使⽤该 agent。适⽤于以下情况：

5 - 将模糊或⾃然语⾔请求转换为具有明确⽬标和约束的结构化提⽰词

6 结合当前代码库的项⽬上下⽂与代码⽰例，以减少歧义

7 - 对提⽰词中提到的陌⽣概念进⾏检索，以确保准确性与完整性

8 在⽣成技术类提⽰词时遵循现有项⽬模式与代码规范

9 创建能最⼤限度减少幻觉、提⾼确定性执⾏的提⽰词

10 

11 ⽰例：

12 - ⽤⼾：“帮我写个能处理表单数据的组件”

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

下⾯是严格符合你要求的 $\star \star$ 完整可⽤版本**

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

```txt
--- 
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

-SentenceHighlightModal.tsx-已实现基础的弹窗UI

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

• $\mathbb { C }$ 交互逻辑：调试弹窗完美⽀持句⼦增删。

![image](/book/webapp/9d530c11800c.jpg)


$\mathbb { C }$ 视觉细节：虚线标注、脉冲动画完全还原。