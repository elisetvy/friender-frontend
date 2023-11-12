import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import haversineDistance from 'haversine-distance';

import HomePage from './HomePage';
import Nav from './Nav';
import RegisterForm from './RegisterForm';
import Users from './Users';
import UserDetail from './UserDetail';
import LoginForm from './LoginForm';
import FrienderApi from './api';

function App() {
  const [currToken, setCurrToken] = useState(localStorage.getItem("currToken") || null);
  const [currUser, setCurrUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /** Update currUser when currToken changes. */
  useEffect(
    function getAllUsers() {
      async function getUsers() {
        FrienderApi.token = currToken;
        const { username } = jwtDecode(currToken);
        const user = await FrienderApi.getUser(username);
        setCurrUser(user);

        let users = await FrienderApi.getUsers();
        users = users.filter(u => u.username !== username);
        users = users.filter(u => {
          const currUserCoords = {
            latitude: user.latlng.split(',')[0],
            longitude: user.latlng.split(',')[1]
          }
          const userCoords = {
            latitude: u.latlng.split(',')[0],
            longitude: u.latlng.split(',')[1]
          }
          const distance = Math.floor(haversineDistance(currUserCoords, userCoords) * 0.00062137); // convert meters to miles
          u.distance = distance;
          return distance <= user.radius
        });

        setAllUsers(users);
        setLoadingUser(false);
      }

      if (currToken) {
        getUsers();
      } else {
        setLoadingUser(false);
      }
    },
    [currToken]
  );

  async function register(formData) {
    const token = await FrienderApi.register(formData);
    setCurrToken(token);
    localStorage.setItem("currToken", token);
  }

  async function login(formData) {
      const token = await FrienderApi.login(formData);
      setCurrToken(token)
      localStorage.setItem("currToken", token);
  }

  async function logOut(){
    localStorage.removeItem("currToken");
    setCurrToken(null);
    setCurrUser(null);
    FrienderApi.token = null;
  }

  if (loadingUser === true) {
    return <p>Loading...</p>
  }

  return (
    <div className="font-mono">
      <BrowserRouter>
      {currUser && <Nav currUser={currUser} logOut={logOut}></Nav>}
        <Routes>
          { !currUser ? <Route path="/" element={<HomePage />} /> : <Route path="*" element={<Navigate to="/users" />} /> }
          { !currUser && <Route path="/login" element={<LoginForm login={login} />} /> }
          { !currUser && <Route path="/register" element={<RegisterForm register={register} />} /> }
          {allUsers && currUser && <Route path="/users" element={<Users users={allUsers}
            currUser={currUser} logOut={logOut} />} />}
          {allUsers && currUser && <Route path="/users/:username" element={<UserDetail currUser={currUser} />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
