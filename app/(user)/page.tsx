"use client";

import HomeCarousel from "./components/HomeCarousel";
import ProjectCard from "./components/ProjectCard";
import React, { useState } from "react";
import { popularProjectApi } from "@/app/api/popular-project/api";

export default function Home() {
  const [projects, setProjects] = useState([]);

  const handleLoadPopular = async () => {
    try {
      const data = await popularProjectApi();
      console.log("받아온 인기 프로젝트:", data);
      setProjects(data);
    } catch (err) {
      console.error("인기 프로젝트 조회 실패:", err);
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
      </div>
      <button onClick={handleLoadPopular}>인기 프로젝트</button>
    </main>
  );
}
