import React, { useEffect, useState } from "react";
import FmChannel from "./FmChannel";

import back from "../img/back-arrow.png";
import switch1 from "../img/switch.png";

const Card = () => {
  const [channel, setChannel] = useState([]);
  const [imgIndex, setImgIndex] = useState(null);

  const [fm, setFm] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/stations")
      .then((res) => res.json())
      .then((data) => setChannel(data));
  }, [fm]);
  console.log(channel);
  return (
    <div className="mx-auto mt-20 w-[380px] h-[600px]  shadow-2xl overflow-hidden rounded-[60px] flex flex-col justify-between bg-[#2a2a35]">
      <div>
        <div className="bg-[#eeae61] py-7 flex h-[100px] justify-around items-center">
          <button className=" bg-transparent  border-0">
            <img style={{ width: "18px" }} src={back} alt="" />
          </button>
          <h2 className=" font-mono text-3xl font-bold  text-white">
            STATIONS
          </h2>
          <button>
            <img style={{ width: "25px" }} src={switch1} alt="" />
          </button>
        </div>
        <div className="py-2 overflow-y-scroll h-[400px] scrollbar-hide ">
          {channel?.map((fm, index) => (
            <FmChannel
              key={index}
              index={index}
              fm={fm}
              setFm={setFm}
              setImgIndex={setImgIndex}
              imgIndex={imgIndex}
            ></FmChannel>
          ))}
        </div>
      </div>
      <div className="bg-[#22222b] py-7 h-[100px]">
        {fm && (
          <>
            <h2 className="text-[#eeae61] text-xs font-bold font-mono">
              CURRENTLY PLAYING
            </h2>
            <h2 className=" font-sans text-2xl    ">{fm.name}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
