import { useState } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

const App = () => {
  const [count, setCount] = useState(10)

  console.log('App 组件渲染了，count: ', count)

  const handleClickAdd = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>计数器：{count}</h1>
      <button onClick={handleClickAdd}>+</button>
    </div>
  )
}

root.render(<App />)
