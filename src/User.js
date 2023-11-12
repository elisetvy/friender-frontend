import { Link } from "react-router-dom";

function User({ user, currUser }) {

  return (
    <Link to={`/users/${user.username}`} className="hover:text-black bg-emerald-100 w-72 h-96 rounded-lg">
      <div className="flex flex-col justify-between items-center px-4 py-4 h-96 gap-3">
        <div className="h-4/6 w-full overflow-hidden">
          <img className="h-full w-full object-cover" src={user.photo} alt={user.username} />
        </div>
        <div className="flex flex-col justify-between h-2/6">
          <h3 className="font-bold">{user.name[0].toUpperCase() + user.name.slice(1)}</h3>
          <p className="line-clamp-2">{user?.bio}</p>
          {user.username !== currUser.username && (
            <small className="font-bold">{user.distance < 1 ? "Less than 1 mile away" : user.distance === 1 ? "1 mile away" : `${user.distance.toLocaleString('en-US')} miles away`}</small>
            )}
        </div>
      </div>
    </Link>
  )
}

export default User;