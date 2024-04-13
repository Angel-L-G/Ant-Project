package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;

public interface IGuildService {
	Guild findById(Integer id);
	Guild save(Guild in);
	Iterable<Guild> findAll();
	void deleteById(Integer id);
	boolean update(Guild in);
	
	boolean giveOwnership(Integer idGuild, Integer idNewOwner);
	boolean removeUser(Integer idGuild, Integer idRemoved);
}
