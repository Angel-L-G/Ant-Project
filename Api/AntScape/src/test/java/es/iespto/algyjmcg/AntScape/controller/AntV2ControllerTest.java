package es.iespto.algyjmcg.AntScape.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.helpers.AuthenticationUtils;

@SpringBootTest
@AutoConfigureMockMvc
public class AntV2ControllerTest {
	private AuthenticationUtils loginService = new AuthenticationUtils();
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private IAntService antService;
    
    @Test
    public void testFindById() throws Exception {
    	String token = loginService.login(mockMvc);
    	
        int id = 1;
        Ant ant = new Ant();
        ant.setId(id);
        ant.setName("AntName");
        ant.setType("AntType");

        when(antService.findById(id)).thenReturn(ant);

        mockMvc.perform(get("/api/v2/ants/{id}", id)
        	.header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect((ResultMatcher) content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(id))
            .andExpect(jsonPath("$.name").value("AntName"))
            .andExpect(jsonPath("$.type").value("AntType"));
    }

    @Test
    public void testFindById_NoContent() throws Exception {
    	String token = loginService.login(mockMvc);
    	
        int id = 1;
        when(antService.findById(id)).thenReturn(null);

        mockMvc.perform(get("/api/v2/ants/{id}", id)
        	.header("Authorization", "Bearer " + token))
            .andExpect(status().isNoContent())
            .andExpect((ResultMatcher) content().string("No Content Found"));
    }

    @Test
    public void testFindByName_WithValidName_ShouldReturnAnt() throws Exception {
    	String token = loginService.login(mockMvc);
    	
        String name = "AntName";
        Ant ant = new Ant();
        ant.setName(name);
        ant.setType("AntType");

        when(antService.findByName(name)).thenReturn(ant);

        mockMvc.perform(get("/api/v2/ants/name/{name}", name)
        	.header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value(name))
            .andExpect(jsonPath("$.type").value("AntType"));
    }

    @Test
    public void testFindByName_WithInvalidName_ShouldReturnNoContent() throws Exception {
    	String token = loginService.login(mockMvc);
    	
        String name = "InvalidName";

        when(antService.findByName(name)).thenReturn(null);

        mockMvc.perform(get("/api/v2/ants/name/{name}", name)
        	.header("Authorization", "Bearer " + token))
            .andExpect(status().isNoContent())
            .andExpect(content().string("No Content Found"));
    }

    @Test
    public void testFindByType_WithValidType_ShouldReturnAnt() throws Exception {
    	String token = loginService.login(mockMvc);
    	
        String type = "AntType";
        Ant ant = new Ant();
        ant.setName("AntName");
        ant.setType(type);

        when(antService.findByType(type)).thenReturn(ant);

        mockMvc.perform(get("/api/v2/ants/type/{type}", type)
        	.header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("AntName"))
            .andExpect(jsonPath("$.type").value(type));
    }

    @Test
    public void testFindByType_WithInvalidType_ShouldReturnNoContent() throws Exception {
    	String token = loginService.login(mockMvc);
    	
        String type = "InvalidType";

        when(antService.findByType(type)).thenReturn(null);

        mockMvc.perform(get("/api/v2/ants/type/{type}", type)
        	.header("Authorization", "Bearer " + token))
            .andExpect(status().isNoContent())
            .andExpect(content().string("No Content Found"));
    }
}
