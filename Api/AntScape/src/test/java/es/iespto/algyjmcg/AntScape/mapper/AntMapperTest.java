package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AntMapper;

class AntMapperTest {
	AntMapper am = new AntMapper();

	@Test
	void toDomainTest() {
		AntEntity in = new AntEntity();
		in.setId(0);
		in.setBiome("Biome");
		in.setDescription("Desc");
		in.setName("Name");
		in.setType("Type");
		
		Ant out = am.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getBiome().equals(out.getBiome()));
		assertTrue(in.getDescription().equals(out.getDescription()));
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getType().equals(out.getType()));	
	}
	
	@Test
	void toPersistenceTest() {
		Ant in = new Ant();
		in.setId(0);
		in.setBiome("Biome");
		in.setDescription("Desc");
		in.setName("Name");
		in.setType("Type");
		
		AntEntity out = am.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getBiome().equals(out.getBiome()));
		assertTrue(in.getDescription().equals(out.getDescription()));
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getType().equals(out.getType()));
	}
}
