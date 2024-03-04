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
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/users")
public class UserV2Controller {
	@Autowired private IUsuarioService userService;
	@Autowired private JwtService jwtService;
	
	@PutMapping
	public ResponseEntity<?> update(@RequestBody Usuario in) {
		/*Usuario u = new Usuario();
		
		u.setEmail(in.getEmail());
		u.setPassword(in.getPassword());
		u.setName(in.getName());
		
		if(in.getAnts() != null) {
			u.setAnts(in.getAnts());
		}
		if(in.getNests() != null) {
			u.setNests(in.getNests());
		}*/
		
		//boolean update = userService.update(u);
		boolean update = userService.update(in);
		
		if(update) {
			//return ResponseEntity.ok(u);
			return ResponseEntity.ok(in);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("User Not Updated");
		}
	}
	
	@GetMapping
	public ResponseEntity<?> findMe(@RequestHeader HttpHeaders headers) {
		String token = headers.getFirst("Authorization");
		String resultado = token.substring(7);
		String username = jwtService.extractUsername(resultado);
		
		Usuario findByName = userService.findByName(username);
		
		return ResponseEntity.ok(findByName);
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