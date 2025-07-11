import HomeCarousel from "./components/HomeCarousel";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  return (
    <main>
      <HomeCarousel />
      <div className="w-full justify-center items-start text-lg font-bold p-4">
        인기 프로젝트
      </div>
      <div className="grid grid-cols-4 gap-10">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </main>
  );
}
