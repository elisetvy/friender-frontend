import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import haversineDistance from 'haversine-distance';
import calculateAge from './utils';

import Loading from './Loading';
import HomePage from './HomePage';
import Nav from './Nav';
import RegisterForm from './components/Register/RegisterForm';
import Users from './Users';
import UserDetail from './UserDetail';
import LoginForm from './components/Login/LoginForm';
import EditUserForm from './EditUserForm';
import EditPasswordForm from './EditPasswordForm';
import Matches from './Matches';
import MessageForm from './MessageForm';
import Messages from './Messages';
import FrienderApi from './api';

/** App for matching with people nearby. */
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
        user.age = calculateAge(user.dob);
        setCurrUser(user);

        let users = await FrienderApi.getUsers();
        users = users.filter(u => u.username !== username);
        users = users.filter(u => {
          const currUserCoords = {
            latitude: user.latlng.split(',')[0],
            longitude: user.latlng.split(',')[1]
          };
          const userCoords = {
            latitude: u.latlng.split(',')[0],
            longitude: u.latlng.split(',')[1]
          };

          const distance = Math.floor(haversineDistance(currUserCoords, userCoords) * 0.00062137); // convert meters to miles
          u.distance = distance;
          u.age = calculateAge(u.dob);
          return distance <= user.radius;
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

  /** Register a user. */
  async function register(data) {
    const token = await FrienderApi.register(data);
    setCurrToken(token);
    localStorage.setItem("currToken", token);
    FrienderApi.token = token;
  }

  /** Log in a user. */
  async function login(credentials) {
    const token = await FrienderApi.login(credentials);
    setCurrToken(token);
    localStorage.setItem("currToken", token);
    FrienderApi.token = token;
  }

  /** Update a user. */
  async function update(username, data) {
    const user = await FrienderApi.updateUser(username, data);
    user.age = calculateAge(user.dob);
    setCurrUser(user);
  }

  /** Log out a user. */
  async function logout() {
    localStorage.removeItem("currToken");
    setCurrToken(null);
    setCurrUser(null);
    FrienderApi.token = null;
  }

  /** Send a message */
  async function sendMessage(data) {
    await FrienderApi.sendMessage(data);
  }

  if (loadingUser === true) {
    return <Loading />;
  }

  return (
    <div className="relative background-blue h-fit min-h-screen">
      <BrowserRouter>
        {currUser && <Nav className="" currUser={currUser} logOut={logout}></Nav>}
        <Routes>
          {!currUser ? <Route path="/" element={<HomePage />} /> : <Route path="*" element={<Navigate to="/users" />} />}
          {!currUser && <Route path="/login" element={<LoginForm login={login} />} />}
          {!currUser && <Route path="/register" element={<RegisterForm register={register} />} />}
          {allUsers && currUser && <Route path="/users" element={<Users users={allUsers}
            currUser={currUser} logout={logout} />} />}
          {allUsers && currUser && <Route path="/users/:username" element={<UserDetail currUser={currUser} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/edit`} element={<EditUserForm currUser={currUser} update={update} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/change-password`} element={<EditPasswordForm currUser={currUser} update={update} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/messages`} element={<Messages currUser={currUser} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/matches`} element={<Matches currUser={currUser} users={allUsers} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/messages/:receiver`} element={<MessageForm currUser={currUser} sendMessage={sendMessage} />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
