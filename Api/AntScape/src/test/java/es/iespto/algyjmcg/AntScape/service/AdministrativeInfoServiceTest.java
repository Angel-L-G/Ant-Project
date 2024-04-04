package es.iespto.algyjmcg.AntScape.service;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.AdministrativeInfoService;
import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class AdministrativeInfoServiceTest {
	@Autowired AdministrativeInfoService service;
	
	@Test
    void contextLoads() {}

    @Test
    @Transactional
    void findAllInfo() {
        List<AdministrativeInfo> findAll = (List<AdministrativeInfo>)service.findAll();
        assertNotNull(findAll);
        assertTrue(findAll.size() == 3);
    }

    @Test
    @Transactional
    void findByIdInfo() {
    	AdministrativeInfo find = service.findById(1);
    	
    	assertNotNull(find);
    	assertEquals(find.getInformacion(), "Información administrativa para el usuario 1");
    	
    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	Date parsedDate;
    	
		try {
			parsedDate = dateFormat.parse("2024-03-25 15:30:00");
			Timestamp timestamp = new Timestamp(parsedDate.getTime());
			
			assertEquals(find.getCreatedAt(), timestamp);
			assertEquals(find.getLastLogin(), timestamp);
	    	assertEquals(find.getUpdatedAt(), timestamp);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
    	find = service.findById(40);
    	
    	assertNull(find);
    }
    
    @Test
    @Transactional
    void saveInfo() {
    	AdministrativeInfo obj = new AdministrativeInfo();
    	obj.setId(10);
    	obj.setInformacion("Information");
    	obj.setCreatedAt(new Timestamp(System.currentTimeMillis()));
    	obj.setLastLogin(new Timestamp(System.currentTimeMillis()));
    	obj.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
    	
    	AdministrativeInfo save = service.save(obj);
    	
    	assertNotNull(save);
    	assertEquals(save.getInformacion(), obj.getInformacion());
    	assertEquals(save.getCreatedAt(), obj.getCreatedAt());
    	assertEquals(save.getLastLogin(), obj.getLastLogin());
    	assertEquals(save.getUpdatedAt(), obj.getUpdatedAt());
    }
    
    @Test
    @Transactional
    void updateInfo() {
    	AdministrativeInfo find = service.findById(1);
    	find.setInformacion("Information");
    	find.setCreatedAt(new Timestamp(System.currentTimeMillis()));
    	find.setLastLogin(new Timestamp(System.currentTimeMillis()));
    	find.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
    	
    	boolean update = service.update(find);
    	
    	assertTrue(update);
    	
    	AdministrativeInfo updatedObj = service.findById(find.getId());
    	
    	assertNotNull(find);
    	assertEquals(find.getInformacion(), updatedObj.getInformacion());
    	assertEquals(find.getCreatedAt(), updatedObj.getCreatedAt());
    	assertEquals(find.getLastLogin(), updatedObj.getLastLogin());
    	assertEquals(find.getUpdatedAt(), updatedObj.getUpdatedAt()); 	
    }
    
    @Test
    @Transactional
    void deleteInfo() {
    	AdministrativeInfo find = service.findById(1);
    	
    	assertNotNull(find);
    	
    	service.deleteById(find.getId());
    	
    	find = service.findById(1);
    	
    	assertNull(find);
    }
}
