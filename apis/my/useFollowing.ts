import axios from "axios";
import { useEffect, useState } from "react";

export interface FollowingCount {
  userId: number;
  name: string;
  image: string;
}

export interface FollowingResponse {
  timestamp: string;
  statusCode: number;
  message: string;
  data: FollowingCount[];
}

export function useFollowing() {
  const [followData, setFollowData] = useState<FollowingResponse | null>(null);

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/follow/following`,
          {
            withCredentials: true,
          },
        );

        setFollowData(res.data);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

    fetchFollow();
  }, []);

  return followData;
}
