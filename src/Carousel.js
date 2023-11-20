import { useState } from "react";
import User from "./User";

/** Carousel to display user cards. */
function Carousel({ users, currUser }) {
  const [ index, setIndex ] = useState(0);
  const currU = users[index];

  /** Swipe right (like a user). */
  function swipe() {
    if (index < users.length - 1) {
      setIndex(prev => prev += 1);
    }
  }

  /** Swipe left (pass on a user). */
  function unswipe() {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }
  }

  return (
    <div className="absolute h-screen w-screen top-0 left-0 flex justify-center items-center">
      <div className="relative w-full h-96 flex flex-col items-center gap-4">
          <User className="" user={currU} currUser={currUser} users={users} />
          <div className="absolute bottom-3 flex gap-4">
            <button className={`${index === 0 ? "invisible" : "visible"} h-fit hover:scale-105`} onClick={unswipe}><i className="bi bi-x-circle-fill text-4xl text-emerald-300"></i></button>
            <button className={`${index === users.length - 1 ? "invisible" : "visible"} h-fit hover:scale-105`} onClick={swipe}><i className="bi-heart-fill text-4xl text-red-300"></i></button>
          </div>
      </div>
    </div>
  )


}

export default Carousel;