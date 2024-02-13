package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;

public class BossMapper {
	public BossEntity toPersistance(Boss in) {
		BossEntity out = new BossEntity();
		
		if(in.getName() != null) {
			out.setId(in.getId());
			out.setDamage(in.getDamage());
			out.setLife(in.getLife());
			out.setName(in.getName());
			out.setReward(in.getReward());	
		}
		
		return out;
	}
	
	public Boss toDomain(BossEntity in) {
		Boss out = new Boss();
		
		if(in.getName() != null) {
			out.setId(in.getId());
			out.setDamage(in.getDamage());
			out.setLife(in.getLife());
			out.setName(in.getName());
			out.setReward(in.getReward());	
		}
		
		return out;
	}
}
