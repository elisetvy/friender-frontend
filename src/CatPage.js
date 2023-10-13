import Cat from "./Cat";
import { useNavigate } from "react-router-dom";

function CatPage({ cats, currCat, logOut }) {
  const navigate = useNavigate();

  function handleClick(){
    logOut();
    navigate("/");
  }

  return (
    <>
    <button onClick={handleClick}>Click to logout</button>
    <Cat cat={currCat} />
    {cats.map(cat => <Cat key={cat.username}cat={cat} />)}
    </>
  )
}

export default CatPage;