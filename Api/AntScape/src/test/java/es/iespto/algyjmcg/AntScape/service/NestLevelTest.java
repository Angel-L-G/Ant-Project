package es.iespto.algyjmcg.AntScape.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.NestLevelService;
import jakarta.transaction.Transactional;

class NestLevelTest {
	@Autowired NestLevelService service;

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
    	assertEquals(find.getName(), "Level1");
    	assertEquals(find.getProduction(), 10.0);
    	assertEquals(find.getCost(), 100);
    	assertEquals(find.getLevel(), 2);
    	assertEquals(find.getMultiplier(), 2.0);
    	
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
    	obj.setCost(null);
    	obj.setLevel(null);
    	obj.setMultiplier(null);
    	
    	NestLevel save = service.save(obj);
    	
    	assertNotNull(save);
    	assertEquals(save.getName(), obj.getName());
    	assertEquals(save.getProduction(), obj.getProduction());
    	assertEquals(save.getCost(), obj.getCost());
    	assertEquals(save.getLevel(), obj.getLevel());
    	assertEquals(save.getMultiplier(), obj.getMultiplier());
    }
    
    @Test
    @Transactional
    void updateNestLevel() {
    	
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
