import { useState } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

const App = () => {
  // 简单类型
  const [count, setCount] = useState(0)
  // 复杂类型
  const [list, setList] = useState(['苹果', '香蕉'])
  const [user, setUser] = useState({ name: 'jack', age: 18 })

  return (
    <div>
      <h3>简单类型（比如，数值）</h3>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>修改</button>

      <hr />

      <h3>数组：</h3>
      <div>{list.join(',')}</div>
      <button onClick={() => setList([...list, '梨'])}>添加</button>
      <button onClick={() => setList(list.filter(item => item !== '苹果'))}>
        删除
      </button>
      <button onClick={() => {
        setList(
          list.map(item => {
            if (item === '苹果') {
              return 'Apple'
            }
            return item
          })
        )
      }}>修改</button>

      <hr />
      <h3>对象：</h3>
      <div>姓名：{user.name} 年龄：{user.age}</div>
      <button
        onClick={() => {
          setUser({
            ...user,
            name: 'rose',
          })
        }}
      >
        修改
      </button>
    </div>
  )
}

root.render(<App />)
