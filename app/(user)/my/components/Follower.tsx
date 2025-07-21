import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { createUserFollow, deleteUserFollow } from "@/apis/my/ProfileApi";
import axios from "axios";

interface Follower {
  userId: number;
  name: string;
  image: string;
  introduce?: string;
}

export function Follower({
  user,
  following: initialFollowing = [],
}: {
  user?: Follower[];
  following?: Follower[];
}) {
  const [following, setFollowing] = useState<Follower[]>(initialFollowing);
  console.log("유저", user);
  console.log("팔로우", following);
  if (!user) {
    return <div>팔로우한 사용자가 존재하지 않습니다</div>;
  }
  const isFollowing = (userId: number) =>
    following.some(f => f.userId === userId);

  const handleFollow = async (person: Follower) => {
    try {
      await createUserFollow(person.userId);
      setFollowing(prev => [...prev, person]);
    } catch (err) {
      console.error("팔로우 요청 실패:", err);
    }
  };

  const handleUnfollow = async (userId: number) => {
    try {
      await deleteUserFollow(userId);
      setFollowing(prev => prev.filter(f => f.userId !== userId));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        console.warn("이미 언팔로우된 사용자입니다.");
        setFollowing(prev => prev.filter(f => f.userId !== userId));
      } else {
        console.error("언팔로우 요청 실패:", err);
      }
    }
  };

  return (
    <>
      {user.map((person, index) => (
        <div
          key={`${person.userId}-${index}`}
          className="h-[132px] w-full grid grid-cols-2 justify-start items-center gap-4"
        >
          <div className="flex flex-row w-fit gap-5 items-center">
            <Image
              src={person.image || "/images/sample-image.jpg"}
              alt={person.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="grid grid-rows-2 gap-2">
              <p className="font-bold">{person.name}</p>
              <p>{person.introduce}</p>
            </div>
          </div>
          <div className="flex justify-end">
            {isFollowing(person.userId) ? (
              <Button
                variant="outline"
                className="bg-[#1f9eff] text-white w-[129px] h-[40px] hover:bg-[#0064ff]"
                onClick={() => handleUnfollow(person.userId)}
              >
                <Check /> 팔로잉
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-[#1f8ce6] w-[129px] h-[40px] hover:bg-[#0064ff] hover:text-white"
                onClick={() => handleFollow(person)}
              >
                <Plus /> 팔로우
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
