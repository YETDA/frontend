import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/MyTextarea";

interface ProfileFormProps {
  name?: string;
  email?: string;
  github?: string;
  introduce?: string;
  image: string;
}

export function ProfileEditForm({
  user,
  onProfileClick,
}: {
  user: ProfileFormProps;
  onProfileClick: (isEditing: boolean) => void;
}) {
  const [value, setValue] = useState(user || "");
  const [previewImage, setPreviewImage] = useState<string>(user.image);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  return (
    <div className="gap-1">
      <div className="flex flex-row justify-between pt-[20px]">
        <div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <Image
                src={previewImage}
                width={100}
                height={100}
                alt="Profile Picture"
                className="rounded-full object-cover"
              />
              <div className="items-center justify-items-center">
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="mt-2 w-15 pl-1"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="w-10">
                  <span className="text-md">이름</span>
                </div>
                <Input
                  value={value.name}
                  onChange={e => setValue({ ...value, name: e.target.value })}
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="flex flex-row justify-center items-center">
                  <span className="text-md">GitHub</span>
                </div>
                <Input
                  value={value.github}
                  onChange={e => setValue({ ...value, github: e.target.value })}
                  className="ml-2"
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="flex flex-row justify-center items-center">
                  <span className="text-md">Email</span>
                </div>
                <Input
                  value={value.email}
                  onChange={e => setValue({ ...value, email: e.target.value })}
                  className="ml-2"
                />
              </div>
            </div>
          </div>
          <div className="m-5 w-full">
            <div className="mb-5">
              <span className="text-md">소개글</span>
            </div>
            <Textarea
              value={value.introduce}
              onChange={e => setValue({ ...value, introduce: e.target.value })}
              placeholder="Type your message here."
            />
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="w-20 hover:bg-[#0064ff] bg-[#1f9eff] text-white"
            onClick={() => onProfileClick(false)}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
