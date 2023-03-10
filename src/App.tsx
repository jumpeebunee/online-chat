import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { IUser } from "./types/types";
import { setUser } from "./app/feautures/userSlice";
import AppNavigation from "./components/AppNavigation";
import AppHeader from "./components/AppHeader";
import AppNav from "./components/AppNav";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data: IUser = {
          email: user.email as string,
          accessToken: user.refreshToken,
          name: user.displayName as string,
          uid: user.uid,
          photoURL: user.photoURL as string,
        };
        dispatch(setUser(data));
      } else {
        navigate("/login");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="app">
      {!isLoading ? (
        <div className="app__content">
          <AppHeader />
          <main className="main">
            <div className="container main__container">
              {location.pathname !== "/login" &&
              location.pathname !== "/auth" ? (
                <AppNav />
              ) : (
                ""
              )}
              <div className="main-app">
                <AppNavigation />
              </div>
            </div>
          </main>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default App;
