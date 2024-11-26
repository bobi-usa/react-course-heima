import { createSlice } from "@reduxjs/toolkit";
import { deleteList } from "./testStore";

const counterStore = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
  },
})

//action creator
const { increment, decrement } = counterStore.actions
const counterReducer = counterStore.reducer

export {
  increment,
  decrement,
}

export default counterReducer
