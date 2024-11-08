import './App.css'
import Header from './components/Header'

// 组件名称首字母要大写
const App = () => {
  const handleClick = () => {
    alert('React Component')
  }
  // return <div className="app" onClick={handleClick}>React Component</div>
  return (
    <div className="app" onClick={handleClick}>
      <Header />
      React 根组件：App
    </div>)
}

export default App
