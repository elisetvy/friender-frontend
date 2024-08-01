import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import haversineDistance from "haversine-distance";
import calculateAge from "../../utils";

import "./UserDetail.css";
import FrienderApi from "../../api";
import Loading from "../Loading/Loading";

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
        };
        const uCoords = {
          latitude: u.latlng.split(',')[0],
          longitude: u.latlng.split(',')[1]
        };
        const distance = Math.floor(haversineDistance(currUserCoords, uCoords) * 0.00062137); // convert meters to miles
        u.distance = distance;
        u.age = calculateAge(u.dob);

        setUser(u);
        setIsLoading(false);
      } catch (err) {
        navigate("/users");
      }
    }
    getUser();
  }, [username]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="UserDetail">
      <div>
        <div className="UserDetail-content">
          <img src={user.photo} alt={user.username} />
          <div className="UserDetail-text">
            <div>
              <div className="UserDetail-name">{user.name[0].toUpperCase() + user.name.slice(1)}, {user.age}</div>
              {user.username !== currUser.username && <small>{user.distance < 1 ? "Less than 1 mile away" : user.distance === 1 ? "1 mile away" : `${user.distance.toLocaleString('en-US')} miles away`}</small>}
            </div>
            <div className="UserDetail-bio">{user.bio}</div>
          </div>
        </div>
        {user.username === currUser.username &&
          <Link to={`/users/${currUser.username}/edit`}><div className="Edit-button">Edit Your Profile</div></Link>
        }
        <div className="Back">
          <button onClick={() => navigate(-1)}><i className="bi bi-arrow-return-left"></i></button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;