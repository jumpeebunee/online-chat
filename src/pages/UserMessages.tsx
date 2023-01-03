import '../styles/components/userMessages.scss';
import { useState, useEffect, KeyboardEvent } from "react"
import { useLocation } from "react-router-dom";
import { arrayUnion, doc, DocumentData, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "@reduxjs/toolkit";
import { getCurrentUser } from "../app/feautures/userSlice";
import { getSecondUser } from '../app/feautures/currentUserSlice';
import { useSelector } from "react-redux";
import getDate from '../helpers/getDate';

type IMessage = {
  date: Timestamp,
  id: string,
  senderUser: string,
  textMessage: string,
}

const UserMessages = () => {

  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);
  const secondUser = useSelector(getSecondUser);

  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState<DocumentData>({message: []});
  const [textMessage, setTextMessage] = useState('');
  const [user, setUser] = useState('');

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
            messageClone,
          },
          [chatId + '.date']: serverTimestamp(),
        })
      }
      if (user) {
        await updateDoc(doc(db, 'usersChats', user), {
          [chatId + '.lastMessage']: {
            messageClone,
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
    <section className="main-section">
      <div>
        <div className='messages__list'>
          {messages.message.map((item: IMessage) => 
            <div key={item.date.toString()}>
              {item.senderUser === currentUser.uid 
              ? 
              <div className='messages__item'>
                <img className='messages__img' alt={secondUser.displayName} src={secondUser.photoUrl}/>
                <div>
                  <div className='messages__item-header'>
                    <h2>{secondUser.displayName}</h2>
                    <span>{getDate(item.date.seconds.toString())}</span>
                  </div>
                  <p className='messages__item-description'>
                    {item.textMessage}
                  </p>
                </div>
              </div>
              : 
              <div className='messages__item'>
                <img className='messages__img' alt={currentUser.name?.toString()} src={currentUser.photoURL.toString()}/>
                <div>
                  <div className='messages__item-header'>
                    <h2>{currentUser.name?.toString()}</h2>
                    <span>{getDate(item.date.seconds.toString())}</span>
                  </div>
                  <p className='messages__item-description'>
                    {item.textMessage}
                  </p>
                </div>
              </div>
              }
            </div>
          )}
        </div>
        <input onKeyDown={(e) => handleSend(e)} onChange={(e) => setTextMessage(e.target.value)} value={textMessage} className="input" type="text" placeholder="message"/>
      </div>
    </section>
  )
}

export default UserMessages