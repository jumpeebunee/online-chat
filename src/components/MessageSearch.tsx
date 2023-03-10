import { FC, useState, KeyboardEvent } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { IData } from "../types/types";

interface MessageSearchProps {
  setUser: (arg: IData) => void;
  setErr: (arg: string) => void;
}

const MessageSearch: FC<MessageSearchProps> = ({ setUser, setErr }) => {
  const usersRef = collection(db, "users");

  const [userName, setUserName] = useState("");

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") handleSearch();
  };

  const handleSearch = async () => {
    setUser(null);
    setErr("");
    const q = query(usersRef, where("displayName", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const findedUser = doc.data();
        if (findedUser) setUser(findedUser);
      });
    } catch (error) {
      setErr(error as string);
    }
  };

  return (
    <div className="message-page__search">
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => handleKey(e)}
        className="message-page__search-input"
        placeholder="Search users"
      />
      <button
        onClick={handleSearch}
        className="small-btn message-page__search-btn"
      >
        Find user
      </button>
    </div>
  );
};

export default MessageSearch;
