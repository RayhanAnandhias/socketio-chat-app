package com.anandhias.socketapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anandhias.socketapp.model.Message;
import com.anandhias.socketapp.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<Message> getMessages(String room) {
        return messageRepository.findAllByRoom(room);
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}
