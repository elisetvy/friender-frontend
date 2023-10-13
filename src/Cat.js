import './Cat.css';
import { useState } from 'react';

function Cat({ cat }) {
  const [heart, setHeart] = useState("bi-heart")

  function toggleFill() {
    heart === "bi-heart" ? setHeart("bi-heart-fill") : setHeart("bi-heart");
  }

  return (
    <div className="Cat">
      <h3>{cat.firstName}</h3>
      <img width="200px" src={cat.profilePic} alt={cat.firstName} />
      <p><b>Hobbies:</b> {cat.hobbies || "none"}</p>
      <p><b>Interests:</b> {cat.interests || "none"}</p>
      <button onClick={toggleFill}><i className={`${heart} heart`}></i></button>
    </div>
  )
}

export default Cat;