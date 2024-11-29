import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    // Kullanıcıları çekmek için API çağrısı
    axios.get('http://localhost:8080/user/getAllUsers')
      .then(response => {
        console.log('Fetched users:', response.data); // Verileri konsola yazdır
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserSelect = (event) => {
    console.log('Selected user ID:', event.target.value);
    const selectedUserId = event.target.value;
    const user = users.find(user => user.id === parseInt(selectedUserId));
    if (user) {
      setSelectedUser(`${user.username}`);
      console.log('User found:', user);
    } else {
      setSelectedUser('');
      console.log('User not found');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">Admin Page</div>
      <div className="event-app-header">Event App</div>

      <div className="username-label">Username:</div>
      <div className="username-field-container">
        <select className="username-field" onChange={handleUserSelect}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <input type="text" className="username-field" value={selectedUser} readOnly/>
      </div>

      {/* Kullanıcı seçici */}
      <div className="user-selector">
        <label>Select User:</label>
        <select onChange={handleUserSelect}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>

      {/* Seçilen kullanıcı bilgisi */}
      {selectedUser && <div className="selection-message">You selected user: {selectedUser}</div>}

      <button className="delete-event-button">
        <div className="delete-event-label">Delete Event</div>
      </button>
      <button className="delete-user-button">
        <div className="delete-user-label">Delete User</div>
      </button>
    </div>
  );
};

export default AdminPage;
