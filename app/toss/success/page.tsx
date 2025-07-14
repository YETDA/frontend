// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import "../App.css";

// interface ConfirmRequest {
//   orderId: string;
//   amount: string;
//   paymentKey: string;
// }

// type ConfirmResponse = Record<string, any>;

// export default function SuccessPage(): JSX.Element {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [responseData, setResponseData] = useState<ConfirmResponse | null>(
//     null,
//   );

//   useEffect(() => {
//     async function confirm(): Promise<ConfirmResponse> {
//       const orderId = searchParams.get("orderId");
//       const amount = searchParams.get("amount");
//       const paymentKey = searchParams.get("paymentKey");

//       if (!orderId || !amount || !paymentKey) {
//         throw new Error("query parameter가 없습니다.");
//       }

//       const requestData: ConfirmRequest = { orderId, amount, paymentKey };

//       const response = await fetch("/api/confirm", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestData),
//       });

//       const json = (await response.json()) as ConfirmResponse;
//       if (!response.ok) {
//         throw { message: json.message, code: json.code };
//       }

//       return json;
//     }

//     confirm()
//       .then(data => setResponseData(data))
//       .catch((error: { message: string; code: string }) => {
//         const params = new URLSearchParams({
//           code: error.code,
//           message: error.message,
//         }).toString();
//         router.push(`/toss/fail?${params}`);
//       });
//   }, [searchParams, router]);

//   return (
//     <>
//       <div className="box_section" style={{ width: "600px" }}>
//         <img
//           width="100px"
//           src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
//           alt="결제 완료"
//         />
//         <h2>결제를 완료했어요</h2>

//         <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
//           <div className="p-grid-col text--left">
//             <b>결제금액</b>
//           </div>
//           <div className="p-grid-col text--right" id="amount">
//             {`${Number(searchParams.get("amount")!).toLocaleString()}원`}
//           </div>
//         </div>

//         <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
//           <div className="p-grid-col text--left">
//             <b>주문번호</b>
//           </div>
//           <div className="p-grid-col text--right" id="orderId">
//             {searchParams.get("orderId")}
//           </div>
//         </div>

//         <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
//           <div className="p-grid-col text--left">
//             <b>paymentKey</b>
//           </div>
//           <div
//             className="p-grid-col text--right"
//             id="paymentKey"
//             style={{ whiteSpace: "initial", width: "250px" }}
//           >
//             {searchParams.get("paymentKey")}
//           </div>
//         </div>

//         <div className="p-grid-col" style={{ marginTop: "20px" }}>
//           <a
//             href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <button className="button p-grid-col5">연동 문서</button>
//           </a>
//           <a
//             href="https://discord.gg/A4fRFXQhRu"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <button
//               className="button p-grid-col5"
//               style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
//             >
//               실시간 문의
//             </button>
//           </a>
//         </div>
//       </div>

//       <div
//         className="box_section"
//         style={{ width: "600px", textAlign: "left", marginTop: "30px" }}
//       >
//         <b>Response Data :</b>
//         <div id="response" style={{ whiteSpace: "initial", marginTop: "10px" }}>
//           {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import "../App.css";

import { TossPurchaseApi } from "@/app/api/project";

type ConfirmResponse = Record<string, any>;

export default function SuccessPage(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [responseData, setResponseData] = useState<ConfirmResponse | null>(
    null,
  );

  useEffect(() => {
    async function confirm(): Promise<ConfirmResponse> {
      const paymentKey = searchParams.get("paymentKey");
      const orderId = searchParams.get("orderId");
      const amount = searchParams.get("amount");

      if (!paymentKey || !orderId || !amount) {
        throw new Error("query parameter가 없습니다.");
      }

      // TossPurchaseApi 호출 (amount는 서버쪽에서 1로 고정 처리)
      return await TossPurchaseApi(paymentKey, orderId);
    }

    confirm()
      .then(data => setResponseData(data))
      .catch((error: any) => {
        const code = encodeURIComponent(error.code ?? "UNKNOWN_ERROR");
        const message = encodeURIComponent(error.message ?? "알 수 없는 오류");
        router.push(`/toss/fail?code=${code}&message=${message}`);
      });
  }, [searchParams, router]);

  return (
    <>
      <div className="box_section" style={{ width: "600px" }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 완료"
        />
        <h2>결제를 완료했어요</h2>

        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")!).toLocaleString()}원`}
          </div>
        </div>

        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {searchParams.get("orderId")}
          </div>
        </div>

        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div
            className="p-grid-col text--right"
            id="paymentKey"
            style={{ whiteSpace: "initial", width: "250px" }}
          >
            {searchParams.get("paymentKey")}
          </div>
        </div>

        <div className="p-grid-col" style={{ marginTop: "20px" }}>
          <a
            href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="button p-grid-col5">연동 문서</button>
          </a>
          <a
            href="https://discord.gg/A4fRFXQhRu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="button p-grid-col5"
              style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
            >
              실시간 문의
            </button>
          </a>
        </div>
      </div>

      <div
        className="box_section"
        style={{ width: "600px", textAlign: "left", marginTop: "30px" }}
      >
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial", marginTop: "10px" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </>
  );
}
