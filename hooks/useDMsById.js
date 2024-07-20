import { useEffect, useState } from "react";
import { handleEndpoint } from "@/utils/api/handleEndpoint";

export const useDMsById = (id, chats) => {
  const [chat, setChat] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleFindChat = async () => {
    if (!chats.messages) return [isLoading, chat];
    const chatById = chats.messages.find((dm) => dm.dm_messages_id == id);
    setChat(chatById);
  };

  useEffect(() => {
    setLoading(false);
    handleFindChat();
  }, [id, chats]);
  return [isLoading, chat];
};
