import '../styles/components/userMessages.scss';
import React from 'react'
import { useState, useEffect, KeyboardEvent } from "react"
import { useLocation } from "react-router-dom";
import { arrayUnion, doc, DocumentData, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "@reduxjs/toolkit";
import { getCurrentUser } from "../app/feautures/userSlice";
import { getSecondUser } from '../app/feautures/currentUserSlice';
import { useSelector } from "react-redux";
import { IMessage } from '../types/types';
import MessageOpenItem from '../components/MessageOpenItem';

const UserMessages = () => {

  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);
  const secondUser = useSelector(getSecondUser);

  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState<DocumentData>({message: []});
  const [textMessage, setTextMessage] = useState('');
  const [user, setUser] = useState('');

  const inputField = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleSend = async(e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')  {
      const messageClone = textMessage;
      setTextMessage('');
      await updateDoc(doc(db, 'chats', chatId), {
        message: arrayUnion({
          id: nanoid(),
          textMessage: messageClone,
          senderUser: currentUser.uid,
          date: Timestamp.now(),
        })
      })
      if (currentUser.uid) {
        await updateDoc(doc(db, 'usersChats', currentUser.uid), {
          [chatId + '.lastMessage']: {
            textMessage: messageClone,
          },
          [chatId + '.date']: serverTimestamp(),
        })
      }
      if (user) {
        await updateDoc(doc(db, 'usersChats', user), {
          [chatId + '.lastMessage']: {
            textMessage: messageClone,
          },
          [chatId + '.date']: serverTimestamp(),
        })
      }
    }
  }

  useEffect(() => {
    if (inputField.current) {
      inputField.current.scrollTop = inputField.current.scrollHeight;
    }
  }, [messages])

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
    <section className="main-section">
      <div>
        <div ref={inputField} className='messages__list'>
          {messages.message.map((item: IMessage) => 
            <div key={item.date.toString()}>
              {item.senderUser === currentUser.uid 
              ? 
              <MessageOpenItem
                senderUser={true}
                currentUser={currentUser}
                secondUser={secondUser}
                item={item}
              />
              : 
              <MessageOpenItem
                senderUser={false}
                currentUser={currentUser}
                secondUser={secondUser}
                item={item}
              />
              }
            </div>
          )}
        </div>
        <input 
          onKeyDown={(e) => handleSend(e)}
          onChange={(e) => setTextMessage(e.target.value)}
          value={textMessage}
          className="input"
          type="text"
          placeholder="message"
        />
      </div>
    </section>
  )
}

export default UserMessages