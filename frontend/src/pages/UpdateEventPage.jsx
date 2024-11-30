import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateEventPage.css';

class Event {
  constructor(eventId, eventName, eventDescription, eventDate, eventTime, eventDuration, eventLocation, eventCategory) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.eventDescription = eventDescription;
    this.eventDate = eventDate;
    this.eventTime = eventTime;
    this.eventDuration = eventDuration;
    this.eventLocation = eventLocation;
    this.eventCategory = eventCategory;
  }
}

const UpdateEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventId: '',
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventTime: '',
    eventDuration: '',
    eventLocation: '',
    eventCategory: '',
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const userId = user.id;
      fetchEvents(userId);  // Kullanıcı ID'sini göndererek etkinlikleri alıyoruz
    } else {
      console.error('User not found in localStorage');
      navigate('/login'); // Kullanıcıyı login sayfasına yönlendiriyoruz
    }
  }, []);

  // İlk API isteği ile eventId'leri çekme
  const fetchEvents = async (creatorId) => {
    try {
      const response = await axios.get(`http://localhost:8080/creators/events?creatorId=${creatorId}`);
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        const eventIds = response.data.map(event => event.eventId); // sadece eventId'leri alıyoruz
        fetchEventDetails(eventIds); // İkinci API isteğini gönder
      } else {
        console.error("Invalid data format:", response.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // EventId'lere göre detayları çekme
  const fetchEventDetails = async (eventIds) => {
    try {
      const eventDetailsPromises = eventIds.map(id => 
        axios.get(`http://localhost:8080/events/${id}`)
      );

      const responses = await Promise.all(eventDetailsPromises);

      const eventList = responses.map(response => {
        const event = response.data;
        return new Event(
          event.id, 
          event.eventName, 
          event.eventDescription, 
          event.eventDate, 
          event.eventTime, 
          event.eventDuration, 
          event.eventLocation, 
          event.eventCategory
        );
      });

      setEvents(eventList); // Event'leri state'e ekleyin
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  // Etkinlik seçildiğinde formu güncelleme
  const handleEventChange = (event) => {
    const selectedEventId = Number(event.target.value);  // Sayıya dönüştür
    console.log("Selected Event ID:", selectedEventId);  // Seçilen ID'yi konsola yazdır
  
    const selectedEvent = events.find(e => e.eventId === selectedEventId);  // eventId'yi doğru karşılaştır
    console.log("Selected Event:", selectedEvent);  // Seçilen event'i konsola yazdır
  
    if (!selectedEvent) {
      console.error("Event not found!");
      return;
    }
  
    setFormData({
      eventId: selectedEvent.eventId,
      eventName: selectedEvent.eventName,
      eventDescription: selectedEvent.eventDescription,
      eventDate: selectedEvent.eventDate,
      eventTime: selectedEvent.eventTime,
      eventDuration: selectedEvent.eventDuration,
      eventLocation: selectedEvent.eventLocation,
      eventCategory: selectedEvent.eventCategory,
    });
  };  
  
  // Form verilerini güncelleme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/events/update/${formData.eventId}`, formData);
      if (response.status === 200) {
        alert('Event updated successfully!');

        setFormData({
          eventId: '',
          eventName: '',
          eventDescription: '',
          eventDate: '',
          eventTime: '',
          eventDuration: '',
          eventLocation: '',
          eventCategory: '',
        });

      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        fetchEvents(user.id);
      } else {
        console.error('User not found in localStorage');
      }

      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event.');
    }
  };  

  return (
    <div className="UpdateEventPage">
      <h1 className="EVENT_APP">EVENT APP</h1>
      <h2 className="UPDATE_EVENT">UPDATE EVENT</h2>
      
      <div className="event-selector">
        <label htmlFor="eventSelector">Select Event:</label>
        <select id="eventSelector" onChange={handleEventChange} value={formData.eventId}>
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event.eventId} value={event.eventId}>
              {event.eventName}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="label EventName" htmlFor="eventName">
          Event Name:
        </label>
        <input
          className="input-field EventNameField"
          type="text"
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
        />

        <label className="label EventDescription" htmlFor="eventDescription">
          Event Description:
        </label>
        <input
          className="input-field EventDescriptionField"
          type="text"
          id="eventDescription"
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleChange}
        />

        <label className="label EventDate" htmlFor="eventDate">
          Event Date:
        </label>
        <input
          className="input-field EventDateField"
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
        />

        <label className="label EventTime" htmlFor="eventTime">
          Event Time:
        </label>
        <input
          className="input-field EventTimeField"
          type="time"
          id="eventTime"
          name="eventTime"
          value={formData.eventTime}
          onChange={handleChange}
        />

        <label className="label EventDuration" htmlFor="eventDuration">
          Event Duration:
        </label>
        <input
          className="input-field EventDurationField"
          type="text"
          id="eventDuration"
          name="eventDuration"
          value={formData.eventDuration}
          onChange={handleChange}
        />

        <label className="label EventLocation" htmlFor="eventLocation">
          Event Location:
        </label>
        <input
          className="input-field EventLocationField"
          type="text"
          id="eventLocation"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleChange}
        />

        <label className="label EventCategory" htmlFor="eventCategory">
          Event Category:
        </label>
        <input
          className="input-field EventCategoryField"
          type="text"
          id="eventCategory"
          name="eventCategory"
          value={formData.eventCategory}
          onChange={handleChange}
        />

        <button type="submit" className="update_event">
          <span className="UPDATE">UPDATE</span>
        </button>
      </form>
    </div>
  );
};

export default UpdateEventPage;
