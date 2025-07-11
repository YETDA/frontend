import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full flex justify-between itmes-center p-4">
      <Image src="/images/sample-logo.png" width={24} height={24} alt="logo" />
      <div className="text-xs">로그인/회원가입</div>
    </div>
  );
}
