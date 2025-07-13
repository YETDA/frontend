import type { Project } from "@/types/project/project";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLquYDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQyMjQ0MCwiZXhwIjoxNzUyNDMzMjQwfQ.haE8OD6yTGl4eD1lFi5Bs8NSD-kiKRGOav8IIiUeG2Y";

export async function createPurchaseProject(formData: FormData) {
  const res = await fetch(`${API_URL}/api/v1/project/purchase`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("등록 실패");
  return res;
}

export async function getSellProjectById(id: string): Promise<Project | null> {
  const res = await fetch(`${API_URL}/api/v1/project/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
