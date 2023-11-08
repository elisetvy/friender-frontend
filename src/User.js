import { useState } from 'react';

function User({ user, currUser }) {
  const [heart, setHeart] = useState("bi-heart");

  function toggleFill() {
    heart === "bi-heart" ? setHeart("bi-heart-fill") : setHeart("bi-heart");
  }

  return (
    <div className="bg-emerald-100 w-1/5 flex flex-col items-center px-2 py-4 gap-2 rounded-lg">
      <h3 className="font-bold">{user.fname[0].toUpperCase() + user.fname.slice(1)}</h3>
      <img className="object-cover h-48 w-48" src={user.photo} alt={user.fname} />
      <p>{user?.bio}</p>
      {user.username !== currUser.username &&
      <button onClick={toggleFill}><i className={`${heart} heart text-red-300`}></i></button>}
    </div>
  )
}

export default User;