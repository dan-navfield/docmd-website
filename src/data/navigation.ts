export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdownChild {
  label: string;
  href: string;
  description: string;
}

export interface NavDropdown {
  label: string;
  children: NavDropdownChild[];
}

export type NavItem = NavLink | NavDropdown;

export function isDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

export const navLinks: NavItem[] = [
  { label: "Convert", href: "/convert" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Articles", href: "/articles", description: "Guides, tips, and insights" },
      { label: "Compare", href: "/compare", description: "See how DocMD stacks up" },
      { label: "Use Cases", href: "/use-cases", description: "Solutions by role" },
      { label: "Docs", href: "/docs", description: "API reference and guides" },
    ],
  },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Convert", href: "/convert" },
    { label: "API Docs", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "mailto:hello@mddoc.app" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Compare", href: "/compare" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "/status" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
