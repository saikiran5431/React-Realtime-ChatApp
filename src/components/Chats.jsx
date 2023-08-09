import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      try {
        const docRef = doc(db, "userChats", currentUser.uid);
        const unsub = onSnapshot(docRef, (doc) => {
          setChats(doc.data() || {}); // Set to empty object if doc.data() is undefined
        });

        return () => {
          unsub();
        };
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    if (currentUser?.uid) {
      getChats();
    }
  }, [currentUser]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        .sort((a, b) => (b[1]?.date || 0) - (a[1]?.date || 0))
        .map(([chatId, chat]) => (
          <div
            className="userChat"
            key={chatId}
            onClick={() => handleSelect(chat?.userInfo)}
          >
            <img src={chat?.userInfo?.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat?.userInfo?.displayName}</span>
              <p>{chat?.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
