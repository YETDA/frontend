import { Project } from "@/types/project/project";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://yetda.kro.kr"
).replace(/\/+$/, "");

export async function getDonationProjectById(
  id: string,
): Promise<Project | null> {
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
