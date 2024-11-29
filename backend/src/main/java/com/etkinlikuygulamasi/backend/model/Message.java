package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int messageID;
    @Column(name = "userid")
    private int userID;
    @Column(name = "eventid")
    private int eventID;
    @Column(name = "messagetext")
    private String messageText;
    @Column(name = "sendingtime")
    private String sendingTime;

    public Message() {

    }

    public Message(int messageID, int userID, int eventID, String messageText, String sendingTime) {
        this.messageID = messageID;
        this.userID = userID;
        this.eventID = eventID;
        this.messageText = messageText;
        this.sendingTime = sendingTime;
    }

    public int getMessageID() {
        return this.messageID;
    }

    public void setMessageID(int messageID) {
        this.messageID = messageID;
    }

    public int getuserID() {
        return this.userID;
    }

    public void setuserID(int userID) {
        this.userID = userID;
    }

    public int getEventID() {
        return this.eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public String getMessageText() {
        return this.messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public String getSendingTime() {
        return this.sendingTime;
    }

    public void setSendingTime(String sendingTime) {
        this.sendingTime = sendingTime;
    }

    @Override
    public String toString() {
        return "Message{" +
                "messageID=" + messageID +
                ", userID=" + userID +
                ", eventID=" + eventID +
                ", messageText='" + messageText + '\'' +
                ", sendingTime='" + sendingTime + '\'' +
                '}';
    }

}
