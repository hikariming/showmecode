> “你的指令越模糊，AI 的输出就越平庸。”

你对于 AI 编程的各种技巧都已得心应手，但你发现，当你输入”设计一个现代化的网页”，AI 还是只能基于概率给你一个”平均值”——毫无个性的蓝紫色背景、随意的间距、以及缺乏层级的字体。究其原因，是 AI 不懂审美，它只是在拼凑素材。如果不加约束，它生成的页面就像一盘散沙：每个组件单看凑合，拼在一起就是典型的”模板网页”味道，廉价感满满。

## 一. 生成式网页效果的演进

这是Gemini3出现之前，在DesignArena模型竞技场中，通用LLM根据简单提示词生成的几组网页示例，导航、标题、CTA等元素按部就班地排列着，但其中暗藏了较多设计问题。

![image](/book/design/ec8140603195.jpg)


![image](/book/design/992f2ace32b5.jpg)


![image](/book/design/e7b69844cf62.jpg)


![image](/book/design/6672b0dda237.jpg)


![image](/book/design/07075d69b3b3.jpg)


![image](/book/design/71a5c35d2272.jpg)


这些短板通常体现在以下三个方面：

### 1.布局与节奏失衡

• 栅格/对齐规则不明确，页面边距随意；

• 组件间间距不统一，层级关系模糊，影响视觉节奏；

• 文案断句与行长处理随意，影响可读性与视觉节奏；

### 2.缺乏统一的视觉语言

• 字体使用随意，无清晰的字号体系，导致信息对比度不够或者过强；

• 色彩缺乏主次，违背60-30-10配色原则（主色/辅助色/强调色比例）；

• 元素样式（阴影/边框/圆角）滥用或不一致，缺乏统一规范；

### 3.素材质量与表现力不足

• 模型生成网页时多依赖通用SVG图标与占位图，缺乏高质感图片、插画、精细图形等视觉资产，使页面缺乏表现力。

Gemini3的出现在某种程度上改变了这一切。只提供简单的功能提示，甚至只用一句话描述就能产出设计感强、交互完整的作品，Gemini生产的网页效果在排版节奏、色彩关系、细节与质感等维度都能达到70分的效果。

The Art of Minimalist Living in a Digital Age 

![image](/book/design/2a9f2819a9b2.jpg)


eetd corntactycorectedtmtifechoetosteohack? 

eo ot 

The Philosophy of Less 

is addng aleto 

Practical Steps to Start 

Designate phone-free aones:Keep the bedoomand dining tatie soreen-free reading Just einking 

Eaed 

![image](/book/design/15255f901411.jpg)


![image](/book/design/b9500d89f150.jpg)


![image](/book/design/2195217ffdcd.jpg)


但强如Gemini3也无法保证每一次的产出都精准命中你的需求。毕竟，AI本质上是在进行概率预测，它并不真正理解需求背后真正得设计意图。

当AI生成的初稿摆在面前，你是否在深入细节时感到过无力？从生成Demo到真正构建产品，我们该如何更轻松地驾驭AI，让它生成更符合我们诉求的内容？

为了降低后续不确定性，接下来的章节我们将重点讲解前端工具的选用、设计风格及组件库的参考以及建立设计规范的Prompt技巧，帮你建立一套稳定可控的开发工作流。

## 二. 快速产出具备审美的网页代码

### 2.1 选择趁手的前端开发工具

这里我们聊聊一句话就能拉起一个网站、甚至连后端和部署都帮你接好的「懒人级」工具。它们多数拥有打磨已久的代码编辑器、成熟的预览环境、一键分享部署的能力，让你无需折腾本地环境，就能快速验证一个网页想法。这类产品大多集成了Shadcn/ui、TailwindCSS等主流设计系统，生成的代码不仅现代、美观，且符合工程标准。

其中一些产品还可以作为你IDEA的起点：在这里生成设计稿或可交互原型，再将代码导出到Cursor、Antigravity 或 Claude Code 中继续精细打磨功能。

无论是新手入门，还是高手速成，这些产品都可以作为最高效的选择。

**产品介绍**

![image](/book/design/2e73e8b983ec.jpg)


![image](/book/design/975b9a44ae53.jpg)


![image](/book/design/85f86d9b8bc8.jpg)


![image](/book/design/95004c441da3.jpg)


这些产品整体可分为Dev-First、UI-First两类，典型的代表有：

Dev-First：Orchids、 V0、Firebase Studio、Figma Make、Lovable等

UI-First：Google Stitch、Magicpath、Variant等

前者通过Prompt直接生成前端代码，依托大量现代Web技术栈的训练数据，使输出更规范、结构更清晰。其设计一致性主要来自：

• Prompt 中的 Design Token、Tailwind 类名等明确约束

• 由框架与组件库本身提供的视觉规范

整体偏工程化，产品对后端、支付的支持更好。

后者以界面生成为核心，AI结合设计系统的色板、字体、圆角、间距等规范生成页面。其一致性优化主要通过：

• 内置设计系统参数，确保生成的UI风格、排版、色彩等可全局统一、快速调整

• 可视化编辑或画布操作，允许用戶实时微调界面细节，提升审美和实用性

整体以高保真设计稿的生成为目标，支持多种代码格式（如HTML、React）的导出与后续开发协作

**效果对比**

我使用两组Prompt测试了各产品的整体表现，其实单从设计上来说，在各个产品逐步接入Gemini3后，同一套提示词输出的效果已经逐步趋近。

![image](/book/design/ab21d029f509.jpg)


非常推荐 ：Orchids（一款被严重低估的产品）、Google AI Studio（产品力一般，但胜在免费&模型效果好）

具备一定发展潜力：V0 、Google Stitch、Magicpath（Google Stitch可平替）、FirebaseStudio

还行：Figma Make、Lovable、Youware

因可用性问题放弃测试：Same、Base 44、Bolt

其中Orchids在UI-Bench测试中排名第一，也是我实测视觉效果不错的产品，其在颜色、字体、排版等方面使用比较克制，效果也比较稳定。可以看出产品底层针对视觉问题做过不少优化。在近期接入Gemini 3模型后，Orchids变得更厉害了，近期也更新了客戶端产品提供了更完善的开发体验。

V0 作为 Vercel 官方推出的 AI 前端平台，输出标准的 Next.js + Tailwind + shadcn/ui 高质量代码，在部署、后端、支付等场景上也比较成熟，并提供一定免费额度，对初学者非常友好。

Google AI Studio、Google Stitch、Firebase Studio 背靠Google多模态大模型能力，发展潜力较大。其中Stitch更偏设计稿生成、可交互原型生成，在代码上和GoogleAIStudio打通，设计稿和Figma打通；FirebaseStudio在技术栈支持上更全面：前端、后端、数据库、GeminiAPI都能一起生成。多数生成网页也具备较完整的交互能力，产品目前仍是免费的。

FigmaMake的优势是能与Figma画布全链路打通，不过生成页面偏静态，交互能力较弱，更适合设计师在现有设计稿基础上延伸使用。

Same、Base44、Bolt在体验中频繁出现bug，同时对Gemini3上线的反应较慢，整体可用性不足，因此从测试列表中移除。

在第四章中，我们会详细分析这些产品之间的细节差异，感兴趣的同学可以前往查看。

*测试时间：25.12

★★★★ = 效果惊艳；★★ = 效果不错；无星 = 效果一般

![image](/book/design/941092fe7660.jpg)


![image](/book/design/dbc8cd6e6890.jpg)


![image](/book/design/40fa139ca3a4.jpg)


![image](/book/design/5faf864665bf.jpg)


![image](/book/design/a2ecccd61797.jpg)


![image](/book/design/610bc37bde85.jpg)


![image](/book/design/990e5d1e126f.jpg)


![image](/book/design/bda1a3a82669.jpg)


生成效果对比：个人博客

Orchids-Gemini 3 

VO-Gemini3 

![image](/book/design/d58ae74e27c5.jpg)


![image](/book/design/67d934a1de08.jpg)


![image](/book/design/475029835a79.jpg)


Firebase 

![image](/book/design/d09463afa016.jpg)


Gemini3-Al Studio 

