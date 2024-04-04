package es.iespto.algyjmcg.AntScape.helpers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

public class AuthenticationUtils {
    public String login(MockMvc mockMvc, String username, String password) throws Exception {
        String loginUrl = "/api/v1/login";
        String token = mockMvc.perform(post(loginUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\": \"" + username + "\", \"password\": \"" + password + "\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        
        return token;
    }
    
    public String login(MockMvc mockMvc) throws Exception {
        String loginUrl = "/api/v1/login";
        String token = mockMvc.perform(post(loginUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\": \"" + "a" + "\", \"password\": \"" + "a" + "\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        
        return token;
    }
}
