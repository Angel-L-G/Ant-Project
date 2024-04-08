package es.iespto.algyjmcg.AntScape.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.port.primary.INestLevelService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.INestLevelRepository;

@Service
public class NestLevelDomainService implements INestLevelService{
	@Autowired private INestLevelRepository service;

	@Override
	public NestLevel findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public NestLevel save(NestLevel in) {
		return service.save(in);
	}

	@Override
	public Iterable<NestLevel> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
		
	}

	@Override
	public boolean update(NestLevel in) {
		return service.update(in);
	}

	@Override
	public NestLevel findByIdRel(Integer id) {
		return service.findByIdRel(id);
	}
}
