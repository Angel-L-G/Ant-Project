package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.GuildLevelMapper;

class GuildLevelsMapperTest {
	GuildLevelMapper mapper = new GuildLevelMapper();
	
	@Test
	void toDomain() {
		GuildLevelEntity in = new GuildLevelEntity();
		in.setId(0);
		in.setCost(1);
		in.setEfect("Effect");
		in.setLevel(2);
		in.setName("Name");
		
		GuildLevel out = mapper.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getCost() == out.getCost());
		assertTrue(in.getEfect().equals(out.getEfect()));
		assertTrue(in.getLevel() == out.getLevel());
		assertTrue(in.getName().equals(out.getName()));
	}

	@Test
	void toPersistence() {
		GuildLevel in = new GuildLevel();
		in.setId(0);
		in.setCost(1);
		in.setEfect("Effect");
		in.setLevel(2);
		in.setName("Name");
		
		GuildLevelEntity out = mapper.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getCost() == out.getCost());
		assertTrue(in.getEfect().equals(out.getEfect()));
		assertTrue(in.getLevel() == out.getLevel());
		assertTrue(in.getName().equals(out.getName()));
	}
}
