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
    <div className="w-screen py-4 px-4 flex justify-center items-center z-50">
      <div className="w-1/3">
        <div className="w-fit flex gap-4 px-3 py-1 border-1 border-[#E64398] rounded-full font-fuschia">
          <Link className="hover:text-[#F0EBF4]" to={`/users/${currUser.username}/matches`}><i className="bi bi-person-hearts"></i></Link>
          <Link className="hover:text-[#F0EBF4]" to={`/users/${currUser.username}/messages`}><i className="bi bi-envelope-open-heart"></i></Link>
        </div>
      </div>
      <Link to="/" className="flex w-1/3 justify-center font-white font-bold tracking-widest hover:text-[#E64398] text-center text-sm md:text-xl">LOVE NOTES</Link>
      <div className="w-1/3 flex justify-end">
      <div className="w-fit flex gap-4 px-3 py-1 border-1 border-[#E64398] rounded-full font-fuschia">
          <Link className="hover:text-[#F0EBF4]" to={`/users/${currUser.username}`}><i className="bi bi-person-gear"></i></Link>
          <p className="hover:text-[#F0EBF4] hover:cursor-pointer" onClick={logOutClick}><i className="bi bi-box-arrow-right"></i></p>
        </div>
      </div>
    </div>
  )
}

export default Nav;