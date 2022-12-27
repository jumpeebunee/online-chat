import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export function useAuth() {
  const {email, password, id} = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!email,
    email,
    password,
    id,
  }
}