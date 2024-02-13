package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;

public interface IBossRepository {
	Boss findById(Integer id);
	Boss save(Boss u);
	Iterable<Boss> findAll();
	void deleteById(Integer id);
	boolean update(Boss u);
	public Boss findByName(String name);
}
