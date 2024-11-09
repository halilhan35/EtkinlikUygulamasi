package com.etkinlikuygulamasi.backend.model;

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
    private int senderID;
    private int receiverID;
    private String messageText;
    private String sendingTime;

    public Message() {

    }

    public Message(int messageID, int senderID, int receiverID, String messageText, String sendingTime) {
        this.messageID = messageID;
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.messageText = messageText;
        this.sendingTime = sendingTime;
    }

    public int getMessageID() {
        return this.messageID;
    }

    public void setMessageID(int messageID) {
        this.messageID = messageID;
    }

    public int getSenderID() {
        return this.senderID;
    }

    public void setSenderID(int senderID) {
        this.senderID = senderID;
    }

    public int getReceiverID() {
        return this.receiverID;
    }

    public void setReceiverID(int receiverID) {
        this.receiverID = receiverID;
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
                ", senderID=" + senderID +
                ", receiverID=" + receiverID +
                ", messageText='" + messageText + '\'' +
                ", sendingTime='" + sendingTime + '\'' +
                '}';
    }

}
