import Pending from "./statusBubbles/pending";

interface StatcardProps {
  title: string;
  percentage1: number;
  percentage2: number;
}

const Statcard: React.FC<StatcardProps> = ({ title, percentage1, percentage2 }) => {
  return (
    <div className="text-black p-6 rounded-lg shadow-custom bg-white">
      <h3 className="mb-4 font-bold text-[19px] flex justify-between items-center">
        {title}
        <Pending />
      </h3>
      <div>CPU Usage: {percentage1}%</div>
      <div className="w-[100%] h-2 rounded-md bg-[#f0f0f0] mt-2">
        <div 
          className="h-2 rounded-md bg-[#6200ee] mt-2" 
          style={{ width: `${percentage1}%` }}
        ></div> 
      </div>
      <div className="mt-4">Memory Usage: {percentage2}%</div>
      <div className="w-[100%] h-2 rounded-md bg-[#f0f0f0] mt-2">
        <div 
          className="h-2 rounded-md bg-[#6200ee] mt-2" 
          style={{ width: `${percentage2}%` }}
        ></div> 
      </div>
    </div>
  );
};

export default Statcard;
