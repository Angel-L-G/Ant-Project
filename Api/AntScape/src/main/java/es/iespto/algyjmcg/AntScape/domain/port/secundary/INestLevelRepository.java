package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;

public interface INestLevelRepository {
	NestLevel findById(Integer id);
	NestLevel save(NestLevel u);
	Iterable<NestLevel> findAll();
	void deleteById(Integer id);
	boolean update(NestLevel u);
	
	public NestLevel findByName(String name);
}