package es.iespto.algyjmcg.AntScape.infrastructure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;

@Service
public class AuthService {
	@Autowired 
	private IUsuarioService usuarioservice;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired 
	private MailService mailService;
	
	public String register(UserDetailsLogin userdetails) {
		Usuario userentity = new Usuario();
		userentity.setName(userdetails.getUsername());
		userentity.setPassword(passwordEncoder.encode(userdetails.getPassword()));
		userentity.setRol("ROLE_USER");
		userentity.setActive(false);
		userentity.setEmail(userdetails.email);
		userentity.setBanned(false);
		userentity.setEggs("10");
		userentity.setGoldenEggs("0");
		userentity.setImg("./profile.png");
		
		int randInt = (int)Math.random()*10000;
		String randStrHashed = passwordEncoder.encode(randInt+"");
		userentity.setHash(randStrHashed);
		
		Usuario save = usuarioservice.save(userentity);
		userdetails.setRole(userentity.getRol());
		String generateToken = jwtService.generateToken(userdetails.username, userdetails.password);
		
		String message = "http://localhost:8080/api/v1/registerVerify"
				+ "?email="+save.getEmail()
				+ "&hash="+save.getHash();
		
		String asunto = "Register Verification For Account";
		
		mailService.send(save.getEmail(),asunto , message);
		
		return generateToken;
	}

	public String authenticate(UserDetailsLogin request) {
		Usuario userentity = usuarioservice.findByName(request.getUsername());
		UserDetailsLogin userlogin = null;
		if (userentity != null) {
			if (passwordEncoder.matches(request.getPassword(), userentity.getPassword())) {
				userlogin = new UserDetailsLogin();
				userlogin.setUsername(userentity.getName());
				userlogin.setPassword(userentity.getPassword());
				userlogin.setRole(userentity.getRol());
			}
		}
		String generateToken = null;
		if (userlogin != null) {
			if(userentity.getActive() == true) {
				generateToken = jwtService.generateToken(userentity.getName(), userentity.getRol());	
			} else {
				
			}
		}
		return generateToken;
	}
	
	public String getRol(String token) {
		String role = jwtService.extractRole(token);
		return role;
	}
}