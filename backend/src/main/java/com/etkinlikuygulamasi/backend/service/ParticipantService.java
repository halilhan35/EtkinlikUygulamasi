package com.etkinlikuygulamasi.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etkinlikuygulamasi.backend.model.Participant;
import com.etkinlikuygulamasi.backend.model.ParticipantId;
import com.etkinlikuygulamasi.backend.repository.ParticipantRepository;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    public Participant addParticipant(int eventId, int participantId) {
        Participant participant = new Participant();
        participant.setEventId(eventId);
        participant.setParticipantId(participantId);

        return participantRepository.save(participant);
    }

    // Katılımcının bağlı olduğu etkinlikleri döndüren metod
    public List<Integer> getEventIdsByParticipantId(Integer participantId) {
        List<Participant> participants = participantRepository.findByParticipantId(participantId);
        List<Integer> eventIds = participants.stream()
                                             .map(Participant::getEventId)
                                             .collect(Collectors.toList());
        return eventIds;
    }

    public void deleteParticipant(int participantId, int eventId) {
        ParticipantId participantIdObj = new ParticipantId();
        participantIdObj.setParticipantId(participantId);
        participantIdObj.setEventId(eventId);

        if (participantRepository.existsById(participantIdObj)) {
            participantRepository.deleteById(participantIdObj);
        } else {
            throw new IllegalArgumentException("Participant or Event not found!");
        }
    }

    // Katılımcının katılmadığı etkinlikleri döndüren metot
    public List<Integer> getEventIdsByParticipantIdNot(Integer participantId) {
        List<Participant> participants = participantRepository.findByParticipantIdNot(participantId);
        return participants.stream()
                           .map(Participant::getEventId)
                           .collect(Collectors.toList());
    }

    public void deleteParticipantsByUserId(int userId) {
        List<Participant> participants = participantRepository.findByParticipantId(userId);
        for (Participant participant : participants) {
            participantRepository.delete(participant);
        }
    }

    public void deleteParticipantsByEventId(int eventId) {
        List<Participant> participants = participantRepository.findByEventId(eventId);
        for (Participant participant : participants) {
            participantRepository.delete(participant);
        }
    }  

}
