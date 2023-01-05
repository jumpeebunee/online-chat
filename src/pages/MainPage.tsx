import '../styles/pages/mainPage.scss';
import { useEffect, useState } from 'react';
import { IPost } from '../types/types';
import { auth } from '../firebase';
import { nanoid } from '@reduxjs/toolkit';
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from 'react-redux';
import { getUserName, getUserImage } from '../app/feautures/userSlice';
import { collection, addDoc, onSnapshot  } from "firebase/firestore"; 
import { db } from '../firebase';
import PostsList from '../components/PostsList';
import PostCreate from '../components/PostCreate';
import LoadingPosts from '../components/LoadingPosts';

const MainPage = () => {

  const userName = useSelector(getUserName);
  const userImage = useSelector(getUserImage);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isPosts, setIsPosts] = useState(false);
  const [isError, setIsError] = useState('');
  
  useEffect(() => {
    setIsPosts(false);
    const unsub = onSnapshot(collection(db, "posts"), doc => {
        const posts: IPost[] = [];
        doc.forEach((d: any) => {
          posts.push(d.data())
        })
        posts.sort((a,b) => +b.date - +a.date);
        setIsPosts(true);
        setPosts([...posts]);
        return () => {
          unsub();
        }
      })
  },[]);

  const createNewPost = async (postBody: string) => {
    setIsError('');
    try {
      await addDoc(collection(db, "posts"), {
        id: nanoid(),
        name: userName,
        img: userImage,
        date: Date.now().toString(),
        body: postBody,
      });
    } catch (e) {
      setIsError('Error adding post');
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.pathname = '/login';
  });

  return (
    <section className='main-section'>
      <div className="main__container">
          <div className='main__content'>
            <PostCreate createNewPost={createNewPost} setIsError={setIsError}/>
            {isError && <label className='error-message'>{isError}</label>}
            {isPosts
            ? <PostsList posts={posts}/>
            : <LoadingPosts/>
            }
          </div>
      </div>
    </section>
  )
}

export default MainPage