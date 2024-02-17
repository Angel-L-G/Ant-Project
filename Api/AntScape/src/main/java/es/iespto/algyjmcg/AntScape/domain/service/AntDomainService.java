package es.iespto.algyjmcg.AntScape.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAntService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IAntRepository;

@Service
public class AntDomainService implements IAntService{
	@Autowired private IAntRepository service;

	@Override
	public Ant findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public Ant save(Ant in) {
		return service.save(in);
	}

	@Override
	public Iterable<Ant> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
		
	}

	@Override
	public boolean update(Ant in) {
		return service.update(in);
	}

	@Override
	public Ant findByName(String name) {
		return service.findByName(name);
	}

	@Override
	public Ant findByType(String type) {
		return service.findByType(type);
	}

	@Override
	public Iterable<Ant> findAllById(Integer id) {
		return service.findAllById(id);
	}
	
}
