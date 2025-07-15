import type { Project } from "@/types/project/project";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://yetda.kro.kr"
).replace(/\/+$/, "");

export async function createPurchaseProject(formData: FormData) {
  try {
    const res = await fetch(`${API_URL}/api/v1/project/purchase`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    console.error("프로젝트 등록 실패:", err);
    throw err;
  }
}

export async function getSellProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/project/${id}`, {
      method: "GET",
      credentials: "include", // 쿠키를 포함하여 요청
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const project: Project = {
      ...data.data,
      images: data.data.contentImageUrls || [],
    };

    return project;
  } catch (err) {
    console.error("프로젝트 조회 실패:", err);
    return null;
  }
}

export const CreatePurchaseInfo = async ({
  projectId,
  optionIds,
  email,
}: {
  projectId: number;
  optionIds: number[];
  email: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/order/purchase`, {
      method: "POST",
      credentials: "include", // 쿠키를 포함하여 요청
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        projectType: "PURCHASE",
        customerEmail: email,
        purchaseOptions: optionIds,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating purchase info:", error);
    throw error;
  }
};

export const TossPurchaseApi = async (
  paymentKey: string,
  orderId: string,
  amount: number,
) => {
  const response = await fetch(`${API_URL}/api/v1/toss/confirm`, {
    method: "POST",
    credentials: "include", // 쿠키를 포함하여 요청
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentKey,
      orderId,
      amount,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const GetPurchasedFileUrl = async (optionId: number) => {
  const response = await fetch(`${API_URL}/api/v1/order/purchase/${optionId}`, {
    method: "GET",
    credentials: "include", // 쿠키를 포함하여 요청
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.fileUrl as string | null;
};
export async function updatePurchaseProject(
  projectId: string,
  formData: FormData,
): Promise<Response> {
  const res = await fetch(`${API_URL}/api/v1/project/purchase/${projectId}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  return res; // ✅ fetch의 Response 그대로 넘김
}
