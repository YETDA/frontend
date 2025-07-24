"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Download } from "lucide-react";
import type { Project, ProductOption } from "@/types/project/project";
import { GetPurchasedFileUrl, CreatePurchaseInfo } from "@/apis/project";

interface Props {
  project: Project;
}

const getDeliveryMethodInfo = (method: string) => {
  switch (method) {
    case "DOWNLOAD":
      return {
        icon: "💾",
        name: "즉시 다운로드",
        description: "구매 즉시 파일 링크를 제공합니다.",
      };
    case "EMAIL":
      return {
        icon: "📧",
        name: "이메일 전달",
        description: "구매 후 등록된 이메일로 파일을 전송합니다.",
      };
    default:
      return { icon: "", name: method, description: "" };
  }
};

export default function ProjectSidebarSell({ project }: Props) {
  const [optIdx, setOptIdx] = useState(0);
  const selected = project.purchaseOptions[optIdx] as ProductOption;

  const [isPurchased, setIsPurchased] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function check() {
      if (!selected) return;
      try {
        const url = await GetPurchasedFileUrl(selected.purchaseOptionId);
        setDownloadUrl(url);
        setIsPurchased(true);
      } catch {
        setDownloadUrl(null);
        setIsPurchased(false);
      }
    }
    check();
  }, [selected.purchaseOptionId]);

  const handlePurchase = async () => {
    try {
      const { orderId, totalAmount } = await CreatePurchaseInfo({
        projectId: Number(project.projectId),
        optionIds: [selected.purchaseOptionId],
        email: "test@naver.com",
      });
      const payUrl = `/toss?orderId=${encodeURIComponent(
        orderId,
      )}&amount=${encodeURIComponent(totalAmount)}`;
      window.open(
        payUrl,
        "TossPayment",
        "width=600,height=700,left=200,top=100",
      );
    } catch {
      setError("결제 요청 중 오류가 발생했습니다.");
    }
  };

  const delivery = getDeliveryMethodInfo(selected.providingMethod);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow border border-purple-100">
      <div className="flex border-b border-purple-200 mb-4">
        {project.purchaseOptions.map((opt, i) => (
          <button
            key={opt.purchaseOptionId}
            onClick={() => setOptIdx(i)}
            className={`flex-1 py-2 text-center font-medium ${
              i === optIdx
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {opt.title}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <span className="text-3xl font-bold text-blue-600">
          {selected.price.toLocaleString()}원
        </span>
        {selected.content && (
          <p className="mt-2 text-sm text-gray-700">{selected.content}</p>
        )}
      </div>
      <div className="mt-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">전달 방식</h3>
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
          <span className="text-2xl">{delivery.icon}</span>
          <div>
            <div className="font-medium text-gray-900">{delivery.name}</div>
            <div className="text-sm text-gray-600">{delivery.description}</div>
          </div>
        </div>
      </div>
      {isPurchased && downloadUrl ? (
        <a href={downloadUrl} download>
          <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center space-x-2">
            <Download className="w-6 h-6" />
            <span className="font-semibold">다운로드</span>
          </button>
        </a>
      ) : (
        <button
          onClick={handlePurchase}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="font-semibold">구매하기</span>
        </button>
      )}

      {error && (
        <p className="mt-2 text-center text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}
