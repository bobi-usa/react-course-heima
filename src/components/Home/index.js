import { useState } from 'react'
import ChannelModal from '../ChannelModal'

const Home = () => {
  // 控制弹窗展示与隐藏的状态
  const [visible, setVisible] = useState(false)

  return (
    <div className="home">
      <div className="home-channels">
        <div className="list">
          <div className="item">全站</div>
          <div className="item">直播</div>
          <div className="item">高赞</div>
        </div>
        <div className="more" onClick={() => { setVisible(true) }}>亖</div>
      </div>
      {/* 频道弹窗 */}
      <ChannelModal visible={visible} onClose={() => setVisible(false)} />
    </div>
  )
}

export default Home
