function Message({ message }) {
  const { sender, body, timestamp } = message;

  return (
    <div className="flex flex-col px-2 py-1 bg-emerald-100">
      <div className="text-[6px]">{new Date(timestamp).toString()}</div>
      <div className="flex gap-2 text-xs">
      <b>{sender}</b>
      <div>{body}</div>
      </div>
    </div>
  )
}

export default Message;