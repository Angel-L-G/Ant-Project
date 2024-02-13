package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.AntNest;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntNestEntity;

public class AntMapper {
	private AntNestMapper anm;
	
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
			
			if(in.getAntNests() != null) {
				anm = new AntNestMapper();
				List<AntNestEntity> lista = new ArrayList<AntNestEntity>();
				for (AntNest an : in.getAntNests()) {
					lista.add(anm.toPersistance(an));
				}
				out.setAntNests(lista);
			}
			
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
			
			if(in.getAntNests() != null) {
				anm = new AntNestMapper();
				List<AntNest> lista = new ArrayList<AntNest>();
				for (AntNestEntity an : in.getAntNests()) {
					lista.add(anm.toDomain(an));
				}
				out.setAntNests(lista);
			}
		}
		
		return out;
	}
}
