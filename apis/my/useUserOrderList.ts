import { useEffect, useState } from "react";
import axios from "axios";

export function useUserOrderList() {
  const [userOrderList, setUserOrderData] = useState<any>(null);

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/project/purchase/me/list`,
          {
            params: {
              page: 0,
              size: 20,
              sort: "createdAt,desc",
            },
            withCredentials: true,
          },
        );
        setUserOrderData(res.data.data);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

    fetchFollow();
  }, []);

  return userOrderList;
}
