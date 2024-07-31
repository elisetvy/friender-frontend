import { Link } from "react-router-dom";

import "./User.css";

/** User card. */
function User({ user, currUser }) {

  return (
    <Link to={`/users/${user.username}`} className="User">
      <div>
          <img src={user.photo} alt={user.username} />
          <div>{user.name[0].toUpperCase() + user.name.slice(1)}, {user.age}</div>
      </div>
    </Link>
  )
}

export default User;