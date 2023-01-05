import { FC, useState, KeyboardEvent } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface MessageSearchProps {
  setErr: Function,
  setUser: Function,
}

const MessageSearch:FC<MessageSearchProps> = ({setUser, setErr}) => {

  const usersRef = collection(db, "users");

  const [userName, setUserName] = useState('');

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') handleSearch();
  }

  const handleSearch = async () => {
    setUser('');
    setErr('');
    const q = query(usersRef, where("displayName", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const findedUser = doc.data();
        if (findedUser) setUser(findedUser)
      });
    } catch (error) {
      setErr(error);
    }
  }

  return (
    <div className="message-page__search">
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => handleKey(e)}
        className="message-page__search-input"
        placeholder='Search users'
      /> 
      <button onClick={handleSearch} className="small-btn message-page__search-btn">Find user</button>
    </div>
  )
}

export default MessageSearch