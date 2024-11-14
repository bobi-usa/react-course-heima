// 头像组件
// 2. 通过函数参数接收 props
// const Avatar = props => {
//   console.log('props:', props)
//   // 注意： props 是只读的对象
//   // props.imgUrl = 'xxx'
//   return (<img src={props.imgUrl} width={props.size} alt="" />)
// }

// 推荐：可以使用解构来简化 props 的使用
// size = 50 用于给 size prop 设置默认值
const Avatar = ({ imgUrl, size = 50 }) => {
  return (<img src={imgUrl} width={size} alt="" />)
}

const App = () => {
  return (
    <div>
      {/* 头像组件 */}
      {/* 1. 给组件传递 props */}
      {/* 如果要给组件传递非字符串类型的数据， 需要使用 {} 来传递 */}
      <Avatar
        size={100}
        imgUrl="https://himg.bdimg.com/sys/portrait/item/public.1.b0f75b4f.gVariaQwzy_hz4WmRhvS-g.jpg"
      />

      <Avatar
        imgUrl="https://himg.bdimg.com/sys/portrait/item/public.1.b0f75b4f.gVariaQwzy_hz4WmRhvS-g.jpg"
      />
    </div>
  )
}

export default App
