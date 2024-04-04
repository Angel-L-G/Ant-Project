package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;

public interface IGuildLevelRepository {
	GuildLevel findById(Integer id);
	GuildLevel save(GuildLevel u);
	Iterable<GuildLevel> findAll();
	void deleteById(Integer id);
	boolean update(GuildLevel u);
}
