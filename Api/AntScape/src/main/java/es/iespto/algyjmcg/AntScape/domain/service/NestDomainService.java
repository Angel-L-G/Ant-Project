package es.iespto.algyjmcg.AntScape.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.INestRepository;

@Service
public class NestDomainService implements INestService{

	@Autowired private INestRepository service;

	@Override
	public Nest findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public Nest save(Nest in) {
		return service.save(in);
	}

	@Override
	public Iterable<Nest> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
		
	}

	@Override
	public boolean update(Nest in) {
		return service.update(in);
	}

	@Override
	public List<Nest> findAllById(Integer id) {
		return service.findAllById(id);
	}
}
