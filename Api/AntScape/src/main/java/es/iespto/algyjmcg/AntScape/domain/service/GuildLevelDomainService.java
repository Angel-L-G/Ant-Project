package es.iespto.algyjmcg.AntScape.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IGuildLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IGuildLevelRepository;

@Service
public class GuildLevelDomainService implements IGuildLevelService{
	@Autowired private IGuildLevelRepository service;

	@Override
	public GuildLevel findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public GuildLevel save(GuildLevel in) {
		return service.save(in);
	}

	@Override
	public Iterable<GuildLevel> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
		
	}

	@Override
	public boolean update(GuildLevel in) {
		return service.update(in);
	}
}
