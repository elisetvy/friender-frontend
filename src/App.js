
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CatPage from './CatPage';
import FrienderApi from './api'

function App() {

  async function handleSave(formData){
    console.log(formData, "IN HANDLE SAVE")
    await FrienderApi.addCat(formData);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage handleSave={handleSave}/>} />
          <Route path="/cats" element={<CatPage />} />
          <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
