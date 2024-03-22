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
 * The persistent class for the guild_levels database table.
 * 
 */
@Entity
@Table(name="guild_levels")
@NamedQuery(name="GuildLevelEntity.findAll", query="SELECT g FROM GuildLevelEntity g")
public class GuildLevelEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Integer id;

	@Column(nullable=false)
	private Integer cost;

	@Column(length=255)
	private String efect;

	@Column(nullable=false)
	private Integer level;

	@Column(nullable=false, length=30)
	private String name;

	@ManyToOne
	@JoinColumn(name="id_guild", nullable=false)
	private GuildEntity guild;

	public GuildLevelEntity() {
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

	public String getEfect() {
		return this.efect;
	}

	public void setEfect(String efect) {
		this.efect = efect;
	}

	public Integer getLevel() {
		return this.level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public GuildEntity getGuild() {
		return this.guild;
	}

	public void setGuild(GuildEntity guild) {
		this.guild = guild;
	}

}