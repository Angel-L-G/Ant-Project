package es.iespto.algyjmcg.AntScape.domain.model;

public class AntNest {
	private Integer id;

	private int quantity;

	private Ant ant;

	private Nest nest;

	public AntNest() {
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

	public Ant getAnt() {
		return this.ant;
	}

	public void setAnt(Ant ant) {
		this.ant = ant;
	}

	public Nest getNest() {
		return this.nest;
	}

	public void setNest(Nest nest) {
		this.nest = nest;
	}
}
