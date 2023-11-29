import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import FrienderApi from "./api";
import Loading from "./Loading";
import MessagesContainer from "./MessagesContainer";

/** Form to send a message. */
function MessageForm({ currUser, sendMessage }) {
  const { receiver } = useParams();
  const [receiverUser, setReceiverUser] = useState(null);
  const [message, setMessage] = useState({ sender: currUser.username, receiver: receiver, body: ""});
  const [loading, setLoading] = useState(true);

  useEffect(function getReceiverOnRender() {
    async function getReceiver() {
      let u;

      try {
        u = await FrienderApi.getUser(receiver);

        setReceiverUser(u);
        setLoading(false);
      } catch(err) {
        console.log("Error retreiving receiver!")
      }
    }
    getReceiver();
  }, [receiver]);

  /** Update state with form data. */
  function handleChange(e) {
    e.preventDefault();

    setMessage(prev => ({...prev, body: e.target.value }));
  }

  /** Call sendMessage function with form data. */
  async function handleSubmit(e) {
    try {
      await sendMessage(message);
    } catch(err) {
      console.log('Error sending message!');
    }
  }

  if (loading === true) {
    return <Loading />
  }

  return (
    <div className="w-screen flex justify-center">
      <form onSubmit={handleSubmit} className="background-white min-w-[385px] w-1/3 ml-auto mr-auto px-4 py-4 rounded-lg">
        <Link to={`/users/${receiverUser.username}`}>
          <div className="flex w-fit gap-2 items-center mb-2 font-blue">
            <img src={receiverUser.photo} alt={receiverUser.username} className="rounded-full w-10 h-10 object-cover hover:scale-105" />
            <p>{receiverUser.username}</p>
          </div>
        </Link>
        <div className="background-white h-72 mb-2 flex flex-col flex-col-reverse overflow-scroll">
          <MessagesContainer currUser={currUser} sender={currUser.username} receiver={receiver} className="" />
        </div>
        <div>
          <div className="flex items-center gap-2 h-10">
            <Link to={`/users/${currUser.username}`}>
              <div className="w-10 h-10">
                <img src={currUser.photo} alt={currUser.username} className="rounded-full w-10 h-10 object-cover hover:scale-105" />
              </div>
            </Link>
            <input name="receiver"
                required
                value={message.body}
                type="text"
                placeholder="What's on your mind..."
                onChange={handleChange}
                className="background-white border-1 border-[#E64398] font-fuschia w-full rounded-lg px-2 py-2 placeholder:text-[#E64398] text-xs placeholder:text-xs"
              />
            <button className="border-1 border-[#E64398] px-3 py-1 rounded-lg hover:scale-105"><i className="bi bi-send font-fuschia text-sm"></i></button>
          </div>
        </div>
        {/* {error && <p className="mt-4 text-red-400 font-bold">{error}</p>} */}
      </form>
    </div>
  )
}

export default MessageForm;