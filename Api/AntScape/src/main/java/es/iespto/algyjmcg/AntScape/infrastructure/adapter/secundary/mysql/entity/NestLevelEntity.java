package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;


/**
 * The persistent class for the nest_levels database table.
 * 
 */
@Entity
@Table(name="nest_levels")
@NamedQuery(name="NestLevelEntity.findAll", query="SELECT n FROM NestLevel n")
public class NestLevelEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Integer id;

	@Column(nullable=false)
	private Integer cost;

	@Column(nullable=false)
	private Integer level;

	@Column(nullable=false, precision=10, scale=2)
	private Double multiplier;

	@Column(length=30)
	private String name;

	@Column(nullable=false)
	private Integer production;

	//bi-directional many-to-one association to Nest
	@ManyToOne
	@JoinColumn(name="nest_id", nullable=false)
	private NestEntity nest;

	public NestLevelEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCost() {
		return this.cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
	}

	public Integer getLevel() {
		return this.level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Double getMultiplier() {
		return this.multiplier;
	}

	public void setMultiplier(Double multiplier) {
		this.multiplier = multiplier;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getProduction() {
		return this.production;
	}

	public void setProduction(Integer production) {
		this.production = production;
	}

	public NestEntity getNest() {
		return this.nest;
	}

	public void setNest(NestEntity nest) {
		this.nest = nest;
	}

}