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

import com.etkinlikuygulamasi.backend.model.Message;
import com.etkinlikuygulamasi.backend.service.MessageService;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable int id) {
        Message message = messageService.getMessageById(id);
        return message != null ? ResponseEntity.ok(message) : ResponseEntity.notFound().build();
    }

    @GetMapping("/event/{eventID}")
    public ResponseEntity<List<Message>> getMessagesByEventID(@PathVariable int eventID) {
        return ResponseEntity.ok(messageService.getMessagesByEventID(eventID));
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Message>> getMessagesByUserID(@PathVariable int userID) {
        return ResponseEntity.ok(messageService.getMessagesByUserID(userID));
    }

    @PostMapping
    public ResponseEntity<Message> saveMessage(@RequestBody Message message) {
        Message savedMessage = messageService.saveMessage(message);
        return ResponseEntity.ok(savedMessage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable int id) {
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/{userID}")
    public ResponseEntity<Void> deleteMessagesByUserID(@PathVariable int userID) {
        messageService.deleteMessagesByUserID(userID);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/event/{eventID}")
    public ResponseEntity<Void> deleteMessagesByEventID(@PathVariable int eventID) {
        messageService.deleteMessagesByEventID(eventID);
        return ResponseEntity.noContent().build();
    }

}
