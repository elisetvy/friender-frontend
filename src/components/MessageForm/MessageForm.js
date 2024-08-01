import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "./MessageForm.css";
import API from "../../api";
import Loading from "../Loading/Loading";
import MessagesContainer from "../Messages/MessagesContainer";

/** Form to send a message. */
function MessageForm({ currUser, sendMessage }) {
  const { receiver } = useParams();
  const [receiverUser, setReceiverUser] = useState(null);
  const [message, setMessage] = useState({ sender: currUser.username, receiver: receiver, body: "" });
  const [loading, setLoading] = useState(true);

  useEffect(function getReceiverOnRender() {
    async function getReceiver() {
      let u;

      try {
        u = await API.getUser(receiver);

        setReceiverUser(u);
        setLoading(false);
      } catch (err) {
        console.log("Error retreiving receiver!");
      }
    }
    getReceiver();
  }, [receiver]);

  /** Update state with form data. */
  function handleChange(e) {
    e.preventDefault();

    setMessage(prev => ({ ...prev, body: e.target.value }));
  }

  /** Call sendMessage function with form data. */
  async function handleSubmit(e) {
    try {
      await sendMessage(message);
    } catch (err) {
      console.log('Error sending message!');
    }
  }

  if (loading === true) {
    return <Loading />;
  }

  return (
    <div className="MessageForm">
      <form onSubmit={handleSubmit}>
        <Link to={`/users/${receiverUser.username}`}>
          <div className="MessageForm-user">
            <img src={receiverUser.photo} alt={receiverUser.username} />
            <p>{receiverUser.username[0].toUpperCase() + receiverUser.username.slice(1)}</p>
          </div>
        </Link>
        <div className="MessageForm-messages">
          <MessagesContainer currUser={currUser} sender={currUser.username} receiver={receiver} />
        </div>
        <div>
          <div className="MessageForm-currUser">
            <Link to={`/users/${currUser.username}`}>
              <img src={currUser.photo} alt={currUser.username} />
            </Link>
            <input name="receiver"
              required
              value={message.body}
              type="text"
              placeholder="What's on your mind..."
              onChange={handleChange}
            />
            <button><i className="bi bi-send"></i></button>
          </div>
        </div>
        {/* {error && <p className="mt-4 text-red-400 font-bold">{error}</p>} */}
      </form>
    </div>
  );
}

export default MessageForm;