package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "participant")
@IdClass(ParticipantId.class)  // Bileşik anahtar sınıfını belirtin
public class Participant {

    @Id
    @Column(name = "participantid")
    private int participantId; // Katılımcı ID'si

    @Id
    @Column(name = "eventid")
    private int eventId; // Etkinlik ID'si

    // Getter ve Setter metodları
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
}
