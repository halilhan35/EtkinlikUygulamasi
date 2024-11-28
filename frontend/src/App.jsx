import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import UserInfo from './pages/UserInfo';
import AdminPage from './pages/AdminPage';
import AddEventPage from './pages/AddEventPage';
import UpdateEventPage from './pages/UpdateEventPage';
import DeleteEventPage from './pages/DeleteEventPage';
import JoinEventPage from './pages/JoinEventPage';
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path='/adminpage' element={<AdminPage />} />
        <Route path='/addeventpage' element={<AddEventPage />} />
        <Route path='/updateeventpage' element={<UpdateEventPage/>} />
        <Route path='/deleteeventpage' element={<DeleteEventPage />} />
        <Route path='/joineventpage' element={<JoinEventPage/>} />
        <Route path='/eventdetailpage' element={<EventDetailPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
