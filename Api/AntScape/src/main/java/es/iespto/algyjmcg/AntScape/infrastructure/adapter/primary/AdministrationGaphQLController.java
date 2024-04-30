package es.iespto.algyjmcg.AntScape.infrastructure.adapter.primary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAdministrativeInfoService;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;


@Controller
public class AdministrationGaphQLController {
	@Autowired private INestService nestService;
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
}
