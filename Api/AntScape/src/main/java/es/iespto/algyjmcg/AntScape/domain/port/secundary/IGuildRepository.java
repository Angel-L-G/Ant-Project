package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;

public interface IGuildRepository {
	Guild findById(Integer id);
	Guild save(Guild in);
	Iterable<Guild> findAll();
	void deleteById(Integer id);
	boolean update(Guild in);
	
	boolean giveOwnership(Integer idGuild, Integer idNewOwner);
	boolean removeUser(Integer idGuild, Integer idRemoved);
	List<Usuario> findGuildUsersByGuildId(Integer id);
}
