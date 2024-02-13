package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.List;

public class Ant {
	private Integer id;

	private String biome;

	private Integer cost;

	private Integer damage;

	private Integer life;

	private String name;

	private String type;

	private boolean working;

	private List<Usuario> usuarios;

	private List<AntNest> antNests;

	public Ant() {
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

	public List<Usuario> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public List<AntNest> getAntNests() {
		return this.antNests;
	}

	public void setAntNests(List<AntNest> nests) {
		this.antNests = nests;
	}
}
