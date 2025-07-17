import type { Project } from "@/types/project/project";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://yetda.kro.kr"
).replace(/\/+$/, "");

export async function fetchAccessTokenFromRefresh() {
  try {
    const redirectUri = encodeURIComponent("http://localhost:3000");
    const res = await fetch(`${API_URL}/auth/refresh?state=${redirectUri}`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`발급 실패: ${res.status}`);
    }
    const data = await res.json();
    console.log("accessToken 발급 성공:", data);
    const accessToken = data.accessToken;
    console.log("발급된 accessToken:", accessToken);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    return accessToken;
  } catch (error) {
    console.error("accessToken 발급 에러:", error);
    return null;
  }
}
async function getAccessToken(): Promise<string | null> {
  const token = localStorage.getItem("accessToken");
  if (token) return token;
  return await fetchAccessTokenFromRefresh();
}

export async function createPurchaseProject(formData: FormData) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("accessToken 없음");

    const res = await fetch(`${API_URL}/api/v1/project/purchase`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const url = `${API_URL}/api/v1/project/${id}`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLqsJDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1Mjc1NTIwNSwiZXhwIjoxNzUyNzY2MDA1fQ.MLvzrHYd48rVlrC5Zy9IOMVSvtio-9I_knHOvkaQZpQ`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();

      if (res.status === 404) return null;
      if (res.status === 401) return null;
      if (res.status === 403) return null;

      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`,
      );
    }

    const data = await res.json();

    const project: Project = {
      ...data.data,
      images: data.data.contentImageUrls || [],
    };

    return project;
  } catch (err) {
    console.error(`프로젝트 ID ${id} 조회 실패:`, err);
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
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("accessToken 없음");

    const response = await fetch(`${API_URL}/api/v1/order/purchase`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
    console.error("구매 정보 생성 실패:", error);
    throw error;
  }
};

export const TossPurchaseApi = async (
  paymentKey: string,
  orderId: string,
  amount: number,
) => {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error("accessToken 없음");

  const response = await fetch(`${API_URL}/api/v1/toss/confirm`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error("accessToken 없음");

  const response = await fetch(`${API_URL}/api/v1/order/purchase/${optionId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error("accessToken 없음");

  const res = await fetch(`${API_URL}/api/v1/project/purchase/${projectId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  return res;
}
