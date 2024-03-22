package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.GuildLevel;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IGuildLevelRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.GuildLevelMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.GuildLevelJPARepository;

@Service
public class GuildLevelService implements IGuildLevelRepository{
	@Autowired private GuildLevelJPARepository repository;
	private GuildLevelMapper glm = new GuildLevelMapper();

	@Override
	public GuildLevel findById(Integer id) {
		GuildLevel out = null;
		
		if(id != null) {
			Optional<GuildLevelEntity> findById = repository.findById(id);
			
			if(findById.isPresent()) {
				out = glm.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public GuildLevel save(GuildLevel in) {
		GuildLevel out = null;
		
		if(in != null) {
			GuildLevelEntity save = repository.save(glm.toPersistance(in));
			
			if(save != null) {
				out = glm.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<GuildLevel> findAll() {
		Iterable<GuildLevel> list = null;
		
		List<GuildLevelEntity> findAll = repository.findAll();
		
		if(findAll != null) {
			List<GuildLevel> aux = new ArrayList<>();
			for (GuildLevelEntity bossEntity : findAll) {
				aux.add(glm.toDomain(bossEntity));
			}
			list = aux;
		}
		
		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if(id != null) {
			repository.deleteById(id);
		}
	}

	@Override
	public boolean update(GuildLevel in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<GuildLevelEntity> find = repository.findById(in.getId());
			
			if(find.isPresent()) {
				find.get().setName(in.getName());
				find.get().setCost(in.getCost());
				find.get().setEfect(in.getEfect());
				find.get().setLevel(in.getLevel());
				
				repository.save(find.get());
				
				ok = true;
			}
		}
		
		return ok;
	}

}
