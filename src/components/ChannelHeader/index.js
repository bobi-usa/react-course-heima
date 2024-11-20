import './index.scss'

const ChannelHeader = ({ title, info, extra }) => {
  return (
    <div className="channelHeader">
      <div className="header">
        <span>{title}</span>
        <div className="headerDesc">{info}</div>
      </div>
      {extra && <div className="operation">{extra}</div>}
    </div>
  )
}

export default ChannelHeader
