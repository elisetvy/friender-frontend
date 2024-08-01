import "./Message.css";

/** Message component rendered by MessagesContainer. */
function Message({ message, currUser }) {
  const { sender, body } = message;

  return (
    <div className={`Message ${sender === currUser.username ? "currUser" : "user"}`}>
      <div className={`Message-block ${sender === currUser.username ? "currUser" : "user"}`}>
        <div className={`${sender === currUser.username ? "currUser-color" : "user-color"}`}>
          <div>{body}</div>
        </div>
      </div>
    </div>
  )
}

export default Message;