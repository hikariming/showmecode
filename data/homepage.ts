export type NavItem = {
  label: string;
  href: string;
};

export type ChapterCategory = {
  id: string;
  label: string;
};

export type ChapterCardItem = {
  id: string;
  badge: string;
  title: string;
  description: string;
  meta: string;
  readCount: string;
  art: "clock" | "cursor" | "flow" | "cube" | "bulb";
  featuredIn: string[];
};

export type LearningStep = {
  step: string;
  title: string;
  description: string;
  accent: string;
};

export type ValueItem = {
  title: string;
  description: string;
  stat: string;
};

export type FooterGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

export const navItems: NavItem[] = [
  { label: "文档教程", href: "#chapters" },
  { label: "实战项目", href: "#path" },
  { label: "工具资源", href: "#values" },
  { label: "灵感案例", href: "#values" },
  { label: "关于我们", href: "#about" },
];

export const chapterCategories: ChapterCategory[] = [
  { id: "hot", label: "热门" },
  { id: "tutorial", label: "教程" },
  { id: "ai", label: "AI" },
  { id: "product", label: "产品设计" },
  { id: "project", label: "实战项目" },
];

export const chapterCards: ChapterCardItem[] = [
  {
    id: "first-project",
    badge: "新手入门",
    title: "5 分钟搭建\n你的第一个项目",
    description: "手把手带你使用 VibeCoding 快速搭建第一个完整项目。",
    meta: "新手入门",
    readCount: "2.1K",
    art: "clock",
    featuredIn: ["hot", "tutorial"],
  },
  {
    id: "ai-tooling",
    badge: "工具指南",
    title: "AI 编程工具\n完整指南",
    description: "精选主流 AI 编程工具，帮你找到最适合的开发伙伴。",
    meta: "工具资源",
    readCount: "3.4K",
    art: "cursor",
    featuredIn: ["hot", "ai", "tutorial"],
  },
  {
    id: "blog-system",
    badge: "项目实战",
    title: "从 0 到 1\n开发一个博客系统",
    description: "完整实战教程，带你一步步实现自己的博客系统。",
    meta: "实战项目",
    readCount: "4.7K",
    art: "flow",
    featuredIn: ["hot", "project"],
  },
  {
    id: "product-thinking",
    badge: "产品设计",
    title: "产品设计思维\n实战指南",
    description: "学习产品设计的核心思维，打造用户喜爱的产品。",
    meta: "产品设计",
    readCount: "1.8K",
    art: "cube",
    featuredIn: ["hot", "product"],
  },
  {
    id: "ai-inspirations",
    badge: "灵感案例",
    title: "10 个 AI 产品\n灵感案例",
    description: "精选 10 个优秀的 AI 产品案例，激发你的创作灵感。",
    meta: "灵感案例",
    readCount: "2.6K",
    art: "bulb",
    featuredIn: ["hot", "ai", "product"],
  },
  {
    id: "prompt-patterns",
    badge: "教程",
    title: "提示词结构化\n写作模板",
    description: "用稳定可复用的结构提升生成质量，让 AI 更可控。",
    meta: "教程",
    readCount: "1.3K",
    art: "cursor",
    featuredIn: ["tutorial", "ai"],
  },
  {
    id: "prototype-to-build",
    badge: "产品设计",
    title: "从需求到原型\n如何快速拆解",
    description: "把想法转成页面与流程，减少反复返工的沟通成本。",
    meta: "产品设计",
    readCount: "1.1K",
    art: "cube",
    featuredIn: ["product"],
  },
  {
    id: "launch-checklist",
    badge: "实战项目",
    title: "AI Side Project\n上线检查清单",
    description: "发布前检查功能、文案、稳定性和反馈入口，少踩坑。",
    meta: "实战项目",
    readCount: "980",
    art: "flow",
    featuredIn: ["project", "tutorial"],
  },
];

export const learningSteps: LearningStep[] = [
  {
    step: "01",
    title: "先学会和 AI 一起做事",
    description: "理解 VibeCoding 的基本工作方式、提示结构和节奏控制。",
    accent: "基础能力",
  },
  {
    step: "02",
    title: "再用工具把流程跑顺",
    description: "掌握代码生成、页面搭建、原型验证和资源整合的完整链路。",
    accent: "效率工具",
  },
  {
    step: "03",
    title: "最后做出真正能用的产品",
    description: "把教程方法迁移到真实项目，从想法验证走到上线发布。",
    accent: "实战落地",
  },
];

export const valueItems: ValueItem[] = [
  {
    title: "不是堆概念，而是让你快速做出结果",
    description: "每篇内容都围绕真实产出设计，重点在于怎么开始、怎么推进、怎么交付。",
    stat: "01",
  },
  {
    title: "同时覆盖 AI 编程和产品设计",
    description: "不只教你写代码，也帮助你判断方向、拆解需求和打磨体验。",
    stat: "02",
  },
  {
    title: "把教程、工具和案例组织成一条学习路径",
    description: "你不会只得到碎片内容，而是能沿着一条可执行的路径持续前进。",
    stat: "03",
  },
  {
    title: "适合从 0 到 1 做自己的 Side Project",
    description: "无论你是学生、设计师还是开发者，都能找到适合自己的起点。",
    stat: "04",
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "学习内容",
    links: [
      { label: "文档教程", href: "#chapters" },
      { label: "实战项目", href: "#path" },
      { label: "产品设计", href: "#values" },
    ],
  },
  {
    title: "精选资源",
    links: [
      { label: "工具指南", href: "#chapters" },
      { label: "灵感案例", href: "#values" },
      { label: "学习路径", href: "#path" },
    ],
  },
  {
    title: "关于 showmecode",
    links: [
      { label: "品牌介绍", href: "#about" },
      { label: "开始学习", href: "#chapters" },
      { label: "首页顶部", href: "#top" },
    ],
  },
];

