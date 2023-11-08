import { useState } from "react";
import User from "./User";

function Carousel({ users, currUser }) {
  const [ index, setIndex ] = useState(0);
  const currU = users[index];

  function swipe() {
    if (index < users.length - 1) {
      setIndex(prev => prev += 1);
    }
  }

  function unswipe() {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-center w-full">
        <User user={currU} currUser={currUser}/>
      </div>
      <div className="flex gap-2">
        <button className="bg-emerald-100 px-3 py-1 rounded-lg hover:text-black hover:scale-105" onClick={unswipe}>Unswipe</button>
        <button className="bg-emerald-100 px-3 py-1 rounded-lg hover:text-black hover:scale-105" onClick={swipe}>Swipe</button>
      </div>
    </div>
  )


}

export default Carousel;