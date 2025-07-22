interface FundingInfoProps {
  currentFunding: number;
}

const FundingInfo = ({ currentFunding }: FundingInfoProps) => {
  return (
    <div className="mb-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">
          {currentFunding.toLocaleString()}원
        </div>
        <div className="text-gray-600">총 후원액</div>
      </div>
    </div>
  );
};

export default FundingInfo;
