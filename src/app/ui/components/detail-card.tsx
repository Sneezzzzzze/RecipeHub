import { LucideIcon } from "lucide-react";
import React from "react";

type DetailCardProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const DetailCard: React.FC<DetailCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="max-w-sm border-2 border-yellow-300 bg-yellow-50 p-4 rounded-2xl shadow-[4px_4px_0px_#F59E0B]">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="bg-yellow-300 border-yellow-300 p-3 rounded-full shadow-[4px_4px_0px_#F59E0B] mb-4">
          <Icon className="w-6 h-6 text-amber-50" />
        </div>
        <h3 className="text-lg font-semibold ">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default DetailCard;