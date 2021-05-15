import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter();

const userSlice = createSlice({
  name: "user",
  initialState: userAdapter.getInitialState(),
  reducers: {
    addUser: userAdapter.addOne,
    removeUser: userAdapter.removeAll,
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const userSelector = userAdapter.getSelectors((state) => state.user); // tạo ra selector để sử dụng một số function có sẵn

export default userSlice.reducer;
