import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/DeleteEventPage.css";

const DeleteEventPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventId: "",
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventDuration: "",
    eventLocation: "",
    eventCategory: "",
  });

  const fetchEventDetails = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/events/${eventId}` // Etkinlik detaylarını çekmek için
      );
      console.log("Fetched event details:", response.data);
      return response.data; // Etkinlik detaylarını döndür
    } catch (error) {
      console.error("Error fetching event details:", error);
      return null;
    }
  };

  const fetchEvents = async (participantId) => {
    console.log("Fetching event IDs for participantId:", participantId);

    try {
      const response = await axios.get(
        `http://localhost:8080/participants/events/${participantId}`
      );
      console.log("Fetched event IDs:", response.data); // Sadece eventId'ler döner

      // Her eventId için etkinlik detaylarını al
      const eventsWithDetails = await Promise.all(
        response.data.map(async (eventId) => {
          const eventDetails = await fetchEventDetails(eventId);
          return eventDetails; // Detayları ekle
        })
      );

      setEvents(eventsWithDetails); // Etkinliklerin tüm bilgilerini güncelle
    } catch (error) {
      console.error("Error fetching event IDs for user:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("LocalStorage user:", user); // localStorage'dan çekilen kullanıcı

    if (user) {
      const participantId = user.id;
      console.log("Extracted participantId:", participantId); // Kullanıcı ID kontrolü
      fetchEvents(participantId); // Etkinlikleri çek
    } else {
      console.error("User not found in localStorage");
      navigate("/login");
    }
  }, [navigate]);

  // Etkinlik seçildiğinde formu doldurma
  const handleEventChange = (event) => {
    // Seçilen Event ID'yi sayıya dönüştürerek alıyoruz
    const selectedEventId = Number(event.target.value); 
    console.log("Selected Event ID:", selectedEventId);
  
    // events array'inde selectedEventId'yi kullanarak etkinliği buluyoruz
    const selectedEvent = events.find((e) => e.id === selectedEventId);
    console.log("Selected Event Object:", selectedEvent);
  
    if (!selectedEvent) {
      console.error("Event not found!");
      return;
    }
  
    setFormData({
      eventId: selectedEvent.id,
      eventName: selectedEvent.eventName,
      eventDescription: selectedEvent.eventDescription,
      eventDate: selectedEvent.eventDate,
      eventTime: selectedEvent.eventTime,
      eventDuration: selectedEvent.eventDuration,
      eventLocation: selectedEvent.eventLocation,
      eventCategory: selectedEvent.eventCategory,
    });
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = JSON.parse(localStorage.getItem("user"));
    const participantId = user?.id;
  
    if (!participantId || !formData.eventId) {
      alert("Participant or Event information is missing!");
      return;
    }
  
    console.log("Deleting event for participantId:", participantId, "eventId:", formData.eventId);
  
    try {
      await axios.delete(
        `http://localhost:8080/participants/delete/${participantId}/${formData.eventId}`
      );
  
      alert("Event deleted successfully!");
      
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== formData.eventId)
      );

      setFormData({
        eventId: "",
        eventName: "",
        eventDescription: "",
        eventDate: "",
        eventTime: "",
        eventDuration: "",
        eventLocation: "",
        eventCategory: "",
      });

    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event.");
    }
  };  

  return (
    <div className="DeleteEventPage">
      <h1 className="EVENT_APP">EVENT APP</h1>
      <h2 className="DELETE_EVENT">DELETE EVENT</h2>

      <div className="event-selector">
        <label htmlFor="eventSelector">Select Event:</label>
        <select
          id="eventSelector"
          onChange={handleEventChange}
          value={formData.eventId}
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {" "}
              {}
              {event.eventName}{" "}
              {}
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
          readOnly
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
          readOnly
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
          readOnly
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
          readOnly
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
          readOnly
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
          readOnly
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
          readOnly
        />

        <button type="submit" className="delete_event">
          <span className="DELETE">DELETE</span>
        </button>
      </form>
    </div>
  );
};

export default DeleteEventPage;
