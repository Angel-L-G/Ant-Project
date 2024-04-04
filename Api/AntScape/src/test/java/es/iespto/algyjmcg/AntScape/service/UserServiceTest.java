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
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.AntService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.UsuarioService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class UserServiceTest {
	@Autowired UsuarioService service;
	@Autowired AntService antService;
	
	@Test
    void contextLoads() {}
	
    @Test
    @Transactional
    void findAllUsers() {
        List<Usuario> findAll = (List<Usuario>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 2);
    }

    @Test
    @Transactional
    void findByIdUser() {
    	Usuario user = service.findById(1);
    	
    	assertNotNull(user);
    	assertEquals(user.getName(), "Usuario1");
    	assertEquals(user.getPassword(), "password1");
    	assertEquals(user.getRol(), "ROLE_USER");
    	assertEquals(user.getEmail(), "usuario1@example.com");
    	assertTrue(user.getActive());
    	assertEquals(user.getHash(), "hash1");
    	assertFalse(user.getBanned());
    	assertEquals(user.getEggs(), "10");
    	assertEquals(user.getGoldenEggs(), "5");
    	assertEquals(user.getImg(), "profile1.png");
    	
    	//assertNotNull(user.getGuild());
    	//assertNotNull(user.getAmigos());
    	assertNotNull(user.getAnts());
    	assertNotNull(user.getNests());
    }
    
    @Test
    @Transactional
    void saveUser() {
    	Usuario user = new Usuario();
    	
    	user.setActive(false);
    	user.setBanned(false);
    	user.setEggs("1");
    	user.setEmail("a@gmail.com");
    	user.setGoldenEggs("1");
    	user.setHash("Hash");
    	user.setImg("profile.png");
    	user.setName("Name");
    	user.setPassword("Pass");
    	user.setRol("rol");
    	
    	Usuario save = service.save(user);
    	
    	assertNotNull(save);
    	assertFalse(user.getActive());
    	assertFalse(user.getBanned());
    	assertEquals(user.getEggs(), save.getEggs());
    	assertEquals(user.getEmail(), save.getEmail());
    	assertEquals(user.getGoldenEggs(), save.getGoldenEggs());
    	assertEquals(user.getHash(), save.getHash());
    	assertEquals(user.getImg(), save.getImg());
    	assertEquals(user.getName(), save.getName());
    	assertEquals(user.getPassword(), save.getPassword());
    	assertEquals(user.getRol(), save.getRol());
    }
    
    @Test
    @Transactional
    void updateUser() {
    	Usuario user = service.findById(2);
    	assertNotNull(user);
    	
    	user.setEggs("29");
    	user.setEmail("Updated");
    	user.setGoldenEggs("100");
    	user.setImg("updated");
    	user.setName("updated");
    	user.setPassword("updated");
    	user.setRol("updated");
    	
    	Ant ant = antService.findById(1);
    	assertNotNull(ant);
    	
    	user.getAnts().add(ant);
    	ant.getUsuarios().add(user);
    	
    	boolean update = service.update(user);
    	assertTrue(update);
    	
    	update = antService.update(ant);
    	assertTrue(update);
    	
    	Usuario find = service.findById(2);
    	
    	assertNotNull(find);
    	assertEquals(find.getEggs(), user.getEggs());
    	assertEquals(find.getEmail(), user.getEmail());
    	assertEquals(find.getGoldenEggs(), user.getGoldenEggs());
    	assertEquals(find.getImg(), user.getImg());
    	assertEquals(find.getName(), user.getName());
    	assertEquals(find.getPassword(), user.getPassword());
    	assertEquals(find.getRol(), user.getRol());
    	
    	/*assertNotNull(find.getAnts());
    	System.out.println(find.getAnts().size());
    	assertTrue(find.getAnts().size() > 1);*/
    }
    
    @Test
    @Transactional
    void deleteUser() {
    	Usuario find = service.findById(1);
    	
    	assertNotNull(find);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNull(find);
    }

}
