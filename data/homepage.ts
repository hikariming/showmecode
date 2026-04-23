export type NavItem = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

export const navItems: NavItem[] = [
  { label: "全部篇章", href: "/#chapters" },
  { label: "学习路径", href: "/#path" },
  { label: "关于本书", href: "/#about" },
  { label: "GitHub",  href: "https://github.com/hikariming/showmecode" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "本书内容",
    links: [
      { label: "全部篇章",     href: "/#chapters" },
      { label: "学习路径",     href: "/#path" },
      { label: "第 1 篇 认知篇", href: "/book/cognition" },
      { label: "第 9 篇 上线篇", href: "/book/launch" },
    ],
  },
  {
    title: "作者团队",
    links: [
      { label: "关于本书", href: "/#about" },
    ],
  },
  {
    title: "其它",
    links: [
      { label: "回到顶部", href: "#top" },
      { label: "GitHub",   href: "https://github.com/hikariming/showmecode" },
    ],
  },
];
