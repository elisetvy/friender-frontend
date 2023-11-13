import { useState } from "react";
import { useParams } from "react-router-dom";

import MessagesContainer from "./MessagesContainer";

function MessageForm({ sendMessage, getMessages }) {
  const { sender, receiver } = useParams();
  const [message, setMessage] = useState({ sender: sender, receiver: receiver, body: ""});

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

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-emerald-100 w-1/3 ml-auto mr-auto px-4 py-4 rounded-lg">
        <div className="flex w-full gap-2 items-center mb-2">
          <b>To:</b> {receiver}
        </div>
        <div className="bg-emerald-300 h-72 px-3 py-3 mb-2 flex flex-col flex-col-reverse overflow-scroll">
          <MessagesContainer sender={sender} receiver={receiver} className="" />
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