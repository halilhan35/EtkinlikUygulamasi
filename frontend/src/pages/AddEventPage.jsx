import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddEventPage.css';

const AddEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCategory, setEventCategory] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const participantId = user ? user.id : null;

    if (!eventName || !eventDescription || !eventDate || !eventTime || !eventLocation || !eventCategory) {
      alert('Please fill in all the required fields.');
      return;
    }

    const eventData = {
      eventName: eventName,
      eventDescription: eventDescription,
      eventDate: eventDate,
      eventTime: eventTime,
      eventDuration: eventDuration,
      eventLocation: eventLocation,
      eventCategory: eventCategory,
    };

    try {
      // Etkinliği oluştur
      const eventResponse = await axios.post('http://localhost:8080/events/add', eventData);
      console.log('Event added successfully:', eventResponse.data);

      // Event başarıyla eklendiyse, katılımcıyı eklemek
      const eventId = eventResponse.data.id;  // Yeni eklenen etkinliğin ID'sini al

      const participantData = {
        participantId: participantId,  // LocalStorage'dan alınan katılımcı ID'si
        eventId: eventId,              // Etkinlik ID'si
      };

      const creatorData = {
        creatorId: participantId,
        eventId: eventId,
      }

      // Katılımcıyı ekle
      await axios.post('http://localhost:8080/participants/add', participantData);

      // Oluşturucu ekle
      await axios.post('http://localhost:8080/creators/add', creatorData);

      await axios.post('http://localhost:8080/points/addevent', participantId, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('Event added. Participant and Creator registered successfully!');

    setEventName('');
    setEventDescription('');
    setEventDate('');
    setEventTime('');
    setEventDuration('');
    setEventLocation('');
    setEventCategory('');

    } catch (error) {
      console.error('There was an error adding the event or participant!', error);
      alert('Error adding event or participant!');
    }

  };

  return (
    <div className="addEventPage">
      <div className="eventAppTitle">EVENT APP</div>
      <div className="addEventTitle">ADD EVENT</div>

      <form onSubmit={handleSubmit}>
        <label className="inputLabel" style={{ top: '471px' }}>Event Name :</label>
        <input 
          type="text" 
          className="inputField eventNameField" 
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
        />

        <label className="inputLabel" style={{ top: '572px' }}>Event Description :</label>
        <input 
          type="text" 
          className="inputField eventDescriptionField" 
          value={eventDescription} 
          onChange={(e) => setEventDescription(e.target.value)} 
        />

        <label className="inputLabel" style={{ top: '673px' }}>Event Date :</label>
        <input 
          type="date" 
          className="inputField eventDateField" 
          value={eventDate} 
          onChange={(e) => setEventDate(e.target.value)} 
        />

        <label className="inputLabel" style={{ top: '774px' }}>Event Time :</label>
        <input 
          type="time" 
          className="inputField eventTimeField" 
          value={eventTime} 
          onChange={(e) => setEventTime(e.target.value)} 
        />

        <label className="inputLabel" style={{ top: '875px' }}>Event Duration :</label>
        <input 
          type="text" 
          className="inputField eventDurationField" 
          value={eventDuration} 
          onChange={(e) => setEventDuration(e.target.value)} 
        />

        <label className="inputLabel" style={{ top: '976px' }}>Event Location :</label>
        <input 
          type="text" 
          className="inputField eventLocationField" 
          value={eventLocation} 
          onChange={(e) => setEventLocation(e.target.value)} 
        />

        <label className="inputLabel" style={{ top: '1077px' }}>Event Category :</label>
        <input 
          type="text" 
          className="inputField eventCategoryField" 
          value={eventCategory} 
          onChange={(e) => setEventCategory(e.target.value)} 
        />

        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

        <div className="addEventButton">
          <button type="submit" className="addButtonText">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default AddEventPage;
