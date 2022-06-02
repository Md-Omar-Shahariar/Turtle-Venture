import React from "react";

const FmChannel = ({ fm }) => {
  return (
    <div className="border-b-[1px] mx-5 border-gray-600 py-5">
      <div className="flex  text-2xl justify-between">
        <h1>{fm.name}</h1>
        <h1>{fm.channel}</h1>
      </div>
    </div>
  );
};

export default FmChannel;
