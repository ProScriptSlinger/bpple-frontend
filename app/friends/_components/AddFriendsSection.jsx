import { useState } from "react";
import { useUser } from "../../../context/appContext";
import { handleEndpoint } from "../../../utils/api/handleEndpoint";
import { useSocket } from "../../../context/socketContext";
import { toast } from "react-toastify";

const AddFriendsSection = () => {
  const { userDetail, setFriendRequestsSent } = useUser();
  const { socket } = useSocket();

  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState({
    sent: false,
    senting: false,
  });
  const [sending, setSending] = useState(false);

  const haddleSendFriendRequest = async () => {
    if (userName == "") return;
    try {
      setSending(true);
      const response = await handleEndpoint(
        null,
        `friend-request/${userDetail.user_id}/${userName}`,
        "post",
        null
      );
      if (response.ok) {
        console.log(response);
        toast.success("Successfullly sent friend request.");
        setFriendRequestsSent((prev) => [response, ...prev]);
        if (socket.current) {
          socket.current.emit("sent-friend-request", response);
          setStatus((prev) => ({ ...prev, sent: true }));
        } else {
          console.log("Socket is not connected or initialized.");
        }
      }
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex-col text-center">
        <p className="text-[30px]">Add friend</p>
        <input
          className="py-[10px] w-full outline-none bg-[#181818] px-[50px] text-[14px] rounded-[12px] placeholder:text-[#4C4C4C] placeholder:text-[12px]"
          placeholder="Search Friends username"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <p className="text-[15px] text-[#707070] mt-[30px]">
          You have no friends Yet.
        </p>
        {status.sent && (
          <p className="text-[15px] text-[#707070] mt-[30px]">
            Friend Request has been sent to {userName}
          </p>
        )}

        <button
          onClick={haddleSendFriendRequest}
          disabled={sending}
          className="bg-[#53FAFB] w-[350px] h-[50px] font-bold text-black text-[20px] rounded-[12px] mt-[30px] hover:opacity-70"
        >
          {sending ? "Sending Request..." : "  Send Friend Request"}
        </button>
      </div>
    </div>
  );
};

export default AddFriendsSection;
