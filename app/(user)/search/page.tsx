import ProjectCard from "../components/ProjectCard";

export default function SearchPage() {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div className="w-full flex justify-start items-center">
        789개의 검색결과가 있습니다.
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
    </div>
  );
}
