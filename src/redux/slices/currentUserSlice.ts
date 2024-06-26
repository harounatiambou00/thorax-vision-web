import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface currentUserType {
  uid: null | string;
  email: null | string;
  displayName: null | string;
  photoURL: null | string;
}

const initialState: currentUserType = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<currentUserType>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
