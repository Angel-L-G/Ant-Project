package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IGuildRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.GuildMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.GuildJPARepository;

@Service
public class GuildService implements IGuildRepository{
	@Autowired private GuildJPARepository repository;
	private GuildMapper gm = new GuildMapper();
	private UsuarioMapper um = new UsuarioMapper();

	@Override
	public Guild findById(Integer id) {
		Guild out = null;
		
		if(id != null) {
			Optional<GuildEntity> findById = repository.findById(id);
			
			if(findById.isPresent()) {
				out = gm.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public Guild save(Guild in) {
		Guild out = null;
		
		if(in != null) {
			GuildEntity save = repository.save(gm.toPersistance(in));
			
			if(save != null) {
				out = gm.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<Guild> findAll() {
		Iterable<Guild> list = null;
		
		List<GuildEntity> findAll = repository.findAll();
		
		if(findAll != null) {
			List<Guild> aux = new ArrayList<>();
			for (GuildEntity bossEntity : findAll) {
				aux.add(gm.toDomain(bossEntity));
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
	public boolean update(Guild in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<GuildEntity> findByName = repository.findById(in.getId());
			
			if(findByName.isPresent()) {
				findByName.get().setDefenseNumber(in.getDefenseNumber());
				findByName.get().setDefenseRange(in.getDefenseRange());
				findByName.get().setName(in.getName());
				findByName.get().setQuantity(in.getQuantity());
				findByName.get().setTrophys(in.getTrophys());
				
				for (Usuario domain : in.getUsuarios()) {
					findByName.get().getUsuarios().add(um.toPersistance(domain));
				}
				
				ok = true;
			}
		}
		
		return ok;
	}

}
