import { Link } from "react-router-dom";
import './HomePage.css'

function HomePage({ currCat }) {

  if (currCat) {
    return (
      <div>
        <h1>Welcome back, {currCat.firstName}!</h1>
        <Link to="/cats">
        <button>See all cats!</button>
        </Link>
    </div>
    )
  }

  return (
    <div>
      <h1>Welcome to Clowder!</h1>
      <div className="homepage-button">
      <Link to="/register">
        <button className="btn btn-primary">Register Today!</button>
      </Link>
      </div>
      <div>
      <Link to="/login">
        <button className="btn btn-primary">Login!</button>
      </Link>
      </div>
    </div>

  )
}

export default HomePage;