import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [shouldRefetchUsers, setShouldRefetchUsers] = useState(false);

  // Kullanıcı listesini çekmek için
  useEffect(() => {
    axios.get('http://localhost:8080/user/getAllUsers')
      .then(response => {
        console.log('Fetched users:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [shouldRefetchUsers]); // shouldRefetchUsers değiştiğinde listeyi yeniden yüklemek için

  // Etkinlik listesini çekmek için
  useEffect(() => {
    axios.get('http://localhost:8080/events')
      .then(response => {
        console.log('Fetched events:', response.data);
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []); // Bu effect sadece bileşen ilk render edildiğinde çalışır

  const handleUserSelect = (event) => {
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

  const handleEventSelect = (event) => {
    setSelectedEvent(event.target.value);
    console.log('Event selected:', event.target.value);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) {
      console.log('No user selected');
      return;
    }

    const userId = users.find(user => user.username === selectedUser)?.id;
    if (userId) {
      axios.delete(`http://localhost:8080/points/user/${userId}`)
        .then(response => {
          console.log('Points deleted successfully:', response.data);
          return axios.delete(`http://localhost:8080/messages/user/${userId}`);
        })
        .then(response => {
          console.log('Messages deleted successfully:', response.data);
          return axios.delete(`http://localhost:8080/participants/user/${userId}`);
        })
        .then(response => {
          console.log('Participants deleted successfully:', response.data);
          return axios.delete(`http://localhost:8080/creators/user/${userId}`);
        })
        .then(response => {
          console.log('Creators deleted successfully:', response.data);
          return axios.delete(`http://localhost:8080/user/delete/${userId}`);
        })
        .then(response => {
          console.log('User deleted successfully:', response.data);
          alert('User deleted successfully.');
          setSelectedUser('');
          setShouldRefetchUsers(prev => !prev);
        })
        .catch(error => {
          console.error('Error deleting data:', error);
        });
    } else {
      console.log('User not found for deletion');
    }
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) {
      console.log('No event selected');
      return;
    }
  
    // Seçilen etkinliği bulup ID'sini almak
    const eventToDelete = events.find(event => event.eventName === selectedEvent);
    if (eventToDelete) {
      const eventId = eventToDelete.id;
  
      // Event ID'ye göre ilgili creator'ları silmek için API çağrısı
      axios.delete(`http://localhost:8080/creators/event/${eventId}`)
        .then(response => {
          console.log('Creators deleted successfully:', response.data);
  
          // Event ID'ye göre mesajları silmek için API çağrısı
          return axios.delete(`http://localhost:8080/messages/event/${eventId}`);
        })
        .then(response => {
          console.log('Messages deleted successfully:', response.data);
  
          // Event ID'ye göre katılımcıları silmek için API çağrısı
          return axios.delete(`http://localhost:8080/participants/event/${eventId}`);
        })
        .then(response => {
          console.log('Participants deleted successfully:', response.data);
  
          // Etkinliği silmek için API çağrısı
          return axios.delete(`http://localhost:8080/events/delete/${eventId}`);
        })
        .then(response => {
          console.log('Event deleted successfully:', response.data);
          alert('Event deleted successfully.');
          setSelectedEvent('');
  
          // Etkinlikler listesini güncellemek için yeni bir API çağrısı
          return axios.get('http://localhost:8080/events');
        })
        .then(response => {
          console.log('Refetched events:', response.data);
          setEvents(response.data);
        })
        .catch(error => {
          console.error('Error deleting event or associated data:', error);
        });
    } else {
      console.log('Event not found for deletion');
    }
  };  
    
  return (
    <div className="admin-page">
      <div className="event-app-header">Event App</div>
      <div className="admin-page-header">Admin Page</div>
  
      {}
      <div className="form-container">
        {}
        <div>
          <label htmlFor="user-selector">Select User:</label>
          <select id="user-selector" onChange={handleUserSelect}>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
  
        {}
        <div>
          <label htmlFor="event-selector">Select Event:</label>
          <select id="event-selector" onChange={handleEventSelect}>
            <option value="">Select an event</option>
            {events.map(event => (
              <option key={event.id} value={event.eventName}>
                {event.eventName}
              </option>
            ))}
          </select>
        </div>

        {}
        <div>
          <label htmlFor="username-field">Username:</label>
          <input
            id="username-field"
            type="text"
            value={selectedUser}
            className="username-field"
            readOnly
          />
        </div>
  
        {}
        <div>
          <label htmlFor="event-name-field">Event Name:</label>
          <input
            id="event-name-field"
            type="text"
            value={selectedEvent}
            className="event-name-field"
            readOnly
          />
        </div>
      </div>
  
      {}
      <div className="button-container">
        <button className="delete-user-button" onClick={handleDeleteUser}>
          Delete User
        </button>
        <button className="delete-event-button" onClick={handleDeleteEvent}>Delete Event</button>
      </div>
    </div>
  );
};

export default AdminPage;
