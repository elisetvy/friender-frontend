/** Message component rendered by MessagesContainer. */
function Message({ message, currUser }) {
  const { sender, body } = message;

  return (
    <div className={`w-full flex ${sender === currUser.username ? "justify-end text-right" : "justify-start text-left"}`}>
      <div className={`w-3/4 flex ${sender === currUser.username ? "justify-end text-right" : "justify-start text-left"}`}>
        <div className={`flex w-fit px-2 py-1 ${sender === currUser.username ? "background-fuschia" : "background-blue"} font-white rounded-lg`}>
          <div className="text-xs">{body}</div>
        </div>
      </div>
    </div>
  )
}

export default Message;