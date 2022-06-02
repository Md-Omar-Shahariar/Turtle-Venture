import plus from "../img/plus.png";
import minus from "../img/minus.png";

const FmChannel = ({ fm, setFm, setImgIndex, imgIndex, index }) => {
  const handleFm = () => {
    setFm(fm);
    setImgIndex(index + 1);
  };
  console.log(index);
  console.log(fm.id, imgIndex);

  return (
    <div className="border-b-[1px] mx-5 border-gray-600 py-5">
      {fm.id === imgIndex && (
        <div className="py-4  flex items-center justify-between ">
          <button
            style={{ height: "40px", width: "40px" }}
            className=" bg-transparent border-0 rounded-[100%] p-0
          "
          >
            <img style={{ height: "40px", width: "40" }} src={minus} alt="" />
          </button>
          <div class="avatar">
            <div class="w-36 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
              <img src={fm.img} alt="" />
            </div>
          </div>
          <button
            style={{ height: "40px", width: "40px" }}
            className=" bg-transparent border-0 rounded-[100%] p-0
          "
          >
            <img style={{ height: "40px", width: "40" }} src={plus} alt="" />
          </button>
        </div>
      )}
      <div
        onClick={() => handleFm(fm)}
        className="flex  text-2xl justify-between"
      >
        <h1>{fm.name}</h1>
        <h1>{fm.channel}</h1>
      </div>
    </div>
  );
};

export default FmChannel;
