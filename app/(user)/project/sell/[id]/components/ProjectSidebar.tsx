import type { Project } from "@/types/project/project";

import ProjectSidebarPanel from "./ProjectSidebarPanel";
import ProjectSidebarSell from "./ProjectSidebarSell";

interface Props {
  project: Project;
}

export default function ProjectSidebar({ project }: Props) {
  return (
    <div className="space-y-6">
      <ProjectSidebarSell project={project} />
      <ProjectSidebarPanel creator={project.creator} stats={project.stats} />
    </div>
  );
}
