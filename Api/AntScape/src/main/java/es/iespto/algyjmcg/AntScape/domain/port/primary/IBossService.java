package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;

public interface IBossService {
	Boss findById(Integer id);
	Boss save(Boss u);
	Iterable<Boss> findAll();
	void deleteById(Integer id);
	boolean update(Boss u);
	public Boss findByName(String name);
}
