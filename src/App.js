import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Login from './component/Login';
import Registration from './component/Registration';
import NewBlog from './component/NewBlog';
import Profile from './component/Profile';
import PrivateComponent from './component/PrivateComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />} >

            <Route path="/home" element={<Home />} />
            <Route path='/new-blog' element={<NewBlog />} />
            <Route path='/profile/:userId' element={<Profile />} />

          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;