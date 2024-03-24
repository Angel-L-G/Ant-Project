package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IGuildLevelService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/guildlevels")
public class GuildLevelV2Controller {
	@Autowired private IGuildLevelService mainService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		Iterable<GuildLevel> findAll = mainService.findAll();
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		if(id != null) {
			GuildLevel find = mainService.findById(id);
			if(find != null) {
				return ResponseEntity.ok(find);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@PutMapping(path="/levelup/{id}")
	public ResponseEntity<?> levelUp(@PathVariable Integer id) {
		GuildLevel findById = mainService.findById(id);
		
		findById.setLevel(findById.getLevel()+1);

		findById.setCost(findById.getCost()*1.7);
		
		//Something with the efect string
		
		boolean update = mainService.update(findById);
		
		if(update) {
			return ResponseEntity.ok("Leveled Up Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Something went wrong leveling up the nest"); 
		}
	}
}
