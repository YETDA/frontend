import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const popularProjectApi = async (page = 0, size = 20) => {
  const response = await axios.get(`${API}/api/v1/project/popular`, {
    params: {
      projectType: "DONATION",
      sortType: "LIKE",
      page,
      size,
    },
  });
  console.log("인기프로젝트 조회", response.data);
  return response.data;
};
