import { Link } from "react-router-dom";

function User({ user, currUser, users, index, swipe, unswipe }) {

  return (
    <Link to={`/users/${user.username}`} className="w-1/5 h-96">
      <div className="background-white h-full rounded-xl overflow-hidden">
        <div className="relative h-5/6">
          <img className="w-full h-full object-cover" src={user.photo} alt={user.username} />
          <div className="w-full text-left absolute bottom-0 font-white px-2 py-1">{user.name[0].toUpperCase() + user.name.slice(1)}, {user.age}</div>
        </div>
      </div>
    </Link>
  )
}

export default User;