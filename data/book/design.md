![image](/book/design/67c1bb898fba.jpg)



本章作者： Bay


设计师

“你的指令越模糊，AI的输出就越平庸。 

你对于AI编程的各种技巧都已得心应手，但你发现，当你输入“设计一个现代化的网页”，AI还是只能基于概率给你一个“平均值”一毫无个性的蓝紫色背景、随意的间距、以及缺乏层级的字体。究其原因，是AI不懂审美，它只是在拼凑素材。如果不加约束，它生成的页面就像一盘散沙：每个组件单看凑合，拼在一起就是典型的“模板网页”味道，廉价感满满。


# ⼀.⽣成式⽹⻚效果的演进

这是Gemini3出现之前，在DesignArena模型竞技场中，通⽤LLM根据简单提⽰词⽣成的⼏组⽹⻚⽰例，导航、标题、CTA等元素按部就班地排列着，但其中暗藏了较多设计问题。

![image](/book/design/ec8140603195.jpg)


![image](/book/design/992f2ace32b5.jpg)


![image](/book/design/e7b69844cf62.jpg)


![image](/book/design/6672b0dda237.jpg)


![image](/book/design/07075d69b3b3.jpg)


![image](/book/design/71a5c35d2272.jpg)


这些短板通常体现在以下三个⽅⾯：

# 1.布局与节奏失衡

• 栅格/对⻬规则不明确，⻚⾯边距随意；

• 组件间间距不统⼀，层级关系模糊，影响视觉节奏；

• ⽂案断句与⾏⻓处理随意，影响可读性与视觉节奏；

# 2.缺乏统⼀的视觉语⾔

• 字体使⽤随意，⽆清晰的字号体系，导致信息对⽐度不够或者过强；

• ⾊彩缺乏主次，违背60-30-10配⾊原则（主⾊/辅助⾊/强调⾊⽐例）；

• 元素样式（阴影/边框/圆⻆）滥⽤或不⼀致，缺乏统⼀规范；

# 3.素材质量与表现⼒不⾜

• 模型⽣成⽹⻚时多依赖通⽤SVG图标与占位图，缺乏⾼质感图⽚、插画、精细图形等视觉资产，使⻚⾯缺乏表现⼒。

Gemini3的出现在某种程度上改变了这⼀切。只提供简单的功能提⽰，甚⾄只⽤⼀句话描述就能产出设计感强、交互完整的作品，Gemini⽣产的⽹⻚效果在排版节奏、⾊彩关系、细节与质感等维度都能达到70分的效果。

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


但强如Gemini3也⽆法保证每⼀次的产出都精准命中你的需求。毕竟，AI本质上是在进⾏概率预测，它并不真正理解需求背后真正得设计意图。

当AI⽣成的初稿摆在⾯前，你是否在深⼊细节时感到过⽆⼒？从⽣成Demo到真正构建产品，我们该如何更轻松地驾驭AI，让它⽣成更符合我们诉求的内容？

为了降低后续不确定性，接下来的章节我们将重点讲解前端⼯具的选⽤、设计⻛格及组件库的参考以及建⽴设计规范的Prompt技巧，帮你建⽴⼀套稳定可控的开发⼯作流。

# ⼆. 快速产出具备审美的⽹⻚代码

# 2.1 选择趁⼿的前端开发⼯具

这⾥我们聊聊⼀句话就能拉起⼀个⽹站、甚⾄连后端和部署都帮你接好的「懒⼈级」⼯具。它们多数拥有打磨已久的代码编辑器、成熟的预览环境、⼀键分享部署的能⼒，让你⽆需折腾本地环境，就能快速验证⼀个⽹⻚想法。这类产品⼤多集成了Shadcn/ui、TailwindCSS等主流设计系统，⽣成的代码不仅现代、美观，且符合⼯程标准。

其中⼀些产品还可以作为你IDEA的起点：在这⾥⽣成设计稿或可交互原型，再将代码导出到Cursor、Antigravity 或 Claude Code 中继续精细打磨功能。

⽆论是新⼿⼊⻔，还是⾼⼿速成，这些产品都可以作为最⾼效的选择。

# 产品介绍

![image](/book/design/2e73e8b983ec.jpg)


![image](/book/design/975b9a44ae53.jpg)


![image](/book/design/85f86d9b8bc8.jpg)


![image](/book/design/95004c441da3.jpg)


这些产品整体可分为Dev-First、UI-First两类，典型的代表有：

Dev-First：Orchids、 V0、Firebase Studio、Figma Make、Lovable等

UI-First：Google Stitch、Magicpath、Variant等

前者通过Prompt直接⽣成前端代码，依托⼤量现代Web技术栈的训练数据，使输出更规范、结构更清晰。其设计⼀致性主要来⾃：

• Prompt 中的 Design Token、Tailwind 类名等明确约束

• 由框架与组件库本⾝提供的视觉规范

整体偏⼯程化，产品对后端、⽀付的⽀持更好。

后者以界⾯⽣成为核⼼，AI结合设计系统的⾊板、字体、圆⻆、间距等规范⽣成⻚⾯。其⼀致性优化主要通过：

• 内置设计系统参数，确保⽣成的UI⻛格、排版、⾊彩等可全局统⼀、快速调整

• 可视化编辑或画布操作，允许⽤⼾实时微调界⾯细节，提升审美和实⽤性

整体以⾼保真设计稿的⽣成为⽬标，⽀持多种代码格式（如HTML、React）的导出与后续开发协作

# 效果对⽐

我使⽤两组Prompt测试了各产品的整体表现，其实单从设计上来说，在各个产品逐步接⼊Gemini3后，同⼀套提⽰词输出的效果已经逐步趋近。

![image](/book/design/ab21d029f509.jpg)


⾮常推荐 ：Orchids（⼀款被严重低估的产品）、Google AI Studio（产品⼒⼀般，但胜在免费&模型效果好）

具备⼀定发展潜⼒：V0 、Google Stitch、Magicpath（Google Stitch可平替）、FirebaseStudio

还⾏：Figma Make、Lovable、Youware

因可⽤性问题放弃测试：Same、Base 44、Bolt

其中Orchids在UI-Bench测试中排名第⼀，也是我实测视觉效果不错的产品，其在颜⾊、字体、排版等⽅⾯使⽤⽐较克制，效果也⽐较稳定。可以看出产品底层针对视觉问题做过不少优化。在近期接⼊Gemini 3模型后，Orchids变得更厉害了，近期也更新了客⼾端产品提供了更完善的开发体验。

V0 作为 Vercel 官⽅推出的 AI 前端平台， 输出标准的 Next.js $^ +$ Tailwind $^ +$ shadcn/ui ⾼质量代码，在部署、后端、⽀付等场景上也⽐较成熟，并提供⼀定免费额度，对初学者⾮常友好。

Google AI Studio、Google Stitch、Firebase Studio 背靠Google多模态⼤模型能⼒，发展潜⼒较⼤。其中Stitch更偏设计稿⽣成、可交互原型⽣成，在代码上和GoogleAIStudio打通，设计稿和Figma打通；FirebaseStudio在技术栈⽀持上更全⾯：前端、后端、数据库、GeminiAPI都能⼀起⽣成。多数⽣成⽹⻚也具备较完整的交互能⼒，产品⽬前仍是免费的。

FigmaMake的优势是能与Figma画布全链路打通，不过⽣成⻚⾯偏静态，交互能⼒较弱，更适合设计师在现有设计稿基础上延伸使⽤。

Same、Base44、Bolt在体验中频繁出现bug，同时对Gemini3上线的反应较慢，整体可⽤性不⾜，因此从测试列表中移除。

在第四章中，我们会详细分析这些产品之间的细节差异，感兴趣的同学可以前往查看。

*测试时间：25.12

*???? $=$ 效果惊艳；??=效果不错；⽆星 $=$ 效果⼀般

![image](/book/design/941092fe7660.jpg)


![image](/book/design/dbc8cd6e6890.jpg)


![image](/book/design/40fa139ca3a4.jpg)


![image](/book/design/5faf864665bf.jpg)


![image](/book/design/a2ecccd61797.jpg)


![image](/book/design/610bc37bde85.jpg)


![image](/book/design/990e5d1e126f.jpg)


![image](/book/design/bda1a3a82669.jpg)


⽣成效果对⽐：个⼈博客

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



⽣成效果对⽐：咖啡馆点单系统


# 2.2使⽤图⽚/链接/⻛格关键词模仿流⾏⻛格

