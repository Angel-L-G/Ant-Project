package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.ArrayList;
import java.util.List;

public class Ant {
	private Integer id;
	private String biome;
	private String description;
	private String name;
	private String type;
	private List<Nest> nests;
	private List<Usuario> usuarios;

	public Ant() {
		nests = new ArrayList<Nest>();
		usuarios = new ArrayList<Usuario>();
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

	public List<Nest> getNests() {
		return this.nests;
	}

	public void setNests(List<Nest> nests) {
		this.nests = nests;
	}

	public Nest addNest(Nest nest) {
		getNests().add(nest);
		nest.setAnt(this);

		return nest;
	}

	public Nest removeNest(Nest nest) {
		getNests().remove(nest);
		nest.setAnt(null);

		return nest;
	}

	public List<Usuario> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}
}
