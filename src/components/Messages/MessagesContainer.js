import { useState, useEffect } from "react";

import Loading from "../Loading/Loading";
import Message from "../Message/Message";

import API from "../../api";

import "./MessagesContainer.css";

/** Container displaying Message components. */
function MessagesContainer({ sender, receiver, currUser }) {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Loads messages on mount. */
  useEffect(function getMessagesOnRender() {
    async function getMessages() {
      let messages;

      try {
        messages = await API.getMessages(sender, receiver);

        setMessages(messages);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="MessagesContainer">
      {messages.length === 0
        ? <p>No messages!</p>
        : messages.map(message => <Message currUser={currUser} key={message.id} message={message} />)
      }
    </div>
  );
}

export default MessagesContainer;