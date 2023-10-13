import './Cat.css';

function Cat({ cat }) {

  return (
    <div className="Cat">
      <h3>{cat.firstName}</h3>
      <img width="200px" src={cat.profilePic} alt={cat.firstName} />
      <p><b>Hobbies:</b> {cat.hobbies || "none"}</p>
      <p><b>Interests:</b> {cat.interests || "none"}</p>
    </div>
  )
}

export default Cat;