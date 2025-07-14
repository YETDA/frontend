const user = {
  introduce: "안녕하세요, 서현우입니다. 개발자입니다.",
};

export function Introduce({ introduce }: { introduce: string }) {
  return (
    <div className="w-full">
      <p>{introduce ?? "설정된 소개글이 존재하지 않습니다"}</p>
    </div>
  );
}
