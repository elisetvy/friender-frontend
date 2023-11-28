import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/** Navigation bar. */
function Nav({ logOut, currUser }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  function toggleMenuClick(e) {
    e.preventDefault();

    setShowMenu(prev => !prev)
  }

  function logOutClick(){
    logOut();
    navigate("/");
  }

  return (
    <div className="absolute top-0 left-0 w-screen py-4 px-4 flex items-start z-50">
      <div className="w-1/3"></div>
      <Link to="/" className="w-1/3 flex justify-center font-white font-bold tracking-widest text-xl hover:text-[#E64398] text-center">LOVE NOTES</Link>
      <div onClick={toggleMenuClick} className="w-1/3 font-white text-right flex flex-col items-end gap-1">
        <div className="background-white w-6 h-0.5"></div>
        <div className="background-white w-6 h-0.5"></div>
        <div className="background-white w-6 h-0.5"></div>
        <ul className={`${showMenu === false ? "invisible" : "visible"} mt-2`}>
        <Link to={`/users/${currUser.username}/matches`}><li>Matches</li></Link>
        <Link to={`/users/${currUser.username}`}><li>Profile</li></Link>
        <li onClick={logOutClick}>Log Out</li>
      </ul>
      </div>
      {/* <div className="font-black w-1/3 justify-start"><Link to="/">Friender</Link></div>
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