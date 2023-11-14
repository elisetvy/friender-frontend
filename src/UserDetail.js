import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import haversineDistance from 'haversine-distance';
import calculateAge from "./utils";

import FrienderApi from "./api";

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
      <div className="flex justify-center">
        <div className="flex w-5/6 gap-4">
          <div className="flex flex-col gap-2 items-center w-1/2">
            <img className="object-cover h-96" src={user.photo} alt={user.username}/>
            <h1 className="text-3xl font-black bg-emerald-200 px-3 py-1 flex mt-2">{user.name}, {user.age}</h1>
          </div>
          <div className="w-1/2">
            <h1 className="font-bold text-xl">About</h1>
            <p className="mb-6">{user.bio}</p>
            {user.username !== currUser.username && <Link to={`/users/${currUser.username}/messages/${user.username}`} className="bg-emerald-300 px-3 py-1 rounded-lg hover:text-black hover:scale-105">Message</Link>}
          </div>
        </div>
      </div>
  )
}

export default UserDetail;