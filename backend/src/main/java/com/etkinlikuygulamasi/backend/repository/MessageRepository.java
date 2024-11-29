package com.etkinlikuygulamasi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etkinlikuygulamasi.backend.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByEventID(int eventID);
    List<Message> findByUserID(int userID);
}
