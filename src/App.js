import axios from "axios"
import classNames from "classnames"
import { useEffect, useState } from "react"
import './App.scss'

// 父子组件通讯
// 父 -> 子 （功能：渲染任务列表）
// 子 -> 父 （功能：切换任务完成状态）
//   2.1 父组件准备修改状态的函数，并传递给子组件
//   2.2 子组件调用函数，并回传数据

// 子组件
const Todo = ({ id, text, done, handle }) => {
  return (
    <div className={classNames('todo', done && 'todo-done')}>
      <div onClick={() => { handle(id, done) }}>{text}</div>
      <button>X</button>
    </div>
  )
}

// 任务列表数据
const defaultTodos = []

const App = () => {
  const [todos, setTodos] = useState(defaultTodos)

  // 注意：不要直接在 Effect函数 上添加 async, 因为 Effect 函数是同步的
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get('http://localhost:8080/todos')
      console.log('res', res)
      setTodos(res.data)
    }
    loadData()
  }, [])

  // 切换任务完成状态
  const onToggle = async (id, done) => {
    setTodos(todos.map(item => {
      if (item.id === id) {
        // item.done = !item.done
        return {
          ...item,
          done: !item.done,
        }
      }
      return item
    }))

    // 这里不是实际场景中接口的调用使用方法
    // 实际情况中，更新接口调用后，会重新调用接口获取列表
    await axios.patch(`http://localhost:8080/todos/${id}`, {
      done: !done,
    })

    // const res = await axios.patch(`http://localhost:8080/todos/${id}`, {
    //   done: !done,
    // })
    // console.log('res', res)



    // axios.patch(`http://localhost:8080/todos/${id}`, {
    //   done: !done,
    // }).then((data) => {
    //   console.log('data', data)
    // }).catch(() => {

    // })


  }

  return (
    <div className="app">
      <h3>待办任务列表：</h3>
      {todos.map(item => {
        return (
          <Todo key={item.id} {...item} handle={onToggle} />
          // <Todo
          //   key={item.id}
          //   id={item.id}
          //   text={item.text}
          //   done={item.done}
          //   handle={onToggle}
          // />
        )
      })}
    </div>
  )
}

export default App
