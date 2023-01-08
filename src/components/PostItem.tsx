import '../styles/components/postItem.scss';
import { FC, useState } from "react"
import { IPost } from "../types/types"
import {formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux';
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, Timestamp } from "firebase/firestore";
import { db } from '../firebase';
import { getCurrentUser } from '../app/feautures/userSlice';
import LikesBtn from './UI/LikesBtn/LikesBtn';
import CommentsList from './CommentsList';
import CommentCreate from './CommentCreate';
interface PostItemProps {
  post: IPost,
}

const PostItem:FC<PostItemProps> = ({post}) => {

  const currentUser = useSelector(getCurrentUser);

  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  const getDate = (date:string) => {
    const validDate = new Date(+date);  
    return formatDistanceToNow(validDate, {addSuffix: true});
  }

  let t: NodeJS.Timeout;

  const handleOpen = () => {
    clearTimeout(t);
    setIsOpen(true);
  }

  const handleClose = () => {
    clearTimeout(t);
    t = setTimeout(() => {
      setIsOpen(false);
    }, 500)
  }

  const handleDelete = async() => {
    try {
      await deleteDoc(doc(db, "posts", post.id));
    } catch (error) {
      console.log(error);
    }
  }

  const handleLike = async() => {
    const postsRef = doc(db, "posts", post.id);

    if (post.likes.includes(currentUser.uid)) {
      await updateDoc(postsRef, {
        likes: arrayRemove(currentUser.uid),
      });
    } else {
      await updateDoc(postsRef, {
        likes: arrayUnion(currentUser.uid),
      });
    }
  }
  
  return (
    <li className='card' key={post.id}>
      <div className='post-card__header'>
        <div className='post-card__header-content'>
          <img src={post.img} alt={post.name}/>
          <div className='post-card__header-description'>
            <h5>{post.name}</h5>
            <span>{getDate(post.date)}</span>
          </div>
        </div>
        {currentUser.uid === post.uid && 
          <button 
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose} 
            className='post-card__modal-btn'>
          </button>
        }
        {currentUser.uid === post.uid && 
          <div 
            onMouseEnter={handleOpen} 
            onMouseLeave={handleClose} 
            className={isOpen ? 'post-card__modal-content post-card__modal-content_active' : 'post-card__modal-content'}>
              <button className='post-card__modal-content-btn' onClick={handleDelete}>Delete Post</button>
          </div>
        }
      </div>
      <p className='post-card__body'>{post.body}</p>
      <LikesBtn
        handleLike={handleLike}
        likes={post.likes.length}
        isActive={post.likes.includes(currentUser.uid)}
      />
      <div className='post-card__comments'>
        <CommentsList post={post}/>
        <CommentCreate post={post}/>
      </div>
    </li>
  )
}

export default PostItem