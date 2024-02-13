package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;

public interface INestService {
	Nest findById(Integer id);
	Nest save(Nest u);
	Iterable<Nest> findAll();
	void deleteById(Integer id);
	boolean update(Nest u);
}
