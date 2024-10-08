package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAdministrativeInfoService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.domain.service.IFileStorageService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/users")
public class UserV2Controller {
	@Autowired private IAdministrativeInfoService adminInfoService;
	@Autowired private IUsuarioService userService;
	@Autowired private IAntService antService;
	@Autowired private JwtService jwtService;
	@Autowired private IFileStorageService fileStorage;
	
	@PutMapping
	public ResponseEntity<?> update(@RequestHeader HttpHeaders headers, @RequestBody UsuarioInputUpdateDTO in) {
		Usuario u = new Usuario();
		
		u.setEmail(in.getEmail());
		u.setPassword(in.getPassword());
		u.setName(in.getName());
		
		boolean update = userService.update(u);
		
		if(update) {
			adminInfoService.updateTimeStamp(u.getId(), 2);
			return ResponseEntity.ok(u);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("User Not Updated");
		}
	}
	
	@PutMapping("/profilepic")
	public ResponseEntity<?> updateProfilePicture(@RequestHeader HttpHeaders headers, @RequestBody updateProfilePictureDTO inputDTO) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario u = userService.findByName(username);
		
		String codedfoto = inputDTO.getBase64();
        byte[] photoBytes = Base64.getDecoder().decode(codedfoto);
        String nombreNuevoFichero = fileStorage.save(inputDTO.getImgName(), photoBytes);
		
		u.setImg(nombreNuevoFichero);
		
		boolean update = userService.update(u);
		
		if(update) {
			adminInfoService.updateTimeStamp(u.getId(), 2);
			return ResponseEntity.ok(u);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Profile Picture Not Updated");
		}
	}
	
	@PutMapping(path="/update/eggs")
	public ResponseEntity<?> updateEggs(@RequestHeader HttpHeaders headers, @RequestBody String eggs) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		findByName.setEggs(eggs);
		
		boolean update = userService.update(findByName);
		
		if(update) {
			return ResponseEntity.ok(findByName);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Money Not Updated");
		}
	}
	
	@PutMapping(path="/update/goldeneggs")
	public ResponseEntity<?> updateGoldenEggs(@RequestHeader HttpHeaders headers, @RequestBody String goldenEggs) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		findByName.setGoldenEggs(goldenEggs);
		
		boolean update = userService.update(findByName);
		
		if(update) {
			return ResponseEntity.ok(findByName);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Money Not Updated");
		}
	}
	
	@PutMapping(path="/update/totalmoney")
	public ResponseEntity<?> updateTotalMoney(@RequestHeader HttpHeaders headers, @RequestBody String totalMoney) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		findByName.setTotalMoneyGenerated(totalMoney);
		
		boolean update = userService.update(findByName);
		
		if(update) {
			return ResponseEntity.ok(findByName);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Money Not Updated");
		}
	}
	
	@PutMapping(path="/unlockant")
	public ResponseEntity<?> unlockAnt(@RequestHeader HttpHeaders headers, @RequestBody Integer id_ant) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		
		Ant ant = antService.findById(id_ant);
		
		findByName.getAnts().add(ant);
		
		boolean update = userService.update(findByName);
		
		if(update) {
			adminInfoService.updateTimeStamp(findByName.getId(), 2);
			return ResponseEntity.ok(findByName);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("User Not Updated");
		}
	}
	
	@GetMapping(path="/me")
	public ResponseEntity<?> findMe(@RequestHeader HttpHeaders headers) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario u = userService.findByName(username);
		Guild guild = userService.findUserGuild(u.getId());
		
		UsuarioOutput out = new UsuarioOutput();
		
		out.setEggs(u.getEggs());
		out.setGoldenEggs(u.getGoldenEggs());
		out.setId(u.getId());
		out.setImg(u.getImg());
		out.setName(u.getName());
		out.setNests(u.getNests());
		out.setTotalMoneyGenerated(u.getTotalMoneyGenerated());	
		if(guild != null) {
			out.setId_guild(guild.getId());
		}else {
			out.setId_guild(null);
		}
		
		return ResponseEntity.ok(out);
	}
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		if(id != null) {
			Usuario u = userService.findById(id);
			Guild guild = userService.findUserGuild(u.getId());
			
			UsuarioOutput out = new UsuarioOutput();
			
			out.setEggs(u.getEggs());
			out.setGoldenEggs(u.getGoldenEggs());
			out.setId(u.getId());
			out.setImg(u.getImg());
			out.setName(u.getName());
			out.setNests(u.getNests());
			
			if(guild != null) {
				out.setId_guild(guild.getId());
			}else {
				out.setId_guild(null);
			}
			
			return ResponseEntity.ok(out);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@GetMapping(path="/me/guild")
	public ResponseEntity<?> findMyGuild(@RequestHeader HttpHeaders headers) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		
		Guild guild = userService.findUserGuild(findByName.getId());
		
		return ResponseEntity.ok(guild);
	}
	
	@GetMapping(path="/{id}/guild")
	public ResponseEntity<?> findUserGuild(@PathVariable Integer id) {	
		Usuario findByName = userService.findById(id);
		
		Guild guild = userService.findUserGuild(findByName.getId());
		
		return ResponseEntity.ok(guild);
	}
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		Iterable<Usuario> findAll = userService.findAll();
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}
	
	@PostMapping(path="/{me}/friends/{name_friend}")
	public ResponseEntity<?> addFriend(@PathVariable String me, @PathVariable String name_friend){
		boolean added = userService.addFriend(me, name_friend);
		
		if(added) {
			return ResponseEntity.ok("Friend Added Correctly");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something Went wrong");
		}
	}
	
	@PostMapping(path="/{me}/blocked/{name_blocked}")
	public ResponseEntity<?> block(@PathVariable String me, @PathVariable String name_blocked){
		boolean blocked = userService.block(me, name_blocked);
		
		if(blocked) {
			return ResponseEntity.ok("User Bloqued Correctly");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something Went wrong");
		}
	}
	
	@GetMapping(path="/{id}/friends")
	public ResponseEntity<?> findFriends(@RequestHeader HttpHeaders headers) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		
		Iterable<Usuario> findAll = userService.findFriends(findByName.getId());
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}
	
	@GetMapping(path="/{id}/bloqued")
	public ResponseEntity<?> findBloqued(@RequestHeader HttpHeaders headers) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		
		Iterable<Usuario> findAll = userService.findBloqued(findByName.getId());
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}
	
	@DeleteMapping(path="/{me}/friends/{name_friend}")
	public ResponseEntity<?> removeFriend(@PathVariable String me, @PathVariable String name_friend){
		boolean added = userService.removeFriend(me, name_friend);
		
		if(added) {
			return ResponseEntity.ok("Friend removed Correctly");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something Went wrong");
		}
	}
	
	@DeleteMapping(path="/{me}/blocked/{name_blocked}")
	public ResponseEntity<?> unblock(@PathVariable String me, @PathVariable String name_blocked){
		boolean blocked = userService.unblock(me, name_blocked);
		
		if(blocked) {
			return ResponseEntity.ok("User Unblocked Correctly");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something Went wrong");
		}
	}
}

