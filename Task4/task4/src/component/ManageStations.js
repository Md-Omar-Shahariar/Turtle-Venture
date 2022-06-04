import React, { useEffect, useState } from "react";
import ManageStationRow from "./ManageStationRow";

const ManageStations = () => {
  const [channels, setChannels] = useState({});
  const [bool, setBool] = useState(true);
  console.log(channels);

  useEffect(() => {
    fetch("http://localhost:5000/stations")
      .then((res) => res.json())
      .then((data) => {
        setChannels(data);
        setBool(false);
      });
  }, []);
  if (bool === true) {
    return <p>Loading</p>;
  }
  return (
    <div className="container mx-auto max-w-7xl py-5">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Station Name
              </th>
              <th scope="col" class="px-6 py-3">
                Channel
              </th>
              <th scope="col" class="px-6 py-3">
                URL
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="col">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {channels?.map((channel, index) => (
              <ManageStationRow
                key={index}
                channel={channel}
              ></ManageStationRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStations;
