package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IAntRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AntMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.AntJPARepository;

@Service
public class AntService implements IAntRepository {
	@Autowired private AntJPARepository antRepo;
	private AntMapper am = new AntMapper();
	private UsuarioMapper um = new UsuarioMapper();

	@Override
	public Ant findById(Integer id) {
		Ant out = null;

		if (id != null) {
			Optional<AntEntity> findById = antRepo.findById(id);

			if (findById.isPresent()) {
				out = am.toDomain(findById.get());
			}
		}

		return out;
	}

	@Override
	public Ant save(Ant in) {
		Ant out = null;

		if (in != null) {
			AntEntity save = antRepo.save(am.toPersistance(in));

			if (save != null) {
				out = am.toDomain(save);
			}
		}

		return out;
	}

	@Override
	public Iterable<Ant> findAll() {
		Iterable<Ant> list = null;

		List<AntEntity> findAll = antRepo.findAll();

		if (findAll != null) {
			List<Ant> aux = new ArrayList<>();
			for (AntEntity antEntity : findAll) {
				aux.add(am.toDomain(antEntity));
			}
			list = aux;
		}

		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if (id != null) {
			antRepo.deleteById(id);
		}
	}

	@Override
	public boolean update(Ant in) {
		boolean ok = false;
		
		if (in != null) {
			Optional<AntEntity> find = antRepo.findById(in.getId());

			
			if (find.isPresent()) {
				AntEntity persistance = am.toPersistance(in);
				
				find.get().setBiome(persistance.getBiome());
				find.get().setName(persistance.getName());
				find.get().setType(persistance.getType());
				find.get().setDescription(persistance.getDescription());
				find.get().setUsuarios(persistance.getUsuarios());
				find.get().setNests(persistance.getNests());
				
				if(in.getUsuarios() != null) {
					List<UsuarioEntity> list = new ArrayList<UsuarioEntity>();
					for (Usuario domain : in.getUsuarios()) {
						list.add(um.toPersistance(domain));
					}
					find.get().setUsuarios(list);
				}
				
				antRepo.save(find.get());
				
				ok = true;
			}
		}

		return ok;
	}

	@Override
	public Ant findByName(String name) {
		Ant out = null;

		if (name != null) {
			Optional<AntEntity> findById = antRepo.findByName(name);

			if (findById.isPresent()) {
				out = am.toDomain(findById.get());
			}
		}

		return out;
	}

	@Override
	public Ant findByType(String type) {
		Ant out = null;

		if (type != null) {
			Optional<AntEntity> findById = antRepo.findByType(type);

			if (findById.isPresent()) {
				out = am.toDomain(findById.get());
			}
		}

		return out;
	}
}
