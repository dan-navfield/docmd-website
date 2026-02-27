export const navLinks = [
  { label: "Convert", href: "/convert" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Convert", href: "/convert" },
    { label: "API Docs", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "mailto:hello@docmd.io" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "/status" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
