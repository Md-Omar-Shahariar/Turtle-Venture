import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const ManageStationRow = ({ index, channel, flag, SetFlag }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [update, SetUpdate] = useState(null);

  const handleDelete = () => {
    if (window.confirm("Are You Sure")) {
      fetch(
        `https://radiostation01.herokuapp.com/stations?_id=${channel._id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("Product Deleted");
            SetFlag(!flag);
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Updatechannel = e.target.channel.value;
    const Updatestation = e.target.station.value;
    const Updateurl = e.target.url.value;

    const stations = {
      name: Updatestation,
      channel: Updatechannel,
      img: Updateurl,
    };
    fetch(`https://radiostation01.herokuapp.com/stations?_id=${channel._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(stations),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          SetFlag(!flag);
          toast.success("Updated Successfully");
          navigate("/");
        } else {
          toast.error("Failed To Update");
        }
      });
  };
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {channel.id}
      </th>
      <td class="px-6 py-4">{channel.name}</td>
      <td class="px-6 py-4">{channel.channel}</td>
      <td class="px-6 py-4">{channel.img}</td>
      <td class="px-6 py-4 flex justify-around ">
        <label
          onClick={() => SetUpdate(1)}
          for="my-modal-6"
          class="btn modal-button"
        >
          Update
        </label>

        {update && (
          <>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
              <div class="modal-box">
                <div className="container mx-auto max-w-7xl p-10 flex flex-col  items-center">
                  <h2 className="text-3xl pb-10 font-bold">Update Station</h2>
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
                        placeholder={channel.name}
                        type="text"
                        id="station"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <label className="text-lg font-bold" htmlFor="channel">
                        Channel
                      </label>
                      <input
                        placeholder={channel.channel}
                        type="text"
                        id="channel"
                        className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <label className="text-lg font-bold" htmlFor="url">
                        Image URL
                      </label>
                      <input
                        placeholder={channel.img}
                        type="url"
                        id="url"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <input
                        className="mx-auto mt-5 btn btn-primary"
                        type="submit"
                        value="Update"
                      ></input>
                    </form>
                  </div>
                </div>
                <div class="modal-action">
                  <label
                    onClick={() => SetUpdate(null)}
                    for="my-modal-6"
                    class="btn"
                  >
                    Cancel
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
        <button onClick={handleDelete} className="btn btn-error">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManageStationRow;
