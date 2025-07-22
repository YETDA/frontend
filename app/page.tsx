import { HeroBanner } from "@/components/HeroBanner";
import { ProjectCarousel } from "@/components/ProjectCarousel";
// import { CTASection } from "@/components/CTASection";
import ProjectList from "@/components/ProjectList";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <HeroBanner />
      <ProjectCarousel />
      <ProjectList />
      {/* <CTASection /> */}
    </main>
  );
}
