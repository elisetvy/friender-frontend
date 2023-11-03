import { useState } from 'react';

function User({ user }) {
  const [heart, setHeart] = useState("bi-heart");
  const currUser = JSON.parse(localStorage.getItem("currUser"));

  function toggleFill() {
    heart === "bi-heart" ? setHeart("bi-heart-fill") : setHeart("bi-heart");
  }

  return (
    <div className="">
      <h3>{user.firstName}</h3>
      <img width="200px" src={user.profilePic} alt={user.firstName} />
      <p><b>Hobbies:</b> {user.hobbies || "none"}</p>
      <p><b>Interests:</b> {user.interests || "none"}</p>
      {user.username !== currUser.username &&
      <button onClick={toggleFill}><i className={`${heart} heart`}></i></button>}
    </div>
  )
}

export default User;