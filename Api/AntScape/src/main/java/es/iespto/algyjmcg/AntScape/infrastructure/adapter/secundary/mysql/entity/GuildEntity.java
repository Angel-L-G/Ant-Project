package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


/**
 * The persistent class for the guild database table.
 * 
 */
@Entity
@Table(name="guild")
@NamedQuery(name="GuildEntity.findAll", query="SELECT g FROM GuildEntity g")
public class GuildEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Integer id;

	private Integer leader;
	
	@Column(name="defense_number")
	private Integer defenseNumber;

	@Column(name="defense_range")
	private String defenseRange;

	@Column(length=45)
	private String name;
	
	@Column(name="description")
	private String description;

	private Integer quantity;

	@Column(nullable=false)
	private Integer trophys;

	//bi-directional many-to-one association to GuildLevel
	@OneToMany(mappedBy="guild", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<GuildLevelEntity> guildLevels;

	//bi-directional many-to-one association to Usuario
	@JsonIgnore
	@OneToMany(mappedBy="guild")
	private List<UsuarioEntity> usuarios;

	public GuildEntity() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDefenseNumber() {
		return this.defenseNumber;
	}

	public void setDefenseNumber(Integer defenseNumber) {
		this.defenseNumber = defenseNumber;
	}

	public String getDefenseRange() {
		return this.defenseRange;
	}

	public void setDefenseRange(String defenseRange) {
		this.defenseRange = defenseRange;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getTrophys() {
		return this.trophys;
	}

	public void setTrophys(Integer trophys) {
		this.trophys = trophys;
	}

	public List<GuildLevelEntity> getGuildLevels() {
		return this.guildLevels;
	}

	public void setGuildLevels(List<GuildLevelEntity> guildLevels) {
		this.guildLevels = guildLevels;
	}

	public GuildLevelEntity addGuildLevel(GuildLevelEntity guildLevel) {
		getGuildLevels().add(guildLevel);
		guildLevel.setGuild(this);

		return guildLevel;
	}

	public GuildLevelEntity removeGuildLevel(GuildLevelEntity guildLevel) {
		getGuildLevels().remove(guildLevel);
		guildLevel.setGuild(null);

		return guildLevel;
	}

	public List<UsuarioEntity> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<UsuarioEntity> usuarios) {
		this.usuarios = usuarios;
	}

	public UsuarioEntity addUsuario(UsuarioEntity usuario) {
		getUsuarios().add(usuario);
		usuario.setGuild(this);

		return usuario;
	}

	public UsuarioEntity removeUsuario(UsuarioEntity usuario) {
		getUsuarios().remove(usuario);
		usuario.setGuild(null);

		return usuario;
	}

	public Integer getLeader() {
		return leader;
	}

	public void setLeader(Integer leader) {
		this.leader = leader;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}