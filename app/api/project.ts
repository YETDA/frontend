import axios from "axios";

import type { Project } from "@/types/project/project";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLquYDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQ1MzgzOCwiZXhwIjoxNzUyNDY0NjM4fQ.hMd1JIo5cCY9w5YCxtPnHJb6zcIQGUNrf79vmoKfKqQ";

export async function createPurchaseProject(formData: FormData) {
  const res = await fetch(`${API_URL}/api/v1/project/purchase`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("등록 실패");
  return res;
}

export async function getSellProjectById(id: string): Promise<Project | null> {
  const res = await fetch(`${API_URL}/api/v1/project/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`API 호출 실패: ${res.status}`);
    return null;
  }

  const json = await res.json();

  const project: Project = {
    ...json.data,
    images: json.data.contentImageUrls || [],
  };

  return project;
}

export const CreatePurchaseInfo = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/order/purchase`,
      {
        projectId: 1,
        projectType: "PURCHASE",
        customerEmail: "test@naver.com",
        purchaseOptions: [1],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating purchase info:", error);
    throw error;
  }
};

export const TossPurchaseApi = async (paymentKey: string, orderId: string) => {
  const response = await axios.post(`${API_URL}/api/v1/toss/confirm`, {
    paymentKey,
    orderId,
    amount: 1,
  });
  return response.data;
};
