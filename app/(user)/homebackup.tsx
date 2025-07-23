// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { popularProjectApi } from "@/apis/popular-project/api";
// import HomeCarousel from "./components/HomeCarousel";
// import { Tag, Gift } from "lucide-react"; // ← Tag, Gift 모두 import

// const categories = [
//   { id: "app-service", name: "앱/서비스", icon: "📱" },
//   { id: "notion-template", name: "노션 템플릿", icon: "📝" },
//   { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊" },
//   { id: "automation-tool", name: "자동화툴", icon: "⚙️" },
//   { id: "design-resource", name: "디자인 리소스", icon: "🎨" },
// ];

// export default function Home() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // 로그인 처리
//   useEffect(() => {
//     const token = searchParams.get("token");
//     if (token) {
//       document.cookie = `accessToken=${token}; path=/; max-age=${
//         60 * 60 * 24 * 7
//       }; SameSite=Lax`;
//       router.replace("/");
//     }
//   }, [searchParams, router]);

//   // 전체 데이터를 가져와서 sponsors, products 분리
//   const [sponsors, setSponsors] = useState<any[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchAll() {
//       try {
//         const { content } = await popularProjectApi(0, 100);
//         setSponsors(content.slice(0, 10));
//         setProducts(content.slice(10, 20));
//       } catch {
//         console.error("데이터 로드 실패");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAll();
//   }, []);

//   // 페이지네이션 상태
//   const [spPage, setSpPage] = useState(0);
//   const [prPage, setPrPage] = useState(0);
//   const PER_PAGE = 4;

//   if (loading) {
//     return <p className="text-center py-20">로딩 중…</p>;
//   }

//   // 섹션별 보여줄 슬라이스
//   const spSlice = sponsors.slice(
//     spPage * PER_PAGE,
//     spPage * PER_PAGE + PER_PAGE,
//   );
//   const prSlice = products.slice(
//     prPage * PER_PAGE,
//     prPage * PER_PAGE + PER_PAGE,
//   );

//   return (
//     <main className="space-y-16 px-4">
//       <HomeCarousel />

//       {/* 검색+카테고리 생략 */}

//       {/* 후원 섹션 */}
//       <section className="space-y-4">
//         <h3 className="text-xl font-bold">후원을 기다리고 있어요!</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {spSlice.map(p => (
//             <Link href={`/project/sell/${p.id}`} key={p.id}>
//               <div className="bg-white rounded-lg shadow p-4 flex flex-col">
//                 <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3">
//                   <img
//                     src={p.thumbnail}
//                     alt={p.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className="text-sm font-medium text-gray-800 mb-1">
//                   {p.title}
//                 </p>
//                 <p className="text-xs text-gray-500 mb-2">
//                   {p.sponsorsCount}명 후원
//                 </p>
//                 <button className="mt-auto py-2 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center">
//                   <Gift className="w-4 h-4 mr-1" />
//                   후원하기
//                 </button>
//               </div>
//             </Link>
//           ))}
//         </div>
//         {/* 페이지네이션 */}
//         <div className="flex justify-center items-center space-x-4 mt-4">
//           <button
//             onClick={() => setSpPage(p => Math.max(0, p - 1))}
//             disabled={spPage === 0}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             &lt;
//           </button>
//           <span>
//             {spPage + 1} / {Math.ceil(sponsors.length / PER_PAGE)}
//           </span>
//           <button
//             onClick={() =>
//               setSpPage(p =>
//                 p < Math.ceil(sponsors.length / PER_PAGE) - 1 ? p + 1 : p,
//               )
//             }
//             disabled={spPage >= Math.ceil(sponsors.length / PER_PAGE) - 1}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             &gt;
//           </button>
//         </div>
//       </section>

//       {/* 구매 섹션 */}
//       <section className="space-y-4">
//         <h3 className="text-xl font-bold">업무 생산성 극대화!</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {prSlice.map(p => (
//             <Link href={`/project/sell/${p.id}`} key={p.id}>
//               <div className="bg-white rounded-lg shadow p-4 flex flex-col">
//                 <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3">
//                   <img
//                     src={p.thumbnail}
//                     alt={p.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className="text-sm font-medium text-gray-800 mb-1">
//                   {p.title}
//                 </p>
//                 <p className="text-xs text-gray-500 mb-2">
//                   {p.sellingAmount.toLocaleString()}원
//                 </p>
//                 <button className="mt-auto py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center">
//                   <Tag className="w-4 h-4 mr-1" />
//                   구매하기
//                 </button>
//               </div>
//             </Link>
//           ))}
//         </div>
//         <div className="flex justify-center items-center space-x-4 mt-4">
//           <button
//             onClick={() => setPrPage(p => Math.max(0, p - 1))}
//             disabled={prPage === 0}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             &lt;
//           </button>
//           <span>
//             {prPage + 1} / {Math.ceil(products.length / PER_PAGE)}
//           </span>
//           <button
//             onClick={() =>
//               setPrPage(p =>
//                 p < Math.ceil(products.length / PER_PAGE) - 1 ? p + 1 : p,
//               )
//             }
//             disabled={prPage >= Math.ceil(products.length / PER_PAGE) - 1}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             &gt;
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// }
