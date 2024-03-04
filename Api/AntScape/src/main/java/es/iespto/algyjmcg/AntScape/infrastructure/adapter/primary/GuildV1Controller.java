package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

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

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IGuildService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/guilds")
public class GuildV1Controller {
	@Autowired private IGuildService mainService;
	@Autowired private IUsuarioService secundaryService;
	
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
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody Guild in) {
		if(in != null) {
			
			
			Guild save = mainService.save(in);
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
			mainService.deleteById(id);
			
			return ResponseEntity.ok("Guild Deleted Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PutMapping(path="/joinguild/{id}")
	public ResponseEntity<?> joinGuild(@PathVariable Integer id_guild, @RequestHeader HttpHeaders headers){
		if(id_guild != null) {
			mainService.deleteById(id_guild);
			
			return ResponseEntity.ok("Ant Deleted Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
}
