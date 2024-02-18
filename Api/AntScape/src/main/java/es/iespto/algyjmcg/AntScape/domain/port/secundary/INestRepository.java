package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;

public interface INestRepository {
	Nest findById(Integer id);
	Nest save(Nest u);
	Iterable<Nest> findAll();
	void deleteById(Integer id);
	boolean update(Nest u);
	
	public List<Nest> findAllById(Integer id);
}
