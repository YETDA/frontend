"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { ProductFormData } from "@/types/productFormData";

import { getSellProjectById, updatePurchaseProject } from "@/app/api/project";

import SellProjectEditor from "../../components/SellProjectEditor";

interface Props {
  params: { id: string };
}

export default function EditProjectPage({ params }: Props) {
  const router = useRouter();
  const [initialFormData, setInitialFormData] =
    useState<ProductFormData | null>(null);

  useEffect(() => {
    (async () => {
      const project = await getSellProjectById(params.id);
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
          file: undefined as unknown as File, // file이 필수이므로 타입 일치시킴
          previewUrl: url,
        })),
        options: project.purchaseOptions.map(opt => ({
          name: opt.title,
          price: opt.price.toString(),
          description: opt.content,
          file: undefined,
        })),
        creatorName: project.name ?? "",
        creatorBio: project.userIntroduce ?? "",
        creatorAvatar: project.userProfileImage ?? "",
      };

      setInitialFormData(converted);
    })();
  }, [params.id]);

  const handleSubmit = async (formData: ProductFormData) => {
    try {
      const form = new FormData();

      const requestDto = {
        title: formData.title,
        introduce: formData.subtitle,
        content: formData.description,
        field: formData.category,
        purchaseDetail: {
          purchaseOptionList: formData.options.map(option => ({
            providingMethod: "DOWNLOAD",
            title: option.name,
            content: option.description,
            price: Number(option.price),
            optionStatus: "AVAILABLE",
            fileIdentifier: option.file?.name ?? "",
            originalFileName: option.file?.name ?? "",
            fileType: option.file?.type ?? "application/octet-stream",
            fileSize: option.file?.size ?? 0,
            fileUrl: "string",
          })),
        },
      };

      form.append("requestDto", JSON.stringify(requestDto));

      formData.images.forEach(image => {
        if (image.file) {
          form.append("contentImage", image.file, image.file.name);
        }
      });

      formData.options.forEach(opt => {
        if (opt.file) {
          form.append("optionFiles", opt.file, opt.file.name);
        }
      });

      const res = await updatePurchaseProject(params.id, form);
      if (res.status !== 200) {
        throw new Error("수정 실패");
      }

      alert("수정 완료");
      router.push(`/project/sell/${params.id}`);
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
