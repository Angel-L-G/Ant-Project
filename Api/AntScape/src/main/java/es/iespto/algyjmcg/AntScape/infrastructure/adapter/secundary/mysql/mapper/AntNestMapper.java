package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.AntNest;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntNestEntity;

public class AntNestMapper {
	private AntMapper am;
	private NestMapper nm;
	
	public AntNestEntity toPersistance(AntNest in) {
		AntNestEntity out = new AntNestEntity();
		
		if(in.getId() != null) {
			out.setId(in.getId());
			out.setQuantity(in.getQuantity());
			
			if(in.getAnt() != null) {
				am = new AntMapper();
				out.setAnt(am.toPersistance(in.getAnt()));
			}
			
			if(in.getNest() != null) {
				nm = new NestMapper();
				out.setNest(nm.toPersistance(in.getNest()));
			}
		}
		
		return out;
	}
	
	public AntNest toDomain(AntNestEntity in) {
		AntNest out = new AntNest();
		
		if(in.getId() != null) {
			out.setId(in.getId());
			out.setQuantity(in.getQuantity());
			
			if(in.getAnt() != null) {
				am = new AntMapper();
				out.setAnt(am.toDomain(in.getAnt()));
			}
			
			if(in.getNest() != null) {
				nm = new NestMapper();
				out.setNest(nm.toDomain(in.getNest()));
			}
		}
		
		return out;
	}
}
