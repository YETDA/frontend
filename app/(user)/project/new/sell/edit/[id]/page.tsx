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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const project = await getSellProjectById(id);
      if (!project) {
        alert("프로젝트 정보를 불러오지 못했습니다.");
        router.back();
        return;
      }

      setInitialFormData({
        title: project.title,
        subtitle: project.introduce,
        description: project.content,
        category: project.purchaseCategoryName || "",
        price: project.purchaseOptions?.[0]?.price.toString() || "",
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
        creatorName: project.name || "",
        creatorBio: project.userIntroduce || "",
        creatorAvatar: project.userProfileImage || "",
      });
    })();
  }, [id, router]);

  const handleSubmit = async (formData: ProductFormData) => {
    if (!formData.title.trim()) {
      alert("프로젝트 제목을 입력해주세요.");
      return;
    }
    if (!formData.subtitle.trim()) {
      alert("부제목을 입력해주세요.");
      return;
    }
    if (!formData.description.trim()) {
      alert("프로젝트 설명을 입력해주세요.");
      return;
    }
    if (!formData.category.trim()) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    if (!/^[0-9]+$/.test(formData.price)) {
      alert("프로젝트 가격은 숫자만 입력해주세요.");
      return;
    }
    if (formData.options.length === 0) {
      alert("옵션을 하나 이상 입력해주세요.");
      return;
    }
    for (let i = 0; i < formData.options.length; i++) {
      const opt = formData.options[i];
      if (!opt.name.trim()) {
        alert(`옵션 ${i + 1}의 제목을 입력해주세요.`);
        return;
      }
      if (!/^[0-9]+$/.test(opt.price) || Number(opt.price) <= 0) {
        alert(`옵션 ${i + 1}의 가격은 1원 이상의 숫자만 입력해주세요.`);
        return;
      }
      if (!opt.description.trim()) {
        alert(`옵션 ${i + 1}의 설명을 입력해주세요.`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append(
        "requestDto",
        JSON.stringify({
          projectType: "PURCHASE",
          title: formData.title,
          introduce: formData.subtitle,
          content: formData.description,
          gitAddress: "https://github.com/example/portfolio-template",
          purchaseCategoryId: 1,
          averageDeliveryTime: "즉시 다운로드 가능",
        }),
      );

      formData.images.forEach(img => {
        if (img.file) {
          form.append("contentImage", img.file, img.file.name);
        }
      });

      await updatePurchaseProject(id, form);

      alert("프로젝트 수정 완료");
      router.push(`/project/sell/${id}`);
    } catch (err) {
      console.error("프로젝트 수정 중 오류 발생:", err);
      alert("프로젝트 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialFormData) {
    return <p className="p-8 text-gray-500">프로젝트 정보를 불러오는 중...</p>;
  }

  return (
    <SellProjectEditor
      initialFormData={initialFormData}
      onSubmit={handleSubmit}
      submitButtonLabel={isSubmitting ? "수정 중..." : "수정하기"}
    />
  );
}
