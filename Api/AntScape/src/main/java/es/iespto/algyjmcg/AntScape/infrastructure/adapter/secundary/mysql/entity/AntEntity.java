package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


/**
 * The persistent class for the ants database table.
 * 
 */
@Entity
@Table(name="ants")
@NamedQuery(name="AntEntity.findAll", query="SELECT a FROM Ant a")
public class AntEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Integer id;

	@Column(length=20)
	private String biome;

	@Column(length=100)
	private String description;

	@Column(length=40)
	private String name;

	@Column(length=30)
	private String type;

	//bi-directional many-to-one association to Nest
	@OneToMany(mappedBy="ant")
	private List<NestEntity> nests;

	//bi-directional many-to-many association to Usuario
	@ManyToMany
	@JoinColumn(name="id", nullable=false, insertable=false, updatable=false)
	private List<UsuarioEntity> usuarios;

	public AntEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBiome() {
		return this.biome;
	}

	public void setBiome(String biome) {
		this.biome = biome;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<NestEntity> getNests() {
		return this.nests;
	}

	public void setNests(List<NestEntity> nests) {
		this.nests = nests;
	}

	public NestEntity addNest(NestEntity nest) {
		getNests().add(nest);
		nest.setAnt(this);

		return nest;
	}

	public NestEntity removeNest(NestEntity nest) {
		getNests().remove(nest);
		nest.setAnt(null);

		return nest;
	}

	public List<UsuarioEntity> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<UsuarioEntity> usuarios) {
		this.usuarios = usuarios;
	}

}