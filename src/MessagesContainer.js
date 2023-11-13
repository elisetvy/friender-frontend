import { useState, useEffect } from "react";

import FrienderApi from "./api";
import Message from "./Message";

function MessagesContainer({ sender, receiver }) {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Loads messages on mount. */
  useEffect(function getMessagesOnRender() {
    async function getMessages() {
      let messages;

      try {
        messages = await FrienderApi.getMessages(sender, receiver);

        setMessages(messages);
        setIsLoading(false);
      } catch(err) {
        console.log(err);
      }
    }
    getMessages();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-2">
      { messages.length === 0
          ? <p className="text-center">No messages!</p>
          : messages.map(message => <Message key={message.id} message={message} />)
        }
    </div>
  )
}

export default MessagesContainer;