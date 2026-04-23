## 海外与国内部署区别

想象你刚做完一份独门披萨，迫不及待想让世界尝尝。这时候你来到一条“全球美食街”：不需要任何营业执照、平台免费给你起步用的炉子、桌子，你只需带上食材，一键开店（部署），顾客从世界各地都能吃到你的披萨（网站全球加速访问）。虽然美食街在海外，离中国顾客可能有点远，送餐（访问）稍慢，但至少披萨已经能被全世界吃到啦。

等你名气渐长、顾客越来越多，就该考虑在国内商场开实体店，这里的条件会严格些:你得先办营业执照（ICP备案）、得配合消防检查（实名域名、内容审核），得到的结果是国内的访问更稳定、配送更快。国内云厂商（阿里云、腾讯云、华为云）就是这种“商场房东”。他们给你一个稳定摊位、合规流程，但需要你多花点时间装修。国内部署的服务可以更好的可以触达14亿的广袤市场，国内部分我们会在进阶篇论述。

## 最简单的静态站点

开始正课，我们在本地编写一个最简单的 index.html 和一张图片，并把图片引入到网页。提示：路径尽量写相对路径；资源置于 ./assets/ 。


```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>时代少年团我们喜欢你</title>
</head>
<body>
<h1>时代少年团我们喜欢你</h1>
<p>时代少年团，我们喜欢你我们喜欢马嘉琪...</p>
<img src="/mjq.jpeg" alt="马嘉琪">

</body>
</html>
```

![image](/book/launch/ea5a9611088e.jpg)


本地打开这个index.html文件，是这样的：

**时代少年团我们喜欢你**

寸代少年团，我们喜欢你我们喜欢马嘉琪..

![image](/book/launch/f60313899ab6.jpg)


下一步我们就是把这个页面部署到网上啦！新建一个github项目

![image](/book/launch/6fcb360be7d6.jpg)


**Create a new repository**

Repositories contain a project's files and version history. Have a project elsewhere? Import a repository. Required fields are marked with an asterisk (*) 

![image](/book/launch/f22826b0c77b.jpg)


### 进入刚刚你写页面的文件夹，把项目上传到Git

```bash
git init  # 初始化项目
git remote add origin https://github.com/你的github名字/你的项目名字.git  # 这个地址
```

点击你的代码工具的 git 组件，输入你的提交信息，然后点 Commit（提交）。如果你熟悉，也可以使用使用纯命令行或者 AI 辅助提交，命令如下：

```bash
git add .  # 把所有代码加入提交区
git commit -m "我的第一次提交"  # 提交信息
git push  # 原神启动！（推送到 github）
```

![image](/book/launch/5e469fba46af.jpg)


设置展示这个项目

![image](/book/launch/92d5de54a7c5.jpg)


回到首页，点击Deployments中的页面，就可以看到页面啦。

![image](/book/launch/2a3c24d240e5.jpg)


WoW，现在所有人只要访问这个地址，所有人都会知道你喜欢马嘉祺了！

**时代少年团我们喜欢你**

img 225×225 们喜欢你我们喜欢马嘉... 225×225

![image](/book/launch/e03f6ef4ae51.jpg)


![image](/book/launch/3723ba120cb7.jpg)


## 用Vercel部署一个模块化前端项目

如果上一节的GitHubPages是基础，本节要学会使用真实项目中会用到的前端框架让你的网站有组件、有结构、有交互、有生命。

![image](/book/launch/ea1580572666.jpg)


过去我们写网页时，常常把所有内容都塞进一个 index.html 里。

但当网站越来越大、功能越来越多时，这种写法就像在一个锅里煮所有菜 ⸺一改动就容易“糊锅”

于是就有了模块化前端框架：

React、Vue让我们可以把网页拆成一个个小组件（component）⸺按钮是一个组件，导航栏是一个组件，评论区又是一个组件。

每个组件都有自己的逻辑、样式和数据，就像披萨店的“配料台”：面饼、芝士、番茄酱、香肠，各司其职，最后再拼出完整披萨。

这样的好处是：

可复用：同一个按钮在多个页面都能直接用；

??好维护：改哪块配料不会影响整张披萨（项目更大后，还可以把不同的组件分给不同的朋友写）；

更高效：Vite/Webpack帮你自动打包构建，几秒就能上线。

### 新建nextjs并使用Vercel部署一个小说介绍网站

下面我们使用Z.ai的代码开发功能来走通整个过程

### 1）打开Z.zi,模型选择GLM-4.6，打开深度思考和全栈开发

GLM-4.6 < 

![image](/book/launch/e4b1a16acac4.jpg)


2）上传一本你喜欢的书，我这里选的是三国演义，提示词为：根据上传的文件生成一个三国演义的介绍页面

![image](/book/launch/fc032b32832d.jpg)


### 3）你会发现GLM给你做好了一个很不错的网页，点击下载

![image](/book/launch/e2e18a6b2b38.jpg)


4）解压缩刚刚的项目，你会发现里面有很多的组件，这就是工程化的next前端项目了！

**项目组件 (Project Components)**

![image](/book/launch/054ed636c91f.jpg)


favicon.ico 

![image](/book/launch/4f4f93363b9c.jpg)


globals.css 

layout.tsx 

![image](/book/launch/97e897eb346b.jpg)


page.tsx 

![image](/book/launch/c17228f89496.jpg)


components/ui 

![image](/book/launch/e709143f4fd2.jpg)


accordion.tsx

![image](/book/launch/15e2b622b6b3.jpg)


Dalert-dialog.tsx 

![image](/book/launch/9145e997e492.jpg)


alert.tsx 

![image](/book/launch/4638cf7f4d79.jpg)


Daspect-ratio.tsx 

![image](/book/launch/3d4963e0d15a.jpg)


Davatar.tsx 

![image](/book/launch/e376a275c512.jpg)


badge.tsx 

![image](/book/launch/22a0bff79899.jpg)


Dbreadcrumb.tsx 

![image](/book/launch/a6137c3657af.jpg)


button.tsx 

![image](/book/launch/e99130faf9fe.jpg)


Dcalendar.tsx 

![image](/book/launch/b74ed85f170a.jpg)


→card.tsx 

![image](/book/launch/5522e4932743.jpg)


→carousel.tsx 

![image](/book/launch/e861e8b8ce3c.jpg)


Dchart.tsx 

![image](/book/launch/cf6dbdffdcd0.jpg)


→checkbox.tsx 

![image](/book/launch/5263ce0ef04a.jpg)


→collapsible.tsx 

![image](/book/launch/49e9c123c6a9.jpg)


→command.tsx 

## 工程化的next前端项目

5）在Github新建一个项目，把项目通过git上传到Github，比如我新建的https://github.com/hikariming/sanguo_nextexample

sanguo_nextexample 

Public 

●TypeScript 

Updated 33 minutes ago 

![image](/book/launch/5e4037dbe9a3.jpg)


Star 

6）注册,登入一个Vercel账号并连接你的Github

![image](/book/launch/897cffe300d7.jpg)


**Usage**

<table><tr><td>Last 30 days</td><td>Upgrade</td></tr><tr><td>○Fast Data Transfer</td><td>0 / 100 GB</td></tr><tr><td>○Fast Origin Transfer</td><td>0 / 10 GB</td></tr><tr><td>○Edge Requests</td><td>0 / 1M</td></tr><tr><td>○Edge Request CPU Duration</td><td>0 / 1h</td></tr></table>

**Alerts**

**Get alerted for anomalies**

Upgrade to Observability Plus 

**Projects**

![image](/book/launch/d8c368d8771c.jpg)


**Deploy your first project**

![image](/book/launch/34bf6d974eec.jpg)


**Let's build something new**

![image](/book/launch/7a08ef7aadff.jpg)


![image](/book/launch/ec9950c8a8c6.jpg)


点击Import就ok了！

7）在此处就可以看到项目的域名，然后就可以访问啦！

![image](/book/launch/a92ba2ca04a4.jpg)


我们会注意到，Vercel分配给您了一个域名，所谓域名就是互联网的门牌号，例如：google.com、bilibili.com，它用于让别人容易访问你的服务。其实每个域名背后都是一串难记的IP地址，比如：

203.0.113.8 用戶不可能记得住，于是出现了域名系统（DNS），可以把域名翻译成真实的IP，让浏览器找到你的网站服务器。

用生活类比，IP地址就是某栋房子的GPS坐标，而域名就类似“北京·三里屯太古里3号”这种写法，更好记。而DNS就是导航软件，负责把地址翻译成坐标，你的网站不管怎么换服务器，只要域名不变，别人访问路径就不变。


数字世界：域名与IP


![image](/book/launch/b10db9099100.jpg)



生活类比：地址与坐标


![image](/book/launch/a99015b50dc4.jpg)


CI（Continuous Integration，持续集成） 和 CD（Continuous Deployment，持续部署） 听起来很高大上，其实用披萨店的话说，就是一套“自动化质检与出货系统”。

### 角色分配

• CI（持续集成）⸺自动质检员：每当你修改了代码并 git push 到GitHub时，CI就会自动跳出来。它会帮你检查代码有没有写错（语法检查）、逻辑通不通（运行测试）。

比喻：每当你切好一盘新火腿，质检员会自动尝一块。如果变质了（代码报错），它会立刻拉响警报，不准这盘火腿进入烤箱。

• CD（持续部署）⸺自动送餐员： 只要 CI 质检通过，CD 就会接过接力棒，自动把代码打包、构建、发布到服务器上，替换旧版本。

• 比喻：披萨烤好了，自动打包机直接把它封箱并交给无人机，瞬间送到顾客桌上。你全程不需要动一根手指。

### 为什么你需要它？

1. 拒绝“手动搬运”：你不再需要用FTP或者手动拖传文件。那种“改个错别字要折腾半小时”的石器时代已经过去了。

2. 降低“翻车”概率：CI会在你上线前帮你发现bug。如果代码跑不通，部署会自动停止，老版本的网页会继续正常运行，不会让用戶看到一个挂掉的页面。

3. 小步快跑：你可以一天上线10次！哪怕只是改了一个按钮的颜色，改完 push 一下，3分钟后全世界看到的都是新版。

## 实战：在 Vercel 中体验 CI/CD

其实，当你按照前面的步骤把GitHub仓库连接到Vercel时，你已经默认开启了顶级CI/CD！

1. 修改代码：你在本地把“三国演义”改成“我的三国演义介绍网页“，或者其他的文字。

2. 提交并推送：

```bash
git add .
git commit -m "更新了偶像列表"
git push
```

### 1. 见证奇迹：

◦ 打开 Vercel 的控制台，你会发现它已经自动开始 Building（构建中） 了。

◦ 它在后台默默地帮你安装依赖、编译代码、压缩图片。

◦ 几分钟后，状态变成 Ready。你刷新网页，新内容已经上线！

![image](/book/launch/238b8a88c3d4.jpg)


**Deployments**

Automatically created for pushes to hikariming/sanguo_nextexample

![image](/book/launch/879f936bece1.jpg)


避坑小贴士：有时候你会发现推送后Vercel报错了（红色感叹号）。别慌，这通常是CI质检员发现你的代码有Bug（比如少写个括号、图片路径不对）。点击ViewLogs，看看它报什么错，改完再次 push 即可。

### CI/CD 的高级形态：GitHub Actions

如果你不仅仅是想部署前端，还想在代码提交时自动给偶像发个邮件，或者自动把照片压缩成三种尺寸，你可以使用GitHubActions。它就像是一个“全能管家”，你可以给它写脚本：

“每天早上8点，帮我检查一下网页还能不能打开。 ”•

“只要我合代码到main分支，就帮我给服务器发个信号。 ”•

这就是工业级开发的魅力：凡是能让机器做的，人绝对不动手。

恭喜你！到这里，你已经从一个“只会本地打开HTML”的新手，进化成了拥有“全球加速、自动部署、专业域名”的全栈项目主理人了。

## 购买域名

常见的域名服务商有Cloudflare、godaddy、Google Domains等

我们用Cloudflare为例，进入：https://www.cloudflare.com/zh-cn/products/registrar/

![image](/book/launch/42910a876cfd.jpg)


CLOUDFLARE 

平台

产品

开发人员

合作伙伴

资源

公司

登录

联系销售

Cloudflare Registrar 

工作原理

用户案例

产品

资源

常见问题解答

**Cloudflare Registrar**

成本价域名注册和续期

安全注册、转入、整合和管理您的域名组合，无附加费用，无虚高续期费用。

Q textlingo 

搜索

![image](/book/launch/7a2564862d6e.jpg)


输入你想寻找的域名

![image](/book/launch/2a1cc41c0695.jpg)


购买即可，不同的域名后缀价格和“功能”上有些差异：

① 通用顶级域名（gTLD）：全球都能用、用途不限制，比如：.com / .net / .org / .xyz / .online

② 国家与地区顶级域名（ccTLD）：每个国家自己的"国别"域名。比如：.cn（中国）.jp（日本）.us（美国）.io（英属印度洋领地，但也是很多公司喜欢的后缀）.ai（安圭拉，但被 AI 公司抢疯了，它们国家靠域名赚了很多钱）

③ 新通用顶级域名（new gTLD）2012 年后 ICANN 新开放的一批"个性化"域名例

如：.app、.dev、.shop、.blog、.tech、.site、.cloud，这些通常更时髦，但也有贵的便宜的差异。

## 绑定域名

购买完毕后，就可以在任意的SaaS服务商那绑定你的域名了！

以vercel为例，找到我们上述论述的部署的网页，点击域名按钮：

![image](/book/launch/e0cdd534bae1.jpg)


Repository 

Usage 

Domains 

visit 

![image](/book/launch/f173ded1dfad.jpg)


![image](/book/launch/6297349ecfa4.jpg)


**sanguo-nextexample**

Build Logs 

Runtime Logs 

Instant Rollback 

**Production Deployment**

![image](/book/launch/c2bee45e2561.jpg)


sanguo-nextexample-4pa2u9oc8-hikarimings-projects.vercel.app 

sanguo-nextexample.vercel.app 

Nov 12 by hikariming 

![image](/book/launch/ba5b52dc2736.jpg)


main 

-0-9783aa6 init 

〉Deployment Settings 

**在这里添加并写上你的域名**

**Domains**

Buy Domain 

Add Domain 

Domains can be assigned to git branches,custom environments,and production. 

![image](/book/launch/cdcae4d55b9c.jpg)


Refresh Refresh 

Edit Edit 

![image](/book/launch/63a7231bbd9a.jpg)


gptapps.app 

Invalid Configuration 

Learn more< 

![image](/book/launch/114dd0a46fcc.jpg)


307 www.gptapps.app 

Refresh 

Edit 

![image](/book/launch/34733c5e2d6c.jpg)


www.gptapps.app 

Invalid Configuration 

Learn more< 

![image](/book/launch/e4c1e7157520.jpg)


Production 

![image](/book/launch/8cadaefe044b.jpg)


sanguo-nextexample.vercel.app 

Valid Configuration 

![image](/book/launch/6416155c5df0.jpg)


Production 

Refresh 

Edit 

添加后会看到在红色箭头下的框和红色标记框中，会要求你填入【DNS记录】，这里我们有两种方式添加：

![image](/book/launch/7a411ed25b08.jpg)


DNS 记录就像互联网的 “地址簿”，把好记的域名翻译成电脑能识别的 IP 地址。

### 核心作用

• 不用记一串难背的 IP（比如 192.168.1.1），输入www.xxx.com就能找到对应服务器。

• 负责域名和IP的“配对管理”，还能实现分流、备份等功能。

### 常见的几种DNS记录

1. A 记录：最常用的 “直接配对”，把域名指向 IPv4 地址（比如把xxx.com指向123.45.67.89） C

2. AAAA记录：和A记录类似，只是指向IPv6地址（新一代互联网地址）

3. CNAME 记录：“别名记录”，让一个域名跳转到另一个域名（比如让blog.xxx.com指向xxx.com） 

4. MX记录：“邮件专用记录”，告诉邮件服务器该把邮件送到哪个地址（比如xxx@xxx.com的接收服务器）。

5. TXT记录：“备注记录”，可添加验证信息、防垃圾邮件说明等（比如证明你是域名的所有者）。

### 方式一：自动添加DNS记录

一些服务商（比如我用的cloudflare）已经和vercel做了集成，可以直接点击按钮一键集成

![image](/book/launch/956c588aa9a6.jpg)


gptapps.app 

Invalid Configuration Learn more ^ 

![image](/book/launch/467c5c03e420.jpg)


307 www.gptapps.app 

Refresh 

Edit 

DNS RecordsVercel DNS 

The DNS records at your provider must match the follwing records to verifyand connect your domain to Vercel. 

Type 

Name 

Value 

Proxy 

A 

![image](/book/launch/274049acffce.jpg)


216.150.1.1 

![image](/book/launch/f321ed805665.jpg)


![image](/book/launch/f1333d2e155a.jpg)


Disabled 

AspartofaplannedIPrangeexpansionyoumaynoticenewrecordsabove.Theoldrecordsofcname.vercel-dns.comand76.76.21.21 will continue to work but we recommend you use the new ones. 

It might take some time for the DNS records to apply. Learn More 

Configure Automatically 

![image](/book/launch/960ec220dcd9.jpg)


www.gptapps.app 

Invalid Configuration Learn more ^ 

![image](/book/launch/f580d0b19d66.jpg)


Refresh 

Edit 

### 方式二：手动添加域名

进入域名服务商的【DNS记录】页面，点击【添加记录】

![image](/book/launch/3128d6ad6aff.jpg)


textlingo.app 

![image](/book/launch/61acac17cd2b.jpg)


![image](/book/launch/686545be9cce.jpg)


![image](/book/launch/042d29777cf4.jpg)


![image](/book/launch/3b572de01cda.jpg)


**按照Vercel的说明和要求填入信息即可**

The DNS records at your provider must match the follwing records to verify and connect your domain to Vercel. 

![image](/book/launch/b17ada8dcdd7.jpg)


will continue to work but we recommend you use the new ones. 

**管理 textlingo.app 的 DNS**

DNS 设置：完全 ①

导入和导出

![image](/book/launch/b33d6046e512.jpg)


仪表板显示设置

查看、添加和编辑DNS 记录。编辑将在保存后生效。

搜索DNS记录

![image](/book/launch/3882c0f30f5d.jpg)


添加筛选器

![image](/book/launch/545b213b847f.jpg)


![image](/book/launch/0efd69994b90.jpg)


![image](/book/launch/eb624bca26b5.jpg)


![image](/book/launch/a49c7bf71d80.jpg)


![image](/book/launch/a3bd4cec93ee.jpg)


![image](/book/launch/aed9bf324e68.jpg)


![image](/book/launch/f333a61cd1ad.jpg)


![image](/book/launch/e073c8c15620.jpg)


![image](/book/launch/2835712bd9de.jpg)


![image](/book/launch/7836064e5ea9.jpg)


![image](/book/launch/73c1760170ea.jpg)


![image](/book/launch/7705ef1f26ea.jpg)


![image](/book/launch/6410b72b0013.jpg)


![image](/book/launch/b1f2952a122e.jpg)


![image](/book/launch/1aefbe40d538.jpg)


![image](/book/launch/17e246e67073.jpg)


![image](/book/launch/1b3f04e13b7a.jpg)


![image](/book/launch/62c2303c9c5f.jpg)


![image](/book/launch/cf896cb992d1.jpg)


![image](/book/launch/06a1037b81d9.jpg)


![image](/book/launch/a40167f3b29a.jpg)


![image](/book/launch/325c6e404176.jpg)


![image](/book/launch/2f812351dc2d.jpg)


![image](/book/launch/cb6f4e5ee001.jpg)


![image](/book/launch/28afdc3b37fd.jpg)


![image](/book/launch/482ae60abcee.jpg)


![image](/book/launch/80cc41ef8ed7.jpg)


![image](/book/launch/fb13be6aedb6.jpg)


![image](/book/launch/ade2521ddcd3.jpg)


![image](/book/launch/68c215ae5ef2.jpg)


![image](/book/launch/79d0c3c32b35.jpg)


![image](/book/launch/eb0c383214c8.jpg)


![image](/book/launch/d6ad7c477b37.jpg)


![image](/book/launch/0aa8e7978b99.jpg)


![image](/book/launch/d9ef37b236d3.jpg)


![image](/book/launch/b3af914dc203.jpg)


![image](/book/launch/df90a4777110.jpg)


![image](/book/launch/fc04ee35e70b.jpg)


![image](/book/launch/8501da3e2e4b.jpg)


![image](/book/launch/adca9225344d.jpg)


![image](/book/launch/90e456f4a8c1.jpg)


![image](/book/launch/245d04736e38.jpg)


![image](/book/launch/ad8b3c613fbb.jpg)


![image](/book/launch/45c6d9db9d24.jpg)


![image](/book/launch/5abeb6e30413.jpg)


![image](/book/launch/2640098d4a43.jpg)


![image](/book/launch/446c9b7be60d.jpg)


![image](/book/launch/f66f570b0fb6.jpg)


![image](/book/launch/33476800ece1.jpg)


![image](/book/launch/b766f944f888.jpg)


![image](/book/launch/1a57b719c15f.jpg)


![image](/book/launch/fbfe140b1f0e.jpg)


![image](/book/launch/eb213c2c6383.jpg)


![image](/book/launch/5999949c3d4a.jpg)


![image](/book/launch/a89b2c0962e1.jpg)


![image](/book/launch/51424ac487f1.jpg)


![image](/book/launch/509f61aeaa72.jpg)


![image](/book/launch/468b21774a5c.jpg)


![image](/book/launch/824b2572d560.jpg)


![image](/book/launch/0db5b5145d1e.jpg)


![image](/book/launch/03131275fdbd.jpg)


![image](/book/launch/b6e7784d37e9.jpg)


![image](/book/launch/00b1636a2404.jpg)


![image](/book/launch/8a3f521431d2.jpg)


![image](/book/launch/00ed7c9f8794.jpg)


![image](/book/launch/34bc555caa90.jpg)


![image](/book/launch/b55ab7b37cc4.jpg)


[名称]指向[IPv4地址]并通过 Cloudflare 代理其流量。

![image](/book/launch/ebe5891603a4.jpg)


**记录属性**

此处提供的信息不会影响DNS 记录的解析，仅供您参考。

注释

在此处输入您的注释（最多100个字符）。

配置完毕后（可能需要等待10分钟左右），返回Vercel，就会发现配置生效啦！就可以用域名访问你的服务啦！

**Project Settings**

Build and Deployment 

Domains 

Environments 

Environment Variables 

**Domains**

textlingo.app 

www.textlingo.app 0 

Production 

Buy Domain 

Add Domain 

了Filter

Refresh 

Refresh 

Edit 

Edit 

接下来，我们来聊聊云平台的选择。

## 在云上正式部署你的应用

刚刚我们聊完了Docker，大家对部署上线应该有了一些了解，接下来就是选择自己的云平台部署应用了，按照“抽象程度”（即：你作为开发者需要管多少事）从高到低进行分类。抽象程度越高，越自动化和AI化；抽象程度越低，自主控制权越大，您需要根据项目情况、个人使用的技术等情况，妥善进行平台选择。

云生态百花齐放、类型各异，较为常见的平台的不完全分类如下：

AI驱动/全自动生成型：你不需要写代码，只需要写prompt（提示词）。平台负责生成代码、预览、部署。一般而言，你无法在此类平台部署你本地的代码，只能用自然语言进行软件生成。适用原型验证、着陆页、简单工具、非技术人员开发。此类玩家主要有v0(byVercel)/Lovable/Bolt.new等，这是目前最火的赛道。它们可以进行全栈代码生成--不仅生成UI，还能在浏览器里运行全栈应用，一键部署。

它们的优点是全自动，缺点是缺乏项目掌控，例如v0生成的项目，如果你连接了supabse这个平台存储数据，supabase将进入托管模式，很多操作会无法运行。

![image](/book/launch/837615a44b4b.jpg)


前端托管/边缘网络型：专注于Web前端。你的代码使用GitPush后即部署，还会自动配置SSL、CDN、域名。它们也能跑后端（ServerlessFunctions），但核心基因是前端。适用个人博客、公司官网、Next.js/Vue/React 等网页应用。其中玩家主要有：前端托管的王者Vercel，Next.js 的亲爹。体验极致丝滑。Vercel的老对手Netlify，功能非常全面，免费额度很大方。

如果要部署前端页面，大概率您会和他们打交道，又或者是使用其他的容器等平台部署前端，缺点就是只能使用它们规定的技术做后端，而且长时间运行的任务价格昂贵。

后端即服务型：平台帮你搞定了数据库、用戶认证(Auth)、文件存储、实时订阅。你只需要写前端，直接调用它们的SDK就能存取数据。你不需要“部署”后端，因为后端已经在那了。适用全栈应用、小程序、不想写CRUD后端的开发者。其中的玩家是：

• Supabase: 开源版 Firebase 的最强替代者。基于 PostgreSQL，提供超强的数据库能力 + Auth +Edge Functions。

Firebase: Google 旗下，老牌霸主，实时数据库依然很强，但绑定 Google 生态较深。

• Appwrite:另一个优秀的开源BaaS，功能类似Supabase，Docker部署很方便，云上免费版给了很多额度，缺点是功能不那么完善。

上述后端服务平台会存在一定的技术绑定问题：在方便的同时，如果您用了平台开发，后续就很难迁移到别的平台或者技术去了。当然，如果您仅使用其一部分能力，例如您只用Supabase的数据库能力，那么迁移还是简单的（如supabase，它的数据库是标准的pg库）。

![image](/book/launch/56b1387196c0.jpg)


容器托管平台/现代PaaS：这就是你刚才学的Docker发挥作用的地方。你给平台一个Docker镜像（或者让平台检测你的代码自动构建），它帮你跑起来。它比VPS简单，比Vercel灵活（可以跑Python、Go、Java、长时间运行的任务）。适用传统的后端服务、Docker应用、微服务、数据库托管，主要玩家有：

• Railway:极简主义，UI极其漂亮。自动识别代码语言，支持Dockerfile。

• Render:类似于Railway，提供免费的WebService（有休眠机制）和数据库，非常适合练手。

• Zeabur(泽布):国人开发的优秀平台。

上述平台的好处就是，用了它们和您电脑上安装、使用Docker一样的体验。

在线集成开发环境：它连代码编辑器都在云端。买的是"开发环境 + 运行托管环境"。适用教学、快速验证想法、不想配置本地环境、Chromebook 用户。比较出名的是 Replit，它给你一个 Linux 容器，你在浏览器里写代码、按 Run 就能跑，现在它正通过 AI 向全自动进化。其也存在少量的技术绑定问题：文件存储、kv 数据库等一些服务只能在云端 replit 运行，如果和其生态绑定过深，你的代码很可能没法从 replit 上迁移。

基础设施即服务(IaaS/VPS)：给你一台裸 Linux 虚拟机（甚至是一台真的服务器！）。你需要做 SSH 登录，安装 Docker，配置 Nginx，配置防火墙，甚至自己装数据库。自由度 100%，但难度 100%。适用复杂的大型应用、需要极致省钱、需要特殊系统配置、学习 Linux。主要玩家有 AWS EC2/Azure/Google Cloud 也就是大家常说的"大厂云"。Vultr：对开发者友好的云厂商、阿里云/腾讯云：国内备案必选。

总结：自动化程度越高的平台和技术，其核心好处在于大幅降低开发门槛与启动成本⸺无需手动搭建服务器、配置环境或从零开发后端API，甚至非专业开发者也能借助AI功能参与开发，让初创团队或个人可快速验证原型并聚焦核心业务；同时，平台整合“编码-测试-部署”全流程，能将传统数天的上线周期压缩至分钟级，适配互联网产品快速迭代需求，且承担了底层运维工作。

但此类平台的不足集中在局限性与隐性成本上：主要是供应商锁定风险，闭源平台的专有API与数据格式会增加迁移难度，即便开源平台（Supabase），深度依赖定制功能也会提升适配成本；免费版资源限制明显，无论是Replit的CPU配额、Firebase的函数调用次数，还是 v0.app 的生成次数，都难以支撑复杂项目，而企业级功能的付费套餐长期使用成本可能超过自建基础设施。

因此从全自动的v0到全手动的云服务器，大家在选择的时候需要认真考虑

选平台这件事，没有标准答案，但有一些实用的决策路径可以参考：

![image](/book/launch/ba46d390c380.jpg)


### 按你的角色选

<table><tr><td>场景</td><td>参考方案</td></tr><tr><td>想验证想法</td><td>v0 / Lovable / Bolt.new</td></tr><tr><td>做官网、博客、轻应用</td><td>Vercel / Netlify</td></tr><tr><td>全栈开发者，想快速出活</td><td>Supabase + Vercel/ 单railway / railway+Vercel</td></tr><tr><td>后端开发者，跑 Python/Go 服务</td><td>Railway / Render / Zeabur</td></tr><tr><td>学生党，想省钱学习</td><td>Replit</td></tr><tr><td>老鸟，追求极致控制</td><td>VPS (Vultr / 阿里云)</td></tr></table>

![image](/book/launch/ef722f01be98.jpg)


### 按你的项目类型选

<table><tr><td>项目类型</td><td>参考方案</td></tr><tr><td>着陆页 / 营销页面</td><td>Vercel / Netlify</td></tr><tr><td>需要用户登录的 Web 应用</td><td>Supabase + Vercel/ 单railway / railway+Vercel/VPS</td></tr><tr><td>需要跑定时任务 / 长时间计算</td><td>Railway / Render / VPS</td></tr><tr><td>程序后端</td><td>Supabase / 云函数 / VPS</td></tr><tr><td>学校作业 / 课程项目</td><td>Replit</td></tr></table>

![image](/book/launch/e4ec8900ddee.jpg)


## 几条黄金法则

1. 先跑起来再说：新手别纠结"最优解"，先用最简单的方式部署上线，跑通流程最重要。

2. 从高抽象往低抽象走：先用Vercel/Railway这类平台，等你真正遇到它们的限制了，再考虑迁移到 VPS。

3. 注意锁定风险：如果用了某个平台的专有功能，想清楚未来迁移的成本。

4. 混合使用要谨慎：前端用 Vercel + 后端用 Railway + 数据库用 Supabase，听起来很美好，但每个平台都要学习、每个平台都有坑、每个平台都可能收费。

## 最后的叮嘱：部署成本问题

部署上线是开心事，但账单可能让你不开心。一定要算好部署成本！！！这里有几个血泪教训，提前打个预防针：

1、免费额度往往有限：各大平台的免费额度看起来很香，但细看条款会发现，当你的应用稍微复杂起来之后，免费额度就超了，不管用什么平台都一定要看好是怎么收费的。

2、惊喜账单：这是最坑的一个。你的项目突然火了，流量暴涨，例如有开发者的 Vercel 项目被爬虫刷了，一夜之间产生了 $10,000+ 的账单。所以需要设置账单告警，超过阈值立刻通知你。最好设置用量上限，到了上限自动停服，别让它无限烧钱。

3、混合使用不同平台要谨慎，会导致成本叠加问题：这是我个人的血泪教训。为了"各取所长"，我曾经用过这样的组合：

• v0生成前端 付费

• Vercel 托管前端 Pro 版付费

• Supabase 做数据库和 Auth → Pro 版付费

• Railway 跑后端长任务 付费

听起来很专业对吧？一个月账单加起来将近$100，换成人民就很贵了。