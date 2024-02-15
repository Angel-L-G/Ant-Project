package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

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
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/ants")
public class AntController {
	@Autowired
	private IAntService antService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		Iterable<Ant> findAll = antService.findAll();
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		if(id != null) {
			Ant find = antService.findById(id);
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
	public ResponseEntity<?> save(@RequestBody Ant nest) {
		if(nest != null) {
			Ant save = antService.save(nest);
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
			antService.deleteById(id);
			
			return ResponseEntity.ok("Nest Deleted Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody Ant in) {
		Ant a = new Ant();
		
		a.setBiome(in.getBiome());
		a.setCost(in.getCost());
		a.setDamage(in.getDamage());
		a.setId(in.getId());
		a.setLife(in.getLife());
		a.setName(in.getName());
		a.setType(in.getType());
		a.setWorking(in.getWorking());
		
		a.setUsuarios(in.getUsuarios());
		a.setAntNests(in.getAntNests());
		
		boolean update = antService.update(a);
		
		if(update) {
			return ResponseEntity.ok("Ant Updated Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Something went wrong updating the ant"); 
		}
	}

}
