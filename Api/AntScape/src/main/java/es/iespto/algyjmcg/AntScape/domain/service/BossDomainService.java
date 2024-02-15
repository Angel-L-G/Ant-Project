package es.iespto.algyjmcg.AntScape.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IBossService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IBossRepository;

@Service
public class BossDomainService implements IBossService{

	@Autowired private IBossRepository service;

	@Override
	public Boss findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public Boss save(Boss in) {
		return service.save(in);
	}

	@Override
	public Iterable<Boss> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
		
	}

	@Override
	public boolean update(Boss in) {
		return service.update(in);
	}

	@Override
	public Boss findByName(String name) {
		return service.findByName(name);
	}

}
