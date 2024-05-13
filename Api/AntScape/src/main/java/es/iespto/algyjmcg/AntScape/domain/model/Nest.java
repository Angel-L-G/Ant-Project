package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.ArrayList;
import java.util.List;

public class Nest {
	private Integer id;
	private Boolean deleted;
	private List<NestLevel> nestLevels;
	private Ant ant;
	private Usuario usuario;

	public Nest() {
		nestLevels = new ArrayList<NestLevel>();
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getDeleted() {
		return this.deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public List<NestLevel> getNestLevels() {
		return this.nestLevels;
	}

	public void setNestLevels(List<NestLevel> nestLevels) {
		this.nestLevels = nestLevels;
	}

	public NestLevel addNestLevel(NestLevel nestLevel) {
		getNestLevels().add(nestLevel);
		nestLevel.setNest(this);

		return nestLevel;
	}

	public NestLevel removeNestLevel(NestLevel nestLevel) {
		getNestLevels().remove(nestLevel);
		nestLevel.setNest(null);

		return nestLevel;
	}

	public Ant getAnt() {
		return this.ant;
	}

	public void setAnt(Ant ant) {
		this.ant = ant;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
