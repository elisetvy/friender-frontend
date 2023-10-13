import { Link } from "react-router-dom";

function HomePage() {

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