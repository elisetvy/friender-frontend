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
    <div className="flex justify-center items-center gap-3">
      <button className={`${index === 0 ? "invisible" : "visible"} h-fit bg-emerald-300 px-3 py-1 rounded-lg hover:text-black hover:scale-105`} onClick={unswipe}>Unswipe</button>
        <User className="z-0" user={currU} currUser={currUser}/>
      <button className={`${index === users.length - 1 ? "invisible" : "visible"} h-fit bg-emerald-300 px-3 py-1 rounded-lg hover:text-black hover:scale-105`} onClick={swipe}>Swipe</button>
    </div>
  )


}

export default Carousel;