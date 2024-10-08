package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * The persistent class for the usuarios database table.
 * 
 */
@Entity
@Table(name="usuarios")
@NamedQuery(name="UsuarioEntity.findAll", query="SELECT u FROM UsuarioEntity u")
public class UsuarioEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Integer id;

	private Boolean active;

	private Boolean banned;

	@Column(length=30)
	private String eggs;

	@Column(length=45)
	private String email;

	@Column(name="golden_eggs", length=10)
	private String goldenEggs;

	@Column(length=255)
	private String hash;

	@Column(length=255)
	private String img;

	@Column(nullable=false, length=45)
	private String name;

	@Column(nullable=false, length=200)
	private String password;

	@Column(nullable=false, length=45)
	private String rol;
	
	@Column(name="total_money_generated", length=255)
	private String totalMoneyGenerated;

	@OneToMany(mappedBy="usuario", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<NestEntity> nests;

	@ManyToOne
	@JoinColumn(name="id_guild")
	private GuildEntity guild;

	@OneToMany(mappedBy="usuario", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<AdministrativeInfoEntity> administrativeInfos;
	
	@ManyToMany(fetch= FetchType.LAZY)
	@JoinTable(
		name="ant_user"
		, joinColumns={
			@JoinColumn(name="id_user")
			}
		, inverseJoinColumns={
			@JoinColumn(name="id_ant")
			}
		)
	private List<AntEntity> ants;
	
	@ManyToMany
	@JoinTable(
	    name = "friends",
	    joinColumns = @JoinColumn(name = "id_user"),
	    inverseJoinColumns = @JoinColumn(name = "id_friend")
	)
	private List<UsuarioEntity> friends;
	
	@ManyToMany
	@JoinTable(
	    name = "blocked_users",
	    joinColumns = @JoinColumn(name = "id_user"),
	    inverseJoinColumns = @JoinColumn(name = "id_blocked")
	)
	private List<UsuarioEntity> bloqued;
	
	@ManyToMany
	@JoinTable(
		    name = "user_chats",
		    joinColumns = @JoinColumn(name = "user_id"),
		    inverseJoinColumns = @JoinColumn(name = "chat_id")
		)
	private List<ChatEntity> chats;
	
	@OneToMany(mappedBy="sender")
	private List<MessageEntity> messages;

	public UsuarioEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getActive() {
		return this.active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Boolean getBanned() {
		return this.banned;
	}

	public void setBanned(Boolean banned) {
		this.banned = banned;
	}

	public String getEggs() {
		return this.eggs;
	}

	public void setEggs(String eggs) {
		this.eggs = eggs;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGoldenEggs() {
		return this.goldenEggs;
	}

	public void setGoldenEggs(String goldenEggs) {
		this.goldenEggs = goldenEggs;
	}

	public String getHash() {
		return this.hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getImg() {
		return this.img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return this.rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getTotalMoneyGenerated() {
		return totalMoneyGenerated;
	}

	public void setTotalMoneyGenerated(String totalMoneyGenerated) {
		this.totalMoneyGenerated = totalMoneyGenerated;
	}

	public List<NestEntity> getNests() {
		return this.nests;
	}

	public void setNests(List<NestEntity> nests) {
		this.nests = nests;
	}

	public NestEntity addNest(NestEntity nest) {
		getNests().add(nest);
		nest.setUsuario(this);

		return nest;
	}

	public NestEntity removeNest(NestEntity nest) {
		getNests().remove(nest);
		nest.setUsuario(null);

		return nest;
	}

	public GuildEntity getGuild() {
		return this.guild;
	}

	public void setGuild(GuildEntity guild) {
		this.guild = guild;
	}

	public List<AntEntity> getAnts() {
		return this.ants;
	}

	public void setAnts(List<AntEntity> ants) {
		this.ants = ants;
	}

	public List<UsuarioEntity> getFriends() {
		return friends;
	}

	public void setFriends(List<UsuarioEntity> friends) {
		this.friends = friends;
	}

	public List<AdministrativeInfoEntity> getAdministrativeInfos() {
		return administrativeInfos;
	}

	public void setAdministrativeInfos(List<AdministrativeInfoEntity> administrativeInfos) {
		this.administrativeInfos = administrativeInfos;
	}

	public List<UsuarioEntity> getBloqued() {
		return bloqued;
	}

	public void setBloqued(List<UsuarioEntity> bloqued) {
		this.bloqued = bloqued;
	}
	
	public List<ChatEntity> getChats() {
		return this.chats;
	}

	public void setChats(List<ChatEntity> chats) {
		this.chats = chats;
	}

	public List<MessageEntity> getMessages() {
		return messages;
	}

	public void setMessages(List<MessageEntity> messages) {
		this.messages = messages;
	}
}