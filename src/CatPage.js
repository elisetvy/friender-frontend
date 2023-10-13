import Cat from "./Cat";

function CatPage({ cats, currUser }) {

  return (
    <>
    <Cat cat={currUser} />
    {cats.map(cat => <Cat key={cat.username}cat={cat} />)}
    </>
  )
}

export default CatPage;