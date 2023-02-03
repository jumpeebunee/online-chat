import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../app/feautures/userSlice";
import { IUser } from "../types/types";
import AppAuthSignin from "../components/AppAuthSignIn/AppAuthSignin";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const loginUser = () => {
    setServerError("");
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.email && user.displayName && user.photoURL) {
          const userData: IUser = {
            email: user.email,
            uid: user.uid,
            name: user.displayName,
            accessToken: user.refreshToken,
            photoURL: user.photoURL,
          };
          dispatch(setUser(userData));
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setServerError(errorMessage);
      });
  };

  return (
    <div className="container login__container">
      <AppAuthSignin
        userData={userData}
        setUserData={setUserData}
        createNewUser={loginUser}
        serverError={serverError}
      />
    </div>
  );
};

export default LoginPage;
