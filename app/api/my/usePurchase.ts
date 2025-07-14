import { useEffect, useState } from "react";
import { PurchaseProject } from "@/types/user/purchaseProject";

export function usePurchase() {
  const [projectData, setProjectData] = useState<PurchaseProject | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/purchase`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLquYDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQ4NjEyNywiZXhwIjoxNzUyNDk2OTI3fQ.h3OWtqbunjSOAHQ7b-kWsrMjmHOkw2b8QLHmsm85Kps`,
            },
          },
        );

        const data = await res.json();
        console.log("구매 프로젝트 목록 확인 api", data.data);
        setProjectData(data.data);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

    fetchProject();
  }, []);

  return projectData;
}
