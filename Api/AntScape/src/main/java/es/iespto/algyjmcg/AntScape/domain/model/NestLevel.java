package es.iespto.algyjmcg.AntScape.domain.model;

import java.math.BigDecimal;

public class NestLevel {
	private Integer id;
	private Integer cost;
	private Integer level;
	private BigDecimal multiplier;
	private String name;
	private Double production;
	private Nest nest;

	public NestLevel() {
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

	public BigDecimal getMultiplier() {
		return this.multiplier;
	}

	public void setMultiplier(BigDecimal multiplier) {
		this.multiplier = multiplier;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getProduction() {
		return this.production;
	}

	public void setProduction(Double production) {
		this.production = production;
	}

	public Nest getNest() {
		return this.nest;
	}

	public void setNest(Nest nest) {
		this.nest = nest;
	}
}
