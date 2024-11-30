package com.etkinlikuygulamasi.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etkinlikuygulamasi.backend.model.Creator;
import com.etkinlikuygulamasi.backend.repository.CreatorRepository;

@Service
public class CreatorService {

    @Autowired
    private CreatorRepository creatorRepository;

    public Creator addCreator(int eventId, int creatorId) {
        Creator creator = new Creator();
        creator.setEventId(eventId);
        creator.setCreatorId(creatorId);

        return creatorRepository.save(creator);
    }

    public List<Creator> getEventsByCreatorId(int creatorId) {
        return creatorRepository.findByCreatorId(creatorId);
    }

    public void deleteCreatorsByUserId(int userId) {
        List<Creator> creators = creatorRepository.findByCreatorId(userId);
        for (Creator creator : creators) {
            creatorRepository.delete(creator);
        }
    }

    public void deleteCreatorsByEventId(int eventId) {
        List<Creator> creators = creatorRepository.findByEventId(eventId);
        for (Creator creator : creators) {
            creatorRepository.delete(creator);
        }
    }
    
}
