package com.etkinlikuygulamasi.backend.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class ParticipantId implements Serializable {

    private int participantId;
    private int eventId;

    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParticipantId that = (ParticipantId) o;
        return participantId == that.participantId && eventId == that.eventId;
    }

    @Override
    public int hashCode() {
        return 31 * participantId + eventId;
    }
}
