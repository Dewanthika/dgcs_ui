import React from "react";

interface IUserStaticsCardProps {
  title: string;
  data: number;
}

const UserStaticsCard = ({ title, data }: IUserStaticsCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{data}</p>
    </div>
  );
};

export default UserStaticsCard;
