import { Link } from "react-router-dom";

import "./HomePage.css";
import waves from '../../assets/layered-waves-haikei.svg';

/** Home page where users can register or log in. */
function HomePage({ currUser }) {

  return (
    <div className="HomePage">
      <img src={waves} alt="waves"></img>
      <div className="HomePage-content">
        <h1>LOVE NOTES</h1>
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;