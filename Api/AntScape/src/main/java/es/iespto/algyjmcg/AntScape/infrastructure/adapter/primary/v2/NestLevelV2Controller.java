package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/nestlevels")
public class NestLevelV2Controller {
	@Autowired private INestLevelService mainService;
	@Autowired private INestService secundaryService;
	
	@PutMapping(path="/levelup/{id}")
	public ResponseEntity<?> levelUp(@PathVariable Integer id) {
		NestLevel findById = mainService.findByIdRel(id);
		
		findById.setLevel(findById.getLevel()+1);
		
		BigDecimal res = findById.getMultiplier().multiply(BigDecimal.valueOf(findById.getProduction()));

		findById.setProduction(res.doubleValue());

		Float aditionToCost = (float) ((findById.getNest().getNestLevels().size()/10.0)+1.0);
		Float newCost = (float) (Math.round(findById.getCost()*findById.getMultiplier().floatValue()*aditionToCost));
		
		findById.setCost(newCost);
		
		System.err.println(findById.getCost());
		
		boolean update = mainService.update(findById);
		
		if(update) {
			return ResponseEntity.ok("Leveled Up Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Something went wrong leveling up the nest");
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
}

class NestLevelSaveInputDTO {
	private Integer id;
	private Float cost;
	private Integer level;
	private BigDecimal multiplier;
	private String name;
	private Double production;
	private Integer id_nest;
	
	public NestLevelSaveInputDTO() {
		
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Float getCost() {
		return cost;
	}
	public void setCost(Float cost) {
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
	public Double getProduction() {
		return production;
	}
	public void setProduction(Double production) {
		this.production = production;
	}
	public Integer getId_nest() {
		return id_nest;
	}
	public void setId_nest(Integer id_nest) {
		this.id_nest = id_nest;
	}
}