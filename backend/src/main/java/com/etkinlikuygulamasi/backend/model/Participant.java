package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "participant")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int participantID;
    private int eventID;

    public Participant() {

    }

    public Participant(int participantID, int eventID) {
        this.participantID = participantID;
        this.eventID = eventID;
    }

    public int getEventID() {
        return this.eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public int getParticipantID() {
        return this.participantID;
    }

    public void setParticipantID(int participantID) {
        this.participantID = participantID;
    }

    @Override
    public String toString() {
        return "Participant{" +
                "participantID=" + participantID +
                ", eventID=" + eventID +
                '}';
    }

}
