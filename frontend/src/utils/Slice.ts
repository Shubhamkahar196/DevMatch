import { createSlice ,type PayloadAction} from "@reduxjs/toolkit";

// Define a type for your user
interface UserState {
  id: string;
  name: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState | null,
  reducers: {
    addUser: (_state, action: PayloadAction<UserState>) => {
     
      return action.payload;
    },
    removeUser: () => {
      // You can completely remove the arguments if you don't need them!
      return null;
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;