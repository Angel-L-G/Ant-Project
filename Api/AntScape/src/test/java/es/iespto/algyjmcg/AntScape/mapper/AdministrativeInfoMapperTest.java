package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Timestamp;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AdministrativeInfoEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AdministrativeInfoMapper;

class AdministrativeInfoMapperTest {
	private AdministrativeInfoMapper aim = new AdministrativeInfoMapper();
	
	@Test
	void toDomainTest() {
		AdministrativeInfoEntity in = new AdministrativeInfoEntity();
		in.setId(0);
		in.setInformacion("Information");
		in.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		in.setLastLogin(new Timestamp(System.currentTimeMillis()));
		in.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
		
		AdministrativeInfo out = aim.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getInformacion().equals(out.getInformacion()));
		assertEquals(in.getCreatedAt(), out.getCreatedAt());
		assertEquals(in.getLastLogin(), out.getLastLogin());
		assertEquals(in.getUpdatedAt(), out.getUpdatedAt());
	}
	
	@Test
	void toPersistenceTest() {
		AdministrativeInfo in = new AdministrativeInfo();
		in.setId(0);
		in.setInformacion("Information");
		in.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		in.setLastLogin(new Timestamp(System.currentTimeMillis()));
		in.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
		
		AdministrativeInfoEntity out = aim.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getInformacion().equals(out.getInformacion()));
		assertEquals(in.getCreatedAt(), out.getCreatedAt());
		assertEquals(in.getLastLogin(), out.getLastLogin());
		assertEquals(in.getUpdatedAt(), out.getUpdatedAt());
	}
}
