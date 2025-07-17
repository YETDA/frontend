import { useEffect, useState } from "react";
import { Order } from "@/types/user/orderList";
import axios from "axios";

export function useOrderList() {
  const [OrderData, setOrderData] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order`,
          {
            withCredentials: true,
          },
        );
        setOrderData(res.data.data.content);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

    fetchProject();
  }, []);

  return OrderData;
}
