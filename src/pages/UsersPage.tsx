import "../styles/pages/usersPage.scss";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { ActiveUser } from "../types/types";
import { db } from "../firebase";
import UsersList from "../components/UsersList";
import LoadingPosts from "../components/LoadingPosts";

const UsersPage = () => {
  const [users, setUsers] = useState<ActiveUser[]>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const usersArr: ActiveUser[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as ActiveUser;
      usersArr.push(data);
    });
    setUsers([...usersArr]);
  };

  const sortedUsers = useMemo(() => {
    return users?.filter((user) =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div>
      <div className="users__search">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Find user"
        />
        <button>
          <span></span>
        </button>
      </div>
      {sortedUsers ? <UsersList users={sortedUsers} /> : <LoadingPosts />}
    </div>
  );
};

export default UsersPage;
