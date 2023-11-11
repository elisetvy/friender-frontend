import { Link } from "react-router-dom";

function User({ user, currUser }) {

  return (
    <Link to={`/users/${user.username}`} className="hover:text-black bg-emerald-100 w-1/5 rounded-lg">
      <div className=" flex flex-col items-center px-2 py-4 gap-2">
        <h3 className="font-bold">{user.name[0].toUpperCase() + user.name.slice(1)}</h3>
        <img className="object-cover h-48 w-48" src={user.photo} alt={user.username} />
        <p className="mt-2">{user?.bio}</p>
        {user.username !== currUser.username && (
          <small className="font-bold">{user.distance < 1 ? "Less than 1 mile away" : user.distance === 1 ? "1 mile away" : `${user.distance.toLocaleString('en-US')} miles away`}</small>
          )}
      </div>
    </Link>
  )
}

export default User;