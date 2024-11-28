package com.etkinlikuygulamasi.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etkinlikuygulamasi.backend.model.Event;
import com.etkinlikuygulamasi.backend.repository.EventRepository;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    // Yeni bir etkinlik ekleme
    public Event addEvent(Event event) {
        if (eventRepository.existsByEventName(event.getEventName())) {
            throw new RuntimeException("Event with the same name already exists!");
        }
        return eventRepository.save(event);
    }

    // Tüm etkinlikleri listeleme
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // ID'ye göre etkinlik bulma
    public Optional<Event> getEventById(Integer id) {
        return eventRepository.findById(id);
    }

    // ID'ye göre etkinliği silme
    public void deleteEvent(Integer id) {
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("Event not found!");
        }
        eventRepository.deleteById(id);
    }

    // Kategoriye göre etkinlikleri listeleme
    public List<Event> getEventsByCategory(String category) {
        return eventRepository.findByEventCategory(category);
    }

    // Konuma göre etkinlikleri listeleme
    public List<Event> getEventsByLocation(String location) {
        return eventRepository.findByEventLocation(location);
    }

    // Tarihe göre etkinlikleri listeleme
    public List<Event> getEventsByDate(String date) {
        return eventRepository.findByEventDate(date);
    }

    public Event updateEvent(Event event) {
        // Güncellenmiş event'i kaydet
        return eventRepository.save(event);
    }

}
