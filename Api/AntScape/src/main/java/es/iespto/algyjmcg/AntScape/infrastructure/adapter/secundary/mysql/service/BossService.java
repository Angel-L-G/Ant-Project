package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IBossRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.BossMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.BossJPARepository;

@Service
public class BossService implements IBossRepository{
	@Autowired private BossJPARepository bossRepo;
	private BossMapper bm = new BossMapper();

	@Override
	public Boss findById(Integer id) {
		Boss out = null;
		
		if(id != null) {
			Optional<BossEntity> findById = bossRepo.findById(id);
			
			if(findById.isPresent()) {
				out = bm.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public Boss save(Boss in) {
		Boss out = null;
		
		if(in != null) {
			BossEntity save = bossRepo.save(bm.toPersistance(in));
			
			if(save != null) {
				out = bm.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<Boss> findAll() {
		Iterable<Boss> list = null;
		
		List<BossEntity> findAll = bossRepo.findAll();
		
		if(findAll != null) {
			List<Boss> aux = new ArrayList<>();
			for (BossEntity bossEntity : findAll) {
				aux.add(bm.toDomain(bossEntity));
			}
			list = aux;
		}
		
		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if(id != null) {
			bossRepo.deleteById(id);
		}
	}

	@Override
	public boolean update(Boss u) {
		
		
		
		return false;
	}

	@Override
	public Boss findByName(String name) {
		Boss out = null;
		
		if(name != null) {
			Optional<BossEntity> findById = bossRepo.findByName(name);
			
			if(findById.isPresent()) {
				out = bm.toDomain(findById.get());
			}
		}
		
		return out;
	}

}
