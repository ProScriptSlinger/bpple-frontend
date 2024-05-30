import { IoCloseOutline } from "react-icons/io5";
import { getNameInitials } from "../../../utils/functions/getNameInitials";

const RequestsSentSection = ({ friendRequestsSent }) => {
  return (
    <div className="  overflow-auto pt-5 relative w-full h-full">
      <div className=" gap-2  grid">
        {friendRequestsSent.map((request, index) => (
          <div
            className=" border rounded-md border-[#191919] p-2 flex items-center justify-between"
            key={index}
          >
            <div className=" flex items-start gap-2">
              <div
                className="w-[50px] aspect-square rounded-full
             bg-[#191919] flex items-center justify-center
              text-[#4C4C4C] text-[22px]"
              >
                {getNameInitials(request.recipient.username)}
              </div>
              <div className=" font-light text-[14px]">
                <span>@{request.recipient.username}</span> <br />
                <span>
                  You want to be friends with {request.recipient.username}..
                </span>
              </div>
            </div>

            {request.status == "pending" && (
              <div className=" flex items-center gap-2">
                <button className=" w-[30px] h-[30px] bg-[#FF5252] flex items-center justify-center rounded-full">
                  <IoCloseOutline size={16} />
                </button>
              </div>
            )}
            {request.status == "accepted" && (
              <div>
                <button
                  className={`px-[30px] pt-[10px] pb-[8px] inline-flex items-center  flex-none 
                bg-[#1E1E1E] text-[#6D6D6D]
                   text-[14px]  font-bold rounded-full mr-[10px]`}
                >
                  <p>Accepted</p>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsSentSection;
