import "./Message.css";

/** Message component rendered by MessagesContainer. */
function Message({ message, currUser }) {
  const { sender, body } = message;

  return (
    <div className={`Message ${sender === currUser.username ? "currUser" : "receiver"}`}>
      <div className={`${sender === currUser.username ? "currUser-color" : "receiver-color"}`}>
        <div>{body}</div>
      </div>
    </div>
  );
}

export default Message;