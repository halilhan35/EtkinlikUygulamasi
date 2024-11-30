import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventDetailPage.css";

const EventDetailPage = () => {
  const navigate = useNavigate();
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

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const messageEndRef = useRef(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/getAllUsers");
      if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Users fetched successfully:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMessagesByEventID = async (eventId) => {
    if (!eventId) {
      console.error("No eventId provided for fetching messages.");
      return;
    }

    try {
      console.log(`Fetching messages for eventId: ${eventId}`);
      const response = await fetch(`http://localhost:8080/messages/event/${eventId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch messages. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Messages fetched successfully:", data);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchUsers();

    const eventDetails = JSON.parse(localStorage.getItem("event"));
    if (!eventDetails) {
      console.error("Event details not found in localStorage.");
      return;
    }

    console.log("Loaded event details:", eventDetails);
    setFormData({
      eventId: eventDetails.eventId || "",
      eventName: eventDetails.eventName || "",
      eventDescription: eventDetails.eventDescription || "",
      eventDate: eventDetails.eventDate || "",
      eventTime: eventDetails.eventTime || "",
      eventDuration: eventDetails.eventDuration || "",
      eventLocation: eventDetails.eventLocation || "",
      eventCategory: eventDetails.eventCategory || "",
    });

    if (eventDetails.eventId) {
      fetchMessagesByEventID(eventDetails.eventId);
    } else {
      console.error("Event ID is missing in event details.");
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      console.error("Message is empty. Cannot send.");
      return;
    }

    try {
      const eventDetails = JSON.parse(localStorage.getItem("event"));
      const user = JSON.parse(localStorage.getItem("user"));

      if (!eventDetails || !eventDetails.eventId) {
        console.error("Event details or eventId missing. Cannot send message.");
        return;
      }

      if (!user || !user.id) {
        console.error("User details or userId missing. Cannot send message.");
        return;
      }

      console.log("Sending message with eventId:", eventDetails.eventId);
      console.log("Sending message with userID:", user.id);
      const response = await fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventID: parseInt(eventDetails.eventId, 10),
          userID: user.id,
          messageText: newMessage,
          sendingTime: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }

      const savedMessage = await response.json();
      console.log("API response:", savedMessage);
      setMessages([...messages, savedMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getUsername = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : "Unknown";
  };

  return (
    <div className="EventDetailPage">
      <h1 className="EVENT_APP">EVENT APP</h1>
      <h2 className="EVENT_DETAIL">EVENT DETAIL</h2>

      <div className="message-section">
        <h3>Messages</h3>
        <div className="message-container">
          {messages.map((msg, index) => (
            <p key={index} className="message">
              {`${getUsername(msg.userID)}: ${msg.messageText}`} {}
            </p>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="message-input-section">
          <input
            type="text"
            className="message-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
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
