package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestLevelEntity;

public class NestLevelMapper {
	
	public NestLevelEntity toPersistance(NestLevel in) {
		NestLevelEntity out = new NestLevelEntity();
		
		if(in != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setCost(in.getCost());
			out.setLevel(in.getLevel());
			out.setMultiplier(in.getMultiplier());
			out.setProduction(in.getProduction());
		}
		
		return out;
	}
	
	public NestLevel toDomain(NestLevelEntity in) {
		NestLevel out = new NestLevel();
		
		if(in != null) { 
			out.setId(in.getId());
			out.setName(in.getName());
			out.setCost(in.getCost());
			out.setLevel(in.getLevel());
			out.setMultiplier(in.getMultiplier());
			out.setProduction(in.getProduction());
		}
		
		return out;
	}
}
