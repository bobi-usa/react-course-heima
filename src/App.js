import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchChannelList } from "./store/modules/channelStore"
// 导入actionCreator
import { increment, decrement, addToNum } from './store/modules/counterStore'
// 用于自己测试
import { addList, deleteList } from "./store/modules/testStore"

const App = () => {
  // 先获取模块，再从模块中获取数据
  const { count } = useSelector(state => state.counter)
  const dispatch = useDispatch()

  const { list } = useSelector(state => state.test)

  const { channelList } = useSelector(state => state.channel)

  useEffect(() => {
    // 使用 useEffect 触发异步请求执行
    dispatch(fetchChannelList())
  }, [dispatch])

  return (
    <div>
      {/* 注意：这里actionCreater别忘记执行，执行后才能生成action对象 */}
      <button onClick={() => { dispatch(decrement()) }}>-</button>
      {count}
      <button onClick={() => { dispatch(increment()) }}>+</button>
      <button onClick={() => { dispatch(addToNum(10)) }}>add to 10</button>
      <button onClick={() => { dispatch(addToNum(20)) }}>add to 20</button>

      {/* 用于自己测试 */}
      <hr />
      <button onClick={() => { dispatch(addList(4)) }}>添加list</button>
      {list}
      <button onClick={() => { dispatch(deleteList(1)) }}>删除list</button>

      <hr />

      <ul>
        {channelList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default App
