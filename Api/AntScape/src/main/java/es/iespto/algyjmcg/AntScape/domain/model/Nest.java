package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.List;

public class Nest {
	private Integer id;

	private String antType;

	private boolean deleted;

	private String map;

	private Usuario usuario;

	private List<AntNest> antNests;

	public Nest() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAntType() {
		return this.antType;
	}

	public void setAntType(String antType) {
		this.antType = antType;
	}

	public boolean getDeleted() {
		return this.deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getMap() {
		return this.map;
	}

	public void setMap(String map) {
		this.map = map;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public List<AntNest> getAnts() {
		return this.antNests;
	}

	public void setAnts(List<AntNest> ants) {
		this.antNests = ants;
	}
}
