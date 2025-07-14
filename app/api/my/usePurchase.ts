import { useEffect, useState } from "react";
import { PurchaseProject } from "@/types/user/purchaseProject";
import axios from "axios";

export function usePurchase() {
  const [projectData, setProjectData] = useState<PurchaseProject | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/purchase`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLqsJDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQ5NTY5NywiZXhwIjoxNzUyNTA2NDk3fQ.0VL3n2CVJgna0eXp2ZAtRV5Xxc5vGYqq_xbEYJj1XOA`,
            },
          },
        );

        setProjectData(res.data.data);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

    fetchProject();
  }, []);

  return projectData;
}
