export type Job = {
  slug: string;
  title: string;
  location: string;
  summary?: string;
  education?: string[];
  workExperience?: string[];
  skills?: string[];
  responsibilities?: string[];
  verified: boolean;
};

export const jobs: Job[] = [
  {
    slug: "business-control",
    title: "Business Control",
    location: "Mandaluyong",
    verified: true,
    summary:
      "Responsible for monitoring and improving the company's financial and operational performance. The role involves preparing budgets and forecasts, analyzing business results, tracking key performance indicators (KPIs), identifying cost-saving opportunities, and ensuring compliance with company policies and financial controls. The position works closely with finance, operations, sales, and management to support strategic decision-making, improve profitability, and ensure efficient business processes.",
    education: [
      "Bachelor's degree in Industrial Engineering, Accounting, Finance, Business Administration, Economics, or a related field.",
      "Professional certifications (e.g., CPA, CMA, or ACCA) are an advantage.",
    ],
    workExperience: [
      "2–5 years of experience in business control, financial analysis, accounting, budgeting, controlling, or a related finance role.",
      "Experience in manufacturing, paper, FMCG, or industrial companies is preferred.",
      "Ability to work with cross-functional teams and support management with data-driven business decisions.",
    ],
    skills: [
      "Budgeting and forecasting",
      "Financial reporting and analysis",
      "Cost control and variance analysis",
      "Internal controls and compliance",
      "ERP systems (e.g., SAP, Oracle, Microsoft Dynamics) and advanced Microsoft Excel",
      "Business performance management",
      "Analytical and problem-solving skills",
      "Communication and stakeholder management",
      "Attention to detail",
      "Knowledge of accounting and internal controls",
    ],
    responsibilities: [
      "Prepare and monitor budgets, forecasts, and financial reports.",
      "Analyze financial and operational performance.",
      "Track KPIs and identify performance trends.",
      "Support cost control and profitability improvement initiatives.",
      "Ensure compliance with internal controls and company policies.",
      "Assist management with business planning and strategic decisions.",
      "Collaborate with cross-functional teams to improve operational efficiency.",
      "Conduct variance analysis and recommend corrective actions.",
    ],
  },
  {
    slug: "admin-staff",
    title: "Admin Staff",
    location: "Pampanga",
    verified: false,
  },
  {
    slug: "logistic-officer",
    title: "Logistic Officer",
    location: "Tacloban",
    verified: false,
  },
  {
    slug: "dc-supervisor",
    title: "DC Supervisor",
    location: "Davao and Tacloban",
    verified: false,
  },
  {
    slug: "logistic-coordinator",
    title: "Logistic Coordinator",
    location: "Cebu",
    verified: false,
  },
  {
    slug: "accounting-supervisor",
    title: "Accounting Supervisor",
    location: "Pampanga",
    verified: false,
  },
];
