package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
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
@NamedQuery(name="Ant.findAll", query="SELECT a FROM Ant a")
public class AntEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String biome;

	private Integer cost;

	private Integer damage;

	private Integer life;

	private String name;

	private String type;

	private boolean working;

	//bi-directional many-to-many association to Usuario
	@JsonIgnore
	@ManyToMany(fetch= FetchType.LAZY)
	@JoinTable(
		name="ant_user"
		, joinColumns={
			@JoinColumn(name="id_ant")
			}
		, inverseJoinColumns={
			@JoinColumn(name="id_user")
			}
		)
	private List<UsuarioEntity> usuarios;

	//bi-directional many-to-one association to AntNest
	@JsonIgnore
	@OneToMany(mappedBy="ant")
	private List<AntNestEntity> antNests;

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

	public int getCost() {
		return this.cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
	}

	public Integer getDamage() {
		return this.damage;
	}

	public void setDamage(Integer damage) {
		this.damage = damage;
	}

	public Integer getLife() {
		return this.life;
	}

	public void setLife(Integer life) {
		this.life = life;
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

	public boolean getWorking() {
		return this.working;
	}

	public void setWorking(boolean working) {
		this.working = working;
	}

	public List<UsuarioEntity> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<UsuarioEntity> usuarios) {
		this.usuarios = usuarios;
	}

	public List<AntNestEntity> getAntNests() {
		return antNests;
	}

	public void setAntNests(List<AntNestEntity> antNests) {
		this.antNests = antNests;
	}
}