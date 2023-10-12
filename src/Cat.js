function Cat({ cat }) {

  return (
    <div>
      <h3>{cat.firstName}</h3>
      <img width="200px" src={cat.profilePic} alt={cat.firstName} />
    </div>
  )
}

export default Cat;