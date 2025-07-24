"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

import { TossPurchaseApi } from "@/apis/project";
import Image from "next/image";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function confirmAndRedirect() {
      const paymentKey = searchParams.get("paymentKey");
      const orderId = searchParams.get("orderId");
      const amount = searchParams.get("amount");

      if (!paymentKey || !orderId || !amount) {
        console.error("필수 query parameter가 없습니다.");
        return;
      }

      try {
        await TossPurchaseApi(paymentKey, orderId, Number(amount));
      } catch (err) {
        console.error("결제 확인 실패:", err);
        return;
      }

      setTimeout(() => {
        router.replace(`/project/sell/${orderId}`);
      }, 3000);
    }

    confirmAndRedirect();
  }, [router, searchParams]);

  return (
    <Suspense>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="box_section flex flex-col items-center gap-4">
          <Image
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            height={100}
            width={100}
            alt="결제 완료"
          />
          <h2 className="text-2xl font-semibold">결제를 완료했어요!</h2>
          <p className="text-gray-600">곧 주문하신 페이지로 이동합니다...</p>
        </div>
      </div>
    </Suspense>
  );
}
