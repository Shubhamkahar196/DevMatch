// import { createSlice ,type PayloadAction} from "@reduxjs/toolkit";

// // Define a type for your user
// interface UserState {
//   id: string;
//   firstName:string;
// }

// const userSlice = createSlice({
//   name: 'user',
//   initialState: null as UserState | null,
//   reducers: {
//     addUser: (_state, action: PayloadAction<UserState>) => {
     
//       return action.payload;
//     },
//     removeUser: () => {
//       // You can completely remove the arguments if you don't need them!
//       return null;
//     }
//   }
// });

// export const { addUser, removeUser } = userSlice.actions;
// export default userSlice.reducer;



import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface UserState {
  _id?: string;
  id?: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
  age?: string | number;
  gender?: string;
  about?: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState | null,
  reducers: {
    addUser: (_state, action: PayloadAction<UserState>) => {
      return action.payload; // Correctly returns the entire user state reference
    },
    removeUser: () => {
      return null;
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;