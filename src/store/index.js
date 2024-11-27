import { configureStore } from '@reduxjs/toolkit'
// 导入子模块reducer
import counterReducer from './modules/counterStore'
// 用于自己测试的子模块: createAction 及 基础配置
import testReducer from './modules/testStore'
import channelReducer from './modules/channelStore'


const store = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer,

    channel: channelReducer,
  }
})

export default store

// configure: 配置


