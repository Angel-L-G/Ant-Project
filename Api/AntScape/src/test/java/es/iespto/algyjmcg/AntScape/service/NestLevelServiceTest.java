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

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.NestLevelService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.NestService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class NestLevelServiceTest {
	@Autowired NestLevelService service;
	@Autowired NestService nestService;

	@Test
    @Transactional
    void findAllNestLevel() {
        List<NestLevel> findAll = (List<NestLevel>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 4);
    }

    @Test
    @Transactional
    void findByIdNestLevel() {
    	NestLevel find = service.findById(2);
    	
    	assertNotNull(find);
    	assertEquals(find.getName(), "Level2");
    	assertEquals(find.getProduction(), 20.0);
    	assertEquals(find.getCost(), 100.0F);
    	assertEquals(find.getLevel(), 2);
    	assertEquals(find.getMultiplier().doubleValue(), 2.00);
    	
    	find = service.findById(40);
    	
    	assertNull(find);
    }
    
    @Test
    @Transactional
    void saveNestLevel() {
    	NestLevel obj = new NestLevel();
    	
    	obj.setId(10);
    	obj.setName("Name");
    	obj.setProduction(25.2);
    	obj.setCost(24.0F);
    	obj.setLevel(2);
    	obj.setMultiplier(new BigDecimal(1.3));
    	
    	Nest nest = nestService.findById(3);
    	nest.addNestLevel(obj);
    	
    	boolean update = nestService.update(nest);
    	
    	assertTrue(update);
    	
    	obj.setNest(nest);
    	
    	NestLevel save = service.save(obj);
    	
    	assertNotNull(save);
    	assertEquals(save.getName(), obj.getName());
    	assertEquals(save.getProduction(), obj.getProduction());
    	assertEquals(save.getCost(), obj.getCost());
    	assertEquals(save.getLevel(), obj.getLevel());
    	assertEquals(save.getMultiplier(), obj.getMultiplier());
    	assertNull(save.getNest());
    	
    	Nest byId = nestService.findById(3);
    	
    	assertNotNull(byId);
    	assertTrue(byId.getNestLevels().size() > 0);
    }
    
    @Test
    @Transactional
    void updateNestLevel() {
    	NestLevel entity = service.findById(1);
    	
    	assertNotNull(entity);
    	
    	NestLevel obj = new NestLevel();
    	obj.setId(1);
    	obj.setName("Name");
    	obj.setProduction(25.2);
    	obj.setCost(24.0F);
    	obj.setLevel(2);
    	obj.setMultiplier(new BigDecimal(1.3));
    	
    	boolean update = service.update(obj);
    	
    	assertTrue(update);
    	
    	NestLevel e = service.findById(1);
    	
    	assertNotNull(e);
    	assertEquals(obj.getCost(), e.getCost());
    	assertEquals(obj.getName(), e.getName());
    	assertEquals(obj.getLevel(), e.getLevel());
    	assertEquals(obj.getMultiplier(), e.getMultiplier());
    	assertEquals(obj.getProduction(), e.getProduction());
    }
    
    @Test
    @Transactional
    void deleteNestLevel() {
    	NestLevel find = service.findById(1);
    	
    	assertNotNull(find);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNull(find);
    }

}
