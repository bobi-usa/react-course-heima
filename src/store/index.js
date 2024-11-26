import { configureStore } from '@reduxjs/toolkit'
// 导入子模块reducer
import counterReducer from './modules/counterStore'
// 用于自己测试的子模块: createAction 及 基础配置
import testReducer from './modules/testStore'


const store = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer,
  }
})

export default store

// configure: 配置


