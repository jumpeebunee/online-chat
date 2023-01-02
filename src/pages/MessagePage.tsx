import '../styles/pages/messagePage.scss';
import { KeyboardEvent, useEffect, useState } from "react"
import { collection, query, where, getDocs, getDoc, DocumentData, doc, setDoc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { getCurrentUser } from "../app/feautures/userSlice";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const MessagePage = () => {
  const [chats, setChats] = useState<DocumentData[]>([]);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<DocumentData>();
  const [err, setErr] = useState(false);

  const citiesRef = collection(db, "users");
  const currentUser = useSelector(getCurrentUser);

  const handleSearch = async () => {
    setErr(false);
    const q = query(citiesRef, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const findedUser = doc.data();
        if (findedUser) setUser(findedUser);
      });
    } catch (error) {
      setErr(true);
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') handleSearch();
  }

  const handleSelect = async () => {
    if (user && currentUser.uid) {
      const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
      try {
        const docRef = doc(db, 'chats', combinedId);
        const res = await getDoc(docRef); 

        if(!res.exists()) {
          await setDoc(doc(db, 'chats', combinedId), {
            message: [],
          });
        }
        await updateDoc(doc(db, 'usersChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: `${user.photoURL}`
          },
          [combinedId + '.date']: serverTimestamp(),
        }) 
        await updateDoc(doc(db, 'usersChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.name,
            photoUrl: `${currentUser.photoURL}`
          },
          [combinedId + '.date']: serverTimestamp(),
        }) 
      } catch (error) {
      }
    }
    setUser({});
    setUserName('');
  }

  const openDialog = (userDialog: string) => {
    if (currentUser.uid) {
      return currentUser.uid > userDialog ? currentUser.uid + userDialog : userDialog + currentUser.uid;
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "usersChats", `${currentUser.uid}`), (doc) => {
      const chatsData = doc.data();
      if (chatsData) setChats(Object.entries(chatsData as DocumentData[]));
    });
    return () => {
      unsub();
    }
  }, [currentUser.uid]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => handleKey(e)}
          className="input message-page__search"
        /> 
        {user && 
          <div onClick={handleSelect}>
            <img className="message-image" src={user.photoURL}/>
            <h4>{user.displayName}</h4>
          </div>
        }
        {err && <div>Ошибка</div>}
      </div>
      <div>
        {chats.map((chat) => 
          <Link to={`/message/${openDialog(chat[1].userInfo.uid)}`} key={chat[1].userInfo.uid}>
            <img className="message-image" src={chat[1].userInfo.photoUrl}/>
            <h2>{chat[1].userInfo.displayName}</h2>
          </Link>
        )}
      </div>
    </div>
  )
}

export default MessagePage