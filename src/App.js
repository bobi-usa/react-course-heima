import { useEffect, useState } from 'react'
import './App.scss'

// useEffect 的使用
/**
 * 需求：在线聊天室的连接和关闭
 * 步骤：
 * 1. 挂载时，和默认聊天室建立连接
 * 2. 更新时，和最新聊天室建立连接
 * 3. 卸载时，和聊天室断开连接
 */

// 聊天室
const ChatRoom = ({ roomId }) => {
  console.log('当前房间：', roomId)

  // 1. 挂载时，和默认聊天室建立连接
  // 第二个参数默认空数组，就是默认挂载时执行，只执行一次
  // 此阶段可以发送请求，进行 DOM 操作
  // useEffect(() => {
  //   console.log('建立连接：muisc 房间')
  // }, [])

  // 2. 更新时，和最新聊天室建立连接
  // 注意：该调用方式会在组件挂载以及更新时都会执行
  // 类似于生命周期钩子函数，但是并不是完全一样，比如现在看到的一进来就会执行一次，这个就不一样
  // useEffect(() => {
  //   console.log(`建立连接：${roomId} 房间`)
  // }, [roomId])

  // 3. 卸载时，和聊天室断开连接
  // 卸载时，第二个参数也是空数组，空数组意味着这个 useEffect 只会走一次
  useEffect(() => {
    return () => {
      console.log('断开连接')
    }
  }, [])

  return (
    <div className="chat-room">
      <h1>欢迎来到 {roomId} 房间</h1>
    </div>
  )
}

const App = () => {
  // 房间id
  const [roomId, setRoomId] = useState('music')
  // 是否正在聊天
  const [chatting, setChatting] = useState(true)

  return (
    <div className="App">
      <button
        onClick={() => setChatting(!chatting)}
      >
        {chatting ? '退出聊天' : '开始聊天'}
      </button>

      {
        chatting ? (
          <div>
            <label>
              选择聊天室
              <select value={roomId} onChange={e => { setRoomId(e.target.value) }}>
                <option value="music">music</option>
                <option value="travel">travel</option>
                <option value="sports">sports</option>
              </select>
            </label>
            {/* 聊天室 */}
            <ChatRoom roomId={roomId} />
          </div>
        ) : (
          <p>点击【开始聊天】按钮，开始吧～</p>
        )}
    </div>
  )
}

export default App
