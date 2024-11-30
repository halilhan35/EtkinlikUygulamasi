import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
} from "@react-google-maps/api";
import axios from "axios";
import "../styles/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBl-LVjw0m_zACQqcB2tyy4io2tws6l31A",
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "20px",
    marginTop: "1000px",
  };

  const fetchEventDetails = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/events/${eventId}` // Etkinlik detaylarını çekmek için
      );
      return response.data; // Etkinlik detaylarını döndür
    } catch (error) {
      console.error("Error fetching event details:", error);
      return null;
    }
  };

  const fetchUserEvents = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.error("User information is missing");
      return;
    }

    const userId = user.id; // User nesnesinden ID'yi al
    try {
      const response = await axios.get(
        `http://localhost:8080/participants/events/${userId}`
      );
      const eventIds = response.data; // Sadece eventId'ler döner

      // Her eventId için etkinlik detaylarını al
      const eventsWithDetails = await Promise.all(
        eventIds.map(async (eventId) => {
          const eventDetails = await fetchEventDetails(eventId);
          return eventDetails;
        })
      );

      setUserEvents(eventsWithDetails.filter(Boolean)); // null olmayan detayları ekle

      if (user.locationlat && user.locationlon) {
        setMapCenter({ lat: user.locationlat, lng: user.locationlon });
      }
    } catch (error) {
      console.error("Error fetching events for user:", error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    fetchUserEvents();
  }, []);

  const handleAdminPageClick = () => {
    if (role !== "admin") {
      alert("You are not allowed to access the admin page.");
      return;
    }
    navigate("/adminpage");
  };

  const handleAccountSettingsClick = () => {
    if (role !== "user") {
      alert("You are not allowed to access the user info page.");
      return;
    }
    navigate("/userinfo");
  };

  const handleAddEventClick = () => {
    if (role !== "user") {
      alert("You are not allowed to access the add event page.");
      return;
    }
    navigate("/addeventpage");
  };

  const handleUpdateEventClick = () => {
    if (role !== "user") {
      alert("You are not allowed to access the update event page.");
      return;
    }
    navigate("/updateeventpage");
  };

  const handleDeleteEventClick = () => {
    if (role !== "user") {
      alert("You are not allowed to access the delete event page.");
      return;
    }
    navigate("/deleteeventpage");
  };

  const handleJoinEventClick = () => {
    if (role !== "user") {
      alert("You are not allowed to access the join event page.");
      return;
    }
    navigate("/joineventpage");
  };

  const handleEventDetailClick = (event) => {
    // Etkinlik nesnesini oluştur ve eventId'yi kaydet
    const eventToStore = {
      eventId: event.id,
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      eventDuration: event.eventDuration,
      eventLocation: event.eventLocation,
      eventCategory: event.eventCategory,
      eventLocationLat: event.eventlocationlat,
      eventLocationLon: event.eventlocationlon,
    };

    // event nesnesini localStorage'a kaydet
    localStorage.setItem("event", JSON.stringify(eventToStore));

    // Etkinlik detay sayfasına yönlendir
    navigate("/eventdetailpage");
  };

  return (
    <div className="main-container">
      <h1 className="event-app">Event App</h1>
      <div
        className="engineer"
        onClick={handleAdminPageClick}
        role="button"
        aria-label="Go to Admin Page"
      ></div>
      <div
        className="account-settings"
        onClick={handleAccountSettingsClick}
        role="button"
        aria-label="Go to Account Settings"
      ></div>
      <div className="events-rectangle">
        <div className="add-event" onClick={handleAddEventClick}>
          <p className="add-event-text">Add Event</p>
        </div>
        <div className="update-event" onClick={handleUpdateEventClick}>
          <p className="update-event-text">Update Event</p>
        </div>
        <div className="delete-event" onClick={handleDeleteEventClick}>
          <p className="delete-event-text">Delete Event</p>
        </div>
        <div className="join-event" onClick={handleJoinEventClick}>
          <p className="join-event-text">Join Event</p>
        </div>
      </div>

      {}
      <div className="user-events">
        <h2>Your Events</h2>
        {userEvents.length > 0 ? (
          <ul>
            {userEvents.map((event, index) => (
              <li key={index}>
                <h3>{event.eventName}</h3>
                <button onClick={() => handleEventDetailClick(event)}>
                  Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not joined any events yet.</p>
        )}
      </div>

      {}
      <div className="map-container">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={8}
          >
            {}
            <MarkerF
              position={mapCenter}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                fillColor: "#0000FF",
                fillOpacity: 1,
                strokeWeight: 0,
              }}
              title="Your Location"
            />
            ;{}
            {userEvents.map((event, index) => (
              <MarkerF
                key={event.id}
                position={{
                  lat: Number(event.eventlocationlat),
                  lng: Number(event.eventlocationlon),
                }}
                title={event.eventName}
              />
            ))}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
