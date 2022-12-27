import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUser = {
  email: string | null,
  password: string | null,
  id: number | null,
}

const initialState: IUser = {
  email: null,
  password: null,
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const {email, password, id} = action.payload;
      if (email) state.email = email;
      if (password) state.password = password;
      if (id) state.id = id;
    }
  } 
})

export default userSlice.reducer;
export const {setUser} = userSlice.actions;