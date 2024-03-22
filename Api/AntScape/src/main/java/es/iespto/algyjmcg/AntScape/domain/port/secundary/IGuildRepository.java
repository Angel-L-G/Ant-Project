package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;

public interface IGuildRepository {
	Guild findById(Integer id);
	Guild save(Guild in);
	Iterable<Guild> findAll();
	void deleteById(Integer id);
	boolean update(Guild in);
}
