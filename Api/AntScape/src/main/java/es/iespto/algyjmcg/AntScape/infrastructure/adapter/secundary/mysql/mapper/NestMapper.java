package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;

public class NestMapper {
	public NestEntity toPersistance(Nest in) {
		NestEntity out = new NestEntity();

		out.setId(in.getId());
		out.setDeleted(in.getDeleted());
		
		return out;
	}
	
	public Nest toDomain(NestEntity in) {
		Nest out = new Nest();
		
		out.setId(in.getId());
		out.setDeleted(in.getDeleted());
		
		return out;
	}
}
