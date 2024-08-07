import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Loading from "../Loading/Loading";
import Messages from "../Messages/Messages";

import API from "../../api";

import "./MessageForm.css";

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
        console.log("Error retrieving receiver!");
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
        <div className="MessageForm-receiver">
          <Link to={`/users/${receiverUser.username}`}>
            <img src={receiverUser.photo} alt={receiverUser.username} />
            <p>{receiverUser.username[0].toUpperCase() + receiverUser.username.slice(1)}</p>
          </Link>
        </div>
        <div className="MessageForm-messages">
          <Messages currUser={currUser} sender={currUser.username} receiver={receiver} />
        </div>
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
        {/* {error && <p className="mt-4 text-red-400 font-bold">{error}</p>} */}
      </form>
    </div>
  );
}

export default MessageForm;