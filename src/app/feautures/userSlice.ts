import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import { RootState } from "../store";

const initialState: IUser = {
  email: "",
  accessToken: "",
  name: "",
  uid: "",
  photoURL: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const { email, photoURL, name, uid, accessToken } = action.payload;
      if (email) state.email = email;
      if (accessToken) state.accessToken = accessToken;
      if (name) state.name = name;
      if (uid) state.uid = uid;
      if (photoURL) state.photoURL = photoURL;
    },
    updateImage(state, action: PayloadAction<string>) {
      state.photoURL = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, updateImage, updateName } = userSlice.actions;
export const getUserName = (state: RootState) => state.user.name;
export const getUserImage = (state: RootState) => state.user.photoURL;
export const getCurrentUser = (state: RootState) => state.user;
