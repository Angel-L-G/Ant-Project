package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IAdministrativeInfoRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AdministrativeInfoEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AdministrativeInfoMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.AdministrativeInfoJPARepository;

@Service
public class AdministrativeInfoService implements IAdministrativeInfoRepository{
	@Autowired private AdministrativeInfoJPARepository repository;
	private AdministrativeInfoMapper am = new AdministrativeInfoMapper();
	private UsuarioMapper um = new UsuarioMapper();

	@Override
	public AdministrativeInfo findById(Integer id) {
		AdministrativeInfo out = null;

		if (id != null) {
			Optional<AdministrativeInfoEntity> findById = repository.findById(id);

			if (findById.isPresent()) {
				out = am.toDomain(findById.get());
			}
		}

		return out;
	}

	@Override
	public AdministrativeInfo save(AdministrativeInfo in) {
		AdministrativeInfo out = null;

		if (in != null) {
			AdministrativeInfoEntity persistance = am.toPersistance(in);
			persistance.setUsuario(um.toPersistance(in.getUsuario()));
			
			AdministrativeInfoEntity save = repository.save(persistance);

			if (save != null) {
				out = am.toDomain(save);
			}
		}

		return out;
	}

	@Override
	public Iterable<AdministrativeInfo> findAll() {
		Iterable<AdministrativeInfo> list = null;

		List<AdministrativeInfoEntity> findAll = repository.findAll();

		if (findAll != null) {
			List<AdministrativeInfo> aux = new ArrayList<>();
			for (AdministrativeInfoEntity antEntity : findAll) {
				aux.add(am.toDomain(antEntity));
			}
			list = aux;
		}

		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if (id != null) {
			repository.deleteById(id);
		}
	}

	@Override
	public boolean update(AdministrativeInfo in) {
		boolean ok = false;
		
		if (in != null) {
			Optional<AdministrativeInfoEntity> find = repository.findById(in.getId());

			if (find.isPresent()) {
				AdministrativeInfoEntity persistance = am.toPersistance(in);

				find.get().setCreatedAt(persistance.getCreatedAt());
				find.get().setInformacion(persistance.getInformacion());
				find.get().setLastLogin(persistance.getLastLogin());
				find.get().setUpdatedAt(persistance.getUpdatedAt());
				
				repository.save(find.get());
				
				ok = true;
			}
		}

		return ok;
	}

	@Override
	public AdministrativeInfo findByUserId(Integer user_id) {
		AdministrativeInfo out = null;
		
		if(user_id != null) {
			repository.findByUserId(user_id);
		}
		
		return out;
	}

	@Override
	public void updateTimeStamp(Integer userId, Integer option) {
		if(userId != null && option != null) {
			AdministrativeInfoEntity info = repository.findByUserId(userId);
			
			long currentTimeMillis = System.currentTimeMillis();
			 
			switch (option) {
			case 1:
				info.setLastLogin(new Timestamp(currentTimeMillis));
				break;
			case 2:
				info.setUpdatedAt(new Timestamp(currentTimeMillis));
				break;
			default:
				throw new IllegalArgumentException("Unexpected value: " + option);
			}
			
			repository.save(info);
		}
	}
}
