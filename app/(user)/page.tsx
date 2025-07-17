// app/(user)/page.tsx
import React, { Suspense } from "react";
import HomeClient from "./components/HomeClient";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HomeClient />
    </Suspense>
  );
}