如果你对⾃⼰的产品有明确的⻛格倾向，那么可以通过同时提供参考图⽚、⽰例⽹站链接和⻛格关键词的⽅式，指导模型输出。虽然这三类输⼊看似简单，但在模型理解上各有不同作⽤：

参考图⽚（ReferenceImage）：帮助模型快速锁定整体的⾊彩氛围与版式构图；

• ⽰例链接（ExampleLink）：引导模型深⼊学习真实⽹⻚的代码结构、元素密度及交互细节，确保⽣成的⻚⾯符合成熟的⽹⻚标准；

• ⻛格关键词（StyleKeywords）：能起到差异化修正的作⽤⸺通过提⽰词指定特定的字体或品牌⾊，你可以强制模型在模仿参考⽹⻚结构的同时，改变其视觉，避免千篇⼀律的机械模仿，⽣成具有独特辨识度的设计。

组合使⽤这三种输⼊，能有效收敛模型在审美上的随机发挥，让最终产出⽆限接近你的设计预期。下⾯是⼏组案例对⽐：

![image](/book/design/e5bbf1e4f787.jpg)


![image](/book/design/7cea06e5a5b3.jpg)


![image](/book/design/3f48340b5151.jpg)


![image](/book/design/5a4696f61746.jpg)



Material Design


![image](/book/design/eb8dd9e05662.jpg)


![image](/book/design/2e92249fe945.jpg)


![image](/book/design/f4bddb5fe619.jpg)


![image](/book/design/ba16eef1d2a7.jpg)



结构线⻛格


这⾥是主流⽹站⻛格的介绍，⼤家可以在⽹站制作时进⾏灵感参考。

另外【5.2章节】中，我们还会推荐⼏个⾮常优质的⽹⻚Showcase平台，感兴趣的同学可以查看获取更多灵感。

# 2.3参考优质组件库

优质组件库通常包含经过⼤量产品验证的布局、动效与交互模式。把这些组件引⼊⽣成⻚⾯，可以让⽹⻚瞬间具备更专业、稳定的质感。

下⾯我们来⽰范：在已经由Gemini3⽣成基础⻚⾯的情况下，如何嵌⼊21st.dev的组件。你也可以在【5.3代码组件库】中找到更多优秀组件资源。

在使⽤组件时，关键是让它们的结构与⻚⾯现有样式尽可能⾃然融合。如果你只想借⽤动效逻辑，⽽组件本⾝的视觉⻛格与你的⽹站差异较⼤，也没关系⸺可以直接把原组件的代码复制给AI，请它协助拆解与改写，让动效适配你的⻚⾯结构。

以我们在2.2节展⽰的结构线⻛格⽹站为例，我想在Hero区域引⼊⼀个「⿏标悬浮显现字⺟」的交互组件，如下图所⽰：

![image](/book/design/42a961b27d0a.jpg)


点开21st中的组件详情⻚，左侧「Howtouse」模块中，，你可以选择「Copyprompt」或者「Copy code」的⽅式进⾏组件使⽤，这⾥我选择了「Copy prompt」 可以选择不同代码⼯具。

![image](/book/design/b5fa9450e20c.jpg)


值得注意的是，原始Prompt通常包含组件⾃带的样式定义。为了让它完美融⼊我的设计系统，我在投喂给AI之前添加了额外指令，要求代码⼯具剥离原组件的视觉样式，仅保留核⼼交互逻辑：

我喜欢 Evervault Card 这个组件⾥「⿏标悬浮时、跟随⿏标出现的渐变光圈 $^ +$ 随机字⺟背景」的效果：https://21st.dev/community/components/aceternity/evervault-card/default

但我不想要它的卡⽚布局、不需要中间的圆形和⽂字，也不要边框和四⻆图标。

请你分析它的代码并且将其加到Hero区域的背景模块内，也就是图⽚中红框区域内的部分

这⾥是原始prompt，供参考：

<!--在这⾥粘贴从组件库中复制的prompt或者代码内容-->

将这段Prompt输⼊代码⼯具后，AI迅速修改了代码，很快就实现了初步效果。

![image](/book/design/d084195f4b8c.jpg)


# 三.提⽰词技巧

# 3.1优化设计需求，让模型掌握视觉重点

当我们做的是实际项⽬，⻚⾯中需要呈现的内容往往是最先确定好的，此时我们可以将需求描述发给Gemini3Pro，借助模型强⼤的联想能⼒，帮助我们清晰撰写⼀篇包含功能、设计要求的Prd，模型可以帮我们主动标记⻚⾯重点，甚⾄主动规划模块中的布局⽅式，⽽这样的提⽰词可以帮助模型⽣成⽹⻚时清晰理解不同⽂本、内容结构关系、了解⻚⾯的视觉重⼼。

![image](/book/design/1f9f87a105ac.jpg)


两个版本的提⽰词及⽣成效果对⽐，可以看到，右侧对⻛格加⼊了更明确的⻚⾯元素与⻛格指令，在⻚⾯的结构线背景、配图细节等⽅⾯，效果明显更好

![image](/book/design/5c9b4f89ee1e.jpg)


# # Role (⻆⾊)

你是⼀名推崇 瑞⼠设计 (Swiss Style)和⼯程美学的UI设计师。

请为⼀款名为 "Syntax AI" 的 AI 代码编辑器设计官⽹⾸⻚。

请按照我给你的⽹站和附件图⽚，参考结构线⻛格的颜⾊、⻛格、布局和细节：https://dify.ai/

包含以下8个部分的⻚⾯：

Section 1: Hero (⾸屏)

内容:H1 "Write Code. Not

Boilerplate.", 按钮 "Install CLI"。

视觉:展⽰代码编辑器界⾯。

Section 2: 展⽰5-6 个公司 Logo 增强信任度

Section 3: Features 模块：

1. Context Awareness (Understand repo). 

2. Instant Diff (Fast review). 

3. **Terminal Integration**. 

4. Security First (Local privacy). 

![image](/book/design/bae15a9558ea.jpg)


# # Role (⻆⾊)

你是⼀名推崇 瑞⼠设计 (Swiss Style)和⼯程美学的UI设计师。

请为⼀款名为 "Syntax AI" 的 AI 代码编辑器设计官⽹⾸⻚。

请按照我给你的⽹站和附件图⽚，参考结构线⻛格的颜⾊、⻛格、布局和细节：https://dify.ai/

# Design Specification 

## 1. 视觉语⾔: "Structural Grid" (结构化⽹格)

请完全依靠 **线条 (Lines)**、**间距(Spacing)** 和 排版 (Typography) 来构建⻚⾯。

* Typography (排版):

