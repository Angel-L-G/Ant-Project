package es.iespto.algyjmcg.AntScape.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.hasSize;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IBossService;
import es.iespto.algyjmcg.AntScape.helpers.AuthenticationUtils;

@SpringBootTest
@AutoConfigureMockMvc
class BossV2ControllerTest {
	private AuthenticationUtils loginService = new AuthenticationUtils();
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private IBossService bossService;

	@Test
	public void testFindAll() throws Exception {
		String token = loginService.login(mockMvc);
		
		Boss boss1 = new Boss();
		boss1.setId(1);
		boss1.setName("Boss1");

		Boss boss2 = new Boss();
		boss2.setId(2);
		boss2.setName("Boss2");

		List<Boss> bosses = Arrays.asList(boss1, boss2);

		when(bossService.findAll()).thenReturn(bosses);

		mockMvc.perform(get("/api/v2/bosses")
				.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].name", is("Boss1")))
				.andExpect(jsonPath("$[1].id", is(2))).andExpect(jsonPath("$[1].name", is("Boss2")));
	}

	@Test
	public void testFindById() throws Exception {
		String token = loginService.login(mockMvc);
		
		int id = 1;
		Boss boss = new Boss();
		boss.setId(id);
		boss.setName("BossName");

		when(bossService.findById(id)).thenReturn(boss);

		mockMvc.perform(get("/api/v2/bosses/{id}", id)
				.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(id))
				.andExpect(jsonPath("$.name").value("BossName"));
	}
}
