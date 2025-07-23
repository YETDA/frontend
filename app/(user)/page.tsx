// import { HeroBanner } from "@/components/HeroBanner";
// import { ProjectCarousel } from "@/components/ProjectCarousel";
// import ProjectList from "@/components/ProjectList";
import MainSection from "./components/_Section/MainSection";
import OnboardingSection from "./components/_Section/OnBoardingSection";
import PundingSection from "./components/_Section/PundingSection";
import PurchaseSection from "./components/_Section/PurchaseSection";
import StartSection from "./components/_Section/StartSection";
export default function HomePage() {
  return (
    <main className="min-h-screen max-w-[1168px] w-full bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* <HeroBanner />
      <ProjectCarousel />
      <ProjectList /> */}
      <MainSection />
      <PundingSection />
      <PurchaseSection />
      <OnboardingSection />
      <StartSection />
    </main>
  );
}
