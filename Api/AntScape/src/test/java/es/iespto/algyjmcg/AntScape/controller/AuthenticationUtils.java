package es.iespto.algyjmcg.AntScape.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

public class AuthenticationUtils {

    @Autowired
    private MockMvc mockMvc;

    public String login(String username, String password) throws Exception {
        String loginUrl = "/api/v1/login";
        String token = mockMvc.perform(post(loginUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\": \"" + username + "\", \"password\": \"" + password + "\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        
        return token;
    }
    
    public String login() throws Exception {
        String loginUrl = "/api/v1/login";
        String token = mockMvc.perform(post(loginUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\": \"" + "a" + "\", \"password\": \"" + "a" + "\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        
        return token;
    }
}
