import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FrienderApi from "./api";
import User from "./User";

function UserDetail({ currUser }) {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Loads user data on mount.  */
  useEffect(function getUserOnRender() {
    async function getUser() {
      const userData = await FrienderApi.getUser(username);
      setUser(userData);
      setIsLoading(false);
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