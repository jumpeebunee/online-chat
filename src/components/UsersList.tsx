import '../styles/components/usersList.scss';
import { FC, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { ActiveUser } from "../types/types"
import { getCurrentUser } from '../app/feautures/userSlice';

interface UsersListProps {
  users: ActiveUser[],
}

const UsersList:FC<UsersListProps> = ({users}) => {

  const currentUser = useSelector(getCurrentUser);
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const handleSelect = async (user: ActiveUser) => {
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
        setIsError(false);
        navigate(`/message/${combinedId}`);
      } catch (error) {
        setIsError(true);
      }
    }
  }

  return (
    <ul className='users-list__list'>
      {users.map(user => 
        <li className='users-list__item' key={user.uid}>
          <img alt={user.displayName} src={user.photoURL}/>
          <div>
            <h2>{user.displayName}</h2>
            <button onClick={() => handleSelect(user)}>Send a message</button>
          </div>
        </li>
      )}
      {isError && <div className='error-message'>Something went wrong</div>}
    </ul>
  )
}

export default UsersList