package es.iespto.algyjmcg.AntScape.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IGuildService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IGuildRepository;

@Service
public class GuildDomainService implements IGuildService{
	@Autowired private IGuildRepository service;

	@Override
	public Guild findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public Guild save(Guild in) {
		return service.save(in);
	}

	@Override
	public Iterable<Guild> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
		
	}

	@Override
	public boolean update(Guild in) {
		return service.update(in);
	}

	@Override
	public boolean giveOwnership(Integer idGuild, Integer idNewOwner) {
		return service.giveOwnership(idGuild, idNewOwner);
	}

	@Override
	public boolean removeUser(Integer idGuild, Integer idRemoved) {
		return service.removeUser(idGuild, idRemoved);
	}

	@Override
	public List<Usuario> findGuildUsersByGuildId(Integer id) {
		return service.findGuildUsersByGuildId(id);
	}
}
