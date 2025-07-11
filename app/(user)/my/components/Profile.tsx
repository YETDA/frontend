import Image from "next/image";
import { GithubBadge } from "./GithubBadge";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/MyTooltip";

const user = {
  name: "서현우",
  email: "seohyun@example.com",
  github: "https://github.com/Harang-Dev",
  introduce: "안녕하세요, 서현우입니다. 개발자입니다.",
  image: "/images/sample-image.jpg",
  followers: 120,
  following: 80,
  purchaseProjects: 5,
  donation: 10,
};

interface ProfileProps {
  onEditClick: (isEditing: boolean) => void;
}
export function Profile({ onEditClick }: ProfileProps) {
  return (
    <div className="flex flex-row items-center justify-between pt-[20px] pd-[20px]">
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
          <div className="flex flex-row items-center gap-1">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <GithubBadge githubUrl={user.github} />
          </div>
          <div className="flex flex-row items-center gap-2 pb-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Mail className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>해당 이메일은 다른 사용자에게 보이지 않습니다.</p>
              </TooltipContent>
            </Tooltip>
            <p className="text-sm">{user.email}</p>
          </div>
          <div className="grid grid-cols-4 gap-10 text-center">
            <div className="grid grid-rows-2">
              <p className="text-[#868e96] text-sm">팔로잉</p>
              <p className="font-bold">{user.following}</p>
            </div>

            <div className="grid grid-rows-2">
              <p className="text-[#868e96] text-sm">팔로워</p>{" "}
              <p className="font-bold">{user.followers}</p>
            </div>

            <div className="grid grid-rows-2">
              <p className="text-[#868e96] text-sm">구매수</p>{" "}
              <p className="font-bold">{user.purchaseProjects}</p>
            </div>

            <div className="grid grid-rows-2">
              <p className="text-[#868e96] text-sm">후원수</p>{" "}
              <p className="font-bold">{user.donation}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          className="hover:bg-[#0064ff] bg-[#1f9eff] text-white"
          onClick={() => {
            onEditClick(true);
          }}
        >
          내 정보 수정
        </Button>
      </div>
    </div>
  );
}
