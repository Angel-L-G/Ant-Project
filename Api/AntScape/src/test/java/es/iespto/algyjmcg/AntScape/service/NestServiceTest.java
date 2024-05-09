package es.iespto.algyjmcg.AntScape.service;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.AntService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.NestLevelService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.NestService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.UsuarioService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class NestServiceTest {
	@Autowired NestService service;
	@Autowired UsuarioService userService;
	@Autowired AntService antService;
	@Autowired NestLevelService nestLevelService;
	
	@Test
    @Transactional
    void findAllNests() {
        List<Nest> findAll = (List<Nest>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 2);
    }

    @Test
    @Transactional
    void findByIdNest() {
    	Nest entity = service.findById(2);
    	
    	assertNotNull(entity);
    	assertEquals(entity.getDeleted(), false);
    	assertTrue(entity.getNestLevels().size() > 0);
    	assertTrue(entity.getUsuario() != null);
    	assertTrue(entity.getAnt() != null);
    }
    
    @Test
    @Transactional
    void saveNest() {
    	Nest nest = new Nest();
    	
    	nest.setDeleted(false);
    	
    	Ant ant = antService.findById(1);
    	assertNotNull(ant);
    	nest.setAnt(ant);
    	
    	Usuario user = userService.findById(1);
    	assertNotNull(user);
    	
    	nest.setUsuario(user);
    	
    	//NEST
    	Nest save = service.save(nest);
    	
    	assertNotNull(save);
    	assertFalse(save.getDeleted());
    	assertEquals(save.getAnt().getName(), ant.getName());
    	
    	//USER
    	user.addNest(nest);
    	boolean update = userService.update(user);
    	
    	assertTrue(update);
    	
    	user = userService.findById(user.getId());
    	
    	assertNotNull(user);
    	assertEquals(save.getUsuario().getName(), user.getName());
    	assertTrue(user.getNests().size() > 1);
    }
    
    @Test
    @Transactional
    void updateNest() {
    	NestLevel obj = new NestLevel();
    	
    	obj.setId(10);
    	obj.setName("Name");
    	obj.setProduction(25.2);
    	obj.setCost(24.0F);
    	obj.setLevel(2);
    	obj.setMultiplier(new BigDecimal(1.3));
    	
    	Nest nest = service.findById(1);
    	nest.addNestLevel(obj);
    	
    	boolean update = service.update(nest);
    	
    	assertTrue(update);
    	
    	obj.setNest(nest);
    	
    	NestLevel save = nestLevelService.save(obj);
    	
    	assertNotNull(save);
    	
    	Nest byId = service.findById(1);
    	
    	assertNotNull(byId);
    	assertTrue(byId.getNestLevels().size() > 0);
    }
    
    @Test
    @Transactional
    void deleteNest() {
    	Nest find = service.findById(1);
    	
    	assertNotNull(find);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNotNull(find);
    	assertTrue(find.getDeleted());
	}
}