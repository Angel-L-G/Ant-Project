package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestMapper;

class NestMapperTest {
	NestMapper mapper = new NestMapper();

	@Test
	void toDomain() {
		NestEntity in = new NestEntity();
		in.setId(0);
		in.setDeleted(false);
		
		NestLevelEntity innerClass = new NestLevelEntity();
		innerClass.setId(0);
		innerClass.setCost(1);
		innerClass.setLevel(2);
		innerClass.setMultiplier(BigDecimal.valueOf(3.33));
		innerClass.setName("Name");
		innerClass.setProduction(4.44);
		
		in.setNestLevels(List.of(innerClass));
		
		Nest out = mapper.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getDeleted() == out.getDeleted());
		assertNotNull(out.getNestLevels());
		assertTrue(out.getNestLevels().get(0).getId() == innerClass.getId());
	}

	@Test
	void toPersistence() {
		Nest in = new Nest();
		in.setId(0);
		in.setDeleted(false);
		
		NestLevel innerClass = new NestLevel();
		innerClass.setId(0);
		innerClass.setCost(1);
		innerClass.setLevel(2);
		innerClass.setMultiplier(BigDecimal.valueOf(3.33));
		innerClass.setName("Name");
		innerClass.setProduction(4.44);
		
		in.setNestLevels(List.of(innerClass));
		
		NestEntity out = mapper.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getDeleted() == out.getDeleted());
		assertNotNull(out.getNestLevels());
		assertTrue(out.getNestLevels().get(0).getId() == innerClass.getId());
	}
}
