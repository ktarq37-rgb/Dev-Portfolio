import { PortfolioPage } from "@/components/portfolio-page";
import { profile, skillCategories, projects, services } from "@/lib/data";

export default function Home() {
  return (
    <PortfolioPage
      profile={profile}
      skillCategories={skillCategories}
      projects={projects}
      services={services}
    />
  );
}
