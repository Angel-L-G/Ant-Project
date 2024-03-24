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

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.GuildLevelService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.GuildService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.UsuarioService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class GuildServiceTest {
	@Autowired GuildService service;
	@Autowired UsuarioService userService;
	@Autowired GuildLevelService guildLevelService;
	
	@Test
    @Transactional
    void findAllGuild() {
        List<Guild> findAll = (List<Guild>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 3);
    }

    @Test
    @Transactional
    void findByIdGuild() {
    	Guild entity = service.findById(2);
    	
    	assertNotNull(entity);
    	assertEquals(entity.getName(), "Guild2");
    	assertEquals(entity.getTrophys(), 15);
    	assertEquals(entity.getQuantity(), 7);
    	assertEquals(entity.getDefenseRange(), 2);
    	assertEquals(entity.getDefenseNumber(), 5);
    }
    
    @Test
    @Transactional
    void saveGuild() {
    	Guild guild = new Guild();
    	
    	guild.setName("Test");
    	guild.setTrophys(1);
    	guild.setQuantity(2);
    	guild.setDefenseRange(3);
    	guild.setDefenseNumber(4);
    	
    	Guild save = service.save(guild);
    	
    	assertNotNull(save);
    	assertEquals(guild.getName(), save.getName());
    	assertEquals(guild.getTrophys(), save.getTrophys());
    	assertEquals(guild.getQuantity(), save.getQuantity());
    	assertEquals(guild.getDefenseRange(), save.getDefenseRange());
    	assertEquals(guild.getDefenseNumber(), save.getDefenseNumber());
    }
    
    @Test
    @Transactional
    void updateGuild() {
    	Guild guild = service.findById(3);
    	
    	guild.setName("Updated");
    	guild.setTrophys(1);
    	guild.setQuantity(2);
    	guild.setDefenseRange(3);
    	guild.setDefenseNumber(4);
    	
    	boolean update = service.update(guild);
    	
    	assertTrue(update);
    	
    	Guild find = service.findById(3);
    	
    	assertNotNull(find);
    	assertEquals(guild.getName(), find.getName());
    	assertEquals(guild.getTrophys(), find.getTrophys());
    	assertEquals(guild.getQuantity(), find.getQuantity());
    	assertEquals(guild.getDefenseRange(), find.getDefenseRange());
    	assertEquals(guild.getDefenseNumber(), find.getDefenseNumber());
    }
    
    @Test
    @Transactional
    void deleteGuild() {
    	Guild find = service.findById(1);
    	
    	assertNotNull(find);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNull(find);
	}
}
