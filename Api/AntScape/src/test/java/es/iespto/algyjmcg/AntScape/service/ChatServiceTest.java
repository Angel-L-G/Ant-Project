package es.iespto.algyjmcg.AntScape.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.ChatService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.MessageService;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service.UsuarioService;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@Sql(scripts = {"/antscapetest.sql"})
class ChatServiceTest {
	@Autowired ChatService chatService;
	@Autowired UsuarioService userService;
	@Autowired MessageService messageService;
	
	@Test
    void contextLoads() {}
	
	@Test
    public void testFindById() {
        Chat result = chatService.findById(2);

        assertNotNull(result);
        assertEquals(2, result.getId());
        assertEquals("Last message for chat 2", result.getLastMessage());
        assertEquals(2, result.getIdGuild());
    }

    @Test
    public void testSave() {
        Chat chat = new Chat();
        chat.setId(1);
        chat.setLastMessage("Test message");
        chat.setIdGuild(1);

        Chat savedChat = chatService.save(chat);

        assertNotNull(savedChat);
        assertEquals(1, savedChat.getId());
        assertEquals("Test message", savedChat.getLastMessage());
        assertEquals(1, savedChat.getIdGuild());
    }

    @Test
    public void testFindAll() {
        Iterable<Chat> result = chatService.findAll();

        assertNotNull(result);
        assertEquals(2, ((List<Chat>) result).size());
    }

    @Test
    public void testDeleteById() {
    	chatService.deleteById(2);
    	
    	Chat byId = chatService.findById(2);
    	
    	assertNull(byId);
    }

    @Test
    public void testUpdate() {
        Chat chat = new Chat();
        List<Message> list = new ArrayList<Message>();
        
        chat.setId(1);
        chat.setLastMessage("Updated message");
        chat.setIdGuild(123);
        chat.setUsuario1(new Usuario());
        chat.setUsuario2(new Usuario());
        chat.setMessages(list);
        
        boolean updated = chatService.update(chat);

        assertTrue(updated);
    }

    @Test
    public void testFindUserChats() {
        List<Chat> result = chatService.findUserChats(1);

        assertNotNull(result);
        assertEquals(2, result.size());
    }
}