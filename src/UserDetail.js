import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import haversineDistance from "haversine-distance";
import calculateAge from "./utils";

import FrienderApi from "./api";

/** Card rendered on user page. */
function UserDetail({ currUser }) {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  /** Loads user data on mount.  */
  useEffect(function getUserOnRender() {
    async function getUser() {
      let u;

      try {
        u = await FrienderApi.getUser(username);

        const currUserCoords = {
          latitude: currUser.latlng.split(',')[0],
          longitude: currUser.latlng.split(',')[1]
        }
        const uCoords = {
          latitude: u.latlng.split(',')[0],
          longitude: u.latlng.split(',')[1]
        }
        const distance = Math.floor(haversineDistance(currUserCoords, uCoords) * 0.00062137); // convert meters to miles
        u.distance = distance;
        u.age = calculateAge(u.dob)

        setUser(u);
        setIsLoading(false);
      } catch(err) {
        navigate("/users");
      }
    }
    getUser();
  }, [username]);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="absolute h-screen w-screen top-0 left-0 flex justify-center items-center">
      <div className="h-96">
        <div className="background-white h-full rounded-xl overflow-hidden">
          <div className="h-3/6">
            <img className="w-full h-full object-cover" src={user.photo} alt={user.username} />
            <div className="h-full flex flex-col gap-2 px-2 py-2">
            <div className="flex flex-col">
            <div className="w-full">{user.name[0].toUpperCase() + user.name.slice(1)}, {user.age}</div>
            { user.username !== currUser.username && <small className="font-bold">{user.distance < 1 ? "Less than 1 mile away" : user.distance === 1 ? "1 mile away" : `${user.distance.toLocaleString('en-US')} miles away`}</small> }
            </div>
            <div className="w-full overflow-scroll">{user.bio}</div>
            </div>
          </div>
        </div>
        { user.username === currUser.username &&
        <div className="text-sm w-fit ml-auto mr-auto mt-3 background-purple font-white px-3 py-1 rounded-lg hover:scale-105 hover:cursor-pointer">
        <Link className="" to={`/users/${currUser.username}/edit`}>Edit Your Profile</Link>
        </div>
        }
      </div>
    </div>
  )
}

export default UserDetail;