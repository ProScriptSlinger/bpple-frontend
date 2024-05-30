import { useEffect } from "react";

export const userFindDmById = (id, chats, setChat) => {
  useEffect(() => {
    const handleFindChat = () => {
      if (!chats.messages) return;
      const chatById = chats.messages.find((dm) => dm.dm_messages_id == id);
      setChat(chatById);
    };

    handleFindChat();
  }, [id, chats]);
};
