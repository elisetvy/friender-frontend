import { Link } from "react-router-dom";

import waves from "./layered-waves-haikei.svg";

function HomePage({ currUser }) {

  return (
    <>
      <img className="w-screen h-screen absolute top-0 left-0 object-cover" src={waves} alt="test"></img>
      <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-screen h-screen">
        <h1 className="text-7xl font-bold tracking-widest font-white -mt-36 text-center">LOVE NOTES</h1>
        <div className="flex gap-10 justify-center mt-6">
        <Link to="/register" className="font-white hover:text-[#E64398] text-lg">Register</Link>
        <Link to="/login" className="font-white hover:text-[#E64398] text-lg">Log In</Link>
      </div>
    </div>
    </>
  )
}

export default HomePage;