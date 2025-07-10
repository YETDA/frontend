import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Follower {
  id: string;
  name: string;
  image: string;
  introduce?: string;
}

export function Follower({
  user,
  following,
}: {
  user: Follower[];
  following: Follower[];
}) {
  return (
    <>
      {user.map(follower => (
        <div
          key={follower.id}
          className="h-[132px] w-full grid grid-cols-2 justify-start items-center gap-4"
        >
          <div className="flex flex-row w-fit gap-5 items-center">
            <Image
              src={follower.image}
              alt={follower.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="grid grid-rows-2 gap-2">
              <p className="font-bold">{follower.name}</p>
              <p>{follower.introduce}</p>
            </div>
          </div>
          <div className="flex justify-end">
            {following.some(f => f.id === follower.id) ? (
              <Button
                variant="outline"
                className="bg-[#1f9eff] text-white w-[129px] h-[40px] hover:bg-[#0064ff]"
              >
                v 팔로잉
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-[#1f8ce6] w-[129px] h-[40px] hover:bg-[#0064ff] hover:text-white"
              >
                + 팔로우
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
