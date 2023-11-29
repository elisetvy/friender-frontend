import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


/** Navigation bar. */
function Nav({ logOut, currUser }) {

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  function logOutClick(){
      logOut();
      navigate("/");
    }

  return (
    <div className="absolute top-0 left-0 w-screen py-4 px-4 flex justify-center items-center z-50">
      <div className="w-1/3">
        <div className="w-full flex gap-4 justify-start HELP">
          <Link to={`/users/${currUser.username}/matches`}>Matches</Link>
          <Link to={`/users/${currUser.username}/messages`}>Messages</Link>
        </div>
      </div>
      <Link to="/" className="HELP flex w-1/3 justify-center font-white font-bold tracking-widest hover:text-[#E64398] text-center text-sm sm:text-xl">LOVE NOTES</Link>
      <div className="w-1/3">
        <div className="w-full flex gap-4 justify-end HELP">
          <Link to={`/users/${currUser.username}`}>Your Profile</Link>
          <p onClick={logOutClick}>Log Out</p>
        </div>
      </div>      {/* <div className="font-black w-1/3 justify-start"><Link to="/">Friender</Link></div>
      <div className="flex gap-4 w-1/3 justify-center">
        <Link to={`/users/${currUser.username}/matches`}>Matches</Link>
        <Link to={`/users/${currUser.username}/messages`}>Messages</Link>
      </div>
      <div className="flex gap-4 w-1/3 justify-end">
        <Link to={`/users/${currUser.username}`}>Your Profile</Link>
        <p onClick={handleClick} className="hover:cursor-pointer">Log Out</p>
      </div> */}
    </div>
  )
}

export default Nav;