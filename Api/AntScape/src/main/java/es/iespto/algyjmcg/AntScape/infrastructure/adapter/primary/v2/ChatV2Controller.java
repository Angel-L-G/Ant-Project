package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IChatService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IMessageService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/chats")
public class ChatV2Controller {
	@Autowired private JwtService jwtService;
	@Autowired private IUsuarioService userService;
	@Autowired private IChatService chatService;
	@Autowired private IMessageService messageService;
	
	@GetMapping(path="/me")
	public ResponseEntity<?> findMyChats(@RequestHeader HttpHeaders headers){
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario find = userService.findByName(username);
		
		if(find != null) {
			List<Chat> chats = chatService.findUserChats(find.getId());
			
			List<ChatOutPutDTO> list = new ArrayList<>();
			for (Chat c : chats) {
				ChatOutPutDTO output = new ChatOutPutDTO();
				
				output.setId(c.getId());
				output.setLastMessage(c.getLastMessage());
				output.setNameUser1(c.getUsuario1().getName());
				output.setMessages(c.getMessages());
				
				if(c.getUsuario2() != null) {
					output.setNameUser2(c.getUsuario2().getName());
				}
				
				if(c.getIdGuild() != null) {
					output.setIdGuild(c.getIdGuild());
				}
				
				list.add(output);
			}
			
			return ResponseEntity.ok(list);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No User Logged");
		}
	}
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id, @RequestHeader HttpHeaders headers) {
		if(id != null) {
			Chat c = chatService.findById(id);
			
			if(c != null) {
				ChatOutPutDTO output = new ChatOutPutDTO();
				
				output.setId(c.getId());
				output.setIdGuild(c.getIdGuild());
				output.setLastMessage(c.getLastMessage());
				output.setNameUser1(c.getUsuario1().getName());
				output.setNameUser2(c.getUsuario2().getName());
				output.setMessages(c.getMessages());
				
				return ResponseEntity.ok(output);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@GetMapping(path = "/guild/{idGuild}")
	public ResponseEntity<?> findByGuildId(@PathVariable Integer idGuild, @RequestHeader HttpHeaders headers) {
		if(idGuild != null) {
			Chat c = chatService.findByGuildId(idGuild);
			
			if(c != null) {
				ChatOutPutDTO output = new ChatOutPutDTO();
				
				output.setId(c.getId());
				output.setIdGuild(c.getIdGuild());
				output.setLastMessage(c.getLastMessage());
				output.setNameUser1(c.getUsuario1().getName());
				output.setIdGuild(idGuild);
				output.setMessages(c.getMessages());
				
				return ResponseEntity.ok(output);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody ChatInPutDTO in, @RequestHeader HttpHeaders headers) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		if(in != null) {
			System.err.println(in.getNameUser2() + " -------------------------------------------------------------");
			Chat c = new Chat();
			
			if(in.getIdGuild() != null) {
				c.setIdGuild(in.getIdGuild());
				c.setUsuario2(null);
			} else {
				c.setUsuario2(userService.findByName(in.getNameUser2()));
				c.setIdGuild(null);
				
				System.err.println(c.getUsuario2().getName());
			}
			
			c.setUsuario1(userService.findByName(username));
			
			Chat save = chatService.save(c);	
			
			if(save != null) {
				System.err.println(save.getUsuario2().getName());
				ChatOutPutDTO output = new ChatOutPutDTO();
				
				output.setId(save.getId());
				output.setLastMessage(save.getLastMessage());
				output.setNameUser1(save.getUsuario1().getName());
				output.setMessages(save.getMessages());
				
				if(save.getUsuario2() != null) {
					output.setNameUser2(save.getUsuario2().getName());
				}
				
				if(save.getIdGuild() != null) {
					output.setIdGuild(save.getIdGuild());
				}
				
				return ResponseEntity.ok(output);
			}else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Content Not Saved, Due To An Error");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@GetMapping(path="/{id}/messages")
	public ResponseEntity<?> findAllMessagesByChatId(@PathVariable Integer id, @RequestHeader HttpHeaders headers) {
		Iterable<Message> findAll = messageService.findByChatId(id);
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}
	
	@PostMapping(path="/{id}/messages")
	public ResponseEntity<?> saveMessages(@RequestParam String message, @PathVariable Integer id, @RequestHeader HttpHeaders headers){
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		Usuario user = userService.findByName(username);
		
		if(!message.isBlank()) {
			Chat chat = chatService.findById(id);
			Message m = new Message();
			
			m.setBody(message);
			m.setSenderId(user.getId());
			m.setChat(chat);
			
			long currentTimeMillis = System.currentTimeMillis();
			m.setSentAt(new Timestamp(currentTimeMillis));
			
			chat.setLastMessage(message);
			
			boolean update = chatService.update(chat);
			Message save = messageService.save(m);
			
			if(save != null && update) {
				return ResponseEntity.status(HttpStatus.OK).body("Message Save Successfully");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Message Not Saves Check The Data");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
}

class ChatInPutDTO {
	private Integer idGuild;
	private String nameUser2;
	
	public ChatInPutDTO() {}

	public Integer getIdGuild() {
		return idGuild;
	}

	public void setIdGuild(Integer idGuild) {
		this.idGuild = idGuild;
	}

	public String getNameUser2() {
		return nameUser2;
	}

	public void setNameUser2(String nameUser2) {
		this.nameUser2 = nameUser2;
	}
}

class ChatOutPutDTO {
	private Integer id;
	private Integer idGuild;
	private String lastMessage;
	private String nameUser1;
	private String nameUser2;
	private List<Message> messages;
	
	public ChatOutPutDTO() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdGuild() {
		return idGuild;
	}

	public void setIdGuild(Integer idGuild) {
		this.idGuild = idGuild;
	}

	public String getLastMessage() {
		return lastMessage;
	}

	public void setLastMessage(String lastMessage) {
		this.lastMessage = lastMessage;
	}

	public String getNameUser1() {
		return nameUser1;
	}

	public void setNameUser1(String nameUser1) {
		this.nameUser1 = nameUser1;
	}

	public String getNameUser2() {
		return nameUser2;
	}

	public void setNameUser2(String nameUser2) {
		this.nameUser2 = nameUser2;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}
}