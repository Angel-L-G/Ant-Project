package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

import java.security.Principal;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;

class MessageTo{
	public MessageTo() {}
	String author;
	String receiver;
	String content;
	Timestamp sentAt;
	Integer senderId;
	
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReciever(String destiny) {
		this.receiver = destiny;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Timestamp getSentAt() {
		return sentAt;
	}
	public void setSentAt(Timestamp sentAt) {
		this.sentAt = sentAt;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public Integer getSenderId() {
		return senderId;
	}
	public void setSenderId(Integer senderId) {
		this.senderId = senderId;
	}
}

@Controller
@CrossOrigin
public class WebsocketController { //el controlador es para una conexión establecida en: ws://ip_de_la_api:8080/websocket
	@Autowired private SimpMessagingTemplate simpMessagingTemplate;
	@Autowired private IUsuarioService userService;
	
	//se manejan los mensajes enviados a la ruta (recibida por el websocket ) de:  /app/publicmessage
	//y lo que corresponde hacer se envía a la ruta: /topic/chatroom y lo recibirán los que estén suscritos 
    @MessageMapping("/mensajegeneral")
    @SendTo("/salas/general")
    public MessageTo sendMessage(@Payload MessageTo chatMessage) {
    	Usuario sender = userService.findByName(chatMessage.getAuthor());
    	chatMessage.setSenderId(sender.getId());

        return chatMessage;
    }
    
    @MessageMapping("/privado") 
    public void sendSpecific(    		
	     @Payload MessageTo msg, 
	     Principal user, 
	     @Header("simpSessionId") String sessionId
     ) throws Exception { 
    	Usuario sender = userService.findByName(msg.getAuthor());
    	msg.setSenderId(sender.getId());
    	
    	simpMessagingTemplate.convertAndSendToUser(msg.getReceiver(), "/cola/mensajes", msg);
    	//si queremos una copia al autor, como cuando es una partida entre dos:
    	//simpMessagingTemplate.convertAndSendToUser(msg.getAuthor(), "/cola/mensajes", msg);
    }
    
    @MessageMapping("/groups/{groupId}")
    public void publishToGroup(@DestinationVariable Integer groupId, MessageTo msg) {
    	System.err.println("GRUPAL: " + msg.author);
    	Usuario sender = userService.findByName(msg.getAuthor());
    	msg.setSenderId(sender.getId());
    	
        simpMessagingTemplate.convertAndSend("/topic/chatroom/" + groupId, msg);
    }
}