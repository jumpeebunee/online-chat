import '../styles/pages/messagePage.scss';
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { getCurrentUser } from "../app/feautures/userSlice";
import { ActiveUser } from '../types/types';
import MessageSearch from '../components/MessageSearch';
import MessageFindedUser from '../components/MessageFindedUser';
import MessageItem from '../components/MessageItem';

type IData = DocumentData | null;

const MessagePage = () => {
  const [user, setUser] = useState<IData>();
  const [err, setErr] = useState(false);
  const [chats, setChats] = useState<DocumentData[]>([]);

  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  const openDialog = (userDialog: string) => {
    if (currentUser.uid) {
      return currentUser.uid > userDialog ? currentUser.uid + userDialog : userDialog + currentUser.uid;
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "usersChats", `${currentUser.uid}`), (doc) => {
      const chatsData = doc.data();
      if (chatsData) {
        setChats(Object.entries(chatsData as DocumentData[]));
      };
    });
    return () => {
      unsub();
    }
  }, [currentUser.uid]);

  return (
    <section className='main-section'>
      <div>
        <MessageSearch
          setUser={setUser}
          setErr={setErr}
        />
        {user
        ?
          <MessageFindedUser
            user={user as ActiveUser}
            currentUser={currentUser}
            setUser={setUser}
          />
        : ''
        }
        {err && <div>Unknown Error</div>}
      </div>
      <div className='message__list'>
      {chats.map((chat) => 
        <MessageItem key={chat[1].date.nanoseconds} openDialog={openDialog} chat={chat[1]}/>
      )}
      </div>
    </section>
  )
}

export default MessagePage