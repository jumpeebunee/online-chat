import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import { RootState } from "../store";

const initialState: IUser = {
  email: null,
  accessToken: null,
  name: null,
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const {email, name, accessToken, id} = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      if (email) state.email = email;
      if (accessToken) state.accessToken = accessToken;
      if (name) state.name = name;
      if (id) state.id = id;
    }
  } 
})

export default userSlice.reducer;
export const {setUser} = userSlice.actions;
export const getUserName = ((state: RootState) => state.user.name);