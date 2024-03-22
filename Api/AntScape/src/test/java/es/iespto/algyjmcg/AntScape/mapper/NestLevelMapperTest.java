package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestLevelMapper;

class NestLevelMapperTest {
	NestLevelMapper mapper = new NestLevelMapper();
	
	@Test
	void toDomain() {
		NestLevelEntity in = new NestLevelEntity();
		in.setId(0);
		in.setCost(1.0);
		in.setLevel(2);
		in.setMultiplier(BigDecimal.valueOf(3.33));
		in.setName("Name");
		in.setProduction(4.44);
		
		NestLevel out = mapper.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getCost() == out.getCost());
		assertTrue(in.getLevel() == out.getLevel());
		assertTrue(in.getMultiplier() == out.getMultiplier());
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getProduction() == out.getProduction());
	}

	@Test
	void toPersistence() {
		NestLevel in = new NestLevel();
		in.setId(0);
		in.setCost(1.0);
		in.setLevel(2);
		in.setMultiplier(BigDecimal.valueOf(3.33));
		in.setName("Name");
		in.setProduction(4.44);
		
		NestLevelEntity out = mapper.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getCost() == out.getCost());
		assertTrue(in.getLevel() == out.getLevel());
		assertTrue(in.getMultiplier() == out.getMultiplier());
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getProduction() == out.getProduction());
	}
}
