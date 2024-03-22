package es.iespto.algyjmcg.AntScape.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2.AntV2Controller;

@WebMvcTest(AntV2Controller.class)
public class AntV2ControllerTest {
	AuthenticationUtils loginService = new AuthenticationUtils();
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private IAntService antService;
    
    @Test
    public void testFindById() throws Exception {
    	String token = loginService.login();
    	
        // Arrange
        int id = 1;
        Ant ant = new Ant();
        ant.setId(id);
        ant.setName("AntName");
        ant.setType("AntType");

        when(antService.findById(id)).thenReturn(ant);

        // Act & Assert
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
    	String token = loginService.login();
    	
        // Arrange
        int id = 1;
        when(antService.findById(id)).thenReturn(null);

        // Act & Assert
        mockMvc.perform(get("/api/v2/ants/{id}", id)
        	.header("Authorization", "Bearer " + token))
            .andExpect(status().isNoContent())
            .andExpect((ResultMatcher) content().string("No Content Found"));
    }

    // Otros métodos de prueba para los demás endpoints pueden ir aquí

}
