package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.BossMapper;

class BossMapperTest {
	BossMapper mapper = new BossMapper();
	
	@Test
	void toDomain() {
		BossEntity in = new BossEntity();
		in.setId(0);
		in.setDamage(1);
		in.setLife(2);
		in.setName("Name");
		in.setReward(3);
		
		Boss out = mapper.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getDamage() == out.getDamage());
		assertTrue(in.getLife() == out.getLife());
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getReward() == out.getReward());
		
	}

	@Test
	void toPersistence() {
		Boss in = new Boss();
		in.setId(0);
		in.setDamage(1);
		in.setLife(2);
		in.setName("Name");
		in.setReward(3);
		
		BossEntity out = mapper.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getDamage() == out.getDamage());
		assertTrue(in.getLife() == out.getLife());
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getReward() == out.getReward());
		
	}
}
