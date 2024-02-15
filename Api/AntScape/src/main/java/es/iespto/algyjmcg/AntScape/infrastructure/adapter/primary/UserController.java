package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/users")
public class UserController {
	@Autowired
	private IUsuarioService userService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		Iterable<Usuario> findAll = userService.findAll();
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		if(id != null) {
			Usuario find = userService.findById(id);
			if(find != null) {
				return ResponseEntity.ok(find);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody Usuario nest) {
		if(nest != null) {
			Usuario save = userService.save(nest);
			if(save != null) {
				return ResponseEntity.ok(save);
			}else {
				return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Content Not Saved, Due To An Error");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Integer id) {
		if(id != null) {
			userService.deleteById(id);
			
			return ResponseEntity.ok("Nest Deleted Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody UsuarioInputDTO in) {
		Usuario u = new Usuario();
		
		u.setEmail(in.getEmail());
		u.setPassword(in.getPassword());
		u.setName(in.getName());
		
		if(in.getAnts() != null) {
			u.setAnts(in.getAnts());
		}
		if(in.getNests() != null) {
			u.setNests(in.getNests());
		}
		
		return ResponseEntity.ok(u);
	}
	
	@GetMapping
	public ResponseEntity<?> banUser(@PathVariable Integer id){
		if(id != null) {
			boolean ban = userService.ban(id);
			if(ban) {
				return ResponseEntity.ok("User Banned Correctly");
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User Not Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@GetMapping
	public ResponseEntity<?> unBanUser(@PathVariable Integer id){
		if(id != null) {
			boolean ban = userService.unBan(id);
			if(ban) {
				return ResponseEntity.ok("User Unbanned Correctly");
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User Not Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
}

class UsuarioInputDTO{
	private Integer id;

	private String email;

	private String name;

	private String password;

	private String rol;

	private List<Nest> nests;

	private List<Ant> ants;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public List<Nest> getNests() {
		return nests;
	}

	public void setNests(List<Nest> nests) {
		this.nests = nests;
	}

	public List<Ant> getAnts() {
		return ants;
	}

	public void setAnts(List<Ant> ants) {
		this.ants = ants;
	}
}
