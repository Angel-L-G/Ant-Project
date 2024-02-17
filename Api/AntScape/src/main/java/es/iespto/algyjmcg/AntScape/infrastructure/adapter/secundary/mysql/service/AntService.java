package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IAntRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AntMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.AntJPARepository;

@Service
public class AntService implements IAntRepository {
	@Autowired private AntJPARepository antRepo;
	private AntMapper am = new AntMapper();

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
			Optional<AntEntity> findByName = antRepo.findByName(in.getName());

			if (findByName.isPresent()) {
				AntEntity persistance = am.toPersistance(in);
				
				findByName.get().setAntNests(persistance.getAntNests());
				findByName.get().setBiome(persistance.getBiome());
				findByName.get().setCost(persistance.getCost());
				findByName.get().setDamage(persistance.getDamage());
				findByName.get().setLife(persistance.getLife());
				findByName.get().setName(persistance.getName());
				findByName.get().setWorking(persistance.getWorking());
				findByName.get().setType(persistance.getType());
				
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

	@Override
	public Iterable<Ant> findAllById(Integer id) {
		Iterable<Ant> out = null;

		if (id != null) {
			/*List<Integer> aux = new ArrayList<Integer>();
			aux.add(id);
			
			Optional<AntEntity> findById = antRepo.findAllById(aux);

			if (findById.isPresent()) {
				out = am.toDomain(findById.get());
			}*/
		}

		return out;
	}

}
