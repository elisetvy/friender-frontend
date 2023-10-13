import './CatPage.css';
import Cat from "./Cat";
import { useNavigate } from "react-router-dom";

function CatPage({ cats, currCat, logOut }) {
  const navigate = useNavigate();

  function handleClick(){
    logOut();
    navigate("/");
  }

  return (
    <div className='catPage'>
      <button onClick={handleClick} className="btn btn-primary">Click to logout</button>
      <div className='userCat'>
      <Cat cat={currCat} />
      </div>
      <div className="CatPage-catList">
      {cats.map(cat => <Cat key={cat.username}cat={cat} />)}
      </div>
    </div>
  )
}

export default CatPage;