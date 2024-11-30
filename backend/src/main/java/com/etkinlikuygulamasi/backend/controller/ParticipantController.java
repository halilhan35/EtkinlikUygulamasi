package com.etkinlikuygulamasi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etkinlikuygulamasi.backend.model.Participant;
import com.etkinlikuygulamasi.backend.service.ParticipantService;

@RestController
@RequestMapping("/participants")
@CrossOrigin(origins = "http://localhost:5173")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @PostMapping("/add")
    public Participant addParticipant(@RequestBody Participant participantDto) {
        return participantService.addParticipant(participantDto.getEventId(), participantDto.getParticipantId());
    }

    @GetMapping("/events/{participantId}")
    public ResponseEntity<List<Integer>> getEventIds(@PathVariable Integer participantId) {
        List<Integer> eventIds = participantService.getEventIdsByParticipantId(participantId);
        return ResponseEntity.ok(eventIds);
    }

    @DeleteMapping("/delete/{participantId}/{eventId}")
    public ResponseEntity<Void> deleteParticipant(
            @PathVariable Integer participantId,
            @PathVariable Integer eventId) {
        participantService.deleteParticipant(participantId, eventId);
        return ResponseEntity.noContent().build();
    }

    // Katılmadığı etkinlikleri döndüren endpoint
    @GetMapping("/events/not/{participantId}")
    public ResponseEntity<List<Integer>> getEventIdsNot(@PathVariable Integer participantId) {
        List<Integer> eventIds = participantService.getEventIdsByParticipantIdNot(participantId);
        return ResponseEntity.ok(eventIds);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteParticipantsByUserId(@PathVariable int userId) {
        participantService.deleteParticipantsByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/event/{eventId}")
    public ResponseEntity<Void> deleteParticipantsByEventId(@PathVariable int eventId) {
        participantService.deleteParticipantsByEventId(eventId);
        return ResponseEntity.noContent().build();
    }

}
