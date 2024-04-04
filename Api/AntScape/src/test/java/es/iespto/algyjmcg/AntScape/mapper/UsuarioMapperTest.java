package es.iespto.algyjmcg.AntScape.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;

class UsuarioMapperTest {
	UsuarioMapper mapper = new UsuarioMapper();

	@Test
	void toDomain() {
		UsuarioEntity in = new UsuarioEntity();
		in.setId(0);
		in.setActive(true);
		in.setBanned(false);
		in.setEggs("1a");
		in.setEmail("email");
		in.setGoldenEggs("2b");
		in.setHash("abc");
		in.setImg("img");
		in.setName("name");
		in.setPassword("pass");
		in.setRol("rol");
		
		NestEntity innerClass = new NestEntity();
		innerClass.setId(0);
		innerClass.setDeleted(false);
		
		in.setNests(List.of(innerClass));
		
		Usuario out = mapper.toDomain(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getActive() == out.getActive());
		assertTrue(in.getBanned() == out.getBanned());
		assertTrue(in.getEggs().equals(out.getEggs()));
		assertTrue(in.getEmail().equals(out.getEmail()));
		assertTrue(in.getGoldenEggs().equals(out.getGoldenEggs()));
		assertTrue(in.getHash().equals(out.getHash()));
		assertTrue(in.getImg().equals(out.getImg()));
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getPassword().equals(out.getPassword()));
		assertTrue(in.getRol().equals(out.getRol()));
		assertNotNull(in.getNests());
		assertTrue(in.getNests().get(0).getId() == innerClass.getId());
	}

	@Test
	void toPersistence() {
		Usuario in = new Usuario();
		in.setId(0);
		in.setActive(true);
		in.setBanned(false);
		in.setEggs("1a");
		in.setEmail("email");
		in.setGoldenEggs("2b");
		in.setHash("abc");
		in.setImg("img");
		in.setName("name");
		in.setPassword("pass");
		in.setRol("rol");
		
		Nest innerClass = new Nest();
		innerClass.setId(0);
		innerClass.setDeleted(false);
		
		in.setNests(List.of(innerClass));
		
		UsuarioEntity out = mapper.toPersistance(in);
		
		assertNotNull(out);
		assertTrue(in.getId() == out.getId());
		assertTrue(in.getActive() == out.getActive());
		assertTrue(in.getBanned() == out.getBanned());
		assertTrue(in.getEggs().equals(out.getEggs()));
		assertTrue(in.getEmail().equals(out.getEmail()));
		assertTrue(in.getGoldenEggs().equals(out.getGoldenEggs()));
		assertTrue(in.getHash().equals(out.getHash()));
		assertTrue(in.getImg().equals(out.getImg()));
		assertTrue(in.getName().equals(out.getName()));
		assertTrue(in.getPassword().equals(out.getPassword()));
		assertTrue(in.getRol().equals(out.getRol()));
		assertNotNull(in.getNests());
		assertTrue(in.getNests().get(0).getId() == innerClass.getId());
	}

}
