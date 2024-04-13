package es.iespto.algyjmcg.AntScape.domain.model;

import java.sql.Timestamp;

public class Message {
	private Integer id;
	private String body;
	private Integer guildId;
	private Timestamp sentAt;
	private Chat chat;
	private Usuario sender;
	private Usuario reciever;
	
	public Message() {}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getBody() {
		return body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}

	public Integer getGuildId() {
		return guildId;
	}

	public void setGuildId(Integer guildId) {
		this.guildId = guildId;
	}

	public Timestamp getSentAt() {
		return sentAt;
	}

	public void setSentAt(Timestamp sentAt) {
		this.sentAt = sentAt;
	}

	public Chat getChat() {
		return chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

	public Usuario getSender() {
		return sender;
	}

	public void setSender(Usuario sender) {
		this.sender = sender;
	}

	public Usuario getReciever() {
		return reciever;
	}

	public void setReciever(Usuario reciever) {
		this.reciever = reciever;
	}
}