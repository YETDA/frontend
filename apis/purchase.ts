import type { Project } from "@/types/project/project";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://yetda.kro.kr"
).replace(/\/+$/, "");

export async function createPurchaseProject(formData: FormData) {
  const token = localStorage.getItem("accessToken") ?? "";
  const res = await fetch(`${API_URL}/api/v1/project/purchase`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  return (await res.json()).data;
}

/**
 * 판매형 프로젝트 상세 조회
 */
export async function getSellProjectById(id: string): Promise<Project | null> {
  const url = `${API_URL}/api/v1/project/${id}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("accessToken");
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers,
  });
  if (!res.ok) {
    if ([401, 403, 404].includes(res.status)) return null;
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
  const { data } = await res.json();
  return {
    ...data,
    images: data.contentImageUrls || [],
  } as Project;
}

/**
 * 판매형 프로젝트 수정
 */
export async function updatePurchaseProject(
  projectId: string,
  formData: FormData,
): Promise<void> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("accessToken");
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(`${API_URL}/api/v1/project/purchase/${projectId}`, {
    method: "PUT",
    credentials: "include",
    headers,
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
}

/**
 * 구매 주문 생성
 */
export async function createPurchaseInfo({
  projectId,
  optionIds,
  email,
}: {
  projectId: number;
  optionIds: number[];
  email: string;
}) {
  const res = await fetch(`${API_URL}/api/v1/order/purchase`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectId,
      projectType: "PURCHASE",
      customerEmail: email,
      purchaseOptions: optionIds,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()).data;
}

/**
 * Toss 결제 확정
 */
export async function tossPurchaseApi(
  paymentKey: string,
  orderId: string,
  amount: number,
) {
  const res = await fetch(`${API_URL}/api/v1/toss/confirm`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()).data;
}

/**
 * 구매 파일 URL 조회
 */
export async function getPurchasedFileUrl(
  optionId: number,
): Promise<string | null> {
  const res = await fetch(`${API_URL}/api/v1/order/purchase/${optionId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()).data.fileUrl as string | null;
}
