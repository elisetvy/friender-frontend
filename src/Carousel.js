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
    <div className="flex justify-center items-center gap-4">
      <button className={`${index === 0 ? "invisible" : "visible"} h-fit hover:scale-105`} onClick={unswipe}><i className="bi bi-x-circle-fill text-3xl text-emerald-300"></i>
</button>
        <User className="z-0" user={currU} currUser={currUser}/>
      <button className={`${index === users.length - 1 ? "invisible" : "visible"} h-fit hover:scale-105`} onClick={swipe}><i className="bi-heart-fill text-3xl text-red-300"></i></button>
    </div>
  )


}

export default Carousel;