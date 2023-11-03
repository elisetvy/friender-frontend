import { Link } from "react-router-dom";

function HomePage({ currUser }) {

  if (currUser) {
    return (
      <div>
        <h1>Welcome back, {currUser.firstName}!</h1>
        <Link to="/users">
        <button>See all users!</button>
        </Link>
    </div>
    )
  }

  return (
    <div>
      <h1>Welcome to Friender!</h1>
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