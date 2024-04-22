package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IGuildLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IGuildService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/guilds")
public class GuildV2Controller {
	@Autowired private IGuildService mainService;
	@Autowired private IUsuarioService userService;
	@Autowired private IGuildLevelService guildLevelService;
	@Autowired private JwtService jwtService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		Iterable<Guild> findAll = mainService.findAll();
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		if(id != null) {
			Guild find = mainService.findById(id);
			if(find != null) {
				return ResponseEntity.ok(find);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@GetMapping(path = "/{id}/users")
	public ResponseEntity<?> findGuildUsersByGuildId(@PathVariable Integer id) {
		if(id != null) {
			List<Usuario> list = mainService.findGuildUsersByGuildId(id);
			if(list != null && !list.isEmpty()) {
				List<GuildUserOutputDTO> out = new ArrayList<GuildUserOutputDTO>();
				
				for (Usuario u : list) {
					GuildUserOutputDTO output = new GuildUserOutputDTO();
					
					output.setId(u.getId());
					output.setImg(u.getImg());
					output.setName(u.getName());
					
					out.add(output);
				}
				
				return ResponseEntity.ok(out);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PutMapping(path="{idGuild}/kick/users/{idKicked}")
	public ResponseEntity<?> kickPlayer(@PathVariable Integer idGuild, @PathVariable Integer idKicked, @RequestHeader HttpHeaders headers){
		if(idGuild != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			Usuario byId = userService.findById(idKicked);
			
			Guild guild = mainService.findById(idGuild);
			
			if(user!=null && byId!=null && guild!=null) {
				if(guild.getLeader() == user.getId()) {
					guild.getUsuarios().remove(byId);
					byId.setGuild(null);
					
					Guild guildSaved = mainService.save(guild);
					Usuario userSaved = userService.save(byId);
					
					if(guildSaved!=null && userSaved!=null) {
						return ResponseEntity.ok("User Kicked Correctly");
					}else {
						return ResponseEntity.status(HttpStatus.CONFLICT).body("Something went wrong, and user could not be kicked");
					}
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only the leader can kick people from the clan");
				}
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Guild or Users found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PutMapping(path="/{id}/joinguild")
	public ResponseEntity<?> joinGuild(@PathVariable Integer id_guild, @RequestHeader HttpHeaders headers){
		if(id_guild != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			
			Guild guild = mainService.findById(id_guild);
			
			guild.addUsuario(user);
			guild.setQuantity(guild.getUsuarios().size());
			
			Guild save = mainService.save(guild);
			
			if(save != null && save.getUsuarios().contains(user)) {
				return ResponseEntity.ok("User Joined The Guild Correctly");
			}else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something didn't work and you couldn't join that guild");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content On Request Body");
		}
	}
	
	@PutMapping(path="/{id}/giveOwnership/{newLeaderId}")
	public ResponseEntity<?> giveOwnership(@PathVariable Integer id, @PathVariable Integer newLeaderId, @RequestHeader HttpHeaders headers){
		if(id != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			Usuario newLeader = userService.findById(newLeaderId);
			
			Guild guild = mainService.findById(id);
			
			boolean giveOwnership = false;
			
			if(guild.getLeader() == user.getId()) {
				if(guild.getUsuarios().contains(user) && guild.getUsuarios().contains(newLeader)) {
					giveOwnership = mainService.giveOwnership(id, newLeaderId);
				}
			}
			
			if(giveOwnership) {
				return ResponseEntity.ok("Leadership Correctly Given");
			}else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something didn't work and you couldn't give the ownership");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PutMapping(path="/{id}/leaveguild")
	public ResponseEntity<?> leaveGuild(@PathVariable Integer id, @RequestParam Integer newLeader, @RequestHeader HttpHeaders headers){
		if(id != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			
			Guild guild = mainService.findById(id);
			
			if(guild.getLeader() == user.getId()) {
				if(guild.getUsuarios().size() == 0) {
					mainService.deleteById(id);
				}else {
					mainService.giveOwnership(id, newLeader);
				}
			} else {
				guild.removeUsuario(user);
			}
			
			guild.setQuantity(guild.getUsuarios().size());
			
			Guild save = mainService.save(guild);
			
			if(save != null && save.getUsuarios().contains(user)) {
				return ResponseEntity.ok("User Leaved The Guild Correctly");
			}else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something didn't work and you couldn't leave the guild");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PostMapping()
	public ResponseEntity<?> createGuild(@RequestHeader HttpHeaders headers, @RequestParam String guildName, @RequestParam String guildDescription){
		if(guildName != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			
			Guild guild = new Guild();
			
			if(guildDescription == null || guildDescription.isBlank()) {
				guildDescription = "Default Description";
			}
			
			guild.setName(guildName);
			guild.setDescription(guildDescription);
			guild.getUsuarios().add(user);
			guild.setTrophys(10);
			guild.setQuantity(1);
			guild.setLeader(user.getId());
			
			boolean update = userService.update(user);
			
			Guild save = mainService.save(guild);
			
			user.setGuild(guild);
			
			if(save != null && update) {
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(save);
			}else {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("Error while creating the guild try later");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PutMapping(path="/{idGuild}/levelUp/{nameLevel}")
	public ResponseEntity<?> levelUpGuildLevel(@RequestHeader HttpHeaders headers, @PathVariable Integer idGuild, @PathVariable String nameLevel){
		if(idGuild != null && nameLevel != null && !nameLevel.isBlank()) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			Guild guild = mainService.findById(idGuild);
			GuildLevel guildLevel = null;
			
			for (GuildLevel gl : guild.getGuildLevels()) {
				if(gl.getName().equals(nameLevel)) {
					guildLevel = gl;
				}
			}
			
			if(Double.parseDouble(user.getGoldenEggs()) >= guildLevel.getCost()) {
				guildLevel.setCost(guildLevel.getCost()*1.5);
				guildLevel.setLevel(guildLevel.getLevel()+1);
				
				double goldenEggs = Double.parseDouble(user.getGoldenEggs()) - guildLevel.getCost();
				
				user.setGoldenEggs(Math.round(goldenEggs)+"");
				
				boolean userUpdate = userService.update(user);
				boolean guildLevelUpdate = guildLevelService.update(guildLevel);
				
				if(userUpdate && guildLevelUpdate) {
					return ResponseEntity.status(HttpStatus.OK).body("Leveled Up Correctly");
				} else {
					return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something Went Wrong");
				}
			} else {
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Not Enought Eggs");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content");
		}
	}
	
	@PutMapping(path="/{idAtacker}/atack/{idDefender}")
	public ResponseEntity<?> atackGuild(@RequestHeader HttpHeaders headers, @PathVariable Integer idAtacker, @PathVariable Integer idDefender, @RequestParam Integer atackNumber){
		if(idAtacker != null && idDefender != null && atackNumber != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			Guild defender = mainService.findById(idDefender);
			Guild atacker = mainService.findById(idAtacker);
			
			if(atackNumber == defender.getDefenseNumber()) {
				Double aux = Integer.parseInt(user.getEggs()) + (Integer.parseInt(user.getTotalMoneyGenerated()) * 0.20);
				
				
			} else {
				
			}
			
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content");
		}
		
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("");
	}
}

class GuildUserOutputDTO {
	private Integer id;
	private String name;
	private String img; 
	
	public GuildUserOutputDTO() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}
}
