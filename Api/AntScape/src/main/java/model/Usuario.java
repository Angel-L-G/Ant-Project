package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the usuarios database table.
 * 
 */
@Entity
@Table(name="usuarios")
@NamedQuery(name="Usuario.findAll", query="SELECT u FROM Usuario u")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private byte active;

	private byte banned;

	private String email;

	private String hash;

	private String name;

	private String password;

	private String rol;

	//bi-directional many-to-many association to Usuario
	@ManyToMany
	@JoinColumn(name="id")
	private List<Usuario> usuarios1;

	//bi-directional many-to-many association to Usuario
	@ManyToMany(mappedBy="usuarios1")
	private List<Usuario> usuarios2;

	public Usuario() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getActive() {
		return this.active;
	}

	public void setActive(byte active) {
		this.active = active;
	}

	public byte getBanned() {
		return this.banned;
	}

	public void setBanned(byte banned) {
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

	public List<Usuario> getUsuarios1() {
		return this.usuarios1;
	}

	public void setUsuarios1(List<Usuario> usuarios1) {
		this.usuarios1 = usuarios1;
	}

	public List<Usuario> getUsuarios2() {
		return this.usuarios2;
	}

	public void setUsuarios2(List<Usuario> usuarios2) {
		this.usuarios2 = usuarios2;
	}

}