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
  // console.log('当前房间：', roomId)

  /**
   * 方式一：以【生命周期钩子函数】为主
   *        分别在每个钩子函数中，实现一个完整功能的部分效果
   */

  /**
   * 方式二：以【功能】为主
   *        一个功能的所有效果放在一起实现
   */

  const [count, setCount] = useState(0)
  let age = 10
  // 扩展1
  // 推荐：一个 useEffect 负责一个完整的功能
  // 与生命周期不一样在于：useEffect 可以将功能都写在一起，但是生命周期每个阶段只能写对应的代码
  // 代码执行过程：一、挂载：1  二、更新：21重复  三、卸载：2

  // 扩展2
  // 依赖项的说明
  // 指定依赖项的原则：Effect函数中用到的，并且是可变的值 （props/state/组件中创建的变量等）
  useEffect(() => {
    console.log(`1 建立连接：${roomId} 房间`, count, age)
    return () => {
      // 此处就不是单单卸载的意思了，而是清理函数， 即要做下一个动作前先把上一个动作清理掉
      // 每次状态发生改变，此处也都会执行，意为断开上一次状态
      console.log(`2 断开连接：${roomId} 房间`)
    }
  }, [roomId, count, age])
  // 一定要正确指定 useEffect 的依赖项，否则，会bug
  // }, [])

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
  // useEffect(() => {
  //   return () => {
  //     console.log('断开连接')
  //   }
  // }, [])

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
