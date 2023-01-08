import '../styles/components/userMessages.scss';
import React from 'react'
import { useState, useEffect, KeyboardEvent } from "react"
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, DocumentData, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getCurrentUser } from "../app/feautures/userSlice";
import { getSecondUser } from '../app/feautures/currentUserSlice';
import { IMessage } from '../types/types';
import MessageOpenItem from '../components/MessageOpenItem';
import LoadingPosts from '../components/LoadingPosts';
import { addCurrentUser } from '../app/feautures/currentUserSlice';

const UserMessages = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);
  const secondUser = useSelector(getSecondUser);

  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState<DocumentData>({message: []});
  const [textMessage, setTextMessage] = useState('');
  const [user, setUser] = useState('');
  const [isMessages, setIsMessages] = useState(false);

  const inputField = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleSend = async() => {
    if (textMessage.length >= 1)  {
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

  const handleClick = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  }

  useEffect(() => {
    if (inputField.current) {
      inputField.current.scrollTop = inputField.current.scrollHeight;
    }
  }, [messages])

  useEffect(() => {
    setIsMessages(false);
    const id = location.pathname.split('/')[2];
    const secondUserId = id.replace(currentUser.uid, '');
    if (currentUser.uid) {
      setUser(secondUserId);
    }
    setChatId(id);
    const unsub = onSnapshot(doc(db, "chats", id), (doc) => {
      const currentMessages = doc.data();
      if (currentMessages) setMessages(currentMessages);
    });
    if (secondUser.displayName.length >= 1) {
      setIsMessages(true);
    } else {
      getUser(secondUserId);
    }
    return () => {
      unsub();
    }
  },[]);

  const getUser = async(id: string) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const {displayName, photoUrl, uid} = docSnap.data();
      dispatch(addCurrentUser({displayName, photoUrl, uid}));
      setIsMessages(true);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <section className="main-section">
      <Link to="/messages" className='messages__back'><span></span>Back</Link>
      <div>
        {isMessages
        ?
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
        :
        <LoadingPosts/>}
        <div className='messages__form'>
          <input 
            onKeyDown={(e) => handleClick(e)}
            onChange={(e) => setTextMessage(e.target.value)}
            value={textMessage}
            className="input"
            type="text"
            placeholder="message"
          />
          <button 
            disabled={textMessage.length >= 1 ? false : true}
            onClick={handleSend}
            className='messages__form-btn'>
          </button>
        </div>
      </div>
    </section>
  )
}

export default UserMessages