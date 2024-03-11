package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/users")
public class UserV2Controller {
	@Autowired private IUsuarioService userService;
	@Autowired private IAntService antService;
	@Autowired private INestService nestService;
	@Autowired private JwtService jwtService;
	
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
	
	@PutMapping(path="/updatemoney")
	public ResponseEntity<?> updateMoney(@RequestHeader HttpHeaders headers, @RequestBody String eggs, @RequestBody String goldenEggs) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		findByName.setEggs(eggs);
		findByName.setGoldenEggs(goldenEggs);
		
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