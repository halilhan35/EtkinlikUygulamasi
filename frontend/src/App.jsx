import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import UserInfo from './pages/UserInfo';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path='/adminpage' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
