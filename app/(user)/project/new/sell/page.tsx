"use client";

import { useRouter } from "next/navigation";

import type { ProductFormData } from "@/types/productFormData";
import { createPurchaseProject } from "@/apis/project";
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
      alert("가격은 숫자만 입력해주세요.");
      return;
    }

    if (formData.options.length === 0) {
      alert("옵션을 하나 이상 추가해주세요.");
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

    const form = new FormData();

    const requestDto = {
      projectType: "PURCHASE",
      title: formData.title,
      introduce: formData.subtitle,
      content: formData.description,
      field: formData.category,
      pricingPlanId: 3,
      purchaseDetail: {
        gitAddress: "",
        purchaseCategoryId: 1,
        getAverageDeliveryTime: "즉시 다운로드 및 24시간 이내 이메일 발송",
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
