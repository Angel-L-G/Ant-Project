package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.ArrayList;
import java.util.List;

public class Chat {
	private Integer id;
	private Integer idGuild;
	private String lastMessage;
	private Usuario usuario1;
	private Usuario usuario2;
	private List<Message> messages;
	
	public Chat() {
		messages = new ArrayList<>();
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdGuild() {
		return idGuild;
	}

	public void setIdGuild(Integer idGuild) {
		this.idGuild = idGuild;
	}

	public String getLastMessage() {
		return lastMessage;
	}

	public void setLastMessage(String lastMessage) {
		this.lastMessage = lastMessage;
	}

	public Usuario getUsuario1() {
		return usuario1;
	}

	public void setUsuario1(Usuario usuario1) {
		this.usuario1 = usuario1;
	}

	public Usuario getUsuario2() {
		return usuario2;
	}

	public void setUsuario2(Usuario usuario2) {
		this.usuario2 = usuario2;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}
	
}
