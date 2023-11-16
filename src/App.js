import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import haversineDistance from 'haversine-distance';
import calculateAge from './utils';

import HomePage from './HomePage';
import Nav from './Nav';
import RegisterForm from './RegisterForm';
import Users from './Users';
import UserDetail from './UserDetail';
import LoginForm from './LoginForm';
import EditUserForm from './EditUserForm';
import EditPasswordForm from './EditPasswordForm';
import Matches from './Matches';
import MessageForm from './MessageForm';
import Messages from './Messages';
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
        user.age = calculateAge(user.dob);
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
          u.age = calculateAge(u.dob);
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

  async function update(username, formData) {
      const user = await FrienderApi.updateUser(username, formData);
      user.age = calculateAge(user.dob);
      setCurrUser(user);
  }

  async function logOut(){
    localStorage.removeItem("currToken");
    setCurrToken(null);
    setCurrUser(null);
    FrienderApi.token = null;
  }

  async function sendMessage(formData) {
    await FrienderApi.sendMessage(formData);
  }

  if (loadingUser === true) {
    return <p>Loading...</p>
  }

  return (
    <div className="background-blue h-fit min-h-screen px-10 py-4">
      <BrowserRouter>
      {currUser && <Nav className="" currUser={currUser} logOut={logOut}></Nav>}
        <Routes>
          { !currUser ? <Route path="/" element={<HomePage />} /> : <Route path="*" element={<Navigate to="/users" />} /> }
          { !currUser && <Route path="/login" element={<LoginForm login={login} />} /> }
          { !currUser && <Route path="/register" element={<RegisterForm register={register} />} /> }
          {allUsers && currUser && <Route path="/users" element={<Users users={allUsers}
            currUser={currUser} logOut={logOut} />} />}
          {allUsers && currUser && <Route path="/users/:username" element={<UserDetail currUser={currUser} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/edit`} element={<EditUserForm currUser={currUser} update={update} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/change-password`} element={<EditPasswordForm currUser={currUser} update={update} />} />}
          {allUsers && currUser && <Route path="/users/:username/messages" element={<Messages currUser={currUser} />} />}
          {allUsers && currUser && <Route path="/users/:username/matches" element={<Matches currUser={currUser} users={allUsers} />} />}
          {allUsers && currUser && <Route path="/users/:sender/messages/:receiver" element={<MessageForm sendMessage={sendMessage} />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
