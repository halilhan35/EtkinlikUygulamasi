package com.etkinlikuygulamasi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.etkinlikuygulamasi.backend.model.Participant;
import com.etkinlikuygulamasi.backend.model.ParticipantId;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, ParticipantId> {
    List<Participant> findByParticipantId(@Param("participantId") Integer participantId);
    @Query("SELECT p FROM Participant p WHERE p.id.participantId != :participantId AND p.id.eventId NOT IN " +
           "(SELECT p2.id.eventId FROM Participant p2 WHERE p2.id.participantId = :participantId)")
    List<Participant> findByParticipantIdNot(@Param("participantId") Integer participantId);
    List<Participant> findByParticipantId(int participantId);
    List<Participant> findByEventId(int eventId);
}