class updateProfilePictureDTO {
	private String imgName;
	private String base64;
	
	public updateProfilePictureDTO() {}
	
	public String getImgName() {
		return imgName;
	}
	public void setImgName(String imgName) {
		this.imgName = imgName;
	}
	public String getBase64() {
		return base64;
	}
	public void setBase64(String base64) {
		this.base64 = base64;
	}
}

class UsuarioOutput {
	private Integer id;
	private String eggs;
	private String goldenEggs;
	private String img;
	private String name;
	private Integer id_guild;
	private String totalMoneyGenerated;
	private List<Nest> nests;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getEggs() {
		return eggs;
	}
	public void setEggs(String eggs) {
		this.eggs = eggs;
	}
	public String getGoldenEggs() {
		return goldenEggs;
	}
	public void setGoldenEggs(String goldenEggs) {
		this.goldenEggs = goldenEggs;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getId_guild() {
		return id_guild;
	}
	public void setId_guild(Integer id_guild) {
		this.id_guild = id_guild;
	}
	public List<Nest> getNests() {
		return nests;
	}
	public void setNests(List<Nest> nests) {
		this.nests = nests;
	}
	public String getTotalMoneyGenerated() {
		return totalMoneyGenerated;
	}
	public void setTotalMoneyGenerated(String totalMoneyGenerated) {
		this.totalMoneyGenerated = totalMoneyGenerated;
	}
}

class UsuarioInputUpdateDTO {
	private String email;
	private String name;
	private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}