import "../styles/pages/mainPage.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { collection, onSnapshot, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { IPost } from "../types/types";
import { getCurrentUser } from "../app/feautures/userSlice";
import PostsList from "../components/PostsList";
import PostCreate from "../components/PostCreate";
import LoadingPosts from "../components/LoadingPosts";

const MainPage = () => {
  const currentUser = useSelector(getCurrentUser);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isPosts, setIsPosts] = useState(false);
  const [isError, setIsError] = useState("");

  // GetPosts
  useEffect(() => {
    setIsPosts(false);
    const unsub = onSnapshot(collection(db, "posts"), (doc) => {
      const posts: IPost[] = [];
      doc.forEach((d: any) => {
        posts.push(d.data());
      });
      posts.sort((a, b) => +b.date - +a.date);
      setIsPosts(true);
      setPosts([...posts]);
      return () => {
        unsub();
      };
    });
  }, []);

  const createNewPost = async (postBody: string) => {
    setIsError("");
    const postId = nanoid();
    try {
      await setDoc(doc(db, "posts", postId), {
        id: postId,
        name: currentUser.name,
        img: currentUser.photoURL,
        date: Date.now().toString(),
        body: postBody,
        uid: currentUser.uid,
        likes: [],
        comments: [],
      });
    } catch (e) {
      setIsError("Error adding post");
    }
  };

  // If auth changed
  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.pathname = "/";
  });

  return (
    <section className="main-section">
      <div className="main__container">
        <div className="main__content">
          <PostCreate createNewPost={createNewPost} setIsError={setIsError} />
          {isError && <label className="error-message">{isError}</label>}
          {isPosts ? <PostsList posts={posts} /> : <LoadingPosts />}
        </div>
      </div>
    </section>
  );
};

export default MainPage;
