import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import haversineDistance from 'haversine-distance';

import Loading from './components/Loading/Loading';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register';
import LoginForm from './components/Login/LoginForm';
import Carousel from './components/Carousel/Carousel';
import UserDetail from './components/UserDetail/UserDetail';
import EditUser from './components/Edit/EditUser';
import EditPasswordForm from './components/Edit/EditPasswordForm';
import Matches from './components/Matches/Matches';
import MessageThreads from './components/MessageThreads/MessageThreads';
import MessageForm from './components/MessageForm/MessageForm';

import calculateAge from './utils';
import API from './api';

import "./App.css";

/** App for matching with people nearby. */
function App() {
  const [currToken, setCurrToken] = useState(localStorage.getItem("currToken") || null);
  const [currUser, setCurrUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  /** Update currUser when currToken changes. */
  useEffect(
    function getAllUsers() {
      async function getUsers() {
        API.token = currToken;
        const { username } = jwtDecode(currToken);
        const user = await API.getUser(username);
        user.age = calculateAge(user.dob);
        setCurrUser(user);

        /** Filter for users that are not currUser + are within distance. */
        let users = await API.getUsers();
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
        setLoading(false);
      }

      if (currToken) {
        getUsers();
      } else {
        setLoading(false);
      }
    },
    [currToken]
  );

  /** Register a user. */
  async function register(data) {
    const token = await API.register(data);
    setCurrToken(token);
    localStorage.setItem("currToken", token);
    API.token = token;
  }

  /** Log in a user. */
  async function login(credentials) {
    const token = await API.login(credentials);
    setCurrToken(token);
    localStorage.setItem("currToken", token);
    API.token = token;
  }

  /** Update a user. */
  async function update(username, data) {
    const user = await API.updateUser(username, data);
    user.age = calculateAge(user.dob);
    setCurrUser(user);
  }

  /** Log out a user. */
  async function logout() {
    localStorage.removeItem("currToken");
    setCurrToken(null);
    setCurrUser(null);
    API.token = null;
  }

  /** Send a message */
  async function sendMessage(data) {
    await API.sendMessage(data);
  }

  if (loading === true) {
    return <Loading />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        {currUser && <Nav currUser={currUser} logOut={logout}></Nav>}
        <Routes>
          {!currUser ? <Route path="/" element={<Home />} /> : <Route path="*" element={<Navigate to="/users" />} />}
          {!currUser && <Route path="/login" element={<LoginForm login={login} />} />}
          {!currUser && <Route path="/register" element={<Register register={register} />} />}
          {allUsers && currUser && <Route path="/users" element={<Carousel users={allUsers}
            currUser={currUser} logout={logout} />} />}
          {allUsers && currUser && <Route path="/users/:username" element={<UserDetail currUser={currUser} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/edit`} element={<EditUser currUser={currUser} update={update} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/change-password`} element={<EditPasswordForm currUser={currUser} update={update} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/messages`} element={<MessageThreads currUser={currUser} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/matches`} element={<Matches currUser={currUser} users={allUsers} />} />}
          {allUsers && currUser && <Route path={`/users/${currUser.username}/messages/:receiver`} element={<MessageForm currUser={currUser} sendMessage={sendMessage} />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
