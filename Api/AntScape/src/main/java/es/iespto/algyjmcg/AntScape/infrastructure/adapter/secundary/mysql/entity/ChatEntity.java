package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


/**
 * The persistent class for the chats database table.
 * 
 */
@Entity
@Table(name="chats")
@NamedQuery(name="ChatEntity.findAll", query="SELECT c FROM ChatEntity c")
public class ChatEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String name;

	//bi-directional many-to-one association to Message
	@OneToMany(mappedBy="chat")
	private List<MessageEntity> messages;

	//bi-directional many-to-many association to Usuario
	@ManyToMany(mappedBy="chats")
	private List<UsuarioEntity> usuarios;

	public ChatEntity() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<MessageEntity> getMessages() {
		return this.messages;
	}

	public void setMessages(List<MessageEntity> messages) {
		this.messages = messages;
	}

	public MessageEntity addMessage(MessageEntity message) {
		getMessages().add(message);
		message.setChat(this);

		return message;
	}

	public MessageEntity removeMessage(MessageEntity message) {
		getMessages().remove(message);
		message.setChat(null);

		return message;
	}

	public List<UsuarioEntity> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<UsuarioEntity> usuarios) {
		this.usuarios = usuarios;
	}

}