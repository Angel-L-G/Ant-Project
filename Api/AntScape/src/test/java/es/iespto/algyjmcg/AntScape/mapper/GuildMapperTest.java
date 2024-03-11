package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.GuildMapper;

class GuildMapperTest {
	GuildMapper mapper = new GuildMapper();

	@Test
	void toDomain() {
		GuildEntity in = new GuildEntity();
		in.setId(0);
		in.setDefenseNumber(1);
		in.setDefenseRange(2);
		in.setName("Name");
		in.setQuantity(3);
		in.setTrophys(4);
		
		GuildLevelEntity innerClass = new GuildLevelEntity();
		innerClass.setId(0);
		innerClass.setCost(1);
		innerClass.setEfect("Effect");
		innerClass.setLevel(2);
		innerClass.setName("Name");
		
		in.setGuildLevels(List.of(innerClass));
		
		Guild out = mapper.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getDefenseNumber() == out.getDefenseNumber());
		assertTrue(in.getDefenseRange() == out.getDefenseRange());
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getQuantity() == out.getQuantity());
		assertTrue(in.getTrophys() == out.getTrophys());
		assertNotNull(out.getGuildLevels());
		assertTrue(in.getGuildLevels().get(0).getId() == innerClass.getId());
	}

	@Test
	void toPersistence() {
		Guild in = new Guild();
		in.setId(0);
		in.setDefenseNumber(1);
		in.setDefenseRange(2);
		in.setName("Name");
		in.setQuantity(3);
		in.setTrophys(4);
		
		GuildLevel innerClass = new GuildLevel();
		innerClass.setId(0);
		innerClass.setCost(1);
		innerClass.setEfect("Effect");
		innerClass.setLevel(2);
		innerClass.setName("Name");
		
		in.setGuildLevels(List.of(innerClass));
		
		GuildEntity out = mapper.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getDefenseNumber() == out.getDefenseNumber());
		assertTrue(in.getDefenseRange() == out.getDefenseRange());
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getQuantity() == out.getQuantity());
		assertTrue(in.getTrophys() == out.getTrophys());
		assertNotNull(out.getGuildLevels());
		assertTrue(in.getGuildLevels().get(0).getId() == innerClass.getId());
		
	}

}
