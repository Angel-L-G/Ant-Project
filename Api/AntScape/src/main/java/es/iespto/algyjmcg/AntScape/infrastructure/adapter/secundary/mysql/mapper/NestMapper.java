package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestLevelEntity;

public class NestMapper {
	private NestLevelMapper nlm = new NestLevelMapper();
	
	public NestEntity toPersistance(Nest in) {
		NestEntity out = new NestEntity();

		out.setId(in.getId());
		out.setDeleted(in.getDeleted());
		
		if (in.getNestLevels() != null && in.getNestLevels().size() != 0) {
			for (NestLevel domain : in.getNestLevels()) {
				out.getNestLevels().add(nlm.toPersistance(domain));
			}
		}
		
		return out;
	}
	
	public Nest toDomain(NestEntity in) {
		Nest out = new Nest();
		
		out.setId(in.getId());
		out.setDeleted(in.getDeleted());
		
		if (in.getNestLevels() != null && in.getNestLevels().size() != 0) {
			for (NestLevelEntity entity : in.getNestLevels()) {
				out.getNestLevels().add(nlm.toDomain(entity));
			}
		}
		
		return out;
	}
}
