import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import HomePage from './HomePage';
import RegisterForm from './RegisterForm';
import Users from './Users';
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

        let users = await FrienderApi.getUsers();
        users = users.filter(user => user.username !== username);

        setLoadingUser(false);
        setCurrUser(user);
        setAllUsers(users);
      }

      if (currToken) {
        getUsers();
      } else {
        setLoadingUser(false);
      }
    },
    [currToken]
  );

  async function handleSave(formData) {
    const token = await FrienderApi.register(formData);
    setLoadingUser(false);
    setCurrToken(token);
    localStorage.setItem("currToken", token);

    const { username } = jwtDecode(currToken);
    const user = await FrienderApi.getUser(username);
    setCurrUser(user);

    const users = allUsers.filter(user => user.username !== username);
    setAllUsers(users);
  }

  async function handleLogin(formData) {
      const token = await FrienderApi.login(formData);
      setLoadingUser(true);
      setCurrToken(token)
      localStorage.setItem("currToken", token);

      const user = await FrienderApi.getUser(formData.username);
      setCurrUser(user);

      let users = await FrienderApi.getUsers();
      users = users.filter(user => user.username !== formData.username);
      setAllUsers(users);
      setLoadingUser(false);
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
        <Routes>
          <Route path="/" element={<HomePage currUser={currUser}/>} />
          { !currUser && <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} /> }
          { !currUser && <Route path="/register" element={<RegisterForm handleSave={handleSave} />} /> }
          {allUsers && currUser && <Route path="/users" element={<Users users={allUsers}
            currUser={currUser} logOut={logOut} />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
