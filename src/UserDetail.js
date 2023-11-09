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
    <div>
      <User user={user} currUser={currUser} />
    </div>
  )
}

export default UserDetail;