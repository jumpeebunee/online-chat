import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import { RootState } from "../store";

const initialState: IUser = {
  email: null,
  accessToken: null,
  name: null,
  id: null,
  photoURL: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const {email, photoURL, name, accessToken, id} = action.payload;
      if (email) state.email = email;
      if (accessToken) state.accessToken = accessToken;
      if (name) state.name = name;
      if (id) state.id = id;
      if (photoURL) state.photoURL = photoURL;
    },
    updateImage(state, action: PayloadAction<string>) {
      state.photoURL = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  } 
})

export default userSlice.reducer;
export const {setUser, updateImage, updateName} = userSlice.actions;
export const getUserName = ((state: RootState) => state.user.name);
export const getUserImage = ((state: RootState) => state.user.photoURL);