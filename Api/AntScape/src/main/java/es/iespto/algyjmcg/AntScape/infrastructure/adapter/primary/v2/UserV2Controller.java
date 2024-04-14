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
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.domain.service.IFileStorageService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/users")
public class UserV2Controller {
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
			return ResponseEntity.ok(u);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Profile Picture Not Updated");
		}
	}
	
	@PutMapping(path="/updatemoney")
	public ResponseEntity<?> updateMoney(@RequestHeader HttpHeaders headers, @RequestBody updateMoneyDTO money) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		findByName.setEggs(money.getEggs());
		findByName.setGoldenEggs(money.getGoldenEggs());
		
		boolean update = userService.update(findByName);
		
		if(update) {
			return ResponseEntity.ok(findByName);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("User Not Updated");
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
		
		Usuario findByName = userService.findByName(username);
		
		return ResponseEntity.ok(findByName);
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
	
	@PostMapping(path="/{me}/friends/add/{name_friend}")
	public ResponseEntity<?> addFriend(@PathVariable String me, @PathVariable String name_friend){
		boolean added = userService.addFriend(me, name_friend);
		
		if(added) {
			return ResponseEntity.ok("Friend Added Correctly");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something Went wrong");
		}
	}
	
<<<<<<< HEAD
	@PostMapping(path="/{me}/blocked/{name_blocked}")
	public ResponseEntity<?> block(@PathVariable String me, @PathVariable String name_blocked){
		boolean blocked = userService.block(me, name_blocked);
=======
	@PostMapping(path="/{me}/blocked/block/{name_blocked}")
	public ResponseEntity<?> block(@PathVariable String me, @PathVariable String name_friend){
		boolean blocked = userService.block(me, name_friend);
>>>>>>> hexagonal
		
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
	
<<<<<<< HEAD
	@DeleteMapping(path="/{me}/friends/{name_friend}")
=======
	@PostMapping(path="/{me}/friends/remove/{name_friend}")
>>>>>>> hexagonal
	public ResponseEntity<?> removeFriend(@PathVariable String me, @PathVariable String name_friend){
		boolean added = userService.removeFriend(me, name_friend);
		
		if(added) {
			return ResponseEntity.ok("Friend removed Correctly");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Something Went wrong");
		}
	}
	
<<<<<<< HEAD
	@DeleteMapping(path="/{me}/blocked/{name_blocked}")
	public ResponseEntity<?> unblock(@PathVariable String me, @PathVariable String name_blocked){
		boolean blocked = userService.unblock(me, name_blocked);
=======
	@PostMapping(path="/{me}/blocked/unblock/{name_blocked}")
	public ResponseEntity<?> unblock(@PathVariable String me, @PathVariable String name_friend){
		boolean blocked = userService.unblock(me, name_friend);
>>>>>>> hexagonal
		
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

class updateMoneyDTO{
	private String eggs;
	private String goldenEggs;
	
	public updateMoneyDTO() {}
	
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
}

class UsuarioOutput {
	private Integer id;
	private String eggs;
	private String goldenEggs;
	private String img;
	private String name;
	private Integer id_guild;
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