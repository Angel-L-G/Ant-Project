package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;

public class AntMapper {
	public AntEntity toPersistance(Ant in) {
		AntEntity out = new AntEntity();
		
		if(in.getName() != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setBiome(in.getBiome());
			out.setCost(in.getCost());
			out.setDamage(in.getDamage());
			out.setLife(in.getLife());
			out.setWorking(in.getWorking());
			
			//out.setAntNests(in.getAntNests());
		}
		
		return out;
	}
	
	public Ant toDomain(AntEntity in) {
		Ant out = new Ant();
		
		if(in.getName() != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setBiome(in.getBiome());
			out.setCost(in.getCost());
			out.setDamage(in.getDamage());
			out.setLife(in.getLife());
			out.setWorking(in.getWorking());
			
			//out.setAntNests(in.getAntNests());
		}
		
		return out;
	}
}
