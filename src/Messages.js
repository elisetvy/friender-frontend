import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FrienderApi from "./api";
import Loading from "./Loading";

/** Component displaying message threads. */
function Messages({ currUser }) {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Loads messages on mount. */
  useEffect(function getMessagesOnRender() {
    async function getMessages() {
      let messages;

      try {
        messages = await FrienderApi.getUserMessages(currUser.username);

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
    return <Loading />
  }

  return (
    <div className="w-screen flex justify-center">
      <div className="min-w-[385px] w-1/3 flex flex-col items-center gap-2">
        {messages.length !== 0
        ? messages.map(message => (
          <Link key={message.id} to={`/users/${currUser.username}/messages/${message.username}`} className="w-full hover:scale-105">
            <div className="background-white border-1 border-[#E64398] font-fuschia rounded-lg py-4 px-4 flex flex-col">
              <div className="flex justify-between items-center">
              <b className="font-blue">{message.username}</b>
              <p className="text-xs">{daysAgo(message.timestamp) < 1 ? "Today" : daysAgo(message.timestamp) === 1 ? "1 day ago" : `${daysAgo(message.timestamp)} days ago`}</p>
              </div>
              <p className="text-xs line-clamp-1">{message.body}</p>
            </div>
          </Link>
        ))
        : <p>No messages.</p>
      }
      </div>
    </div>
  )
}

export default Messages;