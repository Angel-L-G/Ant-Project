package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

import java.util.Base64;
import java.util.Optional;

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

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/nests")
public class NestController {
	@Autowired
	private INestService nestService;
	@Autowired
	private IUsuarioService userService;
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		Iterable<Nest> findAll = nestService.findAll();
		
		if(findAll != null) {
			return ResponseEntity.ok(findAll);
		}else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went horribly wrong");
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
			nest.setUsuario(userService.findById(in.getIdUser()));
			
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

	/*@PutMapping
	public ResponseEntity<?> update(@RequestBody AlumnoInputDTO alumno) {
		Alumno a = new Alumno();
		
		a.setDni(alumno.getDni());
		a.setApellidos(alumno.getApellidos());
		a.setFoto(alumno.getFoto());
		a.setNombre(alumno.getNombre());
			
		String codedfoto = alumno.getImg64();
		byte[] photoBytes = Base64.getDecoder().decode(codedfoto);
		
		String nombreNuevoFichero = storageService.save(alumno.getFoto(), photoBytes);
		alumno.setFoto(alumno.getFoto());
		
		boolean updateNative = alumnoService.update(a);
		return ResponseEntity.ok(updateNative);
	}*/

}

class NestInputDTO {
	private String antType;
	private boolean deleted;
	private String map;
	private Integer idUser;

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

	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}
}