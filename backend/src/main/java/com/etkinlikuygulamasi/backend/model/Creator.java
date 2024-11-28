package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "creator")
@IdClass(CreatorId.class)  // Bileşik anahtar sınıfını belirtin
public class Creator {

    @Id
    @Column(name = "creatorid")
    private int creatorId; // Katılımcı ID'si

    @Id
    @Column(name = "eventid")
    private int eventId; // Etkinlik ID'si

    // Getter ve Setter metodları
    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorid) {
        this.creatorId = creatorid;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
}
