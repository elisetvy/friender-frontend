
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CatPage from './CatPage';
import FrienderApi from './api'
import { useState } from 'react';

function App() {

  const [currUser, setCurrUser] = useState(null);

  async function handleSave(formData){
    console.log(formData, "IN HANDLE SAVE")
    const userData = await FrienderApi.addCat(formData);
    setCurrUser(userData);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage handleSave={handleSave} currUser={currUser}/>} />
          <Route path="/cats" element={<CatPage />} />
          <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
