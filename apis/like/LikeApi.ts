import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LikeProps {
  projectId: number;
}

export async function createLike({ projectId }: LikeProps): Promise<boolean> {
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/like/project/${projectId}`,
      {},
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    console.error("좋아요 요청 실패:", err);
    throw err;
  }
}
