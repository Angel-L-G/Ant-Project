package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/users")
public class UserV2Controller {
	@Autowired
	private IUsuarioService userService;
	
	@PutMapping
	public ResponseEntity<?> update(@RequestBody UsuarioInputUpdateDTO in) {
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
		
		boolean update = userService.update(u);
		
		if(update) {
			return ResponseEntity.ok(u);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("User Not Updated");
		}
	}
	
	@GetMapping
	public ResponseEntity<?> findMe(@RequestParam String nick){
		if(nick != null) {
			System.out.println("AAAAAAAAAAAAAAAAAA" + nick);
			Usuario find = userService.findByName(nick);
			
			UserOutputDTO user = new UserOutputDTO(find);
			
			if(find != null) {
				return ResponseEntity.ok(user);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
}

class UserOutputDTO {
	Integer id;
	String nombre;
	String password;
	String email;
	String rol;
	
	public UserOutputDTO(Usuario u){
		setId(u.getId());
		setNombre(u.getName());
		setPassword(u.getPassword());
		setEmail(u.getEmail());
		setRol(u.getRol());
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRol() {
		return rol;
	}
	public void setRol(String rol) {
		this.rol = rol;
	}
}

class UsuarioInputUpdateDTO{
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