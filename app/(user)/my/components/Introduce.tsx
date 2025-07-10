const user = {
  introduce: "안녕하세요, 서현우입니다. 개발자입니다.",
};

export function Introduce() {
  return (
    <div className="w-full">
      <p>{user.introduce}</p>
    </div>
  );
}
