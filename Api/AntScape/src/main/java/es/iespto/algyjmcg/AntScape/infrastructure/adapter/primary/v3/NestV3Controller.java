package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.JwtService;

@RestController
@CrossOrigin
@RequestMapping("/api/v3/nests")
public class NestV3Controller {
	@Autowired private INestService nestService;
	@Autowired private IUsuarioService userService;
	@Autowired private IAntService antService;
	@Autowired private JwtService jwtService;
	
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
	public ResponseEntity<?> save(@RequestBody NestInputDTO in, @RequestHeader HttpHeaders headers) {
		if(in != null) {
			String token = headers.getFirst("Authorization");
			String resultado = token.substring(7);
			String username = jwtService.extractUsername(resultado);
			
			Usuario findByName = userService.findByName(username);
			
			Nest nest = new Nest();
			
			nest.setDeleted(false);
			nest.setUsuario(findByName);
			nest.setAnt(antService.findByType(in.getAntType()));
			
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

	public String getAntType() {
		return antType;
	}

	public void setAntType(String antType) {
		this.antType = antType;
	}
}