package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildLevelEntity;

public class GuildLevelMapper {
	public GuildLevelEntity toPersistance(GuildLevel in) {
		GuildLevelEntity out = new GuildLevelEntity();
		
		if(in != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setCost(in.getCost());
			out.setEfect(in.getEfect());
			out.setLevel(in.getLevel());
		}
		
		return out;
	}
	
	public GuildLevel toDomain(GuildLevelEntity in) {
		GuildLevel out = new GuildLevel();
		
		if(in != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setCost(in.getCost());
			out.setEfect(in.getEfect());
			out.setLevel(in.getLevel());
		}
		
		return out;
	}
}
