package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;


/**
 * The persistent class for the ant_nest database table.
 * 
 */
@Entity
@Table(name="ant_nest")
@NamedQuery(name="AntNest.findAll", query="SELECT a FROM AntNest a")
public class AntNestEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Integer id;

	@Column(nullable=false)
	private int quantity;

	//bi-directional many-to-one association to Ant
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_nest", nullable=false)
	private AntEntity ant;

	//bi-directional many-to-one association to Nest
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_ant", nullable=false)
	private NestEntity nest;

	public AntNestEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public AntEntity getAnt() {
		return this.ant;
	}

	public void setAnt(AntEntity ant) {
		this.ant = ant;
	}

	public NestEntity getNest() {
		return this.nest;
	}

	public void setNest(NestEntity nest) {
		this.nest = nest;
	}

}