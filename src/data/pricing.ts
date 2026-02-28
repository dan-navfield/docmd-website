export const tiers = [
  {
    name: "Solo",
    price: { monthly: 10, annual: 8 },
    description: "For individuals who need reliable conversions.",
    features: [
      { name: "20 conversions per month", included: true },
      { name: "5 templates", included: true },
      { name: "Markdown editor", included: true },
      { name: "Download as .docx", included: true },
      { name: "AI classification", included: true },
      { name: "Custom templates", included: false },
      { name: "MCP server access", included: true },
      { name: "Style mapping editor", included: false },
      { name: "Notion integration", included: false },
      { name: "Atlassian integration", included: false },
      { name: "SharePoint export", included: false },
      { name: "Team collaboration", included: false },
      { name: "API access", included: false },
      { name: "Email support", included: true },
    ],
    cta: "Start Solo",
    highlighted: false,
  },
  {
    name: "Team",
    price: { monthly: 49, annual: 41 },
    description: "For teams that need to share templates and control.",
    features: [
      { name: "Unlimited conversions", included: true },
      { name: "All templates", included: true },
      { name: "Markdown editor", included: true },
      { name: "Download as .docx", included: true },
      { name: "AI classification", included: true },
      { name: "Custom templates", included: true },
      { name: "MCP server access", included: true },
      { name: "Style mapping editor", included: true },
      { name: "Notion integration", included: true },
      { name: "Atlassian integration", included: true },
      { name: "SharePoint export", included: true },
      { name: "Team collaboration", included: true },
      { name: "API access", included: true },
      { name: "Email support", included: true },
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "For orgs that need control.",
    features: [
      { name: "Unlimited conversions", included: true },
      { name: "All templates", included: true },
      { name: "Markdown editor", included: true },
      { name: "Download as .docx", included: true },
      { name: "AI classification", included: true },
      { name: "Custom templates", included: true },
      { name: "MCP server access", included: true },
      { name: "Style mapping editor", included: true },
      { name: "Notion integration", included: true },
      { name: "Atlassian integration", included: true },
      { name: "SharePoint export", included: true },
      { name: "Team collaboration", included: true },
      { name: "API access", included: true },
      { name: "Priority support + SLA", included: true },
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

export const faqs = [
  {
    question: "Can I try MDDoc without signing up?",
    answer:
      "Yes. Head to the Convert page and convert a document right now. No account needed. You get 3 free conversions to kick the tires.",
  },
  {
    question: "What happens when my free conversions run out?",
    answer:
      "Nothing bad. Your documents are still there. You just can't convert new ones until next month, or until you upgrade to Solo or Team.",
  },
  {
    question: "Can I bring my own AI keys?",
    answer:
      "Yes. MDDoc supports both Anthropic Claude and OpenAI GPT. You plug in your own API key and pay those providers directly. We never see your keys.",
  },
  {
    question: "What's the difference between basic and custom templates?",
    answer:
      "Basic templates are the ones we provide — clean, professional, ready to go. Custom templates are your own Word .docx files with your org's branding, fonts, and styles. Upload them and MDDoc uses them for conversion.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes. Pay annually and save about 17%. The price shown with the annual toggle is per month, billed yearly.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No contracts, no cancellation fees. You keep access until the end of your billing period.",
  },
] as const;
