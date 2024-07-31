import { Link, useNavigate } from "react-router-dom";

import "./Nav.css";

/** Navigation bar. */
function Nav({ logOut, currUser }) {

  const navigate = useNavigate();

  function logOutClick() {
    logOut();
    navigate("/");
  }

  return (
    <div className="Nav">
      <div>
        {currUser &&
          <div className="Nav-left">
            <Link to={`/users/${currUser.username}/matches`}><i className="bi bi-person-hearts"></i></Link>
            <Link to={`/users/${currUser.username}/messages`}><i className="bi bi-envelope-open-heart"></i></Link>
          </div>
        }
      </div>
      <Link to="/" className="Brand">LOVE NOTES</Link>
      <div>
        {currUser &&
          <div className="Nav-right">
            <Link to={`/users/${currUser.username}`}><i className="bi bi-person-gear"></i></Link>
            <p onClick={logOutClick}><i className="bi bi-box-arrow-right"></i></p>
          </div>
        }
      </div>
    </div>
  );
}

export default Nav;