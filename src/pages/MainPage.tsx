import '../styles/pages/mainPage.scss';
import '../styles/components/postCard.scss';
import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getUserName, getUserImage } from '../app/feautures/userSlice';
import { collection, addDoc, onSnapshot  } from "firebase/firestore"; 
import { db } from '../firebase';

type IPost = {
  id: string,
  name: string,
  img: string,
  date: string,
  body: string,
}

const MainPage = () => {

  const { isAuth } = useAuth();

  const userName = useSelector(getUserName);
  const userImage = useSelector(getUserImage);

  const [postBody, setPostBody] = useState('');
  const [posts, setPosts] = useState<IPost[]>([]);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), doc => {
        const posts: IPost[] = [];
        doc.forEach((d: any) => {
          posts.push(d.data());
        })
        setPosts([...posts]);
        return () => {
          unsub();
        }
      })
  },[]);

  const createNewPost = async () => {
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

  function getDate(date:string) {
    const validDate = new Date(+date);
    return validDate.toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <div>
      {isAuth
      ? 
        <div className="container main__container">
          <button>Выйти из профиля</button>
          <div>
            <div className='card'>
              <input onChange={(e) => setPostBody(e.target.value)} className='input' type="text"/>
              <button onClick={createNewPost}>Отправить</button>
            </div>
            <ul className='post-card__list'>
              {posts.map(post => 
                <li className='card' key={post.id}>
                  <div className='post-card__header'>
                    <img src={post.img} alt={post.name}/>
                    <div className='post-card__header-description'>
                      <h5>{post.name}</h5>
                      <span>{getDate(post.date)}</span>
                    </div>
                  </div>
                  <p className='post-card__body'>{post.body}</p>
                </li>
              )}
            </ul>
            </div>
        </div>
      : <Navigate to='/login'/>
      }
    </div>
  )
}

export default MainPage