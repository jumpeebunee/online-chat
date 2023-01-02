import { useState, useEffect, KeyboardEvent } from "react"
import { useLocation } from "react-router-dom";
import { arrayUnion, doc, DocumentData, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "@reduxjs/toolkit";
import { getCurrentUser } from "../app/feautures/userSlice";
import { useSelector } from "react-redux";

type IMessage = {
  date: Timestamp,
  id: string,
  senderUser: string,
  textMessage: string,
}

const UserMessages = () => {

  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);

  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState<DocumentData>({message: []});
  const [textMessage, setTextMessage] = useState('');
  const [user, setUser] = useState('');

  const handleSend = async(e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')  {
      await updateDoc(doc(db, 'chats', chatId), {
        message: arrayUnion({
          id: nanoid(),
          textMessage,
          senderUser: currentUser.uid,
          date: Timestamp.now(),
        })
      })
      if (currentUser.uid) {
        await updateDoc(doc(db, 'usersChats', currentUser.uid), {
          [chatId + '.lastMessage']: {
            textMessage,
          },
          [chatId + '.date']: serverTimestamp(),
        })
      }
      if (user) {
        await updateDoc(doc(db, 'usersChats', user), {
          [chatId + '.lastMessage']: {
            textMessage,
          },
          [chatId + '.date']: serverTimestamp(),
        })
      }
    }
  }

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    if (currentUser.uid) {
      setUser(id.replace(currentUser.uid, ''));
    }
    setChatId(id);
    const unsub = onSnapshot(doc(db, "chats", id), (doc) => {
      const currentMessages = doc.data();
      if (currentMessages) setMessages(currentMessages);
    });
    return () => {
      unsub();
    }
  },[]);

  return (
    <div>
      <div>Привет </div>
      <div>
        {messages.message.map((item: IMessage) => 
          <div key={item.date.toString()}>
            {item.senderUser === currentUser.uid 
            ? <h2 className="you">{item.textMessage}</h2>
            : <h2 className="notYou">{item.textMessage}</h2>
            }
          </div>
        )}
      </div>
      <input onKeyDown={(e) => handleSend(e)} onChange={(e) => setTextMessage(e.target.value)} value={textMessage} className="input" type="text" placeholder="message"/>
    </div>
  )
}

export default UserMessages