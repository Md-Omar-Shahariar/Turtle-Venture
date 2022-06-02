import React, { useEffect, useState } from "react";
import FmChannel from "./FmChannel";

import back from "../img/back-arrow.png";
import switch1 from "../img/switch.png";

const Card = () => {
  const [channel, setChannel] = useState([]);
  const [flag, setFlag] = useState(null);
  useEffect(() => {
    fetch("fake.json")
      .then((res) => res.json())
      .then((data) => setChannel(data));
  }, []);
  console.log(channel);
  return (
    <div className="mx-auto  w-[380px] h-[600px]  shadow-2xl overflow-hidden rounded-[60px] flex flex-col justify-between">
      <div>
        <div className="bg-[#eeae61] py-7 flex justify-around items-center">
          <button>
            <img style={{ width: "18px" }} src={back} alt="" />
          </button>
          <h2 className=" font-sans text-3xl font-bold  text-white">
            STATIONS
          </h2>
          <button>
            <img style={{ width: "25px" }} src={switch1} alt="" />
          </button>
        </div>
        <div className="py-2 overflow-y-scroll h-[400px] scrollbar-hide ">
          {channel?.map((fm, index) => (
            <FmChannel key={index} fm={fm}></FmChannel>
          ))}
        </div>
      </div>
      <div className="bg-[#22222b] py-7">
        <h2 className="text-[#eeae61] text-sm font-bold">CURRENTLY PLAYING</h2>
        <h2 className=" font-sans text-2xl    ">Booth Fm</h2>
      </div>
    </div>
  );
};

export default Card;
