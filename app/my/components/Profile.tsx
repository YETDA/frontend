import Image from "next/image";
import { Button } from "@/components/ui/button";

const user = {
  name: "서현우",
  email: "seohyun@example.com",
  introduce: "안녕하세요, 서현우입니다. 개발자입니다.",
  image: "/images/sample-image.jpg",
  followers: 120,
  following: 80,
  purchaseProjects: 5,
  donation: 10,
};

export function Profile() {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div className="flex flex-row items-center gap-8">
        <div className="items-center justify-center">
          <Image
            src={user.image}
            width={100}
            height={100}
            alt="Profile Picture"
            className="rounded-full"
          />
        </div>

        <div className="grid grid-rows-2 gap-y-0">
          <h3 className="text-lg font-bold font-semibold mt-1">{user.name}</h3>

          <div className="grid grid-cols-4 gap-10 text-center">
            <div className="grid grid-rows-2">
              <p className="text-gray-400 text-sm">팔로잉</p>
              <p className="font-bold">{user.following}</p>
            </div>

            <div className="grid grid-rows-2">
              <p className="text-gray-400 text-sm">팔로워</p>{" "}
              <p className="font-bold">{user.followers}</p>
            </div>

            <div className="grid grid-rows-2">
              <p className="text-gray-400 text-sm">구매수</p>{" "}
              <p className="font-bold">{user.purchaseProjects}</p>
            </div>

            <div className="grid grid-rows-2">
              <p className="text-gray-400 text-sm">후원수</p>{" "}
              <p className="font-bold">{user.donation}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          className="hover:bg-[#0064ff] bg-[#1f9eff] text-white"
        >
          내 정보 수정
        </Button>
      </div>
    </div>
  );
}
