import { createAction, createSlice } from "@reduxjs/toolkit";

// createAction工具函数用于生成action的一个 创建函数action creator
const actionCreator = createAction('test/resetList')
const action = actionCreator([4, 5, 6])

console.log('actionCreator', actionCreator) // actionCreator
console.log('action', action) // { type: 'test/resetList', payload: [4, 5, 6]}

const testStore = createSlice({
  name: 'test',
  initialState: {
    list: [1, 2, 3]
  },
  reducers: {
    addList(state, action) {
      /**
       * 注意：
       * 1. 修改 state: 直接修改即可，不要显式 return。
       * 2. 完全替换 state: 显式 return 一个新状态。
       * 3. 避免混用: 不要同时修改 state 和显式 return，否则会报错。
       */
      state.list.push(action.payload)
    },
    deleteList(state, action) {
      state.list = state.list.filter(item => item !== action.payload)
    },
  },
})

const { addList, deleteList } = testStore.actions

export {
  addList,
  deleteList,
}

const testReducer = testStore.reducer

export default testReducer


