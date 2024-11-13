import { useRef, useState } from 'react'
import classNames from 'classnames'
import './App.scss'
// 注意：在 React 中使用本地图片，需要手动导入，不能使用相对路径, 仅针对本地图片
import avatar from './images/avatar.jpg'
import orderBy from 'lodash/orderBy'
import dayjs from 'dayjs'

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar:
        'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/zhoujielun.jpeg',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    // 喜欢数量
    like: 98,
    // 0：未表态 1: 喜欢 2: 不喜欢
    action: 0,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar:
        'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/xusong.jpeg',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
    action: 2,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
    action: 1,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

/**
 * 发表评论
 * 
 * 1. 获取评论内容 - 受控组件
 * 2. 发布评论
 *    2.1 有内容，发布评论，同时排序
 *    2.2 无内容，获得焦点，提升体验
 */

const App = () => {
  // 导航 Tab 高亮的状态
  const [activeTab, setActiveTab] = useState('hot')
  const [list, setList] = useState(defaultList)

  // 评论框的状态
  const [textareaValue, setTextareaValue] = useState('')
  // 评论框的 ref 对象
  const textareaRef = useRef(null)

  // 删除评论
  const handleClickDelete = (rpid) => {
    setList(list.filter(item => rpid !== item.rpid))
  }

  // 点赞/取消 每个按钮只做自己的事，不相互关联对方的逻辑
  const onLike = rpid => {
    setList(
      list.map(item => {
        if (item.rpid === rpid) {
          return {
            ...item,
            /**
             * 效果：点赞按钮如果没有高亮，点击增加高亮，如果已经高亮，点击取消高亮
             * 
             * action 高亮状态
             * 1. 若没高亮(0、2),点击增加高亮，和点踩按钮事件是没有关系，但是是和action值是有关系
             *    的，所以也和点踩按钮的action值2有关系
             * 2. 若已高亮(1),点击取消高亮
             * 3. 已高亮的状态值是确定的，未高亮的状态值不定，所以根据固定值判断
             */
            action: item.action === 1 ? 0 : 1,
            /**
             * like 点赞数
             * 1. 若没高亮(0,2)，点击增加高亮，点赞数 + 1
             * 2. 若已高亮(1), 点击取消高亮，点赞数 - 1，
             * 3. 已高亮的状态值是确定的，同样以固定值判断
             * 
             */
            like: item.action === 1 ? item.like - 1 : item.like + 1,
          }
        } else {
          return item
        }
      })
    )
  }

  const onDislike = rpid => {
    setList(
      list.map(item => {
        if (item.rpid === rpid) {
          return {
            ...item,
            /**
             * 效果：点踩按钮如果没有高亮，点击增加高亮，如果已经高亮，点击取消高亮
             * 
             * action 高亮状态
             * 1. 若没高亮(0,1)，点击增加高亮
             * 2. 若已经高亮(2)，点击取消高亮，取消高亮后点赞要高亮吗？不高亮，点赞高亮只和点赞按钮
             *    有关系，点赞按钮点了，点赞才会高亮
             */
            action: item.action === 2 ? 0 : 2,
            /**
             * like 点赞数
             * 此处涉及点赞按钮
             * 1. 若没高亮(0,1)，点击增加高亮, 点赞数不定
             *    <1>. 0 都没高亮，点击增加高亮，点赞数不变
             *    <2>. 1 点赞高亮，点击增加高亮，点赞数 - 1
             * 2. 若已经高亮(2)，点击取消高亮, 点赞数不变
             */
            like: item.action === 1 ? item.like - 1 : item.like,
          }
        } else {
          return item
        }
      })
    )
  }

  const onAdd = () => {
    // 判断评论框的内容是否为空
    if (textareaValue.trim() === '') return textareaRef.current.focus()

    // 组装评论数据
    const comment = {
      // 时间戳
      rpid: Date.now(),
      user,
      content: textareaValue,
      ctime: dayjs().format('MM-DD HH:mm'),
      like: 0,
      action: 0,
    }
    // 添加到评论列表 list 状态中
    const newList = [comment, ...list]
    // 排序
    if (activeTab === 'hot') {
      // 更新状态
      setList(orderBy(newList, 'like', 'desc'))
    }

    if (activeTab === 'time') {
      // 更新状态
      setList(orderBy(newList, 'ctime', 'desc'))
    }

    // 清空评论框的内容
    setTextareaValue('')
  }

  // tab 高亮切换
  const onToggle = type => {
    setActiveTab(type)

    let newList = []
    if (type === 'hot') {
      // newList = list.sort((a, b) => b.like - a.like)
      newList = orderBy(list, 'like', 'desc')
    }

    if (type === 'time') {
      // newList = list.sort((a, b) => {
      //   const dateA = new Date(`2024-${a.ctime}`)
      //   const dateB = new Date(`2024-${b.ctime}`)
      //   return dateB - dateA
      // })

      // 按照时间降序排序
      // orderBy(对谁进行排序，key, 顺序)
      newList = orderBy(list, 'ctime', 'desc')
    }

    setList(newList)
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{list.length}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => {
              return (
                <div
                  key={item.type}
                  className={
                    classNames('nav-item', activeTab === item.type && 'active')
                  }
                  onClick={() => { onToggle(item.type) }}
                >
                  {item.text}
                </div>
              )
            })}
            {/* <div className="nav-item active">最热</div> */}
            {/* <div className="nav-item">最新</div> */}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              ref={textareaRef}
              value={textareaValue}
              onChange={e => { setTextareaValue(e.target.value) }}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send" onClick={onAdd}>
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {/* <div className="reply-item">

            <div className="root-reply-avatar">
              <div className="bili-avatar">
                <img
                  className="bili-avatar-img"
                  src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/zhoujielun.jpeg"
                  alt=""
                />
              </div>
            </div>

            <div className="content-wrap">
              <div className="user-info">
                <div className="user-name">周杰伦</div>
              </div>
              <div className="root-reply">
                <span className="reply-content">哎呦，不错哦~</span>
                <div className="reply-info">
                  <span className="reply-time">11-13 11:29</span>
                  <span className="reply-like">
                    <i className="icon like-icon" />
                    <span>66</span>
                  </span>
                  <span className="reply-dislike">
                    <i className="icon dislike-icon" />
                  </span>
                  <span className="delete-btn">删除</span>
                </div>
              </div>
            </div>
          </div> */}

          <div className="reply-list">
            {list.map(item => {
              return (<div key={item.rpid} className="reply-item">
                {/* 头像 */}
                <div className="root-reply-avatar">
                  <div className="bili-avatar">
                    <img
                      className="bili-avatar-img"
                      src={item.user.avatar}
                      alt=""
                    />
                  </div>
                </div>

                <div className="content-wrap">
                  {/* 用户名 */}
                  <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                  </div>
                  {/* 评论内容 */}
                  <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                      {/* 评论时间 */}
                      <span className="reply-time">{item.ctime}</span>
                      {/* 喜欢 */}
                      <span className="reply-like">
                        {/* 选中类名： liked */}
                        {/* <i className="icon like-icon" /> */}
                        {<i
                          className={
                            item.action === 1
                              ? "icon like-icon liked"
                              : "icon like-icon"
                          }
                          onClick={() => onLike(item.rpid)}
                        ></i>
                        }
                        <span>{item.like}</span>
                      </span>
                      {/* 不喜欢 */}
                      <span className="reply-dislike">
                        {/* 选中类名： disliked */}
                        {/* <i className="icon dislike-icon" /> */}
                        <i
                          className={
                            item.action === 2
                              ? "icon dislike-icon disliked"
                              : "icon dislike-icon"
                          }
                          onClick={() => onDislike(item.rpid)}
                        />
                      </span>
                      {/* 
                          注意：
                          这里向事件传递参数不能和Vue一样直接写括号传递参数

                          onClick={handleClick(id)}，这样写页面加载就直接执行, 

                          应该在事件体中调用函数并传递参数 onClick={() => handle(id)}
                      */}
                      {user.uid === item.user.uid &&
                        <span
                          className="delete-btn"
                          onClick={() => handleClickDelete(item.rpid)}
                        >
                          删除
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>)
            })}

            {/* <div className="reply-item">

              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/zhoujielun.jpeg"
                    alt=""
                  />
                </div>
              </div>

              <div className="content-wrap">

                <div className="user-info">
                  <div className="user-name">周杰伦</div>
                </div>

                <div className="root-reply">
                  <span className="reply-content">哎呦，不错哦~</span>
                  <div className="reply-info">

                    <span className="reply-time">11-13 11:29</span>

                    <span className="reply-like">

                      <i className="icon like-icon" />
                      <span>66</span>
                    </span>

                    <span className="reply-dislike">

                      <i className="icon dislike-icon" />
                    </span>
                    <span className="delete-btn">删除</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {list.length === 0 && <div className="reply-none">暂无评论</div>}


      </div>
    </div >)
}

export default App
