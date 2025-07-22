import axios from "axios";
import { useEffect, useState } from "react";

export function useLike() {
  const [likeData, setLikeData] = useState<any>(null);

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/like/project`,
          {
            params: {
              page: 0,
              size: 20,
              sort: "createdAt,desc",
            },
            withCredentials: true,
          },
        );

        setLikeData(res.data.data);
      } catch (err) {
        console.error(
          "로그인 필요 또는 좋아요 한 프로젝트 불러오기 실패:",
          err,
        );
      }
    };

    fetchLike();
  }, []);

  return likeData;
}
