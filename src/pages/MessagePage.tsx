import '../styles/pages/messagePage.scss';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { getCurrentUser } from "../app/feautures/userSlice";
import { ActiveUser } from '../types/types';
import MessageSearch from '../components/MessageSearch';
import MessageFindedUser from '../components/MessageFindedUser';
import MessageItem from '../components/MessageItem';
import LoadingPosts from '../components/LoadingPosts';

type IData = DocumentData | null;

const MessagePage = () => {
  const [user, setUser] = useState<IData>();
  const [err, setErr] = useState('');
  const [chats, setChats] = useState<DocumentData[]>([]);
  const [isMessages, setIsMessages] = useState(false);

  const currentUser = useSelector(getCurrentUser);

  const openDialog = (userDialog: string) => {
    if (currentUser.uid) {
      return currentUser.uid > userDialog ? currentUser.uid + userDialog : userDialog + currentUser.uid;
    }
  }

  useEffect(() => {
    setIsMessages(false);
    const unsub = onSnapshot(doc(db, "usersChats", `${currentUser.uid}`), (doc) => {
      const chatsData = doc.data();
      if (chatsData) {
        setChats(Object.entries(chatsData as DocumentData[]).sort((a,b) => b[1].date.seconds - a[1].date.seconds));
      };
      setIsMessages(true);
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
        {err && <label className='error-message'>{err}</label>}
        {user
        ?
          <MessageFindedUser
            user={user as ActiveUser}
            currentUser={currentUser}
            setUser={setUser}
            setErr={setErr}
          />
        : ''
        }
        {err && <div>Unknown Error</div>}
      </div>
      {isMessages
      ?
      <div className='message__list'>
        {chats.map((chat) => 
          <MessageItem key={chat[1].userInfo.uid} openDialog={openDialog} chat={chat[1]}/>
        )}
      </div>
      : <LoadingPosts/>
      }
    </section>
  )
}

export default MessagePage