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

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.AntService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class AntServiceTest {
	@Autowired AntService service;
	
	@Test
    void contextLoads() {}

    @Test
    @Transactional
    void findAllAnts() {
        List<Ant> findAll = (List<Ant>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 2);
    }

    @Test
    @Transactional
    void findByIdAnt() {
    	Ant find = service.findById(2);
    	
    	assertNotNull(find);
    	assertEquals(find.getName(), "Red Ant");
    	assertEquals(find.getType(), "Warrior");
    	assertEquals(find.getBiome(), "Forests");
    	assertTrue(find.getDescription().length() > 0);
    	
    	find = service.findById(40);
    	
    	assertNull(find);
    }
    
    @Test
    @Transactional
    void saveAnt() {
    	Ant obj = new Ant();
    	obj.setId(10);
    	obj.setBiome("Biome");
    	obj.setDescription("Description");
    	obj.setName("Name");
    	obj.setType("Type");
    	
    	Ant save = service.save(obj);
    	
    	assertNotNull(save);
    	assertEquals(save.getBiome(), obj.getBiome());
    	assertEquals(save.getDescription(), obj.getDescription());
    	assertEquals(save.getName(), obj.getName());
    	assertEquals(save.getType(), obj.getType());
    }
    
    @Test
    @Transactional
    void updateAnt() {
    	String aux = "Updated";
    	
    	Ant find = service.findById(1);
    	find.setDescription("Updated");
    	find.setBiome("Updated");
    	find.setName("Updated");
    	find.setType("Updated");
    	
    	boolean update = service.update(find);
    	
    	assertTrue(update);
    	
    	find = service.findById(find.getId());
    	
    	assertNotNull(find);
    	assertEquals(aux, find.getName());
    	assertEquals(aux, find.getDescription());
    	assertEquals(aux, find.getBiome());
    	assertEquals(aux, find.getType());    	
    }
    
    @Test
    @Transactional
    void deleteAnt() {
    	Ant find = service.findById(1);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNull(find);
    }
    
    //@Test
    //@Transactional
    void findByNameAnt() {
    	
    }
}
