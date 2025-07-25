"use client";

import React, { use, useState, useEffect } from "react";
import type { Project as ApiProject } from "@/types/project/project";
import { getSellProjectById } from "@/apis/project";
import ProductHeader from "./components/ProductHeader";
import ImageGallery from "./components/ImageGallery";
import DescriptionCard from "./components/DescriptionCard";
import ProjectSidebarSell from "./components/ProjectSidebarSell";
import { Tag, Gift } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { createLike } from "@/apis/like/LikeApi";

const categories: { id: string; name: string; icon: string }[] = [
  { id: "app-service", name: "앱/서비스", icon: "📱" },
  { id: "notion-template", name: "노션 템플릿", icon: "📝" },
  { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊" },
  { id: "automation-tool", name: "자동화툴", icon: "⚙️" },
  { id: "design-resource", name: "디자인 리소스", icon: "🎨" },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getSellProjectById(id)
      .then(res => setProject(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="text-center py-20 text-lg text-gray-600">로딩 중...</p>
    );
  }
  if (!project) {
    return (
      <p className="text-center py-20 text-lg text-gray-600">
        프로젝트를 찾을 수 없습니다.
      </p>
    );
  }

  const cat = categories.find(c => c.name === project.purchaseCategoryName);

  const handleToggleLike = async () => {
    if (liked) return;

    try {
      const success = await createLike({ projectId: parseInt(id) });
      if (success) {
        setLiked(true);
      }
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <ProductHeader
        liked={liked}
        onToggleLike={handleToggleLike}
        category={
          cat ? { id: cat.id, icon: cat.icon, name: cat.name } : undefined
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-8">
          <ImageGallery urls={project.contentImageUrls} title={project.title} />
          <DescriptionCard content={project.content} />
        </section>

        <aside className="space-y-8">
          <div className="space-y-2">
            <div
              className={`inline-flex items-center space-x-2 text-base ${
                project.purchaseOptions.length > 0
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {project.purchaseOptions.length > 0 ? (
                <>
                  <Tag className="w-5 h-5 text-blue-600" />
                  <span>판매</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5 text-red-600" />
                  <span>후원</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-lg text-gray-600">{project.introduce}</p>
          </div>

          <ProjectSidebarSell project={project} />

          <div className="p-6 bg-white rounded-2xl shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">창작자</h3>
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 border-2 border-gray-200 shadow-sm">
                <AvatarImage
                  src={project.userProfileImage || "/placeholder.svg"}
                  className="object-cover"
                />
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {project.name}
                </div>
                <div className="text-sm text-gray-600">
                  프로젝트 {project.projectCount}개 • 팔로워{" "}
                  {project.followerCount.toLocaleString()}명
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200">
                팔로우
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
