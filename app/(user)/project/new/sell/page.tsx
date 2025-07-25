"use client";

import { useRouter } from "next/navigation";
import type { ProductFormData } from "@/types/productFormData";
import { createPurchaseProject } from "@/apis/purchase";
import SellProjectEditor from "./components/SellProjectEditor";

export default function SellProjectPage() {
  const router = useRouter();

  const initialFormData: ProductFormData = {
    title: "",
    subtitle: "",
    description: "",
    category: "",
    price: "",
    images: [],
    options: [
      {
        name: "STANDARD",
        price: "0",
        description: "",
        deliveryMethod: "FILE_UPLOAD",
      },
    ],
    creatorName: "",
    creatorBio: "",
    creatorAvatar: "",
  };

  const handleSubmit = async (
    formData: ProductFormData,
    planType: "BASIC" | "PRO",
  ) => {
    const pricingPlanId = planType === "BASIC" ? 1 : 2;

    const purchaseOptionList = formData.options.map(option => {
      const base = {
        title: option.name,
        content: option.description,
        price: Number(option.price),
        optionStatus: "AVAILABLE" as const,
      };

      if (option.deliveryMethod === "FILE_UPLOAD" && option.file) {
        return {
          providingMethod: "DOWNLOAD" as const,
          ...base,
          fileIdentifier: option.file.name,
          originalFileName: option.file.name,
          fileType: option.file.type,
          fileSize: option.file.size,
        };
      } else {
        return {
          providingMethod: "EMAIL" as const,
          ...base,
        };
      }
    });

    const requestDto = {
      projectType: "PURCHASE",
      title: formData.title,
      introduce: formData.subtitle,
      content: formData.description,
      field: formData.category,
      pricingPlanId,
      purchaseDetail: {
        gitAddress: "",
        purchaseCategoryId: 1,
        getAverageDeliveryTime: "즉시 다운로드 및 24시간 이내 이메일 발송",
        purchaseOptionList,
      },
    };

    const form = new FormData();
    form.append("requestDto", JSON.stringify(requestDto));
    formData.images.forEach(img => {
      if (img.file) {
        form.append("contentImage", img.file, img.file.name);
      }
    });
    formData.options.forEach(opt => {
      if (opt.deliveryMethod === "FILE_UPLOAD" && opt.file) {
        form.append("optionFiles", opt.file, opt.file.name);
      }
    });

    try {
      const res = await createPurchaseProject(form);
      const projectId = res.data?.data?.projectId;
      alert("등록 완료");
      router.push(`/project/sell/${projectId}`);
    } catch (err) {
      console.error("프로젝트 등록 실패:", err);
      alert("프로젝트 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <SellProjectEditor
      initialFormData={initialFormData}
      onSubmit={handleSubmit}
      submitButtonLabel="등록하기"
    />
  );
}
