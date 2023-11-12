import { useNavigate } from "react-router-dom";
import Nav from "./Nav"
import Carousel from "./Carousel";
import User from "./User";

function Users({ users, currUser, logOut }) {
  const navigate = useNavigate();

  function handleClick(){
    logOut();
    navigate("/");
  }

  return (
    <>
      <div className="text-center">
        {users.length !== 0 &&
        <div className="">
          <Carousel users={users} currUser={currUser} />
        </div>}
      </div>
    </>
  )
}

export default Users;