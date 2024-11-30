package com.etkinlikuygulamasi.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etkinlikuygulamasi.backend.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    Optional<Event> findByEventName(String eventName);
    List<Event> findByEventCategory(String eventCategory);
    List<Event> findByEventLocation(String eventLocation);
    boolean existsByEventName(String eventName);
    List<Event> findByEventDate(String eventDate);
}
