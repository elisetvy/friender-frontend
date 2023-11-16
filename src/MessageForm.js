import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import MessagesContainer from "./MessagesContainer";

function MessageForm({ currUser, sendMessage }) {
  const { receiver } = useParams();
  const [message, setMessage] = useState({ sender: currUser.username, receiver: receiver, body: ""});

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
    <div className="absolute top-0 left-0 w-screen min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="background-purple w-1/3 ml-auto mr-auto px-4 py-4 rounded-lg">
        <div className="flex w-full gap-2 items-center mb-2 font-fuschia">
          <b>To:</b> <Link to={`/users/${receiver}`}>{receiver}</Link>
        </div>
        <div className="background-white h-72 px-3 py-3 mb-2 flex flex-col flex-col-reverse overflow-scroll">
          <MessagesContainer sender={currUser.username} receiver={receiver} className="" />
        </div>
        <div>
          <div className="flex items-start gap-2">
            <input name="receiver"
                required
                value={message.body}
                type="text"
                placeholder="Write something here..."
                onChange={handleChange}
                className="background-white w-full rounded-lg px-2 py-1 font-fuschia placeholder:text-[#B39BC8] placeholder:text-sm"
              />
            <button className="background-white px-3 py-1 rounded-lg hover:scale-105"><i className="bi bi-send font-purple"></i></button>
          </div>
        </div>
        {/* {error && <p className="mt-4 text-red-400 font-bold">{error}</p>} */}
      </form>
    </div>
  )
}

export default MessageForm;