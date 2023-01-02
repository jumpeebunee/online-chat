import { FormEvent, KeyboardEvent, useState } from "react"
import { collection, query, where, getDocs, DocumentData  } from "firebase/firestore";
import { db } from "../firebase";

const MessagePage = () => {

  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<DocumentData>();
  const [err, setErr] = useState(false);

  const citiesRef = collection(db, "users");

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

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => handleKey(e)}
        className="input message-page__search"
      /> 
      {user && 
        <div>
          <img src={user.photoURL}/>
          <h4>{user.displayName}</h4>
        </div>
      }
      {err && <div>Ошибка</div>}
    </div>
  )
}

export default MessagePage