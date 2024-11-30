package com.etkinlikuygulamasi.backend.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class CreatorId implements Serializable {

    private int creatorId;
    private int eventId;

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
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
        CreatorId that = (CreatorId) o;
        return creatorId == that.creatorId && eventId == that.eventId;
    }

    @Override
    public int hashCode() {
        return 31 * creatorId + eventId;
    }
}
