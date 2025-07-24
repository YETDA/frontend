"use client";

import { useLike } from "@/apis/like/useLike";
import MyProjectCard from "../my/components/ui/MyProjectCard";

interface LikeProject {
  id: number;
  title: string;
  introduce: string;
  thumbnail: string;
  projectType: string;
  projectLikeCount: number;
  achievementRate: number;
  sellingAmount: number;
  projectEndDate: Date;
  hostId: number;
  hostName: string;
  hostProfileImageUrl: string;
}

export default function LikePage() {
  const getLike = useLike();
  console.log("유저가 좋아요 한 프로젝트: ", getLike);
  return (
    <main>
      <>
        <div className="grid grid-cols-4 gap-10 px-4">
          {getLike?.content?.map((project: LikeProject, index: number) => (
            <MyProjectCard
              key={`${project.id}-${index}`}
              project={{
                id: project.id,
                title: project.title,
                sellCount: project.sellingAmount,
                projectStatus: project.introduce,
                contentImageUrls:
                  project.thumbnail || "/images/sample-image.jpg",
                hostName: project.hostName ?? "아직 모름",
              }}
            />
          ))}
        </div>
      </>
    </main>
  );
}
