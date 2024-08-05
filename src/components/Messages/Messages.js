import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";

import API from "../../api";

import "./Messages.css";

/** Component displaying message threads. */
function Messages({ currUser }) {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Loads messages on mount. */
  useEffect(function getMessagesOnRender() {
    async function getMessages() {
      let messages;

      try {
        messages = await API.getUserMessages(currUser.username);

        setMessages(messages);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, []);

  /** Calculate days between timestamp and now. */
  function daysAgo(timestamp) {
    const time = new Date().getTime() - new Date(timestamp).getTime();
    const days = Math.floor(time / (1000 * 3600 * 24));

    return days;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="Messages">
      <div className="Messages-thread">
        {messages.length !== 0
          ? messages.map(message => (
            <Link key={message.id} to={`/users/${currUser.username}/messages/${message.username}`}>
                <div>
                  <p>{message.username}</p>
                  <p >{daysAgo(message.timestamp) < 1 ? "Today" : daysAgo(message.timestamp) === 1 ? "1 day ago" : `${daysAgo(message.timestamp)} days ago`}</p>
                </div>
                <p>{message.body}</p>
            </Link>
          ))
          : <p>No messages.</p>
        }
      </div>
    </div>
  );
}

export default Messages;