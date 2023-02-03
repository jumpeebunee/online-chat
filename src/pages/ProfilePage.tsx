import "../styles/pages/profilePage.scss";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../app/feautures/userSlice";
const ProfilePage = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <div>
      <div className="profile-page">
        <img
          src={currentUser.photoURL}
          alt={currentUser.name}
          className="profile-page__img"
        />
        <div className="profile-page__content">
          <h2>{currentUser.name}</h2>
          <span>{currentUser.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
