package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;

public interface IAntRepository {
	Ant findById(Integer id);
	Ant save(Ant u);
	Iterable<Ant> findAll();
	void deleteById(Integer id);
	boolean update(Ant u);
	public Ant findByName(String name);
	public Ant findByType(String type);
	public Iterable<Ant> findAllById(Integer id);
}
