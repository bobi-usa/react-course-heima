import './index.css'

const Child = () => {
  return <h1>Header 标题</h1>
}

const Header = () => {
  return (
    <div className="header">
      <Child />
      header
    </div>)
}

export default Header
