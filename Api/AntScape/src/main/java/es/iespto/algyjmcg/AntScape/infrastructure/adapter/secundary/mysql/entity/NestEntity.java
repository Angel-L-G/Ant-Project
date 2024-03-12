package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
	@Column(unique=true, nullable=false)
	private Integer id;

	private Boolean deleted;

	//bi-directional many-to-one association to NestLevel
	@OneToMany(mappedBy="nest")
	private List<NestLevelEntity> nestLevels;

	//bi-directional many-to-one association to Ant
	@ManyToOne
	@JoinColumn(name="id_ant", nullable=false)
	private AntEntity ant;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="id_user", nullable=false)
	private UsuarioEntity usuario;

	public NestEntity() {
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

	public List<NestLevelEntity> getNestLevels() {
		return this.nestLevels;
	}

	public void setNestLevels(List<NestLevelEntity> nestLevels) {
		this.nestLevels = nestLevels;
	}

	public NestLevelEntity addNestLevel(NestLevelEntity nestLevel) {
		getNestLevels().add(nestLevel);
		nestLevel.setNest(this);

		return nestLevel;
	}

	public NestLevelEntity removeNestLevel(NestLevelEntity nestLevel) {
		getNestLevels().remove(nestLevel);
		nestLevel.setNest(null);

		return nestLevel;
	}

	public AntEntity getAnt() {
		return this.ant;
	}

	public void setAnt(AntEntity ant) {
		this.ant = ant;
	}

	public UsuarioEntity getUsuario() {
		return this.usuario;
	}

	public void setUsuario(UsuarioEntity usuario) {
		this.usuario = usuario;
	}

}