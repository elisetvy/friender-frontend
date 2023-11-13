import { Link, useNavigate } from "react-router-dom";

function Nav({ logOut, currUser }) {
  const navigate = useNavigate();

  function handleClick(){
    logOut();
    navigate("/");
  }

  return (
    <div className="w-5/6 bg-emerald-200 ml-auto mr-auto px-3 py-2 rounded-xl flex justify-between mb-10">
      <div className="font-black w-1/3 justify-start"><Link to="/">Friender</Link></div>
      <div className="flex gap-4 w-1/3 justify-center">
        <Link to={`/users/${currUser.username}/matches`}>Matches</Link>
        <Link to={`/users/${currUser.username}/messages`}>Messages</Link>
      </div>
      <div className="flex gap-4 w-1/3 justify-end">
        <Link to={`/users/${currUser.username}`}>Your Profile</Link>
        <p onClick={handleClick} className="hover:cursor-pointer">Log Out</p>
      </div>
    </div>
  )
}

export default Nav;