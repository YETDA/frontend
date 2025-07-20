"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

import type { ProductFormData } from "@/types/productFormData";
import { getSellProjectById, updatePurchaseProject } from "@/apis/project";

import SellProjectEditor from "../../components/SellProjectEditor";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [initialFormData, setInitialFormData] =
    useState<ProductFormData | null>(null);

  useEffect(() => {
    (async () => {
      const project = await getSellProjectById(id);

      if (!project) {
        alert("프로젝트 정보를 불러오지 못했습니다.");
        return;
      }

      const converted: ProductFormData = {
        title: project.title,
        subtitle: project.introduce,
        description: project.content,
        category: project.purchaseCategoryName ?? "",
        price: project.purchaseOptions?.[0]?.price?.toString() ?? "",
        images: project.contentImageUrls.map(url => ({
          file: undefined,
          previewUrl: url,
        })),
        options: project.purchaseOptions.map(opt => ({
          name: opt.title,
          price: opt.price.toString(),
          description: opt.content,
          file: undefined,
          deliveryMethod: "FILE_UPLOAD",
        })),
        creatorName: project.name ?? "",
        creatorBio: project.userIntroduce ?? "",
        creatorAvatar: project.userProfileImage ?? "",
      };

      setInitialFormData(converted);
    })();
  }, [id]);

  const handleSubmit = async (formData: ProductFormData) => {
    try {
      const form = new FormData();

      const requestDto = {
        projectType: "PURCHASE",
        title: formData.title,
        introduce: formData.subtitle,
        content: formData.description,
        gitAddress: "https://github.com/example/portfolio-template",
        purchaseCategoryId: 1,
        averageDeliveryTime: "즉시 다운로드 가능",
      };

      form.append("requestDto", JSON.stringify(requestDto));

      formData.images.forEach(image => {
        if (image.file) {
          form.append("contentImage", image.file, image.file.name);
        }
      });

      const res = await updatePurchaseProject(id, form);
      if (!res.ok) {
        throw new Error("수정 실패");
      }

      alert("수정 완료");
      router.push(`/project/sell/${id}`);
    } catch (err) {
      console.error(err);
      alert("프로젝트 수정 중 오류 발생");
    }
  };

  if (!initialFormData) {
    return <p className="p-8 text-gray-500">불러오는 중...</p>;
  }

  return (
    <SellProjectEditor
      initialFormData={initialFormData}
      onSubmit={handleSubmit}
      submitButtonLabel="수정하기"
    />
  );
}
