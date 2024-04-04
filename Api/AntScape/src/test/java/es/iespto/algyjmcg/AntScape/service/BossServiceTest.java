package es.iespto.algyjmcg.AntScape.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.BossService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class BossServiceTest {
	@Autowired private BossService service;
	
	@Test
    void contextLoads() {}

    @Test
    @Transactional
    void findAllAnts() {
        List<Boss> findAll = (List<Boss>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 2);
    }

    @Test
    @Transactional
    void findByIdAnt() {
    	Boss find = service.findById(2);
    	
    	assertNotNull(find);
    	assertEquals(find.getName(), "Boss2");
    	assertEquals(find.getLife(), 150);
    	assertEquals(find.getDamage(), 30);
    	assertEquals(find.getReward(), 750);
    	
    	find = service.findById(40);
    	
    	assertNull(find);
    }
    
    @Test
    @Transactional
    void saveAnt() {
    	Boss obj = new Boss();
    	obj.setId(10);
    	obj.setName("Test");
    	obj.setLife(1);
    	obj.setDamage(2);
    	obj.setReward(3);
    	
    	Boss save = service.save(obj);
    	
    	assertNotNull(save);
    	assertEquals(save.getName(), obj.getName());
    	assertEquals(save.getLife(), obj.getLife());
    	assertEquals(save.getDamage(), obj.getDamage());
    	assertEquals(save.getReward(), obj.getReward());
    }
    
    @Test
    @Transactional
    void updateAnt() {
    	Boss find = service.findById(1);
    	find.setName("Updated");
    	find.setLife(0);
    	find.setReward(0);
    	find.setDamage(0);
    	
    	boolean update = service.update(find);
    	
    	assertTrue(update);
    	
    	find = service.findById(find.getId());
    	
    	assertNotNull(find);
    	assertEquals("Updated", find.getName());
    	assertEquals(0, find.getLife());
    	assertEquals(0, find.getReward());
    	assertEquals(0, find.getDamage());    	
    }
    
    @Test
    @Transactional
    void deleteAnt() {
    	Boss find = service.findById(1);
    	
    	assertNotNull(find);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNull(find);
    }
}