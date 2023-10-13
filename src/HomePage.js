import { Link } from "react-router-dom";

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
      <Link to="/register">
        <button>Register Today!</button>
      </Link>
      <Link to="/login">
        <button>Login!</button>
      </Link>
    </div>

  )
}

export default HomePage;