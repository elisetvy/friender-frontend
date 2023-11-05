import { useState } from 'react';

function User({ user }) {
  const [heart, setHeart] = useState("bi-heart");
  const currUser = JSON.parse(localStorage.getItem("currUser"));

  function toggleFill() {
    heart === "bi-heart" ? setHeart("bi-heart-fill") : setHeart("bi-heart");
  }

  return (
    <div className="bg-emerald-100 w-1/5 flex flex-col items-center px-2 py-4 gap-2 rounded-lg">
      <h3 className="font-bold">{user.fname[0].toUpperCase() + user.fname.slice(1)}</h3>
      <img width="200px" src={user.photo} alt={user.fname} />
      <p>{user.bio || "none"}</p>
      {user.username !== currUser.username &&
      <button onClick={toggleFill}><i className={`${heart} heart text-red-300`}></i></button>}
    </div>
  )
}

export default User;