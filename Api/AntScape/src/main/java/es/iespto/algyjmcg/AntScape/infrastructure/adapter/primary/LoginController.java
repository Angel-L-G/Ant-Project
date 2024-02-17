package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

import java.lang.System.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.AuthService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.UserDetailsLogin;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class LoginController {
	Logger log;
	@Autowired
	private AuthService service;
	//@Autowired private MailService mailService;
	@Autowired private IUsuarioService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserInputRegisterDTO request) {
		
		UserDetailsLogin user = new UserDetailsLogin();
		
		user.setUsername(request.getNombre());
		user.setPassword(request.getPassword());
		user.setEmail(request.getEmail());
		user.setRole("USER");
		
		service.register(user);
		
		return ResponseEntity.ok(user);
	}

	@PostMapping("/login")
	public ResponseEntity<String> authenticate(@RequestBody UserInputLoginDTO request) {
		
		UserDetailsLogin user = new UserDetailsLogin();
		
		user.setUsername(request.getNombre());
		user.setPassword(request.getPassword());
		
		Usuario u = userService.findByName(user.getUsername());

		if(!u.getBanned()) {
			if(u.getActive()) {
				String token = service.authenticate(user);
				if (token == null) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User/pass erróneo");
				}else{
					return ResponseEntity.ok(token);
				}
			}else {
				return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED).body("Necesario activar a traves del email antes y que la administracion confirme su cuenta");
			}
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Banned User");
		}
	}
	
	@GetMapping("/registerVerify")
	public ResponseEntity<?> verify(@RequestParam String email, @RequestParam String hash){
		Usuario user = userService.findByEmail(email);

		System.out.println("Controller: " + user);
		if(user != null) {
			if(hash.equals(user.getHash())) {
				boolean verify = userService.verify(user.getId());
				
				if(verify) {
					return ResponseEntity.ok("User verified Correctly");	
				}else {
					return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("User/pass erróneo");
				}
				
				
			}else {
				return (ResponseEntity<?>) ResponseEntity.unprocessableEntity();
			}
		}else {
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Data Found");
		}
	}
	
	/*@GetMapping("/{token}")
	public ResponseEntity<?> getRol(@PathVariable String token){
		if(token != null) {
			String rol = service.getRol(token);
			return ResponseEntity.ok(rol);
		}else {
			return (ResponseEntity<?>) ResponseEntity.noContent();
		}
	}*/
}

class UserInputRegisterDTO{
	String nombre;
	String password;
	String email;
	
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
	public UserInputRegisterDTO() {}
}

class UserInputLoginDTO{
	String nombre;
	String password;
	
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
	public UserInputLoginDTO() {}
}