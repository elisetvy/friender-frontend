import Cat from "./Cat";

function CatPage({ cats, currUser }) {

  return (
    <>
    <Cat cat={currUser} />
    {cats.map(cat => <Cat cat={cat} />)}
    </>
  )
}

export default CatPage;