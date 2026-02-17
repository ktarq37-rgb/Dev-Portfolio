import { PortfolioPage } from "@/components/portfolio-page";
import { profile, skills, projects, services } from "@/lib/data";

export default function Home() {
  return (
    <PortfolioPage
      profile={profile}
      skills={skills}
      projects={projects}
      services={services}
    />
  );
}
