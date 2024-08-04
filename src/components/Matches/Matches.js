import User from "../User/User";

import "./Matches.css";

/** Grid of users currUser has matched with. */
function Matches({ currUser, users }) {

  return (
    <div className="Matches">
      {users.map(user => (
        <User key={user.username} user={user} currUser={currUser} />
      ))}
    </div>
  );
}

export default Matches;