package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.AntNest;
import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;

public class NestMapper {
	private UsuarioMapper um;
	private AntMapper am;
	
	public NestEntity toPersistance(Nest in) {
		um = new UsuarioMapper();
		am = new AntMapper();
		
		NestEntity out = new NestEntity();
		
		if(in.getUsuario() != null) {
			out.setId(in.getId());	
			out.setAntType(in.getAntType());
			out.setDeleted(in.getDeleted());
			out.setMap(in.getMap());
			
			out.setUsuario(um.toPersistance(in.getUsuario()));
			
			for (AntNest a : in.getAnts()) {
				
			}
			
			//out.setAnts(in.getAnts());
		}
		
		return out;
	}
	
	public Nest toDomain(NestEntity in) {
		Nest out = new Nest();
		
		if(in.getUsuario() != null) {
			out.setId(in.getId());	
		}
		
		return out;
	}
}
