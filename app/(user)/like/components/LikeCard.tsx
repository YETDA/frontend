import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { MyCardContent, MyCardHeader } from "../../my/components/ui/MyCard";
import { Heart } from "lucide-react";
import { useState } from "react";
import { createLike } from "@/apis/like/LikeApi";

export interface ProjectProps {
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

interface MyProjectCardProps {
  project: ProjectProps;
}

export default function LikeCard({ project }: MyProjectCardProps) {
  const [liked, setLiked] = useState(true);
  const linkHref =
    project.projectType === "donation"
      ? `/project/donation/${project.id}`
      : `/project/purchase/${project.id}`;
  return (
    <Link href={linkHref} passHref>
      <Card className="w-full border-gray-200 max-w-[280px] max-h-[330px] rounded-xl overflow-hidden flex flex-col hover:shadow-lg">
        {/* 카드 이미지 */}
        <MyCardHeader>
          <div className="relative w-full h-[120px]">
            <Image
              src={project.thumbnail}
              alt="Project Image"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </MyCardHeader>

        {/* 카드 내용 */}
        <MyCardContent className="flex flex-col justify-between gap-2.5 p-4">
          <div className="text-xs text-[#868E96]">{project.hostName}</div>

          <CardTitle className="text-md truncate w-full">
            {project.title}
          </CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="text-sm text-gray-700">
              {project.sellingAmount}원 판매
            </div>
            <Heart
              onClick={async e => {
                e.preventDefault();
                try {
                  const success = await createLike({ projectId: project.id });
                  if (success) {
                    setLiked(false);
                  }
                } catch (error) {
                  console.error("좋아요 실패:", error);
                }
              }}
              className={liked ? "fill-red-400 text-red-400" : "text-red-400"}
            />
          </div>
        </MyCardContent>
      </Card>
    </Link>
  );
}
