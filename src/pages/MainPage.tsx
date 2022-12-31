import '../styles/pages/mainPage.scss';
import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { IPost } from '../types/types';
import { useAuth } from "../hooks/use-auth";
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getUserName, getUserImage } from '../app/feautures/userSlice';
import { collection, addDoc, onSnapshot  } from "firebase/firestore"; 
import { db } from '../firebase';
import PostsList from '../components/PostsList';
import PostCreate from '../components/PostCreate';

const MainPage = () => {

  const { isAuth } = useAuth();

  const userName = useSelector(getUserName);
  const userImage = useSelector(getUserImage);

  const [posts, setPosts] = useState<IPost[]>([]);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), doc => {
        const posts: IPost[] = [];
        doc.forEach((d: any) => {
          posts.push(d.data())
        })
        setPosts([...posts]);
        return () => {
          unsub();
        }
      })
  },[]);

  const createNewPost = async (postBody: string) => {
    try {
      await addDoc(collection(db, "posts"), {
        id: nanoid(),
        name: userName,
        img: userImage,
        date: Date.now().toString(),
        body: postBody,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      {isAuth
      ? 
        <div className="container main__container">
          <div className='main__content'>
            <PostCreate createNewPost={createNewPost}/>
            <PostsList posts={posts}/>
          </div>
        </div>
      : <Navigate to='/login'/>
      }
    </div>
  )
}

export default MainPage