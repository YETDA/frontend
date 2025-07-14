"use client";

import { useState } from "react";
import { CreatePurchaseInfo } from "../api/test/TestApi";

export default function TestPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    try {
      // 1) 서버에 주문 생성 요청
      const { orderId, totalAmount } = await CreatePurchaseInfo();

      // 2) /toss 페이지를 새 창으로 열기 (orderId, totalAmount 를 쿼리로 전달)
      const url = `/toss?orderId=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(totalAmount)}`;
      window.open(url, "TossPayment", "width=600,height=700,left=200,top=100");
    } catch (err) {
      console.error(err);
      setError("결제 정보 생성에 실패했습니다.");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1>테스트 페이지</h1>

        <button onClick={handlePurchase}>토스 결제 테스트 버튼</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
