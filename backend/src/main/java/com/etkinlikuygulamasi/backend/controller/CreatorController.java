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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.etkinlikuygulamasi.backend.model.Creator;
import com.etkinlikuygulamasi.backend.service.CreatorService;

@RestController
@RequestMapping("/creators")
@CrossOrigin(origins = "http://localhost:5173")
public class CreatorController {

    @Autowired
    private CreatorService creatorService;

    @PostMapping("/add")
    public Creator addCreator(@RequestBody Creator creatorDTO) {
        return creatorService.addCreator(creatorDTO.getEventId(), creatorDTO.getCreatorId());
    }

    @GetMapping("/events")
    public List<Creator> getCreatorEvents(@RequestParam int creatorId) {
        return creatorService.getEventsByCreatorId(creatorId);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteCreatorsByUserId(@PathVariable int userId) {
        creatorService.deleteCreatorsByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/event/{eventId}")
    public ResponseEntity<Void> deleteCreatorsByEventId(@PathVariable int eventId) {
        creatorService.deleteCreatorsByEventId(eventId);
        return ResponseEntity.noContent().build();
    }

}
