package es.iespto.algyjmcg.AntScape.domain.model;

import java.util.ArrayList;
import java.util.List;

public class Guild {
	private Integer id;
	private Integer leader;
	private Integer defenseNumber;
	private String defenseRange;
	private String name;
	private String description;
	private String guildImage;
	private Integer quantity;
	private Integer trophys;
	private List<GuildLevel> guildLevels;
	private List<Usuario> usuarios;

	public Guild() {
		guildLevels = new ArrayList<GuildLevel>();
		usuarios = new ArrayList<Usuario>();
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

	public int getQuantity() {
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

	public List<GuildLevel> getGuildLevels() {
		return this.guildLevels;
	}

	public void setGuildLevels(List<GuildLevel> guildLevels) {
		this.guildLevels = guildLevels;
	}

	public GuildLevel addGuildLevel(GuildLevel guildLevel) {
		getGuildLevels().add(guildLevel);
		guildLevel.setGuild(this);

		return guildLevel;
	}

	public GuildLevel removeGuildLevel(GuildLevel guildLevel) {
		getGuildLevels().remove(guildLevel);
		guildLevel.setGuild(null);

		return guildLevel;
	}

	public List<Usuario> getUsuarios() {
		return this.usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public Usuario addUsuario(Usuario usuario) {
		getUsuarios().add(usuario);
		usuario.setGuild(this);

		return usuario;
	}

	public Usuario removeUsuario(Usuario usuario) {
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

	public String getGuildImage() {
		return guildImage;
	}

	public void setGuildImage(String guildImage) {
		this.guildImage = guildImage;
	}
}
