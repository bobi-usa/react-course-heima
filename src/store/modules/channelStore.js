import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: [],
  },
  reducers: {
    setChannels(state, action) {
      state.channelList = action.payload
    },
  },
})

const { setChannels } = channelStore.actions

// 异步请求部分
// fetchChannelList 是一个异步的 action creator, 被 Redux thunk 中间件扩展
// 传入的参数 dispatch 由 Redux thunk拦截到是函数时，进行注入（还有getState）
// setChannels 是一个同步的 action creator
const fetchChannelList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    dispatch(setChannels(res.data.data.channels))
  }
}

const channelReducer = channelStore.reducer

export {
  fetchChannelList,
}

export default channelReducer
