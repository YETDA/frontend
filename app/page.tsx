import { HeroBanner } from "@/components/HeroBanner";
// import { CTASection } from "@/components/CTASection";

import { ProjectGridWithSidebar } from "@/components/ProjectGridWithSidebar";
import ProjectList from "@/components/ProjectList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <HeroBanner />w
      <ProjectGridWithSidebar />
      <ProjectList />
      {/* <CTASection /> */}
    </main>
  );
}
