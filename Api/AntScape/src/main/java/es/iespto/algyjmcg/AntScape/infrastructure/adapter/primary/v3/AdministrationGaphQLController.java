package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary.v3;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAdministrativeInfoService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IGuildService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;


@Controller
public class AdministrationGaphQLController {
	@Autowired private INestService nestService;
	@Autowired private IGuildService guildService;
	@Autowired private IAdministrativeInfoService administrativeInfoService;
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@QueryMapping
	public List<Nest> findAllNests() {
		return (List<Nest>) nestService.findAll();
	}

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @QueryMapping
    public AdministrativeInfo findAdministrativeInfoByUserId(@Argument Integer userId) {
        return administrativeInfoService.findByUserId(userId);
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @QueryMapping
    public List<UserRegistration> findRegisterAlongTime(@Argument boolean ok) {
    	Iterable<AdministrativeInfo> all = administrativeInfoService.findAll();
    	Map<String, Integer> usersRegisteredPerDay = new HashMap<>();

    	for (AdministrativeInfo info : all) {
    	    String date = info.getCreatedAt().toLocalDateTime().toLocalDate().toString();
    	    usersRegisteredPerDay.put(date, usersRegisteredPerDay.getOrDefault(date, 0) + 1);
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
    public List<UserRegistration> findLastLogins() {
    	Iterable<AdministrativeInfo> all = administrativeInfoService.findAll();
    	Map<String, Integer> usersRegisteredPerDay = new HashMap<>();

    	for (AdministrativeInfo info : all) {
    	    String date = info.getLastLogin().toLocalDateTime().toLocalDate().toString();
    	    usersRegisteredPerDay.put(date, usersRegisteredPerDay.getOrDefault(date, 0) + 1);
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
    public Double calcularMediaDePersonas(@Argument String aux) {
    	Iterable<Guild> guilds = guildService.findAll();
    	int totalPersonas = 0;
        int cantidadDeGremios = 0;

        for (Guild guild : guilds) {
            totalPersonas += guild.getQuantity();
            cantidadDeGremios++;
        }

        if (cantidadDeGremios == 0) {
            return 0.0;
        }

        double media = (double) totalPersonas / cantidadDeGremios;

        return Math.round(media * 100.0) / 100.0;
        /*
         {
		   "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4iLCJzdWIiOiJhIiwiZXhwIjoxNzE1MzQwNDA5fQ.ge6tJa4zzw1mXdckOWqYz72Pmp6_uDkDG7XaNdR2WVM"
		 }
         */
    }
}

class UserRegistration {
    private String date;
    private int count;

    public UserRegistration() {}

    // Getters y Setters
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