import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import RegisterForm from './RegisterForm';
import Users from './Users';
import LoginForm from './LoginForm';
import FrienderApi from './api';

function App() {

  const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("currUser")));
  const [allUsers, setAllUsers] = useState(null);

  async function handleSave(formData) {

    const userData = await FrienderApi.register(formData);
    setCurrUser(userData);
    localStorage.setItem("currUser", JSON.stringify(userData));
  }

  async function handleLogin(formData) {
      const username = await FrienderApi.login(formData);
      const found = (allUsers.filter(user => user.username === username))[0];

      setCurrUser(found);
      localStorage.setItem("currUser", JSON.stringify(found));

      const updatedUsers = allUsers.filter(user => user.username !== username);
      setAllUsers(updatedUsers);
  }

  async function logOut(){
    localStorage.clear();

    const users = await FrienderApi.getUsers();
    setAllUsers(users);

    setCurrUser(null);
  }

  useEffect(function getAllUsersOnMount() {
    async function getAllUsers() {
      const users = await FrienderApi.getUsers();

      if (currUser === null) {
        setAllUsers(users);
      } else {
        const updatedUsers = users.filter(user => user.username !== currUser.username);
        setAllUsers(updatedUsers);
      }
    }

    getAllUsers();
  }, []);

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
