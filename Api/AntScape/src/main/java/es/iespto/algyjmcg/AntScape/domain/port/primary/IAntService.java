package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;

public interface IAntService {
	Ant findById(Integer id);
	Ant save(Ant u);
	Iterable<Ant> findAll();
	void deleteById(Integer id);
	boolean update(Ant u);
	
	public Ant findByName(String name);
	public Ant findByType(String type);
}
