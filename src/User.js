import { useState } from 'react';

function User({ user }) {
  const [heart, setHeart] = useState("bi-heart");
  const currUser = JSON.parse(localStorage.getItem("currUser"));

  function toggleFill() {
    heart === "bi-heart" ? setHeart("bi-heart-fill") : setHeart("bi-heart");
  }

  return (
    <div className="">
      <h3>{user.fname}</h3>
      <img width="200px" src={user.photo} alt={user.fname} />
      <p>{user.bio || "none"}</p>
      {user.username !== currUser.username &&
      <button onClick={toggleFill}><i className={`${heart} heart`}></i></button>}
    </div>
  )
}

export default User;