package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAdministrativeInfoService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.AuthService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.UserDetailsLogin;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class LoginController {
	@Autowired private AuthService service;
	@Autowired private IUsuarioService userService;
	@Autowired private INestService nestService;
	@Autowired private INestLevelService nestLevelService;
	@Autowired private IAntService antService;
	@Autowired private IAdministrativeInfoService adminInfoService;
	
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
	public ResponseEntity<String> authenticate(@RequestBody UserInputLoginDTO user) {
		UserDetailsLogin userDetails = new UserDetailsLogin();
		
		userDetails.setUsername(user.getNombre());
		userDetails.setPassword(user.getPassword());
		
		Usuario u = userService.findByName(userDetails.getUsername());
		
		System.err.println("aaaaaaaaaaaaa" + u.getName());

		if(!u.getBanned()) {
			if(u.getActive()) {
				String token = service.authenticate(userDetails);
				adminInfoService.updateTimeStamp(u.getId(), 1);
				if (token == null) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User/pass erróneo");
				}else{
					return ResponseEntity.ok(token);
				}
			}else {
				return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED).body("Es necesario activar a traves del email");
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
					Nest baseNest = new Nest();
					
					List<Ant> ants = (List<Ant>) (antService.findAll());
					
					baseNest.setAnt(ants.get(0));
					baseNest.setUsuario(user);
					baseNest.setDeleted(false);
					
					Nest save = nestService.save(baseNest);
					
					NestLevel nl = new NestLevel();
					
					nl.setCost(10.0F);
					nl.setLevel(1);
					nl.setName(user.getName() + "-" + ants.get(0).getName() + "-0");
					nl.setMultiplier(BigDecimal.valueOf(1.05));
					nl.setProduction(2.0);
					nl.setNest(save);
					
					nestLevelService.save(nl);
					
					AdministrativeInfo admInfo = new AdministrativeInfo();
					
					admInfo.setCreatedAt(new Timestamp(System.currentTimeMillis()));
					admInfo.setUsuario(user);
					admInfo.setInformacion("Nothing About This User");
					admInfo.setLastLogin(null);
					admInfo.setUpdatedAt(null);
					
					AdministrativeInfo infoSave = adminInfoService.save(admInfo);
					
					if(save == null && infoSave == null) {
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error ocurred while setting up your information, try again later");
					}
					
					return ResponseEntity.ok("User verified Correctly");	
				}else {
					return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("User/pass erróneo");
				}
				
				
			}else {
				return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Credentials doesn't match");
			}
		}else {
			return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Data Found");
		}
	}
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