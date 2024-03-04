package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v3;

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
@RequestMapping("/api/v3/ants")
public class AntV3Controller {
	@Autowired private IAntService antService;
	
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
	public ResponseEntity<?> save(@RequestBody AntInputDTO in) {
		if(in != null) {
			Ant a = new Ant();
			
			a.setBiome(in.getBiome());
			a.setDescription(in.getDescription());
			a.setId(in.getId());
			a.setName(in.getName());
			a.setType(in.getType());
			
			Ant save = antService.save(a);
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
			
			return ResponseEntity.ok("Ant Deleted Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}

	/*@PutMapping
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
	}*/

	@GetMapping(path = "/{name}")
	public ResponseEntity<?> findByName(@PathVariable String name) {
		if(name != null) {
			Ant find = antService.findByName(name);
			if(find != null) {
				return ResponseEntity.ok(find);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
	
	@GetMapping(path = "/{type}")
	public ResponseEntity<?> findByType(@PathVariable String type) {
		if(type != null) {
			Ant find = antService.findByType(type);
			if(find != null) {
				return ResponseEntity.ok(find);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
}

class AntInputDTO{
	private Integer id;
	private String biome;
	private String description;
	private String name;
	private String type;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getBiome() {
		return biome;
	}
	public void setBiome(String biome) {
		this.biome = biome;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
