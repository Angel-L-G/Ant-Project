package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;


/**
 * The persistent class for the bosses database table.
 * 
 */
@Entity
@Table(name="bosses")
@NamedQuery(name="BossEntity.findAll", query="SELECT b FROM BossEntity b")
public class BossEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private Integer damage;

	private Integer life;

	private String name;

	private Integer reward;

	public BossEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDamage() {
		return this.damage;
	}

	public void setDamage(Integer damage) {
		this.damage = damage;
	}

	public Integer getLife() {
		return this.life;
	}

	public void setLife(Integer life) {
		this.life = life;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getReward() {
		return this.reward;
	}

	public void setReward(Integer reward) {
		this.reward = reward;
	}

}