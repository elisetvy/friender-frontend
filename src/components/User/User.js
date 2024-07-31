import { Link } from "react-router-dom";

import "./User.css";

/** User card. */
function User({ user, currUser }) {

  return (
    <Link to={`/users/${user.username}`} className="User min-w-[250px] w-1/5 h-96">
      <div className="background-white h-full rounded-lg overflow-hidden">
        <div className="relative h-5/6">
          <img className="w-full h-full object-cover" src={user.photo} alt={user.username} />
          <div className="w-full text-left absolute bottom-0 font-white px-2 py-2">{user.name[0].toUpperCase() + user.name.slice(1)}, {user.age}</div>
        </div>
      </div>
    </Link>
  )
}

export default User;