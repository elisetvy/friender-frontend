import { useNavigate } from "react-router-dom";
import User from "./User";
import Carousel from "./Carousel";

function Users({ users, currUser, logOut }) {
  const navigate = useNavigate();

  function handleClick(){
    logOut();
    navigate("/");
  }

  return (
    <div className="text-center m-10">
      <button onClick={handleClick} className="bg-emerald-300 px-3 py-1 rounded-lg mb-10 hover:scale-105">Log Out</button>
      <div className="flex justify-center mb-4">
      <User user={currUser} currUser={currUser} />
      </div>
      <div className="">
      <Carousel users={users} currUser={currUser} />
      </div>
    </div>
  )
}

export default Users;