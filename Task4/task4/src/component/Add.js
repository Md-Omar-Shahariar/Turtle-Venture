import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";

const Add = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const channel = e.target.channel.value;
    const station = e.target.station.value;
    const url = e.target.url.value;

    const stations = { name: station, channel: channel, img: url };
    fetch("https://radiostation01.herokuapp.com/stations", {
      method: "POST",
      headers: {
        "content-type": "application/json",

        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(stations),
    })
      .then((res) => res.json())
      .then((data) => {
        const { message } = data;
        if (message === "Forbidden Token") {
          logout();
          navigate("/login");
        }
        if (data.insertedId) {
          toast.success("Added Successfully");
          navigate("/manageStations");
        } else {
          toast.error("Failed To Add");
        }
      });
  };
  return (
    <div className="container mx-auto max-w-7xl p-10 flex flex-col  items-center">
      <h2 className="text-3xl pb-10 font-bold">Add Station</h2>
      <div className="border rounded-lg p-20">
        <form
          className="flex flex-col items-start"
          action=""
          onSubmit={handleSubmit}
        >
          <label className="text-lg font-bold" htmlFor="name">
            Station Name
          </label>
          <input
            type="text"
            id="station"
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <label className="text-lg font-bold" htmlFor="channel">
            Channel
          </label>
          <input
            type="text"
            id="channel"
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <label className="text-lg font-bold" htmlFor="url">
            Image URL
          </label>
          <input
            type="url"
            id="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <input
            className="mx-auto mt-5 btn btn-primary"
            type="submit"
            value="Add"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Add;
