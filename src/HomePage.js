import { Link } from "react-router-dom";


function HomePage({ currUser }) {

  return (
    <div className="text-center pt-10">
      <h1 className="text-3xl font-bold">Welcome to Friender!</h1>
      <div className="flex gap-2 justify-center mt-4">
      <Link to="/register" className="bg-emerald-300 px-3 py-1 rounded-lg hover:text-black">Register</Link>
      <Link to="/login" className="bg-emerald-300 px-3 py-1 rounded-lg hover:text-black">Login</Link>
      </div>
    </div>

  )
}

export default HomePage;