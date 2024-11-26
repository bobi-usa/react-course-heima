import { createSlice } from '@reduxjs/toolkit'

const counterStore = createSlice({
  name: 'counter',
  // 初始化state
  initialState: {
    count: 0,
  },
  // 修改状态的方法 同步方法 支持直接修改
  reducers: {
    // key -> action名字     value -> 该action的reducer函数（即状态修改逻辑）
    increment(state) {
      /**
       * 注意：
       * 1. 修改 state: 直接修改即可，不要显式 return。
       * 2. 完全替换 state: 显式 return 一个新状态。
       * 3. 避免混用: 不要同时修改 state 和显式 return，否则会报错。
       */
      state.count++
    },
    decrement(state) {
      state.count--
    },
    addToNum(state, action) {
      state.count = action.payload
    },
  }
})

// 解构出来actionCreator函数，用来生成action对象
const { increment, decrement, addToNum } = counterStore.actions
console.log('aactions', counterStore.actions)
// 获取reducer
const counterReducer = counterStore.reducer

// 以按需导出的方式导出actionCreato r
export {
  increment,
  decrement,
  addToNum,
}
// 以默认导出的方式导出reducer
export default counterReducer

// slice:片、部分
// creator: 创造者
// initial: 最初的、开始的
