import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FrienderApi from "./api";
import Message from "./Message";

function MessageForm({ sendMessage, getMessages }) {
  const { sender, receiver } = useParams();
  const [message, setMessage] = useState({ sender: sender, receiver: receiver, body: ""});
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

  function handleChange(e) {
    e.preventDefault();

    setMessage(prev => ({...prev, body: e.target.value }));
  }

  async function handleSubmit(e) {
    try {
      await sendMessage(message);
    } catch(err) {
      console.log('Error sending message');
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-emerald-100 w-1/3 ml-auto mr-auto px-4 py-4 rounded-lg">
        <div className="flex w-full gap-2 items-center mb-2">
          <b>To:</b> {receiver}
        </div>
        <div className="bg-emerald-300 h-72 px-3 py-3 mb-2 flex flex-col flex-col-reverse gap-2 overflow-scroll">
          { messages.length === 0
          ? <p className="text-center h-full">No messages!</p>
          : messages.map(message => <Message key={message.id} message={message} />)
        }
        </div>
        <div>
          <div className="flex items-start gap-2">
            <input name="receiver"
                required
                value={message.body}
                type="text"
                placeholder="Write something here..."
                onChange={handleChange}
                className="bg-emerald-300 w-full rounded-lg px-2 py-1"
              />
            <button className="bg-emerald-300 px-3 py-1 rounded-lg hover:scale-105"><i className="bi bi-send text-black"></i></button>
          </div>
        </div>
        {/* {error && <p className="mt-4 text-red-400 font-bold">{error}</p>} */}
      </form>
    </div>
  )
}

export default MessageForm;