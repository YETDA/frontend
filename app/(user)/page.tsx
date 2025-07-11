// import HomeCarousel from "./components/HomeCarousel";
// import ProjectCard from "./components/ProjectCard";

// export default function Home() {
//   return (
//     <main>
//       <HomeCarousel />
//       <div className="w-full justify-center items-start text-lg font-bold p-4">
//         인기 프로젝트
//       </div>
//       <div className="grid grid-cols-4 gap-10">
//         <ProjectCard />
//         <ProjectCard />
//         <ProjectCard />
//         <ProjectCard />
//         <ProjectCard />
//         <ProjectCard />
//         <ProjectCard />
//         <ProjectCard />
//       </div>
//     </main>
//   );
// }

"use client";

import HomeCarousel from "./components/HomeCarousel";
import ProjectCard from "./components/ProjectCard";
import { kakaoLogin } from "@/app/api/auth/loginApi"; // 경로는 실제 위치에 맞게 조정

export default function Home() {
  const handleLogin = async () => {
    try {
      const data = await kakaoLogin();
      console.log("카카오 로그인 응답:", data);
      // 보통 여기서 redirect URL을 받아 이동하거나, 팝업 띄우기도 함
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <main>
      <HomeCarousel />
      <div className="w-full justify-center items-start text-lg font-bold p-4">
        인기 프로젝트
      </div>
      <div className="grid grid-cols-4 gap-10">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />

        <button
          onClick={handleLogin}
          className="bg-yellow-400 rounded-lg px-4 py-2 hover:bg-yellow-500"
        >
          카카오 로그인 테스트
        </button>
      </div>
    </main>
  );
}
