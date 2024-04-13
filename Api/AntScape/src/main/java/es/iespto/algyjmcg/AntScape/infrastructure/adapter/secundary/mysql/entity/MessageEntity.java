package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;


/**
 * The persistent class for the messages database table.
 * 
 */
@Entity
@Table(name="messages")
@NamedQuery(name="MessageEntity.findAll", query="SELECT m FROM MessageEntity m")
public class MessageEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String body;

	@Column(name="guild_id")
	private Integer guildId;

	@Column(name="sent_at")
	private Timestamp sentAt;

	//bi-directional many-to-one association to Chat
	@ManyToOne
	private ChatEntity chat;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="sender_id")
	private UsuarioEntity sender;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="receiver_id")
	private UsuarioEntity reciever;

	public MessageEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBody() {
		return this.body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Integer getGuildId() {
		return this.guildId;
	}

	public void setGuildId(Integer guildId) {
		this.guildId = guildId;
	}

	public Timestamp getSentAt() {
		return this.sentAt;
	}

	public void setSentAt(Timestamp sentAt) {
		this.sentAt = sentAt;
	}

	public ChatEntity getChat() {
		return this.chat;
	}

	public void setChat(ChatEntity chat) {
		this.chat = chat;
	}

	public UsuarioEntity getSender() {
		return this.sender;
	}

	public void setSender(UsuarioEntity sender) {
		this.sender = sender;
	}

	public UsuarioEntity getReciever() {
		return this.reciever;
	}

	public void setReciever(UsuarioEntity reciever) {
		this.reciever = reciever;
	}

}