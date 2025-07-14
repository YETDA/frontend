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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/follow/followers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob24yZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiLquYDsnKDsoIAiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MjQ4NjEyNywiZXhwIjoxNzUyNDk2OTI3fQ.h3OWtqbunjSOAHQ7b-kWsrMjmHOkw2b8QLHmsm85Kps`,
            },
          },
        );

        const data = await res.json();
        console.log("팔로우 목록 확인 api", data);

        setFollowData(data);
      } catch (err) {
        console.error("로그인 필요 또는 인증 실패:", err);
      }
    };

    fetchFollow();
  }, []);

  return followData;
}
