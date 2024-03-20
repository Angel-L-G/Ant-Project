package es.iespto.algyjmcg.AntScape.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2.AntV2Controller;

@WebMvcTest(AntV2Controller.class)
public class AntV2ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IAntService antService;

    @Test
    public void testFindById() throws Exception {
        // Arrange
        int id = 1;
        Ant ant = new Ant();
        ant.setId(id);
        ant.setName("AntName");
        ant.setType("AntType");

        when(antService.findById(id)).thenReturn(ant);

        // Act & Assert
        mockMvc.perform(get("/api/v2/ants/{id}", id))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(id))
            .andExpect(jsonPath("$.name").value("AntName"))
            .andExpect(jsonPath("$.type").value("AntType"));
    }

    @Test
    public void testFindById_NoContent() throws Exception {
        // Arrange
        int id = 1;
        when(antService.findById(id)).thenReturn(null);

        // Act & Assert
        mockMvc.perform(get("/api/v2/ants/{id}", id))
            .andExpect(status().isNoContent())
            .andExpect(content().string("No Content Found"));
    }

    // Otros métodos de prueba para los demás endpoints pueden ir aquí

}
