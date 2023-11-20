/** Message component rendered by MessagesContainer. */
function Message({ message }) {
  const { sender, body, timestamp } = message;

  return (
    <div className="flex flex-col px-2 py-1 background-purple font-white">
      <div className="text-[6px]">{new Date(timestamp).toString()}</div>
      <div className="flex gap-2 text-xs">
      <b className="font-fuschia">{sender}</b>
      <div className="">{body}</div>
      </div>
    </div>
  )
}

export default Message;