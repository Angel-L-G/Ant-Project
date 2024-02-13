package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IBossRepository;

@Service
public class BossService implements IBossRepository{

	@Override
	public Boss findById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boss save(Boss u) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Iterable<Boss> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteById(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean update(Boss u) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Boss findByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

}
