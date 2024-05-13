package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;

public interface INestLevelService {
	NestLevel findById(Integer id);
	NestLevel save(NestLevel u);
	Iterable<NestLevel> findAll();
	void deleteById(Integer id);
	boolean update(NestLevel u);

	public NestLevel findByIdRel(Integer id);
}
