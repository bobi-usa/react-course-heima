import classNames from "classnames"
import { useState } from "react"
import './App.scss'

// 左侧 好友列表组件
// 注意：这里传递的数据 friends 本身是数组，但是这里接收到的数据不是直接的数组，是在对象里
//      向组件传递的参数无论什么类型都会被包裹在一个对象里，都需要解构

const Friends = ({ friends, chatFriend, onSelect }) => {
  return (
    <div className="friends">
      {friends.map(item => {
        return (
          <div
            key={item.id}
            className={classNames('friend', item.id === chatFriend.id && 'selected')}
            onClick={() => onSelect(item)}
          >
            <img className="avatar" src={item.avatar} alt="" />
            <div className="info">
              <div className="row">
                <div className="name">{item.name}</div>
                <div className="date">{item.dateStr}</div>
              </div>
              <div className="msg"></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
// 右侧 聊天窗口组件
const Chat = ({ friend }) => {
  return (
    <div className="chat-wrapper">
      <div className="header">{friend.name}</div>
      <div className="list"></div>
      <div className="input"></div>
    </div>
  )
}

// 好友列表数据
const defaultFriends = [
  {
    id: '13258165',
    name: '周杰伦',
    avatar:
      'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/zhoujielun.jpeg',
    dateStr: '刚刚',
    message: '哎呦，不错哦',
  },
  {
    id: '36080105',
    name: '许嵩',
    avatar:
      'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/xusong.jpeg',
    dateStr: '01/05',
    message: '[语音]',
  },
]

const App = () => {
  const [friends, setFriends] = useState(defaultFriends)

  // 1. 找到父组件，提供要共享的数据
  const [chatFriend, setChatFriend] = useState(friends[0])

  const onSelectFriend = friend => {
    // console.log('friend', friend)
    setChatFriend(friend)
  }

  return (
    <div className="app">
      {/* 好友列表 */}
      {/* 3. 通过子到父通讯，来修改选中的好友 */}
      <Friends friends={friends} chatFriend={chatFriend} onSelect={onSelectFriend} />
      {/* 聊天窗口 */}
      {/* 2. 通过父到子通讯，来展示好友名称 */}
      <Chat friend={chatFriend} />
    </div>
  )
}

export default App
