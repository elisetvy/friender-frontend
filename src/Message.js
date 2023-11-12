function Message({ message }) {
  const { sender, receiver, body, timestamp } = message;

  return (
    <div className="flex justify-between px-2 py-1 bg-emerald-100">
      <div className="flex gap-3 text-xs">
      <b>{sender}</b>
      <div>{body}</div>
      </div>
      <div className="text-xs">{timestamp}</div>
    </div>
  )
}

export default Message;