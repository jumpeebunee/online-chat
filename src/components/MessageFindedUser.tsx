import { FC } from 'react'
import { setDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { ActiveUser, IUser } from '../types/types'


interface MessageFindedUserProps {
  user: ActiveUser,
  setUser: Function,
  currentUser: IUser,
}
const MessageFindedUser:FC<MessageFindedUserProps> = ({user, setUser, currentUser}) => {

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
    setUser(null);
  }

  return (
    <div className='message__item'>
      <div className='message__item-content message__item-content_finded' onClick={handleSelect}>
        <img className="message__image" alt={user.displayName} src={user.photoURL}/>
        <h4 className='message__name'>{user.displayName}</h4>
      </div>
    </div>
  )
}

export default MessageFindedUser