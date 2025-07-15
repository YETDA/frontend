import axios from "axios";
import { useEffect, useState } from "react";

export interface FollowCount {
  userId: number;
  name: string;
  image: string;
}

export interface FollowResponse {
  timestamp: string;
  statusCode: number;
  message: string;
  data: FollowCount[];
}

export function useFollow() {
  const [followData, setFollowData] = useState<FollowResponse | null>(null);

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/follow/followers`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLqsJDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQ5NTY5NywiZXhwIjoxNzUyNTA2NDk3fQ.0VL3n2CVJgna0eXp2ZAtRV5Xxc5vGYqq_xbEYJj1XOA`,
            },
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
