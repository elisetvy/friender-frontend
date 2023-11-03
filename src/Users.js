import User from "./User";
import { useNavigate } from "react-router-dom";

function Users({ users, currUser, logOut }) {
  const navigate = useNavigate();

  function handleClick(){
    logOut();
    navigate("/");
  }

  return (
    <div className=''>
      <button onClick={handleClick} className="btn btn-primary">Click to logout</button>
      <div className=''>
      <User user={currUser} />
      </div>
      <div className="">
      {users.map(user => <User key={user.username} user={user} />)}
      </div>
    </div>
  )
}

export default Users;