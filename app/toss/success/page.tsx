import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientSuccessPage = dynamic(() => import("./ClientSuccessPage"), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center py-20">로딩 중...</p>}>
      <ClientSuccessPage />
    </Suspense>
  );
}
