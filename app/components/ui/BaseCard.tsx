import React from "react";

type Props = {
  children: React.ReactNode;
};

function BaseCard({ children }: Props) {
  return (
    <div className="bg-[#7209b7] rounded-lg shadow-lg px-4 py-2 w-1/5 flex flex-col items-center">
      {children}
    </div>
  );
}

export default BaseCard;
