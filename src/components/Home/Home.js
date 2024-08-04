import { Link } from "react-router-dom";

import waves from '../../assets/layered-waves-haikei.svg';

import "./Home.css";

/** Home page where users can register or log in. */
function Home({ currUser }) {

  return (
    <div className="Home">
      <img src={waves} alt="waves"></img>
      <div className="Home-body">
        <h1>LOVE NOTES</h1>
        <div className="Home-body-links">
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;