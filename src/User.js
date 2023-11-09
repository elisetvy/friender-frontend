function User({ user, currUser }) {

  return (
    <div className="bg-emerald-100 w-1/5 flex flex-col items-center px-2 py-4 gap-2 rounded-lg">
      <h3 className="font-bold">{user.fname[0].toUpperCase() + user.fname.slice(1)}</h3>
      <img className="object-cover h-48 w-48" src={user.photo} alt={user.username} />
      <p className="mt-2">{user?.bio}</p>
      {user.username !== currUser.username && (
        <small className="font-bold">{user.distance < 1 ? "Less than 1 mile away" : user.distance === 1 ? "1 mile away" : `${user.distance.toLocaleString('en-US')} miles away`}</small>
      )}
    </div>
  )
}

export default User;