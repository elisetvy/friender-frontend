import { useState } from "react";
import { useParams } from "react-router-dom";

function MessageForm({ currUser }) {
  const { receiver } = useParams();
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    e.preventDefault();

    setMessage(e.target.value);
  }

  function handleSubmit() {

  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-emerald-100 w-1/3 ml-auto mr-auto px-4 py-4 rounded-lg">
        <div>
          <label className="mb-1">To</label>
          <div>
            <input name="receiver"
              required
              value={receiver}
              type="text"
              maxLength={20}
              className="bg-emerald-300 mb-2 w-full rounded-lg px-2 py-1"
              disabled
            />
          </div>
        </div>
        <div>
          <label className="mb-1">Message</label>
          <div>
            <textarea name="message"
              required
              value={message}
              onChange={handleChange}
              type="text"
              className="bg-emerald-300 w-full rounded-lg h-36 px-2 py-1"
            />
          </div>
        </div>
        {/* {error && <p className="mt-4 text-red-400 font-bold">{error}</p>} */}
        <button className="bg-emerald-300 mt-4 px-3 py-1 rounded-lg">Send</button>
      </form>
    </div>
  )
}

export default MessageForm;