* 等宽优先 (Mono-First): 导航、⼩标题、标签、数据、按钮⽂字**必须使⽤`font-mono **c

正⽂:使⽤⽆衬线字体(`font-sans`)。

* Shape (形状):

Section 4: Performance (性能)展⽰⼀个对⽐图表，说明 Syntax AI 的速度⽐VSCode和其他AI编辑器更快(Latency comparison)。

Section 5: Languages展⽰⽀持的语⾔列表: Python, Rust,Go, TypeScript, JavaScript, ${ \mathsf { C } } { + } { + }$ , Java.

Section 6: Testimonials (评价)展⽰3条来⾃开发者的⽤⼾评价。

Section 7: Pricing (定价)展⽰3个价格档位：

1. Hacker: Free. 

2. Pro: $\$ 20/\mathsf { m o }$ 

3. Team: $50/user/mo. 

Section 8: Footer (⻚脚)包含 Product, Company, Resources 的链接列表。

Sharp:所有的容器和按钮使⽤直⻆(`rounded-none`) 或微圆⻆ (2px)。严禁使⽤⼤圆⻆和阴影。

## 2. Layout Strategy (布局策略)GridSystem:⻚⾯应看起来像⼀张平铺的精密图纸。

* Vertical Rhythm: 区块之间通过`border-b` 分割。

# Website Content & Structure (内容结构-⽂案需为英⽂)

请设计包含以下8个部分的完整⻓⻚⾯：

## Section 1: Hero (IDE 仿真)

*布局:顶部导航 $^ +$ 主视觉。

* Navbar: Logo "Syntax", Links (Features, Pricing, Docs), Button "Install CLI" (Outline style). 

* Content: * Badge: `[ v2.0 Stable ]` (Green/Mono). 

H1: "Write Code. Not Boilerplate."* Visual: ⼀个**线框⻛格的 IDE 窗⼝*大

## Section 2: Social Proof (信任背书 -Logo Wall)

* 布局: ⼀个横向的 Logo 栏，上下有`border-y`。

* 内容: "Trusted by engineeringteams at:"

* Logos: 展⽰ 5-6 个灰⾊的科技公司Logo (e.g., Vercel, Stripe)，⽤垂直线条 (`border-r`) 将它们隔开。

## Section 3: Value Prop Bento (核⼼价值 - 便当盒⽹格)

* 布局: ⼀个巨⼤的 **Bento Grid (2⾏3列)**，每个格⼦都有边框。

* Card 1 (⼤): "Context Awareness" -显⽰⼀个⽂件树结构 (File Tree)。

* Card 2: "Instant Diff" - 显⽰代码差异对⽐。

* Card 3: "Terminal Integration" - 模拟命令⾏界⾯。

* Card 4 (宽): "Security First" - ⽂案"Your code never leaves your device."

## Section 4: Performance (图表可视化)

*布局:左⽂右图。

* 左侧: H2 "Built for Speed." $^ +$ 描述。

* 右侧: **条形图 (Bar Chart)**。使⽤简单⾊块来构建对⽐条形图，展⽰Syntax AI 的低延迟优势。

## Section 5: Language Support (⽹格列表)

*布局:规则⽹格(4列x2⾏)。

* 标题: "Fluent in every language."

* 内容: 展⽰编程语⾔名称 (Python,Rust, Go, etc.)。

*样式:每个语⾔名称被包裹在⼀个带边框的⽅块中

## Section 6: Testimonials (⽤⼾评价)* 布局: 3 列布局。

* 样式: 像 GitHub Issues ⼀样的评论卡⽚。

*内容:3条来⾃开发者的评价，包含头像、名字、和⼀段好评。

## Section 7: Pricing (定价表格)

*布局:严格的3列表格结构。

* 内容:

Plan 1: Hacker (Free) - 包含基础功能列表。

* Plan 2: Pro (Highlight) - 包含⾼级功能。通过加粗边框或强调⾊ 来强调此列

* Plan 3: Team - 包含企业功能。

## Section 8: Footer (⻚脚)

* 布局: 简单的 4 列链接列表 (Product,Company, Resources, Social).

*底部:版权信息。

那么如何获得右侧的提⽰词呢？我们可以将初版需求和以下Prompt⼀起发送给Gemini3Pro，让Gemini帮忙优化

![image](/book/design/b795fc102b24.jpg)


# # Role

你是⼀名拥有丰富前端⼯程经验的资深设计⼯程师（DesignEngineer）。你擅⻓拆解优秀⽹⻚的设计系统，并将其转化为可落地的前端代码提⽰词。

# Task 

请根据我提供的【⽹⻚功能规划】与【视觉参考⻛格】，编写⼀段详细、结构化的**AICoding Prompt**，⽤于发送给 Cursor/Gemini3 等模型及代码⼯具。

#1.视觉与交互⻛格

请参考 Dify 官⽹ (https://dify.ai/) 的设计语⾔：<!-- 推荐⼤家附上截图

-**核⼼⻛格**：提取其“结构线（StructureLine）”⻛格，强调边框、⽹格布局与极简主义。

-**⾊彩规范**：使⽤终端绿（TerminalGreen）作为强调⾊，背景保持⼲净清爽。<!--⼤家可以任意替换，如果没有倾向性，可改成：请使⽤灰度或中性单⾊调⾊板来建⽴层次结构，简单有效-->

-**布局逻辑**：请在Prompt中明确各模块的布局⽅式（如BentoGrid或左右分栏），并适当突出视觉重点。

-**装饰元素**：请在Prompt中详细描述需要⽣成的icon⻛格及具体的装饰性配图。

-**字体排版**：强调使⽤简约现代的⽆衬线字体，确保排版节奏清晰。 ${ < } ! \mathrm { ~ -- ~ }$ ⼤家可以任意替换，如果没有明确可以不具体指定，让Gemini3⾃⾏发挥即可-->

# 2. 技术栈 ${ < } ! \mathrm { -- }$ 可根据实际情况修改-->

- Framework: React (Next.js App Router) 

- Styling: Tailwind CSS 

- Icons: Lucide React 

#3.⽹⻚功能规划

以下是我对⽹⻚内容的初步构思：

<!--在此处贴⼊你的⽹站初始需求，例如：我要做⼀个AI导航站，包含Hero区域、⼯具列表、提交⼊⼝... -->

#输出规范

1. 请输出⼀段完整的、可直接复制的 Prompt。

2.语⾔要求：Prompt的指令部分请使⽤中⽂描述，但要求⽣成的⽹⻚UI⽂案默认为英⽂（⾯向海外市场）。<!--可根据实际情况删除此要求-->

3. 格式要求：请使⽤ Markdown 代码块输出。

4.内容深度：⽣成的Prompt中必须包含对“设计细节”的详细描述（如圆⻆⼤⼩、阴影质感、交互动效），⽽不仅仅是罗列功能。

不过需要强调的是，在模型能⼒极⼤增强的今天，Prompt的作⽤只是锦上添花。写的越多 $\neq$ 效果越好。过于冗⻓、琐碎的指令反⽽会增加模型的认知负担，降低核⼼指令的权重，导致模型顾此失彼。因此精准远⽐冗⻓更重要。保持克制，从简单的指令开始，只增加必要约束。

# 3.2⽤.md规范管理多⻚⾯⻛格⼀致性

# 形成规范的重要性

假设此时你已经从上述流程得到了⼀个不错的⽹⻚效果，但你想开发⼀套拥有多个⻚⾯的⼤型项⽬，那么设计规范的统⼀管理就相对重要了⸺ 如果只是简单让AI复⽤其他⻚⾯的设计样式，AI产出的结果在不同⻚⾯的⽤⾊、字号、间距有可能会出现差异，导致整体观感不统⼀。

我们需要将隐性的视觉显性化为设计需求⽂档。你可以直接向AI提要求，得到包含所有细节特征的.md⽂档，同时，使⽤Markdown有助于模型区分指令、上下⽂和任务。

![image](/book/design/da59ff66d464.jpg)


# Typography

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

# Color

# Colors /light mode

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


# 传统⼤型项⽬需要由设计师整理DesignToken

这种做法是有迹可循的，例如FigmaMake在⽣成Webapp时，会优先读取 guidelines/ ⽂件夹⾥的内容，从 Guidelines.md 开始，把其中的⽂字当作额外上下⽂和约束。

、components 

guidelines 

<> Guidelines.md 

、styles 

<>App.tsx 

<>Attributions.md 

# Guidelines.md

**Add your own guidelines here** 

4System Guidelines 

6Use this file to provide the AI with rules and guidelines you want it to follow. 

7This template outlinesa few examples of things you can add.Youcanadd yourown sections and format it 

9TIP:More context isn't always better.It can confuse the LLM.Try and add the most important rules you n 

# General guidelines 

Any general rules you want the AI to follow. Forexample: 

* Only use absolute positioning when necessary.Opt for responsive and well structured layouts that use f *Refactor code as you go to keep code clean 

* Keep file sizes small and put helper functions and components in their own files. 

# Design system guidelines 

Rules for how the AI should make generations look like your company's design system 

Additionally，if you select a design system to use in the prompt box，you can reference your design system's components，tokens,variables and components. For example: 

$^ { \star }$ Date formats should always be in the format “Jun 10" 

*The bottom toolbar should only ever have a maximum of 4 items 

*Never use the floating action button with the bottom toolbar 

* Chips should always come in sets of 3 or more 

* Don't use a dropdown if there are 2 or fewer options 

You can also create sub sections and add more specific details For example: 

## Button 

![image](/book/design/997dc581866c.jpg)



Figma Make 的官⽅规范模板


# 让AI总结设计规范

那么，我们需要让AI帮忙建⽴的设计规范应该包含哪些维度呢？

其实很简单，只需要提取出核⼼的设计变量：

• ⾊彩系统(Colors)：主⾊、辅⾊、背景⾊、边框⾊（最好对应Tailwind类名）；

排版系统 (Typography)：标题、正⽂的字号与⾏⾼；

组件质感 (Components)：圆⻆⼤⼩ (Radius)、阴影 (Shadow)、边框厚度；

• 布局间距 (Spacing)：常⽤的内边距 (Padding) 和 间隙 (Gap)。

下⾯我们给出⼀个Prompt模板，你可以拿去输⼊给Coding⼯具，让其将⽹站详细的设计规范总结成设计需求⽂档，并⽅便复⽤在其他⻚⾯中。

你是⼀名资深的设计系统⼯程师（Design System Engineer） c

# Task

请分析当前⽹⻚的代码实现（包括 Tailwind 配置、CSS 变量、组件样式），提取出⼀份标准化的 Design System.md ⽂档。

# Requirements

这份⽂档将⽤于指导后续新⻚⾯的开发，请务必包含以下核⼼模块，并使⽤Markdown代码块格式输出：

# 1. Color Palette (⾊彩系统)

◦ 列出 Primary, Secondary, Background, Muted/Accent 等关键颜⾊的 Hex 值。

◦ 如果使⽤了 Tailwind，请标明对应的 class (e.g., bg-slate-900 )。

# 2. Typography (排版系统)

◦ 定义 H1-H6 及 Body 的字号 (text-xl, text-sm) 和字重 (font-bold, font-medium)。

# 3. UI Characteristics (组件特征)

◦ Border Radius: 按钮和卡⽚的圆⻆规范 (e.g., rounded-xl )。

◦ Shadows & Effects: 阴影深度、⽑玻璃效果等 (e.g., backdrop-blur-md )。

◦ Borders:边框的颜⾊与粗细。

# 4. Layout & Spacing (布局节奏)

◦ 常⽤的内边距 (p-4, p-6) 和组件间距 (gap-4)。

# Goal

输出的⽂档应简洁、精准，能供我在后续Prompt中直接粘贴使⽤，以确保新⽣成的⻚⾯与当前⻚⾯⻛格完全⼀致。

请在代码⽂件中新建⼀个DesignSystem.md⽂件存放本次输出的⽂档

![image](/book/design/0852b7b36b52.jpg)


然后我们便可以让AI参考 Design System.md ⽂件进⾏Pricing⻚⾯⽣成，可以看到设计细节是基本⼀致的。

![image](/book/design/3066e41a8809.jpg)


# 四.告别模糊指令，给模型提供具体修改建议

随着Shadcn/ui等组件库在AI代码⽣成产品中的⼴泛使⽤，VibeCoding的作品往往容易陷⼊同质化，缺乏独特的品牌感。

要让你的产品从Demo升级为具有独⽴灵魂的产品，我们需要了解更具体的设计规则，在此基础上根据⽬标⼈群与品牌调性，做出更明确的设计决策。

本章我们将介绍⼀些不容易出错的设计法则，并提供进阶的学习资源。这将帮助你把抽象模糊的指令，转化为AI能够严格执⾏的⾊值、字体与间距参数，实现对视觉细节的精准把控。

# 4.1 字体字号选型

# Web字号阶梯

如果想要保持⽹站字号⼤⼩看起来和谐，⾸先要遵循 Type Scale（字号阶梯） 规则。

简单来说，就是选定⼀个基础字号（BaseSize），然后按照⼀个固定⽐例（Ratio）向上递增，⽣成⼀套有数学美感的字号系统

基础字号(BaseSize)：通常设为16px（浏览器默认⼤⼩，适合阅读） 。

# 常⽤⽐例 (Ratio)：

• 1.25(MajorThird)：最推荐。层级温和，既有对⽐⼜不会过于夸张，适合SaaS、⼯具类、博客等绝⼤多数场景。

• 1.333 (Perfect Fourth)：对⽐更明显，适合需要强调标题的⽂章⻚。

1.5或1.618(⻩⾦⽐例)：极具张⼒，适合强调视觉冲击⼒的Marketing营销⻚或着陆⻚（Landing Page）。

当你设定好⽹⻚基础字号后，可以输⼊这样⼀段Prompt让AI帮你计算⽹站的字号：

![image](/book/design/3478da8bcb6a.jpg)


基础字号为 $1 6 { \mathsf { p } } \times { \mathsf { \rho } } _ { \mathsf { \circ } }$ 。请使⽤MajorThird(1.25) 的字号阶梯来构建排版层级，以确保视觉平衡和专业感

# AI会⾃动帮你算出：

<table><tr><td>用途</td><td>字号</td></tr><tr><td>正文</td><td>16px</td></tr><tr><td>小标题 H4</td><td>20px</td></tr><tr><td>中标题 H3</td><td>25px</td></tr><tr><td>大标题 H2</td><td>31px</td></tr><tr><td>主标题 H1</td><td>39px</td></tr></table>

另外你还可以使⽤ Typescale 在预设好的模板上调节字体、字号、字重、颜⾊等元素，直观看到不同设置项之间的差异，从⽽给⾃⼰的⽹站选择最合适的字体参数。

![image](/book/design/b18ab918ef72.jpg)


# 常⽤字体推荐

字体作为⽹⻚中出现频次最⾼的元素，直接影响了⽤⼾的阅读体验和品牌感知。

在VibeCoding过程中，我们很容易给出类似“要现代⼀点的字体”这种模糊指令，但这往往会导致模型随机发挥。想要精准控制效果，最直接的⽅法就是指定具体的字体名称。

这⾥我们整合了Google、Figma等平台的建议，整理了以下这份免费可商⽤字体清单。

<table><tr><td>风格定位</td><td>适用场景</td><td>常用英文字体</td></tr><tr><td>现代通用</td><td>工具软件、后台管理、文档、覆盖大多数产品使用场景</td><td>SF Pro、Open Sans、Montserrat、Poppins、Lato、Raleway、Manrope、Work Sans、Geist</td></tr><tr><td>科技/极客</td><td>开发者工具、Web3、技术博客、终端风格</td><td>Orbitron、Audiowide、Tektur、Michroma、Nova Square、Wallpoet、Space Grotesk、JetBrains Mono、Fira Code</td></tr><tr><td>优雅人文</td><td>知识库、阅读类产品、营销落地页</td><td>Playfair Display、Merriweather、Lora、EB Garamond、Libre Baskerville、Noto Serif、PT Serif、Crimson Text、Source Serif4、Cormorant Garamond</td></tr><tr><td>图形化字体</td><td>适合作为品牌logo字体</td><td>Rubik Glitch、Rubik Broken Fax、Rubik 80s Fade、Monoton、Headland One</td></tr><tr><td>复古像素</td><td>复古品牌、装饰元素、怀旧设计、Y2K美学</td><td>Pixelify Sans、Press Start 2P、VT323、DotGothic16、Jersey 10、Tiny5、Bytesized</td></tr><tr><td>温暖友好</td><td>儿童产品、教育应用、社区网站、生活方式品牌、零售、女性向产品</td><td>Comfortaa, Nunito, Lato, Karla, Jost, Bree Serif, Smooch Sans, Averia Serif Libre, Lexend, Caveat、Nunito</td></tr><tr><td>常用中文字体</td><td>/</td><td>苹方、思源黑体 (Noto Sans SC)、阿里普惠体、HarmonyOS Sans、MiSans、vivo Sans、OPPO Sans、微软雅黑、冬青黑体</td></tr><tr><td>数字字体</td><td>需要突出的数据</td><td>Open Sans、Montserrat、Lexend、Outfit、Alexandria、Readex_Pro、Reddit_Sans、Sansation、albert sans、HarmonyOS Sans</td></tr></table>

# 字体库

更多字体可前往这些渠道查找：

• Google Fonts 全球语种覆盖，免费商⽤，提供丰富的筛选项，可以帮助你找到合适字体：https://fonts.google.com/

• Fontshare 免费商⽤：https://www.fontshare.com/

Font Pair 字体配对灵感：https://www.fontpair.co/

中⽂字体导航：https://hao.uisdc.com/font/

• Free Chinese Fonts：https://www.freechinesefont.com 

# 字体搭配

观察近⼏年AI产品的 Landing Page ，出现了英⽂Serif (衬线体)、Sans-serif (⾮衬线体)混⽤的情况。衬线体作为装饰，可以将核⼼信息从⻚⾯内容中跳脱出来，有助于树⽴别具⼀格的品牌感受，⾮衬线体则更多被应⽤于产品正⽂中，保证⽤⼾阅读体验。

![image](/book/design/fb9ee5898da5.jpg)


![image](/book/design/578e58c69ae5.jpg)



Luma AI、Perplexity


# ⼀些搭配 Tips

• ⼀个⻚⾯⾥最多使⽤2‒3种字体，是⼤多数⽹站设计中⽐较稳妥的做法，其余层级变化可以通过字号、字重、字距来完成。

• 中⽂字体⽂件通常较⼤，全量加载会增加⽹⻚的加载时间，假如你只是想在标题⾥⽤个特殊字体突显品牌感，建议对字体进⾏⼦集化处理⸺简单说就是只提取并加载你⽤到的那些字，尽量把字体⽂件⼤⼩控制在200KB以内。

• 如果你的⽹站中涵盖需要被强调的数字，可以特意选择⼀种好看的数字字体。


ENTERPRISE


![image](/book/design/545ee2486e4b.jpg)


通过下图对⽐可⻅，默认字体的数字通常缺乏性格（PingFangSC）。⽽特意挑选的数字字体能打破沉闷，让关键数据从⻚⾯中跳脱出来，形成更⾼级的视觉节奏。

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

• 如果你的⽹站涉及字体混⽤，在代码中定义字体时，注意优先定义英⽂字体，将中⽂字体放在最后，例如：

# 代码块

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

这样做是因为通常英⽂字体不包含汉字，⽽常⽤中⽂字体中包含a‒z英⽂字⺟和数字，浏览器渲染字体时会严格按照 font-family 的顺序查找，使⽤第⼀个包含该字符的字体。如果我们将中⽂字体放在第⼀位，⻚⾯⾥的英⽂和数字就会优先由中⽂字体来渲染；反过来，把Inter放在最前⾯，就能让英⽂和数字使⽤ Inter，汉字再回退到 Noto Sans SC。

• 尽量选择上下间距对称的UI友好字体⽤于软件开发，可以减少很多对⻬还原问题，详细参⻅：

![image](/book/design/3bb29e82b01c.jpg)


# 优秀案例

Floral⽹站整体想要传递科技 $+$ 复古艺术⻛格，其品牌选⽤了带有像素感的PPNeueBit（商业字体），主要使⽤在⻚⾯⼤标题上。

![image](/book/design/d64c654a1dd0.jpg)


![image](/book/design/07c3180d3b0a.jpg)


在正⽂字体中，像素字体仅⽤作下划⾼亮的点缀位置，⼤量使⽤了带有机械、终端⻛格的SupplyMono （免费字体）

This project is an exercise infeeling exposed. Not every story is goingto be interesting， not every story orartwork will be interesting and not everydesign exploration will 1ook great, but aslong as 工 can manage to fuel my drive tocreate something new alive，the outcomebecomes secondary

同时像素点还在加载动画中进⾏了应⽤，让品牌感得以延续。

![image](/book/design/1806cd049599.jpg)


# 了解更多字体指南

• Google Fonts Knowledge 如果你希望全⾯了解字体选型知识，推荐阅读这⼀系列⽂章：https://fonts.google.com/knowledge/choosing_type

# Choosing type

When you have some text,how can you choose a typeface?Many peopleprofessional designers included-go through an app's font menu until we findonewelike.Buttheaimofthis GoogleFontsKnowledgemoduleis to showthattherearemanyconsiderationsthatcanimproveour typechoices Bysetting someusefulconstraints toaid ourtype selection,wecanalso developacritical eye foranalyzing typealong the way. 

![image](/book/design/707793e9668b.jpg)


. Figma官⽅指南，介绍了39种字体搭配案例：https://www.figma.com/resource-library/font-pairings/

HEADER 

# Bubblegum Sans

BODY COPY 

# Open Sans

Loremipsum odor amet,consectetuer adipiscing elit.fusce ut pretium morbi purus proin bibendum.Justo rutrum vel venenatis consectetur,lobortis taciti ad.Pharetra vitae mi quis etiam ipsum.Magnis feugiat integer nam 

HEADER 

# Ubuntu

BODY COPY 

# Rokkitt

Lorem ipsum odor amet, consectetuer adipiscing elit. fusce ut pretium morbi purus proin bibendum.Justo rutrum vel venenatis consectetur, lobortis taciti ad. Pharetra vitae mi quis etiam ipsum. Magnis feugiat integer nam, nascetur tristique maximus nascetur dolor. 

HEADER 

# Montserrat

BODY COPY 

# Karla

Lorem ipsum odoramet,consectetueradipiscingelit.fusce ut pretium morbi purus proin bibendum.Justo rutrum vel venenatis consectetur.lobortis taciti ad.Pharetra vitae mi guis etiamipsum.Magnis feugiat integer nam,nascetur tristique maximus nascetur dolor. 

# 4.2 颜⾊搭配

# 60-30-10 配⾊原则

这是室内设计领域的⻩⾦法则，在⽹⻚设计中，它是防⽌⾊彩混乱、建⽴视觉秩序有效的⼿段。如果你希望⽹⻚保持简约⼲净，可以按照这个原则审查⽹⻚设计：

• $60 \%$ 背景⾊（Background）：⻚⾯整体基调。通常使⽤中性⾊（⽩⾊、浅灰、或者深⾊模式下的深灰），保证耐看和留⽩感。你也可以选择拥有⼀点点品牌⾊倾向的颜⾊，避免纯⽩的⽣硬冷漠感，让⻚⾯弥漫着淡淡的品牌氛围（例如YouwareLandingPage）；

• $30 \%$ 辅助⾊（Secondary）：⽤于卡⽚背景、次级按钮、⽂本选中态等，通常是强调⾊的邻近⾊，或者深浅不同的变体，负责建⽴视觉层级；

注意： 它不应是⾼饱和度的彩⾊，否则会喧宾夺主；

• $10 \%$ 强调⾊（Primary）：⽤于⾏动按钮（CTA按钮）、链接、⾼亮图标等，可以直接使⽤品牌主⾊或与主⾊对⽐明显的颜⾊，⽤来吸引⽤⼾的注意⼒；

![image](/book/design/7a2db7d479d5.jpg)


![image](/book/design/1b687fbec25a.jpg)



图⽚来源：Material Design2


⽐如前⾯模仿Materialdesign⻛格的⽹站⽤⾊有些过多，这⾥我们尝试使⽤60-30-10法则让AI⾃⾏迭代，输⼊提⽰词后可以看到优化效果⾮常明显：

![image](/book/design/f930bd65f0df.jpg)


请对当前⻚⾯应⽤60-30-10配⾊法则（ $6 0 \%$ 主⾊- $\mathfrak { - 3 0 \% }$ 辅助⾊- $. 1 0 \%$ 强调⾊），对⻚⾯进⾏去噪处理，以消除多种颜⾊在⻚⾯上的过度使⽤，并优化视觉层级，让重点信息更突出

Before 

![image](/book/design/2534cbb56d2b.jpg)


# 如何为⽹站配⾊ 如何为网站配色

从品牌⾊获得⾊阶

那么如何获得那些带品牌倾向的浅⾊背景或深浅合适的按钮⾊呢？ 那么如何获得那些带品牌倾向的浅色背景或深浅合适的按钮色呢？

这⾥介绍⼀个好⽤的⼯具KigenColorGenerator，你可以在左上⻆RGB值位置输⼊品牌⾊，右侧的 这里介绍一个好用的工具 Kigen Color Generator，你可以在左上角RGB值位置输入品牌色，右侧的Shade Count 表⽰⾊阶数量，默认⽣成从最浅 (50) 到最深 (950) 的 11 个颜⾊，完美对应 Tailwind Shade Count表示色阶数量，默认生成从最浅(50)到最深(950)的11个颜色，完美对应TailwindCSS的标准⾊阶系统。 CSS 的标准色阶系统。


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


50-100(最浅)：可⽤于⼤⾯积背景底⾊、极浅卡⽚背景，如果希望背景带⼀点点品牌倾向，⽽不是纯⽩纯⿊，那么可以使⽤这个⾊值；

200-300(较浅)：可⽤于组件边框、分割线、输⼊框背景或次要卡⽚背景；

400-600 (中间)：通常为核⼼⾊域。通常⽤于普通实⾊按钮、图标、Logo；

600-800(较深)：可⽤于⿏标悬停(Hover)状态。⽤⼾把⿏标放上去时，按钮变深⼀点，提供交互反馈，也可以⽤作暗⿊模式下的深⾊背景；

800-950(最深)：可⽤于标题与正⽂⽂字。使⽤极深⾊替代纯⿊，能提升⻚⾯的质感与协调性，也可以⽤作暗⿊模式下的深⾊背景。

⽹站的下⽅你可以直接复制颜⾊Token到代码⽂件中进⾏使⽤。

/\*tailwind.config.js v4 generated from Kigen/design \*/   
\*/Add to your CSS file \*/   
:root{ --blue-ribbon-50:236 100%97%; --blue-ribbon-100:237 100%93%; --blue-ribbon-200:236 100%86%; --blue-ribbon-300:235 100%79%; --blue-ribbon-400:235 100%73%; --blue-ribbon-500:233 100%67%; --blue-ribbon-600:230 100%58%; --blue-ribbon-700:225 100%45%; --blue-ribbon-800:226 100%32%; --blue-ribbon-900:228 100%19%; --blue-ribbon-950:232 100%13%;   
}   
/\*tailwind.config.js\*/   
module.exports $=$ { content:['/.index.html', '/.src/**/*.{js,ts,jsx,tsx}'], theme:{ extend:{ colors:{ 'blue-ribbon':{ 50:'hsl(var(--blue-ribbon-50)/ <alpha-value>), 100:'hsl(var(--blue-ribbon-100)/ <alpha-value>), 200:'hsl(var(--blue-ribbon-200)/ <alpha-value>), 300:'hsl(var(--blue-ribbon-300)/ <alpha-value>), 400:'hsl(var(--blue-ribbon-400)/ <alpha-value>)', 

Copy 

# 定义⽹站核⼼⾊值

不过，Kigen ⽣成的 11 个⾊阶，本质上是通过算法帮我们⽣成⼀套备⽤颜⾊资源库。通常来说，你只需要调⽤其中的3‒5个⾊值便⾜够使⽤。

⼀个简单的⽹⻚⾊彩系统⼤概由以下颜⾊组成：

# 1. 核⼼颜⾊（60-30-10 配⾊原则）

背景⾊Background（如 Shade 50-100）、强调⾊Primary（如 Shade 400-600）、辅助⾊Secondary（如 Shade 200-300）

# 2. 状态与结构

组件状态⾊：可以选取⼀个深⾊作为按钮的加载、悬浮态（如Shade700）

边框⾊：选取⼀个浅⾊（如Shade200，也可以从品牌⾊阶外选择⼀些灰⾊值）

# 3. 重要反馈

⾄于出错、警⽰、成功等状态，你可以⾃⾏定义，也可以直接复⽤通⽤的语义化颜⾊（如 red-600 ,amber-400 , green-600 ）

更详细的⾊彩系统定义推荐阅读下⽂中的颜⾊指南。

# 检查⾊彩可访问性

⽂字叠加在卡⽚上，图标叠加在按钮上，这种叠加关系形成了⾊彩对⽐度。如果对⽐度过低，内容就会隐⼊背景，导致⽤⼾（尤其是视⼒不佳的⼈群或在阳光下看⼿机时）⽆法识别。为了确保内容清晰可⻅，我们需要检查以下前景（⽂字/图标）与背景之间的对⽐度。

根据Web内容⽆障碍指南(WCAG)，⽹⻚需满⾜以下对⽐度标准：

• 正⽂/⼩字（及正⽂背景）：背景对⽐度≥4.5:1

• ⼤标题/粗体（18px 以上或 14px 加粗）：背景对⽐度 ≥ 3 : 1

字号越⼤或笔画越粗，⼈眼越容易识别，因此对对⽐度的要求可以适当降低。

• UI组件/图标（及输⼊框边框）：背景对⽐度≥3:1

![image](/book/design/7bbdc56b371e.jpg)


![image](/book/design/6b442b10c08e.jpg)



两种按钮颜⾊对⽐度的效果，可以看到，对⽐度越⾼，识别度也会更⾼



图⽚来源：Material Design3


注：Material 的 0‒100 和 Tailwind 的 50‒950 都是同⼀颜⾊不同明度的刻度体现，概念类似

# 推荐⼯具

• WCAG Color Contrast Checker Chrome 扩展 ，这是⼀个浏览器插件，可以直接扫描你的⽹⻚，⼀次性检查所有元素的⽂本和UI组件对⽐度，基于WCAG2.2，⽀持⾊盲模拟，并且免费。

# Thoughts, captured beautifully.

The note-taking app that organizes your life with fluid shapes and dynamic layouts. 

![image](/book/design/c1ae8115ae4f.jpg)


![image](/book/design/f0cd07cc8c65.jpg)


• WebAIMContrastChecker，⼀个经典⼯具，虽然UI有点⽼，但⽀持API调⽤，可以做⾃动化检查脚本。

# 了解更多颜⾊指南

• Material Design｜How the system works：https://m3.material.io/styles/color/system/howthe-system-works 

• Material Design｜What are color roles：https://m3.material.io/styles/color/roles 

• 为设计系统创建调⾊板，这篇⽂章对颜⾊的使⽤进⾏了更细致的讲解：https://imperavi.com/blog/creating-a-color-palette-for-design-systems-revised-edition/

· TailwindCSSV4默认调⾊板的OKLCH⾊值，有些基础⾊可以直接调⽤：https://tailwindcolor.com/；另外这⾥还有其他组件库的默认⾊值：https://materialui.co/colors

# 4.3排版布局

# 栅格系统

通常在⽹⻚设计时，设计师会定义⽹⻚的栅格系统来作为排版布局的参考。这套系统的核⼼⽬的是让所有内容都对⻬在⼀套隐形轨道上，栅格系统是对⻬和秩序的基础，可以帮助⽹⻚设计节奏清晰。

![image](/book/design/14fc5176fda2.jpg)



非对称分栏


![image](/book/design/5c1e49ce3c02.jpg)



模块化网格


![image](/book/design/c70addf8fa25.jpg)



均分网格


![image](/book/design/2cbdaf1d867d.jpg)



坐标网格


在栅格系统指导下可以衍⽣出多种排版⽅式

⽽在VibeCoding时，⽬前的AI能⼒⽆法让我们建⽴详细、严格的栅格系统，如果你发现你的⽹站布局⽐较乱，可以尝试这样审查AI⽣成的内容：

• ⻚⾯设定了统⼀的内容宽度和左右边距，让正⽂区在⻚⾯中有⼀个稳定的视觉重⼼，⽽不是贴边摆放；

![image](/book/design/d15f7b5c6132.jpg)



边距合适



边距较窄


![image](/book/design/97ed0de79fbf.jpg)


![image](/book/design/cf74bb440df1.jpg)


关键信息（标题、正⽂、主要卡⽚、⻚脚）尽量都落在同⼀套内容宽度和对⻬线上；

![image](/book/design/57fcd4af6404.jpg)


OurMenu、VisitUS模块的卡⽚超出了最⼩边距，影响了视觉节奏

. 栅格系统是灵活的，部分模块可根据需求单独成块，不⼀定⾮要完全统⼀对⻬到同⼀条栅格线上；

• 同时像Hero区的⼤图、背景插画等装饰性元素可以适度越出。

![image](/book/design/5c3c813a4ca2.jpg)


# ⾏⻓与阅读节奏

为了保证阅读舒适度，我们需要控制每⾏⽂字的字数（即⾏⻓）。

在英⽂⽹站中，正⽂的理想⾏⻓应控制在45~75个字符之间（粗略算⼤概10个英⽂单词⼀⾏），超过75个字符，会导致⽤⼾眼球移动距离过⻓，阅读极其疲劳；低于45个字符，⼜会让句⼦被频繁打断，阅读感被切碎。

如果是中⽂⽹站，中⽂是⾼密度的⽅块字，字与字之间没有明显的空格作为视觉停顿，因此信息密度更⼤，通常正⽂建议保持每⾏35‒45个汉字左右。

当然，这个数字也并⾮完全绝对。阅读舒适度本质上是字号、⾏⻓与⾏⾼三者的动态平衡。例如，当你使⽤了更宽松的⾏⾼（如1.8倍以上）时，视觉上完全可以容忍略宽的⾏⻓，因此字符数可以搭配不同的字体及⾏⾼适时调整。

The window slid up easily-too easily-andMikewaiteda long time,listening,before he made amove.The whole hugepile of the factory wasstill. 

move.The whole huge pile of the factory was still.There were no lights anywhere, except that dim one by the qate through the stockade.Lying quite stillin the darkness,Mike waited.There was no sound, no ringing of alarm bells,no bustle of activity anywhere.The manufacturing plant of the 

The windowslidupeasily-tooeasily-and Mike waitedalong timelisteningbeforehemadeamove.The wholehugepileofthe factorywasstillTherewerenolightsanywhere,excepttatdimonebythegatethroughthestockade.Lyingquitesillinte darknesskeidreodgioflsectivityreeacurint WhitneyJewelryatchompanemaiedsithdeeforeststillileofickitmtyeedindosstarnankly 

第⼀段篇幅很短，但适合微型⽂案；第⼆段太短，不符合标准段落⽂本的要求；

第三段⻓度差不多；第四段则太⻓ By Google Fonts

此外，需要警惕在⽂本段句上AI的处理并不会特别细致，容易出现在专有名词中间断句，或在⾏末出现只剩⼀个词的“孤⼉⾏”现象。⼀些关键场景建议⼤家仔细检查，⼿动调节。

![image](/book/design/04fe7d41bdd7.jpg)


![image](/book/design/4695b2d25daa.jpg)



两个均由Gemini3⽣成的⽹⻚，在Hero⽂案的处理上，右侧会⽐左侧更好


# 间距节奏

留⽩与间距是视觉层级的核⼼⼯具⸺彼此靠得更近的元素，会被⾃然认为是同⼀组；距离更远的，会被认为是不同组（这就是著名的格式塔亲密度法则），因此并⾮所有的内容都要等距排列。

正如下⾯这个案例：左侧是AI⽣成的Pricing卡⽚⽅案。经过调整，标题、价格这样的相关内容紧密分组，权益列表也更紧密，只⽤了3种间距数值，便构建出更清晰的视觉层级，让⽤⼾⼀眼就能抓住卡⽚中的重点。

![image](/book/design/3e4e68d49330.jpg)



调整前：5种间距


![image](/book/design/f1dc48efd686.jpg)



调整后：3种间距


# 间距使⽤4px、8px的倍数

如果你想要更细节的调节⻚⾯间距，那么这条规则可以遵循：

通常设计师们在调整间距时会使⽤4或8的倍数：4, 8, 12, 16, 24, 32, 48, 64, 80... 着可以避免单数间距在元素缩放时导致的模糊虚边，可以让界⾯在视觉上统⼀、易于维护。记住这条规则基本不会出错。

<table><tr><td>间距值</td><td>典型用途</td><td>对应 Tailwind 类名 (参考)</td></tr><tr><td>4px / 8px</td><td>组件内部元素间距 (紧密)</td><td>gap-1 , gap-2</td></tr><tr><td>16px</td><td>卡片内边距、列表项间距</td><td>p-4 , gap-4</td></tr><tr><td>24px / 32px</td><td>区块/组件之间的分隔</td><td>mb-6 , mb-8</td></tr><tr><td>64px - 128px</td><td>大区域/板块之间的留白 (呼吸感)</td><td>py-20 , py-32</td></tr></table>

你也可以输⼊这段话，尝试规范AI的布局输出：

![image](/book/design/5fc650ef793c.jpg)


统⼀这个⻚⾯的间距系统：所有 margin 和 padding 使⽤ 4 或 8 的倍数；组件内部使⽤较⼩间距（ $( 8 - 1 2 \mathsf { p } \mathsf { x } )$ ），卡⽚之间使⽤中等间距（16‒24px），不同内容区块之间使⽤更⼤间距（ $( \geq 6 4 \mathsf { p x } )$ ），让亲疏关系更明显

# 了解更多排版指南

尼尔森集团的优秀视觉设计详解：https://www.nngroup.com/articles/good-visual-design/?utm_campaign=Content/Educational&utm_source=twitter&utm_medium=social

• ⼀个互动型⽹站，讲解了4种类型的栅格：https://grids.obys.agency/columns_vandegraaf/

• ⽹⻚排版基础原则：https://www.zignuts.com/blog/master-web-typography-tips-for-website-design

• 7种栅格布局：https://align.vn/blog/mastering-grid-layout-design-7-types-of-grids/

• Understanding measure/line length： https://fonts.google.com/knowledge/using_type/understanding_measure_line_length 

. 响应式布局⽹格，栅格规范详解：https://m2.material.io/design/layout/responsive-layout-grid.html#grid-customization

# 4.4 icon和配图部分

Icon 使⽤原则

. 保持⼀致性：同⼀套Icon⻛格统⼀（线条粗细、填充/描边⻛格）你可以在提⽰词中让AI使⽤⼀套图标库来保证⻛格统⼀

![image](/book/design/f9f282af0c04.jpg)


![image](/book/design/f64e31d5c7e4.jpg)


![image](/book/design/ef18b2699d95.jpg)


![image](/book/design/456256551449.jpg)


![image](/book/design/b86baa510589.jpg)


![image](/book/design/1eca48d2e779.jpg)


# Google Material Symbols 中不同属性的图标

Prompt⽰意：

![image](/book/design/50bb695146e4.jpg)


请使⽤ Google Material Symbols (Outlined 描边⻛格) 图标库，通过 CDN ⽅式引⼊。

并为所有图标应⽤以下CSS变量设置，确保视觉统⼀

Fill 填充: 0 (空⼼)

Weight 字重: 400 (标准)

Grade 字阶: 0 (标准)

Optical Size 尺⼨: 24px

${ < } ! \mathrm { -- }$ 除了Outlined⻛格以外，我们还可以指定Rounded(圆⻆⻛格)、Sharp(锐利⻛格)，如果你还有更多⾃定义诉求，可以添加填充⽅式、字重、字阶、尺⼨等描述-->

• 尺⼨基于4px⽹格：规范图标外框为16px、20px、24px、32px等尺⼨

• 与⽂本视觉对⻬：图标与⽂本混排时，通常需要⽐⽂本字号⼤ $2 { \cdot } 4 \mathsf p \mathsf { x }$ 才能视觉对⻬（例如：14px⽂字配16px图标；16px⽂字配 $2 0 { \mathsf { p } } \times$ 图标）

• 与⽂字保持适当间距：建议保持4px( gap-1 )或8px( gap-2 )的间距，并确保两者对⻬

# 图⽚使⽤原则

# 视觉审美

选取⾼质量图⽚：拒绝模糊、噪点和拉伸变形，主体要清晰，背景不要太乱，以免⼲扰⽂字阅读

和品牌⾊调匹配：图⽚的⾊温应与你的品牌⾊呼应，例如科技⻛⽹站选冷⾊调图，⽣活类选暖⾊调图。

如果你不想使⽤版权不明的⽹络图⽚，【5.4节】提供了设计⼯程师常⽤的资源库。

# 适配规则

• 防⽌图⽚变形：确保图⽚使⽤ object-cover 样式（对应设计软件中的 Fill 填充），以防⽌图⽚随意拉伸

使⽤响应式图⽚：为重要图⽚提供多种尺⼨，⽤ srcset 列出这些版本，再⽤ sizes 告诉浏览器在不同屏幕宽度下图⽚⼤概要多宽，让浏览器⾃动挑选最合适的⼀张，⽽不是在⼿机上也下载桌⾯端的⼤图

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

# 性能优化

• 控制体积与尺⼨：⽹⻚图⽚需具备⾜够清晰度，但也不是体积越⼤越好，图⽚过⼤导致加载速度缓慢会影响⽹站排名。因此我们最好控制单张图⽚尺⼨和体积（⽐如 1500‒2500px、<500KB），否则⼤图会拖慢加载，影响SEO

• 使⽤懒加载技术：为⾮⾸屏图⽚添加 loading="lazy" 属性，这被称为懒加载技术，意味着只有当⽤⼾滚动到图⽚位置时，图⽚才会被真正下载，能极⼤节省带宽

• 使⽤预加载技术：对于⾸屏最重要的图⽚或视频封⾯，应明确标记为最⾼优先级（使⽤fetchpriority $=$ "high" 或 preload ），确保它们在⻚⾯加载时以最⾼优先级显⽰

• 优先使⽤现代格式：如果你的⽹站图⽚较多，在上线阶段尽量使⽤WebP、AVIF等现代图⽚格式，在相同主观画质下，相⽐JPEG/PNG通常能减少约 $2 5 \% - 3 0 \%$ 的体积。

你也可以在【5.4icon和配图资源】中找到更多优秀资源。

# 4.5 获取具体设计参数的技巧

# 技巧1：⽤CSS分析⼯具从⽹⻚提取Token

WALLACE 

CSS Analyzer 

CSS Code Quality 

Design Tokens 

CSS Scraper 

Visualize @layer 

Custom properties 

![image](/book/design/513e3c785d1f.jpg)


![image](/book/design/e1584d12b054.jpg)


# CSS DESIGN TOKENS

Analyze URL 

Analyze File 

Analyze CSS input 

# URL to analyze

https://www.synthetictheatre.com/story/floral 

ANALYZE URL 

# √Prettify CSS?

Prettifying makes inspecting the CSS easier, but very slighty changes the numbers. 

# Colors

TOTAL UNIG 

47 12 (25.5%) 

Colors are sorted bydefault in the order they're discovered in the CSS,but you can sort by color as well 

A wider bar means the color is used more often. 

O Sort by source order O Sort by count O Sort by color 

OSizebyusage OSize evenly 

![image](/book/design/db41c0160aa4.jpg)


# Colors per group

![image](/book/design/cb682e1d697a.jpg)


![image](/book/design/538572f69aad.jpg)


![image](/book/design/c3b714207007.jpg)


![image](/book/design/e17e2b9a792e.jpg)


# Blue

![image](/book/design/453949dea820.jpg)


![image](/book/design/b7ce85d167fd.jpg)


# Yellow

$\oplus$ Inspector 

$\circledast$ Network 

Report Data 

AIl CSS 

Design Tokens 

这⾥推荐⼀个⾮常好⽤的免费⼯具ProjectWallace，该⼯具可以输⼊⽹址抓取⻚⾯初始静态的HTML和CSS代码，⼀键分析⽹站的DesignTokens，你可以将分析结果截图或者引⽤，让AI浏览器帮你分析⽹⻚中字体、字号、颜⾊的使⽤情况

*注：如果点开⽹站显⽰Pagenotfound，记得关闭??试⼀下

输⼊我们在【字体字号选型】⼀节提到的优秀案例Floral，配合Comet（或任意AI浏览器），便可以了解⽹站的详细信息啦

# Navigate this page

# Colors

All Colors 

Color Groups 

Color Usage 

Color Eormats 

# Gradients

Font Sizes 

Font Families 

@font-face 

Line Heights 

Text Shadows 

Box Shadows 

Rorder Radiuces 

![image](/book/design/c62c8154b6f4.jpg)


请分析该⽹站中的CSSDesignTokens，并按照以下分类，以Markdown表格的形式输出核⼼设计参数：

# ⾊彩系统 (Color Palette)：

提取⽹⻚中的主⾊ (Primary)、背景⾊ (Background)、⽂字⾊ (Text)、强调⾊ (Accent)。

必须给出具体的 HEX ⾊值或 RGBA 值 (例如: #FF5733)

说明该颜⾊主要应⽤在哪些组件上。

• 字体排印 (Typography)：

Font-family: 具体的字体名称（如 Inter, Roboto, 或者⾃定义字体名）

Font-size: 标题 (H1-H3) 和正⽂ (Body) 的字号 (px 或 rem)

Font-weight: 字重数值 (400, 600, 700等)

间距与布局 (Spacing & Layout)：

⻚⾯的核⼼栅格宽度 (Container width)

常⽤的内边距 (Padding) 和外边距 (Margin) 的数值阶梯 (如 16px, 24px, 48px)。

装饰效果 (Effects)：

圆⻆ (Border-radius) 的数值

阴影 (Box-shadow) 的具体参数

![image](/book/design/6f64ffe72b01.jpg)



Inspector Network Report DataAl CSs Design Tokens


# Navigate this page

# Colors

All Colors 

Color Groups 

Color Usage 

Color Formats 

# Gradients

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


# 技巧2：将⽹⻚转换成设计稿，MCP到代码⼯具还原

html.to.design是⼀款能将⽹⻚⼀键逆向为Figma设计稿的强⼤插件。以此为基础，我们可以配合FigmaMCP等⼯具，从还原出的图层中精准提取设计系统（DesignSystem），将配⾊、排版等隐性信息转化为AI可理解的显性规范。

# 使⽤贴⼠

• 额度： 免费版每 30 天提供 10 次导⼊机会。

• 避坑：插件对静态⻚⾯的还原度极⾼，但⾯对包含⼤量复杂动效或WebGL的⽹⻚，转换效果可能会⼤打折扣。

# 具体步骤

# Step1：将⽹⻚转换为设计稿

在浏览器中安装并打开html.to.design插件，设定好需要的设备尺⼨（如Desktop1440px）和主题模式，点击 Capture Current Page 下载⽂件（.h2d）

![image](/book/design/1926432b4096.jpg)


回到Figma，运⾏同名插件。你可以直接拖⼊刚才下载的⽂件，或者直接在插件中输⼊URL进⾏抓取。

下图展⽰了⽣成后的效果，可以看到除了布局还原，它还⾃动提取了字体、颜⾊等样式信息，准确率蛮⾼。

![image](/book/design/5966160a6433.jpg)


# Step 2：连接MCP

接下来，我们需要通过FigmaMCP搭建设计稿与IDE之间的桥梁，这⾥我使⽤了Cursor。

• 如果你是Figma付费账⼾，并使⽤客⼾端，可以直接开启 Dev Mode，在插件⾯板中获取与 Cursor的连接凭证，体验最丝滑。

• 免费⽤⼾也可以使⽤远程连接⽅法，具体步骤可⻅FigmaMCP的官⽅⽂档，每⽉可免费调⽤6次。

![image](/book/design/f5e5ade0fcc0.jpg)


如果原⽹⻚结构过于复杂，MCP 返回的 JSON 数据可能会撑爆 AI 的上下⽂窗⼝ (Context Window) 导致报错，我们可以适当截取⼩范围的设计稿逐次读取。

连接成功后，我们将在Cursor的MCP服务⾯板中看到绿⾊的正常运⾏提⽰。

![image](/book/design/375908397ce4.jpg)


# Step3：⽣成规范与代码

现在，AI便拥有了读取Figma中设计稿细节的能⼒。此时，我们可以根据开发需求，选择两种不同的指令模式：

如果你的⽬标是建⽴⼀套可复⽤的视觉规范（如颜⾊变量、字阶、组件样式），建议先让AI进⾏逆向提取。你可以尝试以下提⽰词。

这⾥要另外提醒的是Cursor只能在Agent模式下才能调⽤MCP。

![image](/book/design/9e9dfe198dfb.jpg)


我有⼀个通过 html.to.design 从⽹⻚导⼊ Figma 的设计⽂件。

请使⽤FigmaMCP⼯具读取这个⽂件（链接在下⾯），并基于其中的内容，整理出⼀套设计系统说明。

⽬标：

1. 抽取并归⼀化设计Token（颜⾊、排版、间距、圆⻆、阴影等）。

2. 识别可复⽤组件（按钮、输⼊框、卡⽚、导航、Section等）及其变体，说明使⽤场景。

3. 总结⻚⾯布局模式（栅格、容器宽度、段落间距、模块编排） 

4. 给出与React+Tailwind（或我指定的技术栈）对应的实现建议。

# 输出：

• 在当前项⽬中新建⼀个 design-system.md ⽂件，⽤ Markdown 写出完整说明，结构⾄少包括：

◦ 设计基础（颜⾊、排版、间距、圆⻆、阴影、断点）；

组件（名称、⽤途、可⽤的变体及状态、使⽤建议）；

◦ 布局模式和⽰例；

◦ 简单的代码映射⽰例。

下⾯是 Figma ⽂件的链接，请⽤ Figma MCP 读取：

<!-- 附上 Figma 链接-->

得到设计系统⽂件后，我们便可以将其作为设计规范⽂档指导项⽬中⻚⾯的⽣成。

![image](/book/design/3e92eb6e6ab2.jpg)



Cursor 连接 Figma MCP 后整理好的设计系统


如果你想直接根据设计稿进⾏代码还原，可以跳过提取步骤，可以直接输⼊⽣成代码的提⽰词。

我有⼀个Figma设计稿，想请你调⽤FigmaMCP⽣成代码

请帮我：

从 Figma ⽂件中提取出所有可复⽤的组件（Button、Header、Card 等）；

为这些组件⽣成对应的 React $+$ Tailwind 代码；

⽤这些组件组合⽣成完整的 Landing Page 代码。

<!-- 附上 Figma 链接-->

# 推荐阅读

Cursor官⽅MCP指南：https://cursorideguide.com/use-cases/figma-to-cursor-with-mcp

# 五.资源推荐

https://agibarbar.feishu.cn/wiki/KkOdwwn39iQOGgkAy6DcqmWLnhh#shar e-Qkd4d7jPFotxsoxYuL2cArXRnWf 

