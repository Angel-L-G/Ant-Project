package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.List;

public class Usuario {
	private Integer id;

	private boolean active;

	private boolean banned;

	private String email;

	private String hash;

	private String name;

	private String password;

	private String rol;

	private List<Nest> nests;

	private List<Ant> ants;

	public Usuario() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean getActive() {
		return this.active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean getBanned() {
		return this.banned;
	}

	public void setBanned(boolean banned) {
		this.banned = banned;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHash() {
		return this.hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
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

	public void setNests(List<Nest> nests1) {
		this.nests = nests1;
	}

	public Nest addNests1(Nest nests) {
		getNests().add(nests);
		nests.setUsuario(this);

		return nests;
	}

	public Nest removeNests1(Nest nests1) {
		getNests().remove(nests1);
		nests1.setUsuario(null);

		return nests1;
	}

	public List<Ant> getAnts() {
		return this.ants;
	}

	public void setAnts(List<Ant> ants) {
		this.ants = ants;
	}
}
