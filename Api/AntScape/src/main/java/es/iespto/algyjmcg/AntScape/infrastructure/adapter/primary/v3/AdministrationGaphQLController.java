package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v3;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAdministrativeInfoService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.infrastructure.security.MailService;

@CrossOrigin
@Controller
public class AdministrationGaphQLController {
	@Autowired private IAdministrativeInfoService adminInfoService;
	@Autowired private IUsuarioService usuarioservice;
	@Autowired private INestService nestService;
	@Autowired private INestLevelService nestLevelService;
	@Autowired private IAntService antService;
	@Autowired private PasswordEncoder passwordEncoder;
	@Autowired private MailService mailService;

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @QueryMapping
    public List<Usuario> findAllUsers(@Argument Integer userId) {
        return (List<Usuario>) usuarioservice.findAll();
    }
	
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @QueryMapping
    public AdministrativeInfo findAdministrativeInfoByUserId(@Argument Integer userId) {
        return adminInfoService.findByUserId(userId);
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @QueryMapping
    public List<UserRegistration> findRegisterAlongTime(@Argument boolean ok) {
    	Iterable<AdministrativeInfo> all = adminInfoService.findAll();
    	Map<String, Integer> usersRegisteredPerDay = new HashMap<>();

    	for (AdministrativeInfo info : all) {
    		if(info.getCreatedAt() != null) {
    			String date = info.getCreatedAt().toLocalDateTime().toLocalDate().toString();
        	    usersRegisteredPerDay.put(date, usersRegisteredPerDay.getOrDefault(date, 0) + 1);
    		}
    	}

    	List<UserRegistration> result = new ArrayList<>();
    	for (Map.Entry<String, Integer> entry : usersRegisteredPerDay.entrySet()) {
    	    UserRegistration registration = new UserRegistration();
    	    registration.setDate(entry.getKey());
    	    registration.setCount(entry.getValue());
    	    result.add(registration);
    	}

    	return result;
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @QueryMapping
    public List<UserRegistration> findLastLogins(@Argument String aux) {
    	Iterable<AdministrativeInfo> all = adminInfoService.findAll();
    	Map<String, Integer> usersRegisteredPerDay = new HashMap<>();

    	for (AdministrativeInfo info : all) {
    		if(info.getLastLogin() != null) {
    			String date = info.getLastLogin().toLocalDateTime().toLocalDate().toString();
        	    usersRegisteredPerDay.put(date, usersRegisteredPerDay.getOrDefault(date, 0) + 1);
    		}
    	}

    	List<UserRegistration> result = new ArrayList<>();
    	for (Map.Entry<String, Integer> entry : usersRegisteredPerDay.entrySet()) {
    	    UserRegistration registration = new UserRegistration();
    	    registration.setDate(entry.getKey());
    	    registration.setCount(entry.getValue());
    	    result.add(registration);
    	}

    	return result;
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @SchemaMapping(typeName = "Mutation", field = "saveUser")
    public GraphqlResponse saveUser(@Argument UsuarioSaveInputDTO user) {
    	System.err.println("AAAAAAAAAAAA");
        GraphqlResponse response = new GraphqlResponse();

        if(user != null) {
            Usuario userentity = new Usuario();
            userentity.setName(user.getName());
            userentity.setPassword(passwordEncoder.encode(user.getPassword()));
            userentity.setRol(user.getRol());
            userentity.setActive(user.getActive());
            userentity.setEmail(user.getEmail());
            userentity.setBanned(false);
            userentity.setEggs(user.getEggs()+"");
            userentity.setGoldenEggs(user.getGoldenEggs()+"");
            userentity.setImg(user.getImg());
            userentity.setTotalMoneyGenerated((user.getGoldenEggs()+user.getEggs()) + "");

            int randInt = (int)(Math.random() * 10000);
            String randStrHashed = passwordEncoder.encode(String.valueOf(randInt));
            userentity.setHash(randStrHashed);

            Usuario save = usuarioservice.save(userentity);

            if (save != null) {
                Nest baseNest = new Nest();
                
                List<Ant> all = (List<Ant>) antService.findAll();
                baseNest.setAnt(all.get(0));
                baseNest.setUsuario(save); // Usar el usuario guardado en lugar del que se creó
                baseNest.setDeleted(false);

                Nest nestSave = nestService.save(baseNest);

                NestLevel nl = new NestLevel();
                nl.setCost(10.0F);
                nl.setLevel(1);
                nl.setName(user.getName() + "-" + all.get(0).getName() + "-0");
                nl.setMultiplier(BigDecimal.valueOf(1.05));
                nl.setProduction(2.0);
                nl.setNest(nestSave);

                nestLevelService.save(nl);

                AdministrativeInfo admInfo = new AdministrativeInfo();
				
				admInfo.setCreatedAt(new Timestamp(System.currentTimeMillis()));
				admInfo.setUsuario(save);
				admInfo.setInformacion("Nothing About This User");
				admInfo.setLastLogin(null);
				admInfo.setUpdatedAt(null);
				
				adminInfoService.save(admInfo);
                
                String message = "You have been registered to antscape by the name: " + userentity.getName();
                String asunto = "You have Been Registered By An Admin";

                mailService.send(save.getEmail(), asunto, message);

                response.setStatus(200); // HttpStatus.OK
                response.setName("Ok");
                response.setMsg("All went good");
            } else {
                response.setStatus(500); // HttpStatus.INTERNAL_SERVER_ERROR
                response.setName("Error");
                response.setMsg("Failed to save user");
            }
        } else {
            response.setStatus(204); // HttpStatus.NO_CONTENT
            response.setName("No Content");
            response.setMsg("The request is empty");
        }

        return response;
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @SchemaMapping(typeName = "Mutation", field = "updatearUser")
    public GraphqlResponse updateUser(@Argument UsuarioInputGraphqlUpdateDTO user) {
    	System.err.println("312");
    	GraphqlResponse response = new GraphqlResponse();
    	
    	if(user != null) {
    		System.err.println("123: " + user.getId());
    		Usuario u = usuarioservice.findById(user.getId());
    		
    		u.setEggs(user.getEggs()+"");
    		u.setGoldenEggs(user.getGoldenEggs()+"");
    		u.setActive(user.getActive());
    		u.setImg(user.getImg());
    		u.setPassword(passwordEncoder.encode(user.getPassword()));
    		u.setEmail(user.getEmail());
    		u.setName(user.getName());
    		
    		boolean update = usuarioservice.update(u);
    		
    		if(update) {
    			response.setStatus(200); // HttpStatus.OK
        		response.setName("Ok");
        		response.setMsg("All went good");
        		
        		adminInfoService.updateTimeStamp(u.getId(), 2);
    		} else {
    			response.setStatus(304); // HttpStatus.NOT_MODIFIED
        		response.setName("Not Modified");
        		response.setMsg("User Not updated");
    		}
    	} else {
    		response.setStatus(204); // HttpStatus.NO_CONTENT
    		response.setName("No Content");
    		response.setMsg("The request is empty");
    	}
    	
    	return response;
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @SchemaMapping(typeName = "Mutation", field = "deleteUser")
    public GraphqlResponse deleteUser(@Argument Integer id) {
    	GraphqlResponse response = new GraphqlResponse();
    	
    	if(id != null) {
    		usuarioservice.deleteById(id);
    		
			response.setStatus(200); // HttpStatus.OK
    		response.setName("Ok");
    		response.setMsg("All went good");
			
		} else {
			response.setStatus(204); // HttpStatus.NO_CONTENT
			response.setName("No Content");
			response.setMsg("The request is empty");
		}
		
		return response;
    }
}

class GraphqlResponse {
	private Integer status;
	private String name;
	private String msg;
	
	public GraphqlResponse() {
		this.status = 302; // HttpStatus.FOUND
		this.name = "Found";
		this.msg = "reached but done nothing";
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}

class UsuarioSaveInputDTO {
	private Boolean active;
	private Integer eggs;
	private Integer goldenEggs;
	private String email;
	private String img;
	private String name;
	private String password;
	private String rol;
	
	public UsuarioSaveInputDTO() {}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Integer getEggs() {
		return eggs;
	}

	public void setEggs(Integer eggs) {
		this.eggs = eggs;
	}

	public Integer getGoldenEggs() {
		return goldenEggs;
	}

	public void setGoldenEggs(Integer goldenEggs) {
		this.goldenEggs = goldenEggs;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}
}

class UsuarioInputGraphqlUpdateDTO {
	private Integer id;
	private Boolean active;
	private Integer eggs;
	private Integer goldenEggs;
	private String email;
	private String img;
	private String name;
	private String password;
	private String rol;
	
	public UsuarioInputGraphqlUpdateDTO() {}

	public Integer getEggs() {
		return eggs;
	}

	public void setEggs(Integer eggs) {
		this.eggs = eggs;
	}

	public Integer getGoldenEggs() {
		return goldenEggs;
	}

	public void setGoldenEggs(Integer goldenEggs) {
		this.goldenEggs = goldenEggs;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}

class UserRegistration {
    private String date;
    private int count;

    public UserRegistration() {}

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}