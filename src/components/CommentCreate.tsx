import '../styles/components/commentCreate.scss';
import { useState, KeyboardEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../app/feautures/userSlice';
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from '../firebase';
import { IPost } from '../types/types';

interface CommentCreateProps {
  post: IPost,
}

const CommentCreate:FC<CommentCreateProps> = ({post}) => {

  const currentUser = useSelector(getCurrentUser);

  const [comment, setComment] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSend = async() => {
    setIsError(false);
    if (comment.length >= 1) {
      const postsRef = doc(db, "posts", post.id);

      await updateDoc(postsRef, {
        comments: arrayUnion({user: currentUser, body: comment, date: Timestamp.now()})
      });

      setComment('');
    } else {
      return;
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div>
      <div className='comment__create'>
        <img className='comment__create-image' src={currentUser.photoURL} alt={currentUser.name}/>
        <input onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => handleKey(e)} value={comment} className='input' type="text" placeholder='Write a comment...'/>
        <button disabled={comment.length <= 1 ? true : false} onClick={handleSend} className='comment__create-btn'></button>
      </div>
      {isError && <div className='error-message'>Something went wrong</div>}
    </div>
  )
}

export default CommentCreate