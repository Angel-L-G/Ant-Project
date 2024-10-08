package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.INestLevelRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestLevelMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.NestLevelJPARepository;

@Service
public class NestLevelService implements INestLevelRepository{
	@Autowired private NestLevelJPARepository mainRepository;
	private NestLevelMapper mainMapper = new NestLevelMapper();
	
	private NestMapper nestMapper = new NestMapper();

	@Override
	public NestLevel findById(Integer id) {
		NestLevel out = null;
		
		if(id != null) {
			Optional<NestLevelEntity> findById = mainRepository.findById(id);
			
			if(findById.isPresent()) {
				out = mainMapper.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public NestLevel save(NestLevel in) {
		NestLevel out = null;
		
		if(in != null) {
			NestLevelEntity persistance = mainMapper.toPersistance(in);
			
			NestEntity nest = nestMapper.toPersistance(in.getNest());
			
			persistance.setNest(nest);
			
			NestLevelEntity save = mainRepository.save(persistance);
			
			if(save != null) {
				out = mainMapper.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<NestLevel> findAll() {
		Iterable<NestLevel> list = null;
		
		List<NestLevelEntity> findAll = mainRepository.findAll();
		
		if(findAll != null) {
			List<NestLevel> aux = new ArrayList<>();
			for (NestLevelEntity entity : findAll) {
				aux.add(mainMapper.toDomain(entity));
			}
			list = aux;
		}
		
		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if(id != null) {
			Optional<NestLevelEntity> findById = mainRepository.findById(id);
			if(findById.isPresent()) {
				mainRepository.delete(findById.get());
			}
		}
	}

	@Override
	public boolean update(NestLevel in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<NestLevelEntity> findByName = mainRepository.findById(in.getId());
			
			if(findByName.isPresent()) {
				NestLevelEntity persistance = mainMapper.toPersistance(in);
				
				NestLevelEntity e = findByName.get();
				
				e.setCost(persistance.getCost());
				e.setLevel(persistance.getLevel());
				e.setMultiplier(persistance.getMultiplier());
				e.setName(persistance.getName());
				e.setProduction(persistance.getProduction());
				
				mainRepository.save(e);
				
				ok = true;
			}
		}
		
		return ok;
	}

	@Override
	public NestLevel findByIdRel(Integer id) {
		NestLevel out = null;
		
		if(id != null) {
			Optional<NestLevelEntity> findById = mainRepository.findById(id);
			
			if(findById.isPresent()) {
				out = mainMapper.toDomain(findById.get());
				
				out.setNest(nestMapper.toDomain(findById.get().getNest()));
			}
		}
		
		return out;
	}
}
