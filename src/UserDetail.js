import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import haversineDistance from 'haversine-distance';

import FrienderApi from "./api";
import User from "./User";

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

        setUser(u);
        setIsLoading(false);
      } catch(err) {
        navigate("/users");
      }
    }
    getUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex h-screen justify-center items-center relative">
      <div className="bg-emerald-300 h-3/4 w-3/4 rounded-xl"></div>
      <div className="border-1 border-solid border-emerald-400 bg-emerald-100 h-28 w-72 rounded-xl absolute top-56 left-96"></div>
      <div className="border-1 border-solid border-emerald-400 bg-emerald-100 h-40 w-72 rounded-xl absolute top-28 left-32"></div>
      <div className="border-1 border-solid border-emerald-400 bg-emerald-100 h-28 w-72 rounded-xl absolute top-96 left-56"></div>
      <div className="border-1 border-solid border-emerald-400 bg-emerald-100 h-36 w-52 rounded-xl absolute top-96 left-1/5"></div>
      <div className="border-1 border-solid border-emerald-400 bg-emerald-100 h-40 w-72 rounded-xl absolute top-72 right-32"></div>
      <div className="border-1 border-solid border-emerald-400 bg-emerald-100 h-64 w-64 rounded-xl absolute top-24 right-96 overflow-hidden">
        <img className="object-cover h-full w-full" src={user.photo} alt={user.username}/>
      </div>
    </div>
  )
}

export default UserDetail;