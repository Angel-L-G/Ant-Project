package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.mapping.Array;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildLevelEntity;

public class GuildMapper {
	private GuildLevelMapper glm = new GuildLevelMapper();
	
	public GuildEntity toPersistance(Guild in) {
		GuildEntity out = new GuildEntity();
		
		if(in != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setDefenseNumber(in.getDefenseNumber());
			out.setDefenseRange(in.getDefenseRange());
			out.setQuantity(in.getQuantity());
			out.setTrophys(in.getTrophys());
			
			if(in.getGuildLevels() != null) {
				List<GuildLevelEntity> list = new ArrayList<GuildLevelEntity>();
				for (GuildLevel domain : in.getGuildLevels()) {
					list.add(glm.toPersistance(domain));
				}
				out.setGuildLevels(list);
			}
		}
		
		return out;
	}
	
	public Guild toDomain(GuildEntity in) {
		Guild out = new Guild();
		
		if(in.getName() != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setDefenseNumber(in.getDefenseNumber());
			out.setDefenseRange(in.getDefenseRange());
			out.setQuantity(in.getQuantity());
			out.setTrophys(in.getTrophys());
			
			if(in.getGuildLevels() != null) {
				for (GuildLevelEntity entity : in.getGuildLevels()) {
					out.getGuildLevels().add(glm.toDomain(entity));
				}
			}
			
		}
		
		return out;
	}
}
