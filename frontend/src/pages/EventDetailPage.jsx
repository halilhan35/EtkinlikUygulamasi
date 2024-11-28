import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventDetailPage.css";

const EventDetailPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventDuration: "",
    eventLocation: "",
    eventCategory: "",
  });

  useEffect(() => {
    // localStorage'dan veriyi al
    const eventDetails = JSON.parse(localStorage.getItem("event"));
    if (eventDetails) {
      setFormData({
        eventName: eventDetails.eventName || "",
        eventDescription: eventDetails.eventDescription || "",
        eventDate: eventDetails.eventDate || "",
        eventTime: eventDetails.eventTime || "",
        eventDuration: eventDetails.eventDuration || "",
        eventLocation: eventDetails.eventLocation || "",
        eventCategory: eventDetails.eventCategory || "",
      });
    } else {
      console.error("Event details not found in localStorage");
    }
  }, []);

  return (
    <div className="EventDetailPage">
      <h1 className="EVENT_APP">EVENT APP</h1>
      <h2 className="EVENT_DETAIL">EVENT DETAIL</h2>

      <div className="message-section">
        <h3>Messages</h3>
      </div>

      <form>
        <label className="label EventName" htmlFor="eventName">
          Event Name:
        </label>
        <input
          className="input-field EventNameField"
          type="text"
          id="eventName"
          name="eventName"
          value={formData.eventName}
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
          readOnly
        />
      </form>
    </div>
  );
};

export default EventDetailPage;
