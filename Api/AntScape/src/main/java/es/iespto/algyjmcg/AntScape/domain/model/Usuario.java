package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.ArrayList;
import java.util.List;

public class Usuario {
	private Integer id;
	private Boolean active;
	private Boolean banned;
	private String eggs;
	private String email;
	private String goldenEggs;
	private String hash;
	private String img;
	private String name;
	private String password;
	private String rol;
	private Guild guild;
	private List<Nest> nests;
	private List<Ant> ants;
	private List<Usuario> amigos;
	private List<Usuario> bloqued;
	private List<AdministrativeInfo> administrativeInfos;
	private List<Chat> chats;
	private List<Message> messages;

	public Usuario() {
		nests = new ArrayList<Nest>();
		ants = new ArrayList<Ant>();
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

	public List<Nest> getNests() {
		return this.nests;
	}

	public void setNests(List<Nest> nests) {
		this.nests = nests;
	}

	public Nest addNest(Nest nest) {
		getNests().add(nest);
		nest.setUsuario(this);

		return nest;
	}

	public Nest removeNest(Nest nest) {
		getNests().remove(nest);
		nest.setUsuario(null);

		return nest;
	}

	public Guild getGuild() {
		return this.guild;
	}

	public void setGuild(Guild guild) {
		this.guild = guild;
	}

	public List<Ant> getAnts() {
		return this.ants;
	}

	public void setAnts(List<Ant> ants) {
		this.ants = ants;
	}
	
	public List<Usuario> getAmigos() {
		return amigos;
	}

	public void setAmigos(List<Usuario> amigos) {
		this.amigos = amigos;
	}

	public List<Usuario> getBloqued() {
		return bloqued;
	}

	public void setBloqued(List<Usuario> bloqued) {
		this.bloqued = bloqued;
	}

	public List<AdministrativeInfo> getAdministrativeInfos() {
		return administrativeInfos;
	}

	public void setAdministrativeInfos(List<AdministrativeInfo> administrativeInfos) {
		this.administrativeInfos = administrativeInfos;
	}

	public List<Chat> getChats() {
		return chats;
	}

	public void setChats(List<Chat> chats) {
		this.chats = chats;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}
}