![image](/book/design/3fb619418b44.jpg)



Figma Make


![image](/book/design/d20d2a9a5699.jpg)



Google Stitch


![image](/book/design/0cff3568ba7f.jpg)



Magicpath


![image](/book/design/37ee319f0556.jpg)



Lovable


![image](/book/design/90906b83fa6c.jpg)



生成效果对比：咖啡馆点单系统


### 2.2使用图片/链接/风格关键词模仿流行风格

如果你对自己的产品有明确的风格倾向，那么可以通过同时提供参考图片、示例网站链接和风格关键词的方式，指导模型输出。虽然这三类输入看似简单，但在模型理解上各有不同作用：

参考图片（ReferenceImage）：帮助模型快速锁定整体的色彩氛围与版式构图；

• 示例链接（ExampleLink）：引导模型深入学习真实网页的代码结构、元素密度及交互细节，确保生成的页面符合成熟的网页标准；

• 风格关键词（StyleKeywords）：能起到差异化修正的作用⸺通过提示词指定特定的字体或品牌色，你可以强制模型在模仿参考网页结构的同时，改变其视觉，避免千篇一律的机械模仿，生成具有独特辨识度的设计。

组合使用这三种输入，能有效收敛模型在审美上的随机发挥，让最终产出无限接近你的设计预期。下面是几组案例对比：

![image](/book/design/e5bbf1e4f787.jpg)


![image](/book/design/7cea06e5a5b3.jpg)


![image](/book/design/3f48340b5151.jpg)


![image](/book/design/5a4696f61746.jpg)



Material Design


![image](/book/design/eb8dd9e05662.jpg)


![image](/book/design/2e92249fe945.jpg)


![image](/book/design/f4bddb5fe619.jpg)


![image](/book/design/ba16eef1d2a7.jpg)



结构线风格


这里是主流网站风格的介绍，大家可以在网站制作时进行灵感参考。

另外【5.2章节】中，我们还会推荐几个非常优质的网页Showcase平台，感兴趣的同学可以查看获取更多灵感。

### 2.3参考优质组件库

优质组件库通常包含经过大量产品验证的布局、动效与交互模式。把这些组件引入生成页面，可以让网页瞬间具备更专业、稳定的质感。

下面我们来示范：在已经由Gemini3生成基础页面的情况下，如何嵌入21st.dev的组件。你也可以在【5.3代码组件库】中找到更多优秀组件资源。

在使用组件时，关键是让它们的结构与页面现有样式尽可能自然融合。如果你只想借用动效逻辑，而组件本身的视觉风格与你的网站差异较大，也没关系⸺可以直接把原组件的代码复制给AI，请它协助拆解与改写，让动效适配你的页面结构。

以我们在2.2节展示的结构线风格网站为例，我想在Hero区域引入一个「鼠标悬浮显现字母」的交互组件，如下图所示：

![image](/book/design/42a961b27d0a.jpg)


点开21st中的组件详情页，左侧「Howtouse」模块中，，你可以选择「Copyprompt」或者「Copy code」的方式进行组件使用，这里我选择了「Copy prompt」 可以选择不同代码工具。

![image](/book/design/b5fa9450e20c.jpg)


值得注意的是，原始Prompt通常包含组件自带的样式定义。为了让它完美融入我的设计系统，我在投喂给AI之前添加了额外指令，要求代码工具剥离原组件的视觉样式，仅保留核心交互逻辑：

我喜欢 Evervault Card 这个组件里「鼠标悬浮时、跟随鼠标出现的渐变光圈 + 随机字母背景」的效果：https://21st.dev/community/components/aceternity/evervault-card/default

但我不想要它的卡片布局、不需要中间的圆形和文字，也不要边框和四角图标。

请你分析它的代码并且将其加到Hero区域的背景模块内，也就是图片中红框区域内的部分

这里是原始prompt，供参考：

<!--在这里粘贴从组件库中复制的prompt或者代码内容-->

将这段Prompt输入代码工具后，AI迅速修改了代码，很快就实现了初步效果。

![image](/book/design/d084195f4b8c.jpg)


## 三.提示词技巧

### 3.1优化设计需求，让模型掌握视觉重点

当我们做的是实际项目，页面中需要呈现的内容往往是最先确定好的，此时我们可以将需求描述发给Gemini3Pro，借助模型强大的联想能力，帮助我们清晰撰写一篇包含功能、设计要求的Prd，模型可以帮我们主动标记页面重点，甚至主动规划模块中的布局方式，而这样的提示词可以帮助模型生成网页时清晰理解不同文本、内容结构关系、了解页面的视觉重心。

![image](/book/design/1f9f87a105ac.jpg)


两个版本的提示词及生成效果对比，可以看到，右侧对风格加入了更明确的页面元素与风格指令，在页面的结构线背景、配图细节等方面，效果明显更好

![image](/book/design/5c9b4f89ee1e.jpg)


**Role (角色)**

你是一名推崇 瑞士设计 (Swiss Style)和工程美学的UI设计师。

请为一款名为 "Syntax AI" 的 AI 代码编辑器设计官网首页。

请按照我给你的网站和附件图片，参考结构线风格的颜色、风格、布局和细节：https://dify.ai/

包含以下8个部分的页面：

Section 1: Hero (首屏)

内容:H1 "Write Code. Not

Boilerplate.", 按钮 "Install CLI"。

视觉:展示代码编辑器界面。

Section 2: 展示5-6 个公司 Logo 增强信任度

Section 3: Features 模块：

1. Context Awareness (Understand repo). 

2. Instant Diff (Fast review). 

3. **Terminal Integration**. 

4. Security First (Local privacy). 

![image](/book/design/bae15a9558ea.jpg)


**Role (角色)**

你是一名推崇 瑞士设计 (Swiss Style)和工程美学的UI设计师。

请为一款名为 "Syntax AI" 的 AI 代码编辑器设计官网首页。

请按照我给你的网站和附件图片，参考结构线风格的颜色、风格、布局和细节：https://dify.ai/

**Design Specification**

### 1. 视觉语言: "Structural Grid" (结构化网格)

请完全依靠 **线条 (Lines)**、**间距(Spacing)** 和 排版 (Typography) 来构建页面。

* Typography (排版):

* 等宽优先 (Mono-First): 导航、小标题、标签、数据、按钮文字**必须使用`font-mono **c

正文:使用无衬线字体(`font-sans`)。

* Shape (形状):

Section 4: Performance (性能)展示一个对比图表，说明 Syntax AI 的速度比VSCode和其他AI编辑器更快(Latency comparison)。

Section 5: Languages 展示支持的语言列表：Python, Rust, Go, TypeScript, JavaScript, C++, Java.

Section 6: Testimonials (评价)展示3条来自开发者的用戶评价。

Section 7: Pricing (定价)展示3个价格档位：

1. Hacker: Free. 

2. Pro: $20/mo

3. Team: $50/user/mo. 

Section 8: Footer (页脚)包含 Product, Company, Resources 的链接列表。

Sharp:所有的容器和按钮使用直角(`rounded-none`) 或微圆角 (2px)。严禁使用大圆角和阴影。

### 2. Layout Strategy (布局策略)GridSystem:页面应看起来像一张平铺的精密图纸。

* Vertical Rhythm: 区块之间通过`border-b` 分割。

**Website Content & Structure (内容结构-文案需为英文)**

请设计包含以下8个部分的完整长页面：

### Section 1: Hero (IDE 仿真)

* 布局：顶部导航 + 主视觉。

* Navbar: Logo "Syntax", Links (Features, Pricing, Docs), Button "Install CLI" (Outline style). 

* Content: * Badge: `[ v2.0 Stable ]` (Green/Mono). 

H1: "Write Code. Not Boilerplate."* Visual: 一个**线框风格的 IDE 窗口*大

### Section 2: Social Proof (信任背书 -Logo Wall)

* 布局: 一个横向的 Logo 栏，上下有`border-y`。

* 内容: "Trusted by engineeringteams at:"

* Logos: 展示 5-6 个灰色的科技公司Logo (e.g., Vercel, Stripe)，用垂直线条 (`border-r`) 将它们隔开。

### Section 3: Value Prop Bento (核心价值 - 便当盒网格)

* 布局: 一个巨大的 **Bento Grid (2行3列)**，每个格子都有边框。

* Card 1 (大): "Context Awareness" -显示一个文件树结构 (File Tree)。

* Card 2: "Instant Diff" - 显示代码差异对比。

* Card 3: "Terminal Integration" - 模拟命令行界面。

* Card 4 (宽): "Security First" - 文案"Your code never leaves your device."

### Section 4: Performance (图表可视化)

*布局:左文右图。

* 左侧：H2 "Built for Speed." + 描述。

* 右侧: **条形图 (Bar Chart)**。使用简单色块来构建对比条形图，展示Syntax AI 的低延迟优势。

### Section 5: Language Support (网格列表)

*布局:规则网格(4列x2行)。

* 标题: "Fluent in every language."

* 内容: 展示编程语言名称 (Python,Rust, Go, etc.)。

*样式:每个语言名称被包裹在一个带边框的方块中

### Section 6: Testimonials (用戶评价)* 布局: 3 列布局。

* 样式: 像 GitHub Issues 一样的评论卡片。

*内容:3条来自开发者的评价，包含头像、名字、和一段好评。

### Section 7: Pricing (定价表格)

*布局:严格的3列表格结构。

* 内容:

Plan 1: Hacker (Free) - 包含基础功能列表。

* Plan 2: Pro (Highlight) - 包含高级功能。通过加粗边框或强调色 来强调此列

* Plan 3: Team - 包含企业功能。

### Section 8: Footer (页脚)

* 布局: 简单的 4 列链接列表 (Product,Company, Resources, Social).

*底部:版权信息。

那么如何获得右侧的提示词呢？我们可以将初版需求和以下Prompt一起发送给Gemini3Pro，让Gemini帮忙优化

![image](/book/design/b795fc102b24.jpg)


**Role**

你是一名拥有丰富前端工程经验的资深设计工程师（DesignEngineer）。你擅长拆解优秀网页的设计系统，并将其转化为可落地的前端代码提示词。

**Task**

请根据我提供的【网页功能规划】与【视觉参考风格】，编写一段详细、结构化的**AICoding Prompt**，用于发送给 Cursor/Gemini3 等模型及代码工具。

#1.视觉与交互风格

请参考 Dify 官网 (https://dify.ai/) 的设计语言：<!-- 推荐大家附上截图

-**核心风格**：提取其“结构线（StructureLine）”风格，强调边框、网格布局与极简主义。

-**色彩规范**：使用终端绿（TerminalGreen）作为强调色，背景保持干净清爽。<!--大家可以任意替换，如果没有倾向性，可改成：请使用灰度或中性单色调色板来建立层次结构，简单有效-->

-**布局逻辑**：请在Prompt中明确各模块的布局方式（如BentoGrid或左右分栏），并适当突出视觉重点。

-**装饰元素**：请在Prompt中详细描述需要生成的icon风格及具体的装饰性配图。

- **字体排版**：强调使用简约现代的无衬线字体，确保排版节奏清晰。 <!-- 大家可以任意替换，如果没有明确可以不具体指定，让 Gemini3 自行发挥即可 -->

**2. 技术栈** <!-- 可根据实际情况修改 -->

- Framework: React (Next.js App Router) 

- Styling: Tailwind CSS 

- Icons: Lucide React 

#3.网页功能规划

以下是我对网页内容的初步构思：

<!--在此处贴入你的网站初始需求，例如：我要做一个AI导航站，包含Hero区域、工具列表、提交入口... -->

#输出规范

1. 请输出一段完整的、可直接复制的 Prompt。

2.语言要求：Prompt的指令部分请使用中文描述，但要求生成的网页UI文案默认为英文（面向海外市场）。<!--可根据实际情况删除此要求-->

3. 格式要求：请使用 Markdown 代码块输出。

4.内容深度：生成的Prompt中必须包含对“设计细节”的详细描述（如圆角大小、阴影质感、交互动效），而不仅仅是罗列功能。

不过需要强调的是，在模型能力极大增强的今天，Prompt 的作用只是锦上添花。写的越多 ≠ 效果越好。过于冗长、琐碎的指令反而会增加模型的认知负担，降低核心指令的权重，导致模型顾此失彼。因此精准远比冗长更重要。保持克制，从简单的指令开始，只增加必要约束。

### 3.2用.md规范管理多页面风格一致性

**形成规范的重要性**

假设此时你已经从上述流程得到了一个不错的网页效果，但你想开发一套拥有多个页面的大型项目，那么设计规范的统一管理就相对重要了⸺ 如果只是简单让AI复用其他页面的设计样式，AI产出的结果在不同页面的用色、字号、间距有可能会出现差异，导致整体观感不统一。

我们需要将隐性的视觉显性化为设计需求文档。你可以直接向AI提要求，得到包含所有细节特征的.md文档，同时，使用Markdown有助于模型区分指令、上下文和任务。

![image](/book/design/da59ff66d464.jpg)


**Typography**

Typography Web 

heading1 

heading? 

heading3 

bodp-srsall/reguar /empaize 

Typography /iOS 

headingt 

heading? 

heading3 

bedy-orall/regular /emphastret 

Typography / Android 

headingt 

beading2 

teedsg8 

body / reoular/ emphegtre 

body/ ng 

16 

16 

![image](/book/design/516a9f7ddba0.jpg)


Foundations 

**Color**

**Colors /light mode**

Background / Light 

![image](/book/design/77ef006c82e2.jpg)


Primary 

![image](/book/design/b23726df13e5.jpg)


Secondary 

![image](/book/design/f87f575c8e00.jpg)


Tertiary 

Text /Ligbt 

Text/Primary 

![image](/book/design/0e718cac99c7.jpg)


Text/Secondary 

![image](/book/design/cf6041f6fc4f.jpg)


Text/Tertiary 

![image](/book/design/4758d9084142.jpg)


Text/Inverted 

Icon / Light 

0 

imary 

![image](/book/design/0f2b3df44023.jpg)


Icon /Secondary 

![image](/book/design/0152c6b0cddc.jpg)


lcon/Tertiary 

![image](/book/design/f6fa28a51821.jpg)


Icon /Inverted 

Accents 

![image](/book/design/efeaf3b5ea91.jpg)


Accent /Red 

![image](/book/design/e73fb1eff8e5.jpg)


Accent Orange 

![image](/book/design/e4a91c5c4199.jpg)


Accent/Green 

![image](/book/design/d54e9f3dd201.jpg)


**传统大型项目需要由设计师整理DesignToken**

这种做法是有迹可循的，例如FigmaMake在生成Webapp时，会优先读取 guidelines/ 文件夹里的内容，从 Guidelines.md 开始，把其中的文字当作额外上下文和约束。

、components 

guidelines 

<> Guidelines.md 

、styles 

<>App.tsx 

<>Attributions.md 

**Guidelines.md**

**Add your own guidelines here** 

4System Guidelines 

6Use this file to provide the AI with rules and guidelines you want it to follow. 

7This template outlinesa few examples of things you can add.Youcanadd yourown sections and format it 

9TIP:More context isn't always better.It can confuse the LLM.Try and add the most important rules you n 

**General guidelines**

Any general rules you want the AI to follow. Forexample: 

* Only use absolute positioning when necessary.Opt for responsive and well structured layouts that use f *Refactor code as you go to keep code clean 

* Keep file sizes small and put helper functions and components in their own files. 

**Design system guidelines**

Rules for how the AI should make generations look like your company's design system 

Additionally，if you select a design system to use in the prompt box，you can reference your design system's components，tokens,variables and components. For example: 

* Date formats should always be in the format "Jun 10"

*The bottom toolbar should only ever have a maximum of 4 items 

*Never use the floating action button with the bottom toolbar 

* Chips should always come in sets of 3 or more 

* Don't use a dropdown if there are 2 or fewer options 

You can also create sub sections and add more specific details For example: 

### Button 

![image](/book/design/997dc581866c.jpg)



Figma Make 的官方规范模板


**让AI总结设计规范**

那么，我们需要让AI帮忙建立的设计规范应该包含哪些维度呢？

其实很简单，只需要提取出核心的设计变量：

• 色彩系统(Colors)：主色、辅色、背景色、边框色（最好对应Tailwind类名）；

排版系统 (Typography)：标题、正文的字号与行高；

组件质感 (Components)：圆角大小 (Radius)、阴影 (Shadow)、边框厚度；

• 布局间距 (Spacing)：常用的内边距 (Padding) 和 间隙 (Gap)。

下面我们给出一个Prompt模板，你可以拿去输入给Coding工具，让其将网站详细的设计规范总结成设计需求文档，并方便复用在其他页面中。

你是一名资深的设计系统工程师（Design System Engineer） c

**Task**

请分析当前网页的代码实现（包括 Tailwind 配置、CSS 变量、组件样式），提取出一份标准化的 Design System.md 文档。

**Requirements**

这份文档将用于指导后续新页面的开发，请务必包含以下核心模块，并使用Markdown代码块格式输出：

**1. Color Palette (色彩系统)**

◦ 列出 Primary, Secondary, Background, Muted/Accent 等关键颜色的 Hex 值。

◦ 如果使用了 Tailwind，请标明对应的 class (e.g., bg-slate-900 )。

**2. Typography (排版系统)**

◦ 定义 H1-H6 及 Body 的字号 (text-xl, text-sm) 和字重 (font-bold, font-medium)。

**3. UI Characteristics (组件特征)**

◦ Border Radius: 按钮和卡片的圆角规范 (e.g., rounded-xl )。

◦ Shadows & Effects: 阴影深度、毛玻璃效果等 (e.g., backdrop-blur-md )。

◦ Borders:边框的颜色与粗细。

**4. Layout & Spacing (布局节奏)**

◦ 常用的内边距 (p-4, p-6) 和组件间距 (gap-4)。

**Goal**

输出的文档应简洁、精准，能供我在后续Prompt中直接粘贴使用，以确保新生成的页面与当前页面风格完全一致。

请在代码文件中新建一个DesignSystem.md文件存放本次输出的文档

![image](/book/design/0852b7b36b52.jpg)


然后我们便可以让AI参考 Design System.md 文件进行Pricing页面生成，可以看到设计细节是基本一致的。

![image](/book/design/3066e41a8809.jpg)


## 四.告别模糊指令，给模型提供具体修改建议

随着Shadcn/ui等组件库在AI代码生成产品中的广泛使用，VibeCoding的作品往往容易陷入同质化，缺乏独特的品牌感。

要让你的产品从Demo升级为具有独立灵魂的产品，我们需要了解更具体的设计规则，在此基础上根据目标人群与品牌调性，做出更明确的设计决策。

本章我们将介绍一些不容易出错的设计法则，并提供进阶的学习资源。这将帮助你把抽象模糊的指令，转化为AI能够严格执行的色值、字体与间距参数，实现对视觉细节的精准把控。

### 4.1 字体字号选型

**Web字号阶梯**

如果想要保持网站字号大小看起来和谐，首先要遵循 Type Scale（字号阶梯） 规则。

简单来说，就是选定一个基础字号（BaseSize），然后按照一个固定比例（Ratio）向上递增，生成一套有数学美感的字号系统

基础字号(BaseSize)：通常设为16px（浏览器默认大小，适合阅读） 。

**常用比例 (Ratio)：**

• 1.25(MajorThird)：最推荐。层级温和，既有对比又不会过于夸张，适合SaaS、工具类、博客等绝大多数场景。

• 1.333 (Perfect Fourth)：对比更明显，适合需要强调标题的文章页。

1.5或1.618(黄金比例)：极具张力，适合强调视觉冲击力的Marketing营销页或着陆页（Landing Page）。

当你设定好网页基础字号后，可以输入这样一段Prompt让AI帮你计算网站的字号：

![image](/book/design/3478da8bcb6a.jpg)


基础字号为 16px。请使用 Major Third (1.25) 的字号阶梯来构建排版层级，以确保视觉平衡和专业感

**AI会自动帮你算出：**

<table><tr><td>用途</td><td>字号</td></tr><tr><td>正文</td><td>16px</td></tr><tr><td>小标题 H4</td><td>20px</td></tr><tr><td>中标题 H3</td><td>25px</td></tr><tr><td>大标题 H2</td><td>31px</td></tr><tr><td>主标题 H1</td><td>39px</td></tr></table>

另外你还可以使用 Typescale 在预设好的模板上调节字体、字号、字重、颜色等元素，直观看到不同设置项之间的差异，从而给自己的网站选择最合适的字体参数。

![image](/book/design/b18ab918ef72.jpg)


**常用字体推荐**

字体作为网页中出现频次最高的元素，直接影响了用戶的阅读体验和品牌感知。

在VibeCoding过程中，我们很容易给出类似“要现代一点的字体”这种模糊指令，但这往往会导致模型随机发挥。想要精准控制效果，最直接的方法就是指定具体的字体名称。

这里我们整合了Google、Figma等平台的建议，整理了以下这份免费可商用字体清单。

<table><tr><td>风格定位</td><td>适用场景</td><td>常用英文字体</td></tr><tr><td>现代通用</td><td>工具软件、后台管理、文档、覆盖大多数产品使用场景</td><td>SF Pro、Open Sans、Montserrat、Poppins、Lato、Raleway、Manrope、Work Sans、Geist</td></tr><tr><td>科技/极客</td><td>开发者工具、Web3、技术博客、终端风格</td><td>Orbitron、Audiowide、Tektur、Michroma、Nova Square、Wallpoet、Space Grotesk、JetBrains Mono、Fira Code</td></tr><tr><td>优雅人文</td><td>知识库、阅读类产品、营销落地页</td><td>Playfair Display、Merriweather、Lora、EB Garamond、Libre Baskerville、Noto Serif、PT Serif、Crimson Text、Source Serif4、Cormorant Garamond</td></tr><tr><td>图形化字体</td><td>适合作为品牌logo字体</td><td>Rubik Glitch、Rubik Broken Fax、Rubik 80s Fade、Monoton、Headland One</td></tr><tr><td>复古像素</td><td>复古品牌、装饰元素、怀旧设计、Y2K美学</td><td>Pixelify Sans、Press Start 2P、VT323、DotGothic16、Jersey 10、Tiny5、Bytesized</td></tr><tr><td>温暖友好</td><td>儿童产品、教育应用、社区网站、生活方式品牌、零售、女性向产品</td><td>Comfortaa, Nunito, Lato, Karla, Jost, Bree Serif, Smooch Sans, Averia Serif Libre, Lexend, Caveat、Nunito</td></tr><tr><td>常用中文字体</td><td>/</td><td>苹方、思源黑体 (Noto Sans SC)、阿里普惠体、HarmonyOS Sans、MiSans、vivo Sans、OPPO Sans、微软雅黑、冬青黑体</td></tr><tr><td>数字字体</td><td>需要突出的数据</td><td>Open Sans、Montserrat、Lexend、Outfit、Alexandria、Readex_Pro、Reddit_Sans、Sansation、albert sans、HarmonyOS Sans</td></tr></table>

**字体库**

更多字体可前往这些渠道查找：

• Google Fonts 全球语种覆盖，免费商用，提供丰富的筛选项，可以帮助你找到合适字体：https://fonts.google.com/

• Fontshare 免费商用：https://www.fontshare.com/

Font Pair 字体配对灵感：https://www.fontpair.co/

中文字体导航：https://hao.uisdc.com/font/

• Free Chinese Fonts：https://www.freechinesefont.com 

**字体搭配**

观察近几年AI产品的 Landing Page ，出现了英文Serif (衬线体)、Sans-serif (非衬线体)混用的情况。衬线体作为装饰，可以将核心信息从页面内容中跳脱出来，有助于树立别具一格的品牌感受，非衬线体则更多被应用于产品正文中，保证用戶阅读体验。

![image](/book/design/fb9ee5898da5.jpg)


![image](/book/design/578e58c69ae5.jpg)



Luma AI、Perplexity


**一些搭配 Tips**

• 一个页面里最多使用2‒3种字体，是大多数网站设计中比较稳妥的做法，其余层级变化可以通过字号、字重、字距来完成。

• 中文字体文件通常较大，全量加载会增加网页的加载时间，假如你只是想在标题里用个特殊字体突显品牌感，建议对字体进行子集化处理⸺简单说就是只提取并加载你用到的那些字，尽量把字体文件大小控制在200KB以内。

• 如果你的网站中涵盖需要被强调的数字，可以特意选择一种好看的数字字体。


ENTERPRISE


![image](/book/design/545ee2486e4b.jpg)


通过下图对比可见，默认字体的数字通常缺乏性格（PingFangSC）。而特意挑选的数字字体能打破沉闷，让关键数据从页面中跳脱出来，形成更高级的视觉节奏。

Total Invoice 

1830 

Total Invoice 

1830 

Total Invoice 

1830 

Total Invoice 

1830 

Total Invoice 

1830 

Total Invoice 

1830 

Total Invoice 

1830 

Total Invoice 

1830 

Total Invoice 

1830 

• 如果你的网站涉及字体混用，在代码中定义字体时，注意优先定义英文字体，将中文字体放在最后，例如：

**代码块**

```txt
1 theme: {
2 extend:
3 fontFamily:
4 sans: [
5 "Inter", // 1. 英文字体（优先负责数字、英文）
6 "Noto Sans SC", // 2. 中文字体（负责汉字显示）
7 "sans-serif", // 3. 通用字体族（系统默认的保底选项）
8 ], 
9 }, 
10 },
```

这样做是因为通常英文字体不包含汉字，而常用中文字体中包含a‒z英文字母和数字，浏览器渲染字体时会严格按照 font-family 的顺序查找，使用第一个包含该字符的字体。如果我们将中文字体放在第一位，页面里的英文和数字就会优先由中文字体来渲染；反过来，把Inter放在最前面，就能让英文和数字使用 Inter，汉字再回退到 Noto Sans SC。

• 尽量选择上下间距对称的UI友好字体用于软件开发，可以减少很多对齐还原问题，详细参见：

![image](/book/design/3bb29e82b01c.jpg)


**优秀案例**

Floral 网站整体想要传递科技 + 复古艺术风格，其品牌选用了带有像素感的 PPNeueBit（商业字体），主要使用在页面大标题上。

![image](/book/design/d64c654a1dd0.jpg)


![image](/book/design/07c3180d3b0a.jpg)


在正文字体中，像素字体仅用作下划高亮的点缀位置，大量使用了带有机械、终端风格的SupplyMono （免费字体）

This project is an exercise infeeling exposed. Not every story is goingto be interesting， not every story orartwork will be interesting and not everydesign exploration will 1ook great, but aslong as 工 can manage to fuel my drive tocreate something new alive，the outcomebecomes secondary

同时像素点还在加载动画中进行了应用，让品牌感得以延续。

![image](/book/design/1806cd049599.jpg)


**了解更多字体指南**

• Google Fonts Knowledge 如果你希望全面了解字体选型知识，推荐阅读这一系列文章：https://fonts.google.com/knowledge/choosing_type

**Choosing type**

When you have some text,how can you choose a typeface?Many peopleprofessional designers included-go through an app's font menu until we findonewelike.Buttheaimofthis GoogleFontsKnowledgemoduleis to showthattherearemanyconsiderationsthatcanimproveour typechoices Bysetting someusefulconstraints toaid ourtype selection,wecanalso developacritical eye foranalyzing typealong the way. 

![image](/book/design/707793e9668b.jpg)


. Figma官方指南，介绍了39种字体搭配案例：https://www.figma.com/resource-library/font-pairings/

HEADER 

**Bubblegum Sans**

BODY COPY 

**Open Sans**

Loremipsum odor amet,consectetuer adipiscing elit.fusce ut pretium morbi purus proin bibendum.Justo rutrum vel venenatis consectetur,lobortis taciti ad.Pharetra vitae mi quis etiam ipsum.Magnis feugiat integer nam 

HEADER 

**Ubuntu**

BODY COPY 

**Rokkitt**

Lorem ipsum odor amet, consectetuer adipiscing elit. fusce ut pretium morbi purus proin bibendum.Justo rutrum vel venenatis consectetur, lobortis taciti ad. Pharetra vitae mi quis etiam ipsum. Magnis feugiat integer nam, nascetur tristique maximus nascetur dolor. 

HEADER 

**Montserrat**

BODY COPY 

**Karla**

Lorem ipsum odoramet,consectetueradipiscingelit.fusce ut pretium morbi purus proin bibendum.Justo rutrum vel venenatis consectetur.lobortis taciti ad.Pharetra vitae mi guis etiamipsum.Magnis feugiat integer nam,nascetur tristique maximus nascetur dolor. 

### 4.2 颜色搭配

**60-30-10 配色原则**

这是室内设计领域的黄金法则，在网页设计中，它是防止色彩混乱、建立视觉秩序有效的手段。如果你希望网页保持简约干净，可以按照这个原则审查网页设计：

• 60% 背景色（Background）：页面整体基调。通常使用中性色（白色、浅灰、或者深色模式下的深灰），保证耐看和留白感。你也可以选择拥有一点点品牌色倾向的颜色，避免纯白的生硬冷漠感，让页面弥漫着淡淡的品牌氛围（例如 Youware Landing Page）；

• 30% 辅助色（Secondary）：用于卡片背景、次级按钮、文本选中态等，通常是强调色的邻近色，或者深浅不同的变体，负责建立视觉层级；

注意： 它不应是高饱和度的彩色，否则会喧宾夺主；

• 10% 强调色（Primary）：用于行动按钮（CTA 按钮）、链接、高亮图标等，可以直接使用品牌主色或与主色对比明显的颜色，用来吸引用户的注意力；

![image](/book/design/7a2db7d479d5.jpg)


![image](/book/design/1b687fbec25a.jpg)



图片来源：Material Design2


比如前面模仿Materialdesign风格的网站用色有些过多，这里我们尝试使用60-30-10法则让AI自行迭代，输入提示词后可以看到优化效果非常明显：

![image](/book/design/f930bd65f0df.jpg)


请对当前页面应用 60-30-10 配色法则（60% 主色 - 30% 辅助色 - 10% 强调色），对页面进行去噪处理，以消除多种颜色在页面上的过度使用，并优化视觉层级，让重点信息更突出

Before 

![image](/book/design/2534cbb56d2b.jpg)


**如何为网站配色 如何为网站配色**

从品牌色获得色阶

那么如何获得那些带品牌倾向的浅色背景或深浅合适的按钮色呢？ 那么如何获得那些带品牌倾向的浅色背景或深浅合适的按钮色呢？

这里介绍一个好用的工具KigenColorGenerator，你可以在左上角RGB值位置输入品牌色，右侧的 这里介绍一个好用的工具 Kigen Color Generator，你可以在左上角RGB值位置输入品牌色，右侧的Shade Count 表示色阶数量，默认生成从最浅 (50) 到最深 (950) 的 11 个颜色，完美对应 Tailwind Shade Count表示色阶数量，默认生成从最浅(50)到最深(950)的11个颜色，完美对应TailwindCSS的标准色阶系统。 CSS 的标准色阶系统。


After


![image](/book/design/2695c769c716.jpg)


![image](/book/design/b7ab1d743d3b.jpg)


![image](/book/design/41e6bace9add.jpg)


![image](/book/design/3cfeddf9122d.jpg)



Works where you work.


inteorateddirectlyintoyourworkflowExpriencethe satisfactioofomletiwitoufdclisitee 

![image](/book/design/14d8910e2677.jpg)



NoteFlow


![image](/book/design/79c2fa2db925.jpg)


![image](/book/design/f55898d201d0.jpg)



blueribbon


![image](/book/design/1a84d35acc14.jpg)


50-100(最浅)：可用于大面积背景底色、极浅卡片背景，如果希望背景带一点点品牌倾向，而不是纯白纯黑，那么可以使用这个色值；

200-300(较浅)：可用于组件边框、分割线、输入框背景或次要卡片背景；

400-600 (中间)：通常为核心色域。通常用于普通实色按钮、图标、Logo；

600-800(较深)：可用于鼠标悬停(Hover)状态。用戶把鼠标放上去时，按钮变深一点，提供交互反馈，也可以用作暗黑模式下的深色背景；

800-950(最深)：可用于标题与正文文字。使用极深色替代纯黑，能提升页面的质感与协调性，也可以用作暗黑模式下的深色背景。

网站的下方你可以直接复制颜色Token到代码文件中进行使用。

/\*tailwind.config.js v4 generated from Kigen/design \*/   
\*/Add to your CSS file \*/   
:root{ --blue-ribbon-50:236 100%97%; --blue-ribbon-100:237 100%93%; --blue-ribbon-200:236 100%86%; --blue-ribbon-300:235 100%79%; --blue-ribbon-400:235 100%73%; --blue-ribbon-500:233 100%67%; --blue-ribbon-600:230 100%58%; --blue-ribbon-700:225 100%45%; --blue-ribbon-800:226 100%32%; --blue-ribbon-900:228 100%19%; --blue-ribbon-950:232 100%13%;   
}   
/\*tailwind.config.js\*/   
```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-ribbon': {
          50:  'hsl(var(--blue-ribbon-50)  / <alpha-value>)',
          100: 'hsl(var(--blue-ribbon-100) / <alpha-value>)',
          200: 'hsl(var(--blue-ribbon-200) / <alpha-value>)',
          300: 'hsl(var(--blue-ribbon-300) / <alpha-value>)',
          400: 'hsl(var(--blue-ribbon-400) / <alpha-value>)',
```

Copy 

**定义网站核心色值**

不过，Kigen 生成的 11 个色阶，本质上是通过算法帮我们生成一套备用颜色资源库。通常来说，你只需要调用其中的3‒5个色值便足够使用。

一个简单的网页色彩系统大概由以下颜色组成：

**1. 核心颜色（60-30-10 配色原则）**

背景色Background（如 Shade 50-100）、强调色Primary（如 Shade 400-600）、辅助色Secondary（如 Shade 200-300）

**2. 状态与结构**

组件状态色：可以选取一个深色作为按钮的加载、悬浮态（如Shade700）

边框色：选取一个浅色（如Shade200，也可以从品牌色阶外选择一些灰色值）

**3. 重要反馈**

至于出错、警示、成功等状态，你可以自行定义，也可以直接复用通用的语义化颜色（如 red-600 ,amber-400 , green-600 ）

更详细的色彩系统定义推荐阅读下文中的颜色指南。

**检查色彩可访问性**

文字叠加在卡片上，图标叠加在按钮上，这种叠加关系形成了色彩对比度。如果对比度过低，内容就会隐入背景，导致用戶（尤其是视力不佳的人群或在阳光下看手机时）无法识别。为了确保内容清晰可见，我们需要检查以下前景（文字/图标）与背景之间的对比度。

根据Web内容无障碍指南(WCAG)，网页需满足以下对比度标准：

• 正文/小字（及正文背景）：背景对比度≥4.5:1

• 大标题/粗体（18px 以上或 14px 加粗）：背景对比度 ≥ 3 : 1

字号越大或笔画越粗，人眼越容易识别，因此对对比度的要求可以适当降低。

• UI组件/图标（及输入框边框）：背景对比度≥3:1

![image](/book/design/7bbdc56b371e.jpg)


![image](/book/design/6b442b10c08e.jpg)



两种按钮颜色对比度的效果，可以看到，对比度越高，识别度也会更高



图片来源：Material Design3


注：Material 的 0‒100 和 Tailwind 的 50‒950 都是同一颜色不同明度的刻度体现，概念类似

**推荐工具**

• WCAG Color Contrast Checker Chrome 扩展 ，这是一个浏览器插件，可以直接扫描你的网页，一次性检查所有元素的文本和UI组件对比度，基于WCAG2.2，支持色盲模拟，并且免费。

**Thoughts, captured beautifully.**

The note-taking app that organizes your life with fluid shapes and dynamic layouts. 

![image](/book/design/c1ae8115ae4f.jpg)


![image](/book/design/f0cd07cc8c65.jpg)


• WebAIMContrastChecker，一个经典工具，虽然UI有点老，但支持API调用，可以做自动化检查脚本。

**了解更多颜色指南**

• Material Design｜How the system works：https://m3.material.io/styles/color/system/howthe-system-works 

• Material Design｜What are color roles：https://m3.material.io/styles/color/roles 

• 为设计系统创建调色板，这篇文章对颜色的使用进行了更细致的讲解：https://imperavi.com/blog/creating-a-color-palette-for-design-systems-revised-edition/

· TailwindCSSV4默认调色板的OKLCH色值，有些基础色可以直接调用：https://tailwindcolor.com/；另外这里还有其他组件库的默认色值：https://materialui.co/colors

### 4.3排版布局

**栅格系统**

通常在网页设计时，设计师会定义网页的栅格系统来作为排版布局的参考。这套系统的核心目的是让所有内容都对齐在一套隐形轨道上，栅格系统是对齐和秩序的基础，可以帮助网页设计节奏清晰。

![image](/book/design/14fc5176fda2.jpg)



非对称分栏


![image](/book/design/5c1e49ce3c02.jpg)



模块化网格


![image](/book/design/c70addf8fa25.jpg)



均分网格


![image](/book/design/2cbdaf1d867d.jpg)



坐标网格


在栅格系统指导下可以衍生出多种排版方式

而在VibeCoding时，目前的AI能力无法让我们建立详细、严格的栅格系统，如果你发现你的网站布局比较乱，可以尝试这样审查AI生成的内容：

• 页面设定了统一的内容宽度和左右边距，让正文区在页面中有一个稳定的视觉重心，而不是贴边摆放；

![image](/book/design/d15f7b5c6132.jpg)



边距合适



边距较窄


![image](/book/design/97ed0de79fbf.jpg)


![image](/book/design/cf74bb440df1.jpg)


关键信息（标题、正文、主要卡片、页脚）尽量都落在同一套内容宽度和对齐线上；

![image](/book/design/57fcd4af6404.jpg)


OurMenu、VisitUS模块的卡片超出了最小边距，影响了视觉节奏

. 栅格系统是灵活的，部分模块可根据需求单独成块，不一定非要完全统一对齐到同一条栅格线上；

• 同时像Hero区的大图、背景插画等装饰性元素可以适度越出。

![image](/book/design/5c3c813a4ca2.jpg)


**行长与阅读节奏**

为了保证阅读舒适度，我们需要控制每行文字的字数（即行长）。

在英文网站中，正文的理想行长应控制在45~75个字符之间（粗略算大概10个英文单词一行），超过75个字符，会导致用戶眼球移动距离过长，阅读极其疲劳；低于45个字符，又会让句子被频繁打断，阅读感被切碎。

如果是中文网站，中文是高密度的方块字，字与字之间没有明显的空格作为视觉停顿，因此信息密度更大，通常正文建议保持每行35‒45个汉字左右。

当然，这个数字也并非完全绝对。阅读舒适度本质上是字号、行长与行高三者的动态平衡。例如，当你使用了更宽松的行高（如1.8倍以上）时，视觉上完全可以容忍略宽的行长，因此字符数可以搭配不同的字体及行高适时调整。

The window slid up easily-too easily-andMikewaiteda long time,listening,before he made amove.The whole hugepile of the factory wasstill. 

move.The whole huge pile of the factory was still.There were no lights anywhere, except that dim one by the qate through the stockade.Lying quite stillin the darkness,Mike waited.There was no sound, no ringing of alarm bells,no bustle of activity anywhere.The manufacturing plant of the 

The windowslidupeasily-tooeasily-and Mike waitedalong timelisteningbeforehemadeamove.The wholehugepileofthe factorywasstillTherewerenolightsanywhere,excepttatdimonebythegatethroughthestockade.Lyingquitesillinte darknesskeidreodgioflsectivityreeacurint WhitneyJewelryatchompanemaiedsithdeeforeststillileofickitmtyeedindosstarnankly 

第一段篇幅很短，但适合微型文案；第二段太短，不符合标准段落文本的要求；

第三段长度差不多；第四段则太长 By Google Fonts

此外，需要警惕在文本段句上AI的处理并不会特别细致，容易出现在专有名词中间断句，或在行末出现只剩一个词的“孤儿行”现象。一些关键场景建议大家仔细检查，手动调节。

![image](/book/design/04fe7d41bdd7.jpg)


![image](/book/design/4695b2d25daa.jpg)



两个均由Gemini3生成的网页，在Hero文案的处理上，右侧会比左侧更好


**间距节奏**

留白与间距是视觉层级的核心工具⸺彼此靠得更近的元素，会被自然认为是同一组；距离更远的，会被认为是不同组（这就是著名的格式塔亲密度法则），因此并非所有的内容都要等距排列。

正如下面这个案例：左侧是AI生成的Pricing卡片方案。经过调整，标题、价格这样的相关内容紧密分组，权益列表也更紧密，只用了3种间距数值，便构建出更清晰的视觉层级，让用戶一眼就能抓住卡片中的重点。

![image](/book/design/3e4e68d49330.jpg)



调整前：5种间距


![image](/book/design/f1dc48efd686.jpg)



调整后：3种间距


**间距使用4px、8px的倍数**

如果你想要更细节的调节页面间距，那么这条规则可以遵循：

通常设计师们在调整间距时会使用4或8的倍数：4, 8, 12, 16, 24, 32, 48, 64, 80... 着可以避免单数间距在元素缩放时导致的模糊虚边，可以让界面在视觉上统一、易于维护。记住这条规则基本不会出错。

<table><tr><td>间距值</td><td>典型用途</td><td>对应 Tailwind 类名 (参考)</td></tr><tr><td>4px / 8px</td><td>组件内部元素间距 (紧密)</td><td>gap-1 , gap-2</td></tr><tr><td>16px</td><td>卡片内边距、列表项间距</td><td>p-4 , gap-4</td></tr><tr><td>24px / 32px</td><td>区块/组件之间的分隔</td><td>mb-6 , mb-8</td></tr><tr><td>64px - 128px</td><td>大区域/板块之间的留白 (呼吸感)</td><td>py-20 , py-32</td></tr></table>

你也可以输入这段话，尝试规范AI的布局输出：

![image](/book/design/5fc650ef793c.jpg)


统一这个页面的间距系统：所有 margin 和 padding 使用 4 或 8 的倍数；组件内部使用较小间距（8-12px），卡片之间使用中等间距（16-24px），不同内容区块之间使用更大间距（≥64px），让亲疏关系更明显

**了解更多排版指南**

尼尔森集团的优秀视觉设计详解：https://www.nngroup.com/articles/good-visual-design/?utm_campaign=Content/Educational&utm_source=twitter&utm_medium=social

• 一个互动型网站，讲解了4种类型的栅格：https://grids.obys.agency/columns_vandegraaf/

• 网页排版基础原则：https://www.zignuts.com/blog/master-web-typography-tips-for-website-design

• 7种栅格布局：https://align.vn/blog/mastering-grid-layout-design-7-types-of-grids/

• Understanding measure/line length： https://fonts.google.com/knowledge/using_type/understanding_measure_line_length 

. 响应式布局网格，栅格规范详解：https://m2.material.io/design/layout/responsive-layout-grid.html#grid-customization

### 4.4 icon和配图部分

Icon 使用原则

. 保持一致性：同一套Icon风格统一（线条粗细、填充/描边风格）你可以在提示词中让AI使用一套图标库来保证风格统一

![image](/book/design/f9f282af0c04.jpg)


![image](/book/design/f64e31d5c7e4.jpg)


![image](/book/design/ef18b2699d95.jpg)


![image](/book/design/456256551449.jpg)


![image](/book/design/b86baa510589.jpg)


![image](/book/design/1eca48d2e779.jpg)


**Google Material Symbols 中不同属性的图标**

Prompt示意：

![image](/book/design/50bb695146e4.jpg)


请使用 Google Material Symbols (Outlined 描边风格) 图标库，通过 CDN 方式引入。

并为所有图标应用以下CSS变量设置，确保视觉统一

Fill 填充: 0 (空心)

Weight 字重: 400 (标准)

Grade 字阶: 0 (标准)

Optical Size 尺寸: 24px

<!-- 除了 Outlined 风格以外，我们还可以指定 Rounded(圆角风格)、Sharp(锐利风格)，如果你还有更多自定义诉求，可以添加填充方式、字重、字阶、尺寸等描述 -->

• 尺寸基于4px网格：规范图标外框为16px、20px、24px、32px等尺寸

• 与文本视觉对齐：图标与文本混排时，通常需要比文本字号大 2-4px 才能视觉对齐（例如：14px 文字配 16px 图标；16px 文字配 20px 图标）

• 与文字保持适当间距：建议保持4px( gap-1 )或8px( gap-2 )的间距，并确保两者对齐

**图片使用原则**

**视觉审美**

选取高质量图片：拒绝模糊、噪点和拉伸变形，主体要清晰，背景不要太乱，以免干扰文字阅读

和品牌色调匹配：图片的色温应与你的品牌色呼应，例如科技风网站选冷色调图，生活类选暖色调图。

如果你不想使用版权不明的网络图片，【5.4节】提供了设计工程师常用的资源库。

**适配规则**

• 防止图片变形：确保图片使用 object-cover 样式（对应设计软件中的 Fill 填充），以防止图片随意拉伸

使用响应式图片：为重要图片提供多种尺寸，用 srcset 列出这些版本，再用 sizes 告诉浏览器在不同屏幕宽度下图片大概要多宽，让浏览器自动挑选最合适的一张，而不是在手机上也下载桌面端的大图

![image](/book/design/1f4750a5d167.jpg)


```javascript
function ResponsiveImage() {  
return (  
< img> //默认图片（兜底用）  
src="image-800.jpg"  
//提供400/800/1600三个尺寸版本  
srcSet="image-400.jpg 400w, image-800.jpg 800w, image-1600.jpg 1600w"  
//小屏（≤600px）时占满屏宽，否则大约600px宽  
sizes=("max-width:600px) 100vw, 600px")  
alt="示例图片"  
ClassName="w-full h-auto"  
/>  
);  
}
```

**性能优化**

• 控制体积与尺寸：网页图片需具备足够清晰度，但也不是体积越大越好，图片过大导致加载速度缓慢会影响网站排名。因此我们最好控制单张图片尺寸和体积（比如 1500‒2500px、<500KB），否则大图会拖慢加载，影响SEO

• 使用懒加载技术：为非首屏图片添加 loading="lazy" 属性，这被称为懒加载技术，意味着只有当用戶滚动到图片位置时，图片才会被真正下载，能极大节省带宽

• 使用预加载技术：对于首屏最重要的图片或视频封面，应明确标记为最高优先级（使用 `fetchpriority="high"` 或 `preload`），确保它们在页面加载时以最高优先级显示

• 优先使用现代格式：如果你的网站图片较多，在上线阶段尽量使用 WebP、AVIF 等现代图片格式，在相同主观画质下，相比 JPEG/PNG 通常能减少约 25%-30% 的体积。

你也可以在【5.4icon和配图资源】中找到更多优秀资源。

### 4.5 获取具体设计参数的技巧

### 技巧1：用CSS分析工具从网页提取Token

WALLACE 

CSS Analyzer 

CSS Code Quality 

Design Tokens 

CSS Scraper 

Visualize @layer 

Custom properties 

![image](/book/design/513e3c785d1f.jpg)


![image](/book/design/e1584d12b054.jpg)


**CSS DESIGN TOKENS**

Analyze URL 

Analyze File 

Analyze CSS input 

**URL to analyze**

https://www.synthetictheatre.com/story/floral 

ANALYZE URL 

**√Prettify CSS?**

Prettifying makes inspecting the CSS easier, but very slighty changes the numbers. 

**Colors**

TOTAL UNIG 

47 12 (25.5%) 

Colors are sorted bydefault in the order they're discovered in the CSS,but you can sort by color as well 

A wider bar means the color is used more often. 

O Sort by source order O Sort by count O Sort by color 

OSizebyusage OSize evenly 

![image](/book/design/db41c0160aa4.jpg)


**Colors per group**

![image](/book/design/cb682e1d697a.jpg)


![image](/book/design/538572f69aad.jpg)


![image](/book/design/c3b714207007.jpg)


![image](/book/design/e17e2b9a792e.jpg)


**Blue**

![image](/book/design/453949dea820.jpg)


![image](/book/design/b7ce85d167fd.jpg)


**Yellow**

Inspector

Network

Report Data 

AIl CSS 

Design Tokens 

这里推荐一个非常好用的免费工具ProjectWallace，该工具可以输入网址抓取页面初始静态的HTML和CSS代码，一键分析网站的DesignTokens，你可以将分析结果截图或者引用，让AI浏览器帮你分析网页中字体、字号、颜色的使用情况

*注：如果点开网站显示Pagenotfound，记得关闭??试一下

输入我们在【字体字号选型】一节提到的优秀案例Floral，配合Comet（或任意AI浏览器），便可以了解网站的详细信息啦

**Navigate this page**

**Colors**

All Colors 

Color Groups 

Color Usage 

Color Eormats 

**Gradients**

Font Sizes 

Font Families 

@font-face 

Line Heights 

Text Shadows 

Box Shadows 

Rorder Radiuces 

![image](/book/design/c62c8154b6f4.jpg)


请分析该网站中的CSSDesignTokens，并按照以下分类，以Markdown表格的形式输出核心设计参数：

**色彩系统 (Color Palette)：**

提取网页中的主色 (Primary)、背景色 (Background)、文字色 (Text)、强调色 (Accent)。

必须给出具体的 HEX 色值或 RGBA 值 (例如: #FF5733)

说明该颜色主要应用在哪些组件上。

• 字体排印 (Typography)：

Font-family: 具体的字体名称（如 Inter, Roboto, 或者自定义字体名）

Font-size: 标题 (H1-H3) 和正文 (Body) 的字号 (px 或 rem)

Font-weight: 字重数值 (400, 600, 700等)

间距与布局 (Spacing & Layout)：

页面的核心栅格宽度 (Container width)

常用的内边距 (Padding) 和外边距 (Margin) 的数值阶梯 (如 16px, 24px, 48px)。

装饰效果 (Effects)：

圆角 (Border-radius) 的数值

阴影 (Box-shadow) 的具体参数

![image](/book/design/6f64ffe72b01.jpg)



Inspector Network Report DataAl CSs Design Tokens


**Navigate this page**

**Colors**

All Colors 

Color Groups 

Color Usage 

Color Formats 

**Gradients**

Font Sizes 

Font Families 

@font-face 

Line Heights 

Text Shadows 

Box Shadows 

Border Radiuses 

Animation durations 

Animation functions 

Units 

Floral这一页的CSSDesian Tokens可以抽象出一套“黑募影院+像素终端"风格的核心设计参数，下面按你给的四类整理成表格，方便直接拿去当Desian Tokens参


色彩系统(Color Palette)


<table><tr><td>类型</td><td>颜色值</td><td>主要应用位置</td></tr><tr><td>背景主色
Background</td><td>#141314</td><td>页面大部分深色背景、主舞台区域的底色，营造暗场影院氛围。projectwallace</td></tr><tr><td>文字主色
Text</td><td>#fff</td><td>主要正文、导航文字、UI文案等，保证在深色背景上的高对比度可读性。projectwallace</td></tr><tr><td>次级文字/弱化文字</td><td>#9ca3af</td><td>次要信息、说明文字、弱化文字（例如副标题、小标签），在深色背景上略低对比度。projectwallace</td></tr><tr><td>暖黄灰色系1</td><td>#777764</td><td>与末日感/复古胶片气质相关的小面积文字或UI元素，用浅色背景显出的暖意</td></tr></table>

WCsS Design Tokens Analyzer- Project Wallace 

![image](/book/design/14a5e406348d.jpg)


### 技巧2：将网页转换成设计稿，MCP到代码工具还原

html.to.design是一款能将网页一键逆向为Figma设计稿的强大插件。以此为基础，我们可以配合FigmaMCP等工具，从还原出的图层中精准提取设计系统（DesignSystem），将配色、排版等隐性信息转化为AI可理解的显性规范。

**使用贴士**

• 额度： 免费版每 30 天提供 10 次导入机会。

• 避坑：插件对静态页面的还原度极高，但面对包含大量复杂动效或WebGL的网页，转换效果可能会大打折扣。

**具体步骤**

### Step1：将网页转换为设计稿

在浏览器中安装并打开html.to.design插件，设定好需要的设备尺寸（如Desktop1440px）和主题模式，点击 Capture Current Page 下载文件（.h2d）

![image](/book/design/1926432b4096.jpg)


回到Figma，运行同名插件。你可以直接拖入刚才下载的文件，或者直接在插件中输入URL进行抓取。

下图展示了生成后的效果，可以看到除了布局还原，它还自动提取了字体、颜色等样式信息，准确率蛮高。

![image](/book/design/5966160a6433.jpg)


### Step 2：连接MCP

接下来，我们需要通过FigmaMCP搭建设计稿与IDE之间的桥梁，这里我使用了Cursor。

• 如果你是Figma付费账戶，并使用客戶端，可以直接开启 Dev Mode，在插件面板中获取与 Cursor的连接凭证，体验最丝滑。

• 免费用戶也可以使用远程连接方法，具体步骤可见FigmaMCP的官方文档，每月可免费调用6次。

![image](/book/design/f5e5ade0fcc0.jpg)


如果原网页结构过于复杂，MCP 返回的 JSON 数据可能会撑爆 AI 的上下文窗口 (Context Window) 导致报错，我们可以适当截取小范围的设计稿逐次读取。

连接成功后，我们将在Cursor的MCP服务面板中看到绿色的正常运行提示。

![image](/book/design/375908397ce4.jpg)


### Step3：生成规范与代码

现在，AI便拥有了读取Figma中设计稿细节的能力。此时，我们可以根据开发需求，选择两种不同的指令模式：

如果你的目标是建立一套可复用的视觉规范（如颜色变量、字阶、组件样式），建议先让AI进行逆向提取。你可以尝试以下提示词。

这里要另外提醒的是Cursor只能在Agent模式下才能调用MCP。

![image](/book/design/9e9dfe198dfb.jpg)


我有一个通过 html.to.design 从网页导入 Figma 的设计文件。

请使用FigmaMCP工具读取这个文件（链接在下面），并基于其中的内容，整理出一套设计系统说明。

目标：

1. 抽取并归一化设计Token（颜色、排版、间距、圆角、阴影等）。

2. 识别可复用组件（按钮、输入框、卡片、导航、Section等）及其变体，说明使用场景。

3. 总结页面布局模式（栅格、容器宽度、段落间距、模块编排） 

4. 给出与React+Tailwind（或我指定的技术栈）对应的实现建议。

**输出：**

• 在当前项目中新建一个 design-system.md 文件，用 Markdown 写出完整说明，结构至少包括：

◦ 设计基础（颜色、排版、间距、圆角、阴影、断点）；

组件（名称、用途、可用的变体及状态、使用建议）；

◦ 布局模式和示例；

◦ 简单的代码映射示例。

下面是 Figma 文件的链接，请用 Figma MCP 读取：

<!-- 附上 Figma 链接-->

得到设计系统文件后，我们便可以将其作为设计规范文档指导项目中页面的生成。

![image](/book/design/3e92eb6e6ab2.jpg)



Cursor 连接 Figma MCP 后整理好的设计系统


如果你想直接根据设计稿进行代码还原，可以跳过提取步骤，可以直接输入生成代码的提示词。

我有一个Figma设计稿，想请你调用FigmaMCP生成代码

请帮我：

从 Figma 文件中提取出所有可复用的组件（Button、Header、Card 等）；

为这些组件生成对应的 React + Tailwind 代码；

用这些组件组合生成完整的 Landing Page 代码。

<!-- 附上 Figma 链接-->

**推荐阅读**

Cursor官方MCP指南：https://cursorideguide.com/use-cases/figma-to-cursor-with-mcp

## 五.资源推荐

https://agibarbar.feishu.cn/wiki/KkOdwwn39iQOGgkAy6DcqmWLnhh#shar e-Qkd4d7jPFotxsoxYuL2cArXRnWf 

