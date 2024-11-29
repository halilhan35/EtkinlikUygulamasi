package com.etkinlikuygulamasi.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etkinlikuygulamasi.backend.model.Message;
import com.etkinlikuygulamasi.backend.repository.MessageRepository;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message getMessageById(int messageID) {
        return messageRepository.findById(messageID).orElse(null);
    }

    public List<Message> getMessagesByEventID(int eventID) {
        return messageRepository.findByEventID(eventID);
    }

    public List<Message> getMessagesByUserID(int userID) {
        return messageRepository.findByUserID(userID);
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public void deleteMessage(int messageID) {
        messageRepository.deleteById(messageID);
    }

    public void deleteMessagesByUserID(int userID) {
        List<Message> messages = messageRepository.findByUserID(userID);
        for (Message message : messages) {
            messageRepository.delete(message);
        }
    }

    public void deleteMessagesByEventID(int eventID) {
        List<Message> messages = messageRepository.findByEventID(eventID);
        for (Message message : messages) {
            messageRepository.delete(message);
        }
    }    
    
}
