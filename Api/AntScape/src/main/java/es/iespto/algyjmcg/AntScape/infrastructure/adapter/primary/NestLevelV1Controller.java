package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/nestlevels")
public class NestLevelV1Controller {
	@Autowired private INestLevelService mainService;
	@Autowired private INestService secundaryService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		Iterable<NestLevel> findAll = mainService.findAll();
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
		}
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		if(id != null) {
			NestLevel find = mainService.findById(id);
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
	public ResponseEntity<?> save(@RequestBody NestLevelSaveInputDTO in) {
		if(in != null) {
			NestLevel nestlvl = new NestLevel();
			
			nestlvl.setCost(in.getCost());
			nestlvl.setId(in.getId());
			nestlvl.setLevel(in.getLevel());
			nestlvl.setMultiplier(in.getMultiplier());
			nestlvl.setName(in.getName());
			nestlvl.setProduction(in.getProduction());
			
			nestlvl.setNest(secundaryService.findById(in.getId_nest()));
			
			NestLevel save = mainService.save(nestlvl);
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
			
			return ResponseEntity.ok("NestLevel Deleted Correctly");
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
		/*if(name != null) {
			Ant find = mainService.findByName(name);
			if(find != null) {
				return ResponseEntity.ok(find);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}*/
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("NOT IMPLEMENTEDS");
	}
}

class NestLevelSaveInputDTO {
	private Integer id;
	private Integer cost;
	private Integer level;
	private BigDecimal multiplier;
	private String name;
	private Integer production;
	private Integer id_nest;
	
	public NestLevelSaveInputDTO() {
		
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCost() {
		return cost;
	}
	public void setCost(Integer cost) {
		this.cost = cost;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public BigDecimal getMultiplier() {
		return multiplier;
	}
	public void setMultiplier(BigDecimal multiplier) {
		this.multiplier = multiplier;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getProduction() {
		return production;
	}
	public void setProduction(Integer production) {
		this.production = production;
	}
	public Integer getId_nest() {
		return id_nest;
	}
	public void setId_nest(Integer id_nest) {
		this.id_nest = id_nest;
	}
}