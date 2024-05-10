package es.iespto.algyjmcg.AntScape.controller;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.helpers.AuthenticationUtils;

@SpringBootTest
@AutoConfigureMockMvc
class NestLevelV2Controller {
	@Autowired
    private MockMvc mockMvc;
    @MockBean
    private INestLevelService nestLevelService;
    @MockBean
    private INestService nestService;
    private AuthenticationUtils loginService = new AuthenticationUtils();

    @Test
    public void testFindById_ValidId() throws Exception {
        String token = loginService.login(mockMvc);
        int id = 1;
        NestLevel nestLevel = new NestLevel();
        nestLevel.setId(id);
        nestLevel.setName("Test Nest Level");

        given(nestLevelService.findById(id)).willReturn(nestLevel);

        mockMvc.perform(get("/api/v2/nestlevels/{id}", id)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("Test Nest Level"));

    }

    @Test
    public void testSave_ValidInput() throws Exception {
        String token = loginService.login(mockMvc);
        NestLevelSaveInputDTO inputDTO = new NestLevelSaveInputDTO();
        inputDTO.setId(1);
        inputDTO.setName("New Nest Level");
        inputDTO.setCost(100.0);
        inputDTO.setLevel(1);
        inputDTO.setMultiplier(BigDecimal.valueOf(1.5));
        inputDTO.setProduction(50.0);
        inputDTO.setId_nest(1);

        NestLevel savedNestLevel = new NestLevel();
        savedNestLevel.setId(1);
        savedNestLevel.setName("New Nest Level");

        given(nestService.findById(inputDTO.getId_nest())).willReturn(new Nest());
        given(nestLevelService.save(any(NestLevel.class))).willReturn(savedNestLevel);

        mockMvc.perform(post("/api/v2/nestlevels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(inputDTO))
            .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id", is(1)))
            .andExpect(jsonPath("$.name", is("New Nest Level")));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

class NestLevelSaveInputDTO {
	private Integer id;
	private Double cost;
	private Integer level;
	private BigDecimal multiplier;
	private String name;
	private Double production;
	private Integer id_nest;
	
	public NestLevelSaveInputDTO() {
		
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Double getCost() {
		return cost;
	}
	public void setCost(Double cost) {
		this.cost = cost;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public BigDecimal getMultiplier() {
		return multiplier;
	}
	public void setMultiplier(BigDecimal multiplier) {
		this.multiplier = multiplier;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getProduction() {
		return production;
	}
	public void setProduction(Double production) {
		this.production = production;
	}
	public Integer getId_nest() {
		return id_nest;
	}
	public void setId_nest(Integer id_nest) {
		this.id_nest = id_nest;
	}
}