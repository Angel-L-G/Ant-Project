package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.AntNest;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntNestEntity;

public class AntNestMapper {
	private AntMapper am;
	private NestMapper nm;
	
	public AntNestEntity toPersistance(AntNest in) {
		am = new AntMapper();
		nm = new NestMapper();
		
		AntNestEntity out = new AntNestEntity();
		
		if(in.getId() != null) {
			out.setId(in.getId());
			out.setQuantity(in.getQuantity());
			
			out.setAnt(am.toPersistance(in.getAnt()));
			//out.setNest(in.getNest());
		}
		
		return out;
	}
	
	public AntNest toDomain(AntNestEntity in) {
		AntNest out = new AntNest();
		
		if(in.getId() != null) {
			out.setId(in.getId());
			out.setQuantity(in.getQuantity());
			
			//out.setAnt(in.getAnt());
			//out.setNest(in.getNest());
		}
		
		return out;
	}
}
