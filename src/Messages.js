import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import FrienderApi from "./api";

function Messages({ currUser }) {
  const { username } = useParams();
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Loads messages on mount. */
  useEffect(function getMessagesOnRender() {
    async function getMessages() {
      let messages;

      try {
        messages = await FrienderApi.getUserMessages(username);

        setMessages(messages);
        setIsLoading(false);
      } catch(err) {
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
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {messages.length !== 0
      ? messages.map(message => (
        <Link to={`/users/${currUser.username}/messages/${message.username}`} className="w-1/3 hover:scale-105">
          <div key={message.id} className="bg-emerald-200 rounded-xl py-4 px-4 flex flex-col">
            <div className="flex justify-between items-center">
            <b>{message.username}</b>
            <p className="text-xs">{daysAgo(message.timestamp) < 1 ? "Today" : daysAgo(message.timestamp) === 1 ? "1 day ago" : `${daysAgo(message.timestamp)} days ago`}</p>
            </div>
            <p className="text-xs">{message.body}</p>
          </div>
        </Link>
      ))
    : <p>No messages.</p>
    }
    </div>
  )

}

export default Messages;