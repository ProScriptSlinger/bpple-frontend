import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { getNameInitials } from "../../../utils/functions/getNameInitials";
import { IoCheckmark } from "react-icons/io5";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "../../../context/appContext";
import { editRequestById } from "../../../utils/functions/editRequestById";
import { handleEndpoint } from "../../../utils/api/handleEndpoint";
import { useSocket } from "../../../context/socketContext";

const RequestsSection = ({ friendRequestsReceived }) => {
  const [acceptFriendRequest, setAcceptFriendRequest] = useState(false);
  const [rejectFriendRequest, setRejectFriendRequest] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const { setChats, getUser, userDetail, setFriendRequestsReceived, chats } =
    useUser();

  const { socket } = useSocket();

  const handleAcceptFriendRequest = async (request, sender) => {
    try {
      if (userDetail == null) return;
      setAccepting(true);
      const response = await handleEndpoint(
        { recipient: userDetail, sender },
        `friend-request/${request.requestId}/accept`,
        "put",
        null
      );

      if (response.ok) {
        changeStatus(request, "accepted");
        setAcceptFriendRequest(true);
        console.log("setAcceptFriendRequest:", response);
        if (socket.current) {
          socket.current.emit("friend-start-chat", response);
          await getUser();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAccepting(false);
    }
  };

  const handleRejectFriendRequest = async (requestId) => {
    try {
      if (userDetail == null) return;
      setAccepting(true);
      const response = await handleEndpoint(
        null,
        `friend-request/${requestId}/${userDetail.user_id}/reject`,
        "put",
        null
      );

      if (response) {
        setRejectFriendRequest(true);
        console.log("setFriendRequestsSent", response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAccepting(false);
    }
  };

  const changeStatus = (request, status) => {
    if (socket.current && socket.current.connected) {
      console.log("Sending message...");
      socket.current.emit("friend-request-accepted", {
        sender: request.sender,
        requestId: request.requestId,
        status,
      });
      editRequestById(
        friendRequestsReceived,
        { requestId: request.requestId, status },
        setFriendRequestsReceived
      );
    } else {
      console.log("Socket is not connected or initialized.");
    }
  };

  return (
    <div className="  overflow-auto pt-5 relative w-full h-full ">
      <div className="gap-2  grid">
        {friendRequestsReceived.map((request, index) => (
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
                {getNameInitials(request?.sender?.username)}
              </div>
              <div className=" font-light text-[14px]">
                <span>@{request?.sender?.username}</span> <br />
                <span> want to become friends, Sends a friend request.</span>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              {request.status == "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleAcceptFriendRequest(request, request.sender)
                    }
                    disabled={accepting || rejecting}
                    className=" w-[30px] h-[30px]  disabled:bg-[#282828]  disabled:text-[#6D6D6D] bg-[#3772FF] text-black flex items-center justify-center rounded-full"
                  >
                    {accepting ? (
                      <AiOutlineLoading3Quarters className=" animate-spin" />
                    ) : (
                      <IoCheckmark size={16} />
                    )}
                  </button>
                  <button
                    disabled={accepting || rejecting}
                    onClick={() => handleRejectFriendRequest(request.requestId)}
                    className=" w-[30px] h-[30px] bg-[#FF5252] disabled:bg-[#282828]  disabled:text-[#6D6D6D] flex items-center justify-center rounded-full"
                  >
                    {rejecting ? (
                      <AiOutlineLoading3Quarters className=" animate-spin" />
                    ) : (
                      <IoCloseOutline size={16} />
                    )}
                  </button>
                </>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsSection;
