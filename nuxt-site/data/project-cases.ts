export interface ProjectCase {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  labelImage: string;
}

export const projectCases: ProjectCase[] = [
  {
    slug: "landing-page",
    title: "Landing Page",
    image: "/images/brand/project-landing.png",
    imageAlt: "JUKSY 活動網站的首頁設計畫面",
    labelImage: "/images/brand/project-label-landing.svg",
  },
  {
    slug: "campaign-page",
    title: "Campaign Page",
    image: "/images/brand/project-campaign.png",
    imageAlt: "JUKSY 南北潮什麼活動網站的設計畫面",
    labelImage: "/images/brand/project-label-campaign.svg",
  },
  {
    slug: "planning-system",
    title: "Planning System",
    image: "/images/brand/project-planning.png",
    imageAlt: "Kingston Planning System 的系統畫面",
    labelImage: "/images/brand/project-label-planning.svg",
  },
  {
    slug: "production-monitor",
    title: "Production Monitor",
    image: "/images/brand/project-production.png",
    imageAlt: "Depanel Production Monitor 的系統畫面",
    labelImage: "/images/brand/project-label-production.svg",
  },
  {
    slug: "ai-agent",
    title: "AI Agent",
    image: "/images/brand/project-ai-agent.png",
    imageAlt: "BTIA AI Agent 的介面畫面",
    labelImage: "/images/brand/project-label-landing.svg",
  },
  {
    slug: "analytics-report",
    title: "Analytics Report",
    image: "/images/brand/project-analytics.png",
    imageAlt: "Wafer Flash Yield Report 的分析介面畫面",
    labelImage: "/images/brand/project-label-campaign.svg",
  },
];