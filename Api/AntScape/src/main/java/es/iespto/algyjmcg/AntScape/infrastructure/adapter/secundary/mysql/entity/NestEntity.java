package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import es.iespto.algyjmcg.AntScape.domain.model.AntNest;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AntNestMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@NamedQuery(name="NestEntity.findAll", query="SELECT n FROM NestEntity n")
public class NestEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name="ant_type")
	private String antType;

	private boolean deleted;

	@Lob
	private String map;

	//bi-directional many-to-one association to Usuario
	@JsonIgnore
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

	public List<AntNestEntity> getAntNests() {
		return this.antNests;
	}

	public void setAntNests(List<AntNestEntity> ants) {
		this.antNests = ants;
	}
}