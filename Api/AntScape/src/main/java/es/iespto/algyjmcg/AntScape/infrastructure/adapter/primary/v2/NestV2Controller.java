package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v2;

import java.util.ArrayList;
import java.util.List;

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

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/nests")
public class NestV2Controller {
	@Autowired
	private INestService nestService;
	@Autowired
	private IUsuarioService userService;
	
	@GetMapping(path = "/own/{name}")
	public ResponseEntity<?> findAllOwn(@PathVariable String name) {
		if(name != null) {
			//Arreglo temporal
			Usuario findByName = userService.findByName(name);
			
			List<Nest> find = nestService.findAllById(findByName.getId());
			if(find != null) {
				List<NestOutput> list = new ArrayList<>();
				
				for (Nest n : find) {
					NestOutput ne = new NestOutput();
					
					ne.setAntType(n.getAntType());
					ne.setDeleted(n.getDeleted());
					ne.setId(n.getId());
					ne.setMap(n.getMap());
					
					list.add(ne);
				}
				
				return ResponseEntity.ok(list);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Content Found");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		if(id != null) {
			Nest find = nestService.findById(id);
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
	public ResponseEntity<?> save(@RequestBody NestInputDTO in) {
		if(in != null) {
			Nest nest = new Nest();
			
			nest.setDeleted(in.isDeleted());
			nest.setAntType(in.getAntType());
			nest.setMap(in.getMap());
			nest.setUsuario(userService.findByName(in.getNameUser()));
			
			Nest save = nestService.save(nest);
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
			nestService.deleteById(id);
			
			return ResponseEntity.ok("Nest Deleted Correctly");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("No Content On Request Body");
		}
	}
}

class NestOutput {
	private Integer id;

	private String antType;

	private boolean deleted;

	private String map;
	
	public NestOutput() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAntType() {
		return this.antType;
	}

	public void setAntType(String antType) {
		this.antType = antType;
	}

	public boolean getDeleted() {
		return this.deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getMap() {
		return this.map;
	}

	public void setMap(String map) {
		this.map = map;
	}
}

class NestInputDTO {
	private String antType;
	private boolean deleted;
	private String map;
	private String nameUser;

	public String getAntType() {
		return antType;
	}

	public void setAntType(String antType) {
		this.antType = antType;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getMap() {
		return map;
	}

	public void setMap(String map) {
		this.map = map;
	}

	public String getNameUser() {
		return nameUser;
	}

	public void setNameUser(String nameUser) {
		this.nameUser = nameUser;
	}
}