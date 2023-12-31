import { useState, useEffect } from "react";

import FrienderApi from "./api";
import Loading from "./Loading";
import Message from "./Message";

/** Container displaying Message components. */
function MessagesContainer({ sender, receiver, currUser }) {
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
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-2">
      { messages.length === 0
          ? <p className="text-center">No messages!</p>
          : messages.map(message => <Message currUser={currUser} key={message.id} message={message} />)
        }
    </div>
  )
}

export default MessagesContainer;