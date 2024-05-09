package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
	
	@PutMapping(path = "/{id}/image")
	public ResponseEntity<?> findById(@PathVariable Integer id, @RequestParam String img) {
		if(id != null && img != null) {
			Guild find = mainService.findById(id);
			
			find.setGuildImage(img);
			
			boolean update = mainService.update(find);
			if(update) {
				return ResponseEntity.ok(find);
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
					guild.setQuantity(guild.getUsuarios().size());
					byId.setGuild(null);
					
					boolean updateGuild = mainService.update(guild);
					boolean updateUser = userService.update(byId);
					
					if(updateGuild && updateUser) {
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
	public ResponseEntity<?> joinGuild(@PathVariable Integer id, @RequestHeader HttpHeaders headers){
		if(id != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			
			Guild userGuild = userService.findUserGuild(user.getId());
			
			if(userGuild != null) {
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("ya tienes un gremio");
			}
			
			Guild guild = mainService.findById(id);
			
			guild.addUsuario(user);
			guild.setQuantity(guild.getQuantity()+1);
			
			boolean updateGuild = mainService.update(guild);

			user.setGuild(guild);
			
			boolean update = userService.update(user);
			
			if(updateGuild && update) {
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
		if(newLeader < 0) {
			newLeader = null;
		}
		
		if(id != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			
			List<Usuario> guildUsersByGuildId = mainService.findGuildUsersByGuildId(id);
			boolean ok = true;
			
			for (Usuario u : guildUsersByGuildId) {
				if(u.getId() == user.getId()) {
					ok = false;
				}
			}
			
			if(ok) {
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No tienes ningun gremio");
			}
			
			Guild guild = mainService.findById(id);
			
			int pos = -1;
			
			for (int i = 0; i < guildUsersByGuildId.size(); i++) {
				if(guildUsersByGuildId.get(i).getId() == user.getId()) {
					pos = i;
				}
			}
			
			guildUsersByGuildId.remove(pos);
		
			guild.setUsuarios(guildUsersByGuildId);
			guild.setQuantity(guild.getQuantity()-1);
			
			user.setGuild(null);
			
			if(guild.getLeader() == user.getId()) {
				if(guild.getUsuarios().size() == 0) {
					boolean updateUser = userService.updateGuild(user);
					mainService.deleteById(id);
					
					if(updateUser) {
						return ResponseEntity.ok("User Leaved The Guild Correctly, and due to the lack of players the guild has been deleted");
					} else {
						return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something didn't work and you couldn't leave the guild");
					}
				} else {
					boolean giveOwnership = mainService.giveOwnership(id, newLeader);
					boolean updateGuild = mainService.update(guild);
					boolean updateUser = userService.updateGuild(user);
					
					if(updateGuild && updateUser && giveOwnership) {
						return ResponseEntity.ok("User Leaved The Guild Correctly, and the ownership was given correctly");
					} else {
						return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something didn't work and you couldn't leave the guild");
					}
				}
			} else {
				boolean updateGuild = mainService.update(guild);
				boolean updateUser = userService.updateGuild(user);
				
				if(updateGuild && updateUser) {
					return ResponseEntity.ok("User Leaved The Guild Correctly");
				} else {
					return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something didn't work and you couldn't leave the guild");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PostMapping
	public ResponseEntity<?> createGuild(@RequestHeader HttpHeaders headers, @RequestParam String guildName, @RequestParam String guildDescription, @RequestParam String guildImage){
		if(guildName != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			
			Guild guild = new Guild();
			
			if(guildDescription == null || guildDescription.isBlank()) {
				guildDescription = "Default Description";
			}
			
			if(guildImage == null || guildImage.isBlank()) {
				guildImage = "img.png";
			}
			
			Random rnd = new Random();
			int num = rnd.nextInt(6) + 1;
			
			guild.setName(guildName);
			guild.setDescription(guildDescription);
			guild.setGuildImage(guildImage);
			guild.setDefenseRange("12-18");
			guild.setDefenseNumber(num);
			guild.getUsuarios().add(user);
			guild.setTrophys(10);
			guild.setQuantity(1);
			guild.setLeader(user.getId());
			
			Guild save = mainService.save(guild);
			
			user.setGuild(save);
			
			boolean updateGuild = userService.updateGuild(user);
			
			if(save != null && updateGuild) {
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
	
	@GetMapping(path="/{idGuild}/seekChallenger")
	public ResponseEntity<?> seekChallenger(@RequestHeader HttpHeaders headers, @PathVariable Integer idGuild){
		if(idGuild != null) {
			//String token = headers.getFirst("Authorization");
			//String resultado = token.substring(7);
			//String username = jwtService.extractUsername(resultado);
			
			//Usuario user = userService.findByName(username);
			Guild guild = mainService.findById(idGuild);
			
			Guild oponent = nearestGuild(guild);
			
			if(oponent != null) {
				return ResponseEntity.status(HttpStatus.OK).body(oponent);
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went Wrong, Try Again Later");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content");
		}
	}
	
	@PutMapping(path="/{idAtacker}/attack/{idDefender}")
	public ResponseEntity<?> atackGuild(@RequestHeader HttpHeaders headers, @PathVariable Integer idAtacker, @PathVariable Integer idDefender, @RequestParam Integer attackNumber){
		if(idAtacker != null && idDefender != null && attackNumber != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario user = userService.findByName(username);
			Guild defender = mainService.findById(idDefender);
			Guild atacker = mainService.findById(idAtacker);
			
			Integer acuracy = Math.abs(attackNumber - defender.getDefenseNumber());
			
			Double eggsGained = null;
			Double goldenEggsGained = null;
			Integer trophysDefeneder = null;
			Integer trophysAtacker = null;
			Double totalMoneyGanied = null;
			
			if(acuracy == 0) {
				// PERFECT
				eggsGained = (Integer.parseInt(user.getTotalMoneyGenerated()) * 0.20) + 10;
				goldenEggsGained =  8.0;
				trophysDefeneder = -13;
				trophysAtacker = +15;
				totalMoneyGanied = Integer.parseInt(user.getTotalMoneyGenerated()) + (Integer.parseInt(user.getTotalMoneyGenerated()) * 0.20) + 10;
					
			} else if (acuracy <= 2){
				// ALMOST PERFECT
				eggsGained = (Integer.parseInt(user.getTotalMoneyGenerated()) * 0.10) + 5;
				goldenEggsGained = 4.0;
				trophysDefeneder = -2;
				trophysAtacker = +5;
				totalMoneyGanied = Integer.parseInt(user.getTotalMoneyGenerated()) + (Integer.parseInt(user.getTotalMoneyGenerated()) * 0.10) + 5;
				
			} else {
				// FAILED
				eggsGained = (Integer.parseInt(user.getTotalMoneyGenerated()) * 0.005) + 1;
				goldenEggsGained = 0.0;
				trophysDefeneder = +5;
				trophysAtacker = -10;
				totalMoneyGanied = Integer.parseInt(user.getTotalMoneyGenerated()) + (Integer.parseInt(user.getTotalMoneyGenerated()) * 0.005) + 1;
			}
			
			Integer eggsGainedInt = (int) Math.round(eggsGained);
			Integer goldenEggsGainedInt = (int) Math.round(goldenEggsGained);
			Integer totalMoneyGeneratedInt = (int) Math.round(totalMoneyGanied);
			
			user.setGoldenEggs((Integer.parseInt(user.getGoldenEggs()) + goldenEggsGainedInt) + "");
			user.setEggs((Integer.parseInt(user.getEggs()) + eggsGainedInt) + "");
			user.setTotalMoneyGenerated(totalMoneyGeneratedInt+"");
			
			AttackRewards rewards = new AttackRewards();
			
			rewards.setEggs(eggsGainedInt);
			rewards.setGoldenEggs(goldenEggsGainedInt);
			rewards.setTrophys(trophysAtacker);
			
			boolean updateUser = userService.update(user);
			
			defender.setTrophys(defender.getTrophys()+trophysDefeneder);
			
			boolean updateDefender = mainService.update(defender);
			
			atacker.setTrophys(atacker.getTrophys()+trophysAtacker);
			
			boolean updateAtacker = mainService.update(atacker);
			
			if(updateUser && updateDefender && updateAtacker) {
				return ResponseEntity.status(HttpStatus.OK).body(rewards);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something Went Wrong");
			}		
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content");
		}
	}
	
	@PutMapping(path="/{id}/defensenumber")
	public ResponseEntity<?> updatedefenseNumber(@RequestHeader HttpHeaders headers, @PathVariable Integer id, @RequestParam Integer newDefenseNumber){
		if(id != null && newDefenseNumber != null) {
			Guild guild = mainService.findById(id);
			
			guild.setDefenseNumber(newDefenseNumber);
			
			boolean update = mainService.update(guild);
			
			if(update) {
				return ResponseEntity.status(HttpStatus.OK).body("Defense Number Updated");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something Went Wrong");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content");
		}
	}
	
	private Guild nearestGuild(Guild seeker) {
		Iterable<Guild> allGuilds = mainService.findAll();
		Guild out = null;
		Integer pos = 999999999; 
		
		for (Guild g : allGuilds) {
			Integer actual = Math.abs(seeker.getTrophys() - g.getTrophys());
			
			if(pos > actual) {
				if(!(g.getId() == seeker.getId())) {
					pos = actual;
					out = g;
				}
			}
		}
		
		return out;
	}
}

class AttackRewards {
	private Integer eggs;
	private Integer GoldenEggs;
	private Integer Trophys;
	
	public AttackRewards() {}

	public Integer getEggs() {
		return eggs;
	}

	public void setEggs(Integer eggs) {
		this.eggs = eggs;
	}

	public Integer getGoldenEggs() {
		return GoldenEggs;
	}

	public void setGoldenEggs(Integer goldenEggs) {
		GoldenEggs = goldenEggs;
	}

	public Integer getTrophys() {
		return Trophys;
	}

	public void setTrophys(Integer trophys) {
		Trophys = trophys;
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
