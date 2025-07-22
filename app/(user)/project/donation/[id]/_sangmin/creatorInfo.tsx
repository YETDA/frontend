interface CreatorInfoProps {
  name: string;
  followers: number;
}

const CreatorInfo = ({ name, followers }: CreatorInfoProps) => {
  return (
    <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold">{name.charAt(0)}</span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">팔로워 {followers}명</p>
      </div>
    </div>
  );
};

export default CreatorInfo;
