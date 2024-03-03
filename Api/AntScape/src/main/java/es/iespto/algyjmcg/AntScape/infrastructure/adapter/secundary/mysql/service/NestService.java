package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.INestRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.NestJPARepository;

@Service
public class NestService implements INestRepository{
	@Autowired private NestJPARepository nestRepo;
	private NestMapper nm = new NestMapper();

	@Override
	public Nest findById(Integer id) {
		Nest out = null;
		
		if(id != null) {
			Optional<NestEntity> findById = nestRepo.findById(id);
			
			if(findById.isPresent()) {
				out = nm.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public Nest save(Nest in) {
		Nest out = null;
		
		if(in != null) {
			NestEntity save = nestRepo.save(nm.toPersistance(in));
			
			if(save != null) {
				out = nm.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<Nest> findAll() {
		Iterable<Nest> list = null;
		
		List<NestEntity> findAll = nestRepo.findAll();
		
		if(findAll != null) {
			List<Nest> aux = new ArrayList<>();
			for (NestEntity nestEntity : findAll) {
				aux.add(nm.toDomain(nestEntity));
			}
			list = aux;
		}
		
		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if(id != null) {
			Optional<NestEntity> findById = nestRepo.findById(id);
			if(findById.isPresent()) {
				findById.get().setDeleted(true);
			}
		}
	}

	@Override
	public boolean update(Nest in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<NestEntity> findByName = nestRepo.findById(in.getId());
			
			if(findByName.isPresent()) {
				NestEntity persistance = nm.toPersistance(in);
				
				//findByName.get().setAntNests(persistance.getAntNests());
				//findByName.get().setAntType(persistance.getAntType());
				//findByName.get().setMap(persistance.getMap());
				
				ok = true;
			}
		}
		
		return ok;
	}
	
	@Override
	public List<Nest> findAllById(Integer id) {
		List<Nest> out = null;

		if (id != null) {
			Iterable<NestEntity> findAllOwn = nestRepo.findAllOwn(id);

			if (findAllOwn != null) {
				out = new ArrayList<Nest>();
				
				for (NestEntity e : findAllOwn) {
					out.add(nm.toDomain(e));
				}
			}
		}

		return out;
	}

}
