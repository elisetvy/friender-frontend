import { useState } from "react";

import User from "../User/User";

import "./Carousel.css";

/** Carousel to display user cards. */
function Carousel({ users, currUser }) {
  const [index, setIndex] = useState(0);
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
    <div className="Carousel">
      <div className="Carousel-card">
        <User user={currU} currUser={currUser} users={users} />
      </div>
      <div className="Carousel-buttons">
        <button className="pass" onClick={unswipe}><i className="bi bi-x-circle-fill"></i></button>
        <button className="like" onClick={swipe}><i className="bi-heart-fill"></i></button>
      </div>
    </div>
  );


}

export default Carousel;