package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

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
			List<NestLevelEntity> list = new ArrayList<NestLevelEntity>();
			for (NestLevel domain : in.getNestLevels()) {
				list.add(nlm.toPersistance(domain));
			}
			out.setNestLevels(list);
		}
		
		return out;
	}
	
	public Nest toDomain(NestEntity in) {
		Nest out = new Nest();
		
		out.setId(in.getId());
		out.setDeleted(in.getDeleted());
		
		if (in.getNestLevels() != null && in.getNestLevels().size() != 0) {
			if (out.getNestLevels() == null) {
				out.setNestLevels(new ArrayList<NestLevel>());
			}
			for (NestLevelEntity entity : in.getNestLevels()) {
				out.getNestLevels().add(nlm.toDomain(entity));
			}
		}
		
		return out;
	}
}
