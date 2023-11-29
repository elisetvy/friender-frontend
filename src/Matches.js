import User from "./User";

/** Component displaying all users currUser has matched with. */
function Matches({ currUser, users }) {

  return (
    <div className="w-screen flex flex-wrap justify-center gap-4 text-center pb-4">
      {users.map(user => (
          <User key={user.username} user={user} currUser={currUser} />
      ))}
    </div>
  )
}

export default Matches;