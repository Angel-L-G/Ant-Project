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
	private Integer id;

	private boolean active;

	private boolean banned;

	private String email;

	private String hash;

	private String name;

	private String password;

	private String rol;

	//bi-directional many-to-one association to Nest
	@OneToMany(mappedBy="usuario")
	private List<NestEntity> nests;

	//bi-directional many-to-many association to Ant
	@ManyToMany(mappedBy="usuarios")
	private List<AntEntity> ants;

	public UsuarioEntity() {
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

	public List<NestEntity> getNests() {
		return this.nests;
	}

	public void setNests(List<NestEntity> nests1) {
		this.nests = nests1;
	}

	public NestEntity addNests1(NestEntity nests) {
		getNests().add(nests);
		nests.setUsuario(this);

		return nests;
	}

	public NestEntity removeNests1(NestEntity nests1) {
		getNests().remove(nests1);
		nests1.setUsuario(null);

		return nests1;
	}

	public List<AntEntity> getAnts() {
		return this.ants;
	}

	public void setAnts(List<AntEntity> ants) {
		this.ants = ants;
	}
}