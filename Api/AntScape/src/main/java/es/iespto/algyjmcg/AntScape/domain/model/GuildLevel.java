package es.iespto.algyjmcg.AntScape.domain.model;

public class GuildLevel {
	private Integer id;
	private Integer cost;
	private String efect;
	private Integer level;
	private String name;
	private Guild guild;

	public GuildLevel() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getCost() {
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

	public Guild getGuild() {
		return this.guild;
	}

	public void setGuild(Guild guild) {
		this.guild = guild;
	}
}
