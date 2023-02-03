import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser } from "../../types/types";
import { RootState } from "../store";

interface CurrentUserProps {
  currentUser: ICurrentUser;
}

const initialState: CurrentUserProps = {
  currentUser: {
    uid: "",
    photoUrl: "",
    displayName: "",
  },
};
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    addCurrentUser(state, action: PayloadAction<ICurrentUser>) {
      state.currentUser = action.payload;
    },
  },
});

export default currentUserSlice.reducer;
export const { addCurrentUser } = currentUserSlice.actions;
export const getSecondUser = (state: RootState) =>
  state.currentUser.currentUser;
