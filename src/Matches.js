import User from "./User";

function Matches({ currUser, users }) {

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10 text-center">
      {users.map(user => (
        <User key={user.username} user={user} currUser={currUser} className="" />
      ))}
    </div>
  )
}

export default Matches;