"use client";

import { useLike } from "@/apis/like/useLike";
import LikeCard, { ProjectProps } from "./components/LikeCard";

export default function LikePage() {
  const getLike = useLike();
  return (
    <main>
      <>
        <div className="grid grid-cols-4 gap-10 px-4 py-4">
          {getLike?.content?.map((project: ProjectProps, index: number) => (
            <LikeCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </>
    </main>
  );
}
