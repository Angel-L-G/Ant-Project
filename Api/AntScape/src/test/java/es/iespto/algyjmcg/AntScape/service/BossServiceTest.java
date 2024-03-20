package es.iespto.algyjmcg.AntScape.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class BossServiceTest {

    @Test
    @Transactional
    void findAllAnts() {
        //List<Ant> findAll = (List<Ant>)service.findAll();
        //assertNotNull(findAll);
        //assertTrue(findAll.size() == 1);
    }

    @Test
    @Transactional
    void findByIdAnt() {
    	
    }
    
    @Test
    @Transactional
    void saveAnt() {
    	
    }
    
    @Test
    @Transactional
    void updateAnt() {
    	
    }
    
    @Test
    @Transactional
    void deleteAnt() {
    	
    }
    
    @Test
    @Transactional
    void findByTypeAnt() {
    	
    }
}