package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


/**
 * The persistent class for the nests database table.
 * 
 */
@Entity
@Table(name="nests")
@NamedQuery(name="Nest.findAll", query="SELECT n FROM Nest n")
public class NestEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="ant_type")
	private String antType;

	private boolean deleted;

	@Lob
	private String map;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="id_user")
	private UsuarioEntity usuario;

	//bi-directional many-to-one association to AntNest
	@OneToMany(mappedBy="nest")
	private List<AntNestEntity> antNests;

	public NestEntity() {
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

	public UsuarioEntity getUsuario() {
		return this.usuario;
	}

	public void setUsuario(UsuarioEntity usuario) {
		this.usuario = usuario;
	}

	public List<AntNestEntity> getAnts() {
		return this.antNests;
	}

	public void setAnts(List<AntNestEntity> ants) {
		this.antNests = ants;
	}
}