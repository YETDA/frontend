import axios from "axios";
import { useEffect, useState } from "react";

export interface FollowCount {
  followerCount: number;
  followingCount: number;
}

export interface FollowResponse {
  timestamp: string;
  statusCode: number;
  message: string;
  data: FollowCount;
}

export function useFollowCount() {
  const [followCountData, setFollowCountData] = useState<FollowResponse | null>(
    null,
  );

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/follow/count`,
          {
            withCredentials: true,
          },
        );
        setFollowCountData(res.data);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

    fetchFollow();
  }, []);

  return followCountData;
}
