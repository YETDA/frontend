import { Search } from "lucide-react";
import Link from "next/link";

export default function SubHeader() {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 z-10">
      {/* 헤더 카테고리 */}
      <div className="flex text-md-navItem gap-5">
        <Link href="/">앱/서비스</Link>
        <Link href="/">Notion 템플릿</Link>
        <Link href="/">슬라이드/제안서</Link>
        <Link href="/">자동화 툴</Link>
        <Link href="/">디자인 리소스</Link>
      </div>

      {/* 검색 바 */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray rounded-xl w-1/3">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="w-full bg-gray text-xs outline-none"
        />
        <Search width={20} height={20} />
      </div>
    </div>
  );
}
