package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
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
	@Column(unique=true, nullable=false)
	private Integer id;

	@Column(nullable=true)
	@JsonIgnore
	private Integer idGuild;

	@Lob
	private String lastMessage;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="id_user1")
	private UsuarioEntity usuario1;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="id_user2")
	private UsuarioEntity usuario2;

	//bi-directional many-to-one association to Message
	@OneToMany(mappedBy="chat")
	private List<MessageEntity> messages;

	public ChatEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdGuild() {
		return this.idGuild;
	}

	public void setIdGuild(Integer idGuild) {
		this.idGuild = idGuild;
	}

	public String getLastMessage() {
		return this.lastMessage;
	}

	public void setLastMessage(String lastMessage) {
		this.lastMessage = lastMessage;
	}

	public UsuarioEntity getUsuario1() {
		return this.usuario1;
	}

	public void setUsuario1(UsuarioEntity usuario1) {
		this.usuario1 = usuario1;
	}

	public UsuarioEntity getUsuario2() {
		return this.usuario2;
	}

	public void setUsuario2(UsuarioEntity usuario2) {
		this.usuario2 = usuario2;
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

}