import { useDispatch, useSelector } from "react-redux"
// 导入actionCreator
import { increment, decrement } from './store/modules/counterStore'
// 用于自己测试
import { addList, deleteList } from "./store/modules/testStore"

const App = () => {
  // 先获取模块，再从模块中获取数据
  const { count } = useSelector(state => state.counter)
  const dispatch = useDispatch()

  const { list } = useSelector(state => state.test)

  return (
    <div>
      {/* 注意：这里actionCreater别忘记执行，执行后才能生成action对象 */}
      <button onClick={() => { dispatch(decrement()) }}>-</button>
      {count}
      <button onClick={() => { dispatch(increment()) }}>+</button>

      {/* 用于自己测试 */}
      <hr />
      <button onClick={() => { dispatch(addList(4)) }}>添加list</button>
      {list}
      <button onClick={() => { dispatch(deleteList(1)) }}>删除list</button>
    </div>
  )
}

export default App
