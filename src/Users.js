import Carousel from "./Carousel";

/** Renders carousel of user cards. */
function Users({ users, currUser, logOut }) {

  return (
      <div className="text-center">
        {users.length !== 0 &&
        <div className="">
          <Carousel users={users} currUser={currUser} />
        </div>}
      </div>
  )
}

export default Users;