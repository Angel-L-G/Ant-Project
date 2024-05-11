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

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.GuildLevelService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.GuildService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class GuildLevelServiceTest {
	@Autowired private GuildService guildservice;
	@Autowired private GuildLevelService service;
	
	@Test
    void contextLoads() {}

    @Test
    @Transactional
    void GuildLevelFindAll() {
        List<GuildLevel> findAll = (List<GuildLevel>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 2);
    }

    @Test
    @Transactional
    void findByIdGuildLevel() {
    	GuildLevel find = service.findById(2);
    	
    	assertNotNull(find);
    	assertEquals(find.getName(), "Level 2");
    	assertEquals(find.getCost(), 150.0);
    	assertEquals(find.getLevel(), 1);
    	assertEquals(find.getEfect(), "Effect 2");
    	
    	find = service.findById(40);
    	
    	assertNull(find);
    }
    
    @Test
    @Transactional
    void saveGuildLevel() {
    	Guild guild = guildservice.findById(2);
    	
    	GuildLevel obj = new GuildLevel();
    	obj.setId(10);
    	obj.setGuild(guild);
    	obj.setName("Test");
    	obj.setCost(1.1);
    	obj.setLevel(2);
    	obj.setEfect("Test");
    	
    	GuildLevel save = service.save(obj);
    	
    	assertNotNull(save);
    	assertEquals(save.getName(), obj.getName());
    	assertEquals(save.getCost(), obj.getCost());
    	assertEquals(save.getLevel(), obj.getLevel());
    	assertEquals(save.getEfect(), obj.getEfect());
    	
    	
    }
    
    @Test
    @Transactional
    void updateGuildLevel() {
    	GuildLevel find = service.findById(1);

    	find.setName("Updated");
    	find.setCost(9.9);
    	find.setLevel(12);
    	find.setEfect("Updated");
    	
    	boolean update = service.update(find);
    	
    	assertTrue(update);
    	
    	GuildLevel save = service.findById(find.getId());
    	
    	assertNotNull(save);
    	assertEquals(find.getName(), save.getName());
    	assertEquals(find.getCost(), save.getCost());
    	assertEquals(find.getLevel(), save.getLevel());
    	assertEquals(find.getEfect(), save.getEfect());    	
    }
    
    @Test
    @Transactional
    void deleteGuildLevel() {
    	GuildLevel find = service.findById(1);
    	
    	assertNotNull(find);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNull(find);
    }

}
