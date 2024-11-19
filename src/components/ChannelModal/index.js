const ChannelModal = ({ visible, onClose }) => {
  return (
    <div className="channel-modal" style={{ 'display': visible ? 'block' : 'none' }}>
      channel-modal
      <button onClick={onClose}>关闭</button>
    </div>
  )
}

export default ChannelModal
