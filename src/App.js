
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RegisterForm from './RegisterForm';
import CatPage from './CatPage';
import LoginForm from './LoginForm';
import FrienderApi from './api'

function App() {

  const [currUser, setCurrUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  async function handleSave(formData){
    console.log(formData, "IN HANDLE SAVE")
    const userData = await FrienderApi.addCat(formData);
    setCurrUser(userData);
  }

  async function handleLogin(loginData){
    const username = await FrienderApi.loginCat(loginData);
    console.log(`our username after logging in is`, username);
    const currCat = allUsers.filter(cat => cat.username === username);
    console.log(`Our cat after logging in is `, currCat);
    setCurrUser(currCat[0]);
    const newAllUsers = allUsers.filter(cat => cat.username !== username);
    setAllUsers(newAllUsers);
  }

  useEffect(function getAllCatsOnMount() {
    async function getAllCats() {
      const cats = await FrienderApi.getCats();
      setAllUsers(cats);
    }

    getAllCats();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>} />
          <Route path="/register" element={<RegisterForm handleSave={handleSave} />} />
          { allUsers && <Route path="/cats" element={<CatPage cats={allUsers} currUser={currUser} />} /> }
          <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
