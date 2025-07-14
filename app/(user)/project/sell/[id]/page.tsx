import { notFound } from "next/navigation";
import type { Project } from "@/types/project/project";
import { getSellProjectById } from "@/app/api/project";
import ProjectDescriptionTabs from "./components/ProjectDescriptionTabs";
import ProjectHeader from "./components/ProjectHeader";
import ProjectImageGallery from "./components/ProjectImageGallery";
import ProjectSidebar from "./components/ProjectSidebar";

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const { id } = params;
  const project: Project | null = await getSellProjectById(id);

  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-12">
            <ProjectHeader project={project} />
            <ProjectImageGallery images={project.contentImageUrls} />
            <ProjectDescriptionTabs
              description={project.content}
              faqs={[]}
              reviews={[]}
              updates={[]}
            />
          </div>
          <div className="sticky top-24 self-start">
            <ProjectSidebar project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
