import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export function useAuth() {
  const {email, accessToken, uid} = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!email,
    email,
    accessToken,
    uid,
  }
}