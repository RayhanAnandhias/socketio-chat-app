package com.anandhias.socketapp.socket;

import org.springframework.stereotype.Service;

import com.anandhias.socketapp.model.Message;
import com.anandhias.socketapp.model.MessageType;
import com.anandhias.socketapp.service.MessageService;
import com.corundumstudio.socketio.SocketIOClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocketService {

    private final MessageService messageService;

    public void sendSocketMessage(SocketIOClient senderClient, Message message, String room) {
        for (SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()) {
            if (!client.getSessionId().equals(senderClient.getSessionId())) {
                client.sendEvent("read_message", message);
            }
        }
    }

    public void saveMessage(SocketIOClient senderClient, Message message) {
        Message storedMessage = messageService.saveMessage(
                Message
                        .builder()
                        .messageType(MessageType.CLIENT)
                        .content(message.getContent())
                        .room(message.getRoom())
                        .username(message.getUsername())
                        .build());
        sendSocketMessage(senderClient, storedMessage, message.getRoom());
    }

    public void saveInfoMessage(SocketIOClient senderClient, String message, String room) {
        Message storedMessage = messageService.saveMessage(
                Message
                        .builder()
                        .messageType(MessageType.SERVER)
                        .content(message)
                        .room(room)
                        .build());
        sendSocketMessage(senderClient, storedMessage, room);
    }
}
