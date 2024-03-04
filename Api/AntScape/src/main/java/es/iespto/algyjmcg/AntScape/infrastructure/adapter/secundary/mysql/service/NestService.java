package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.NestLevel;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.INestRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AntMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestLevelMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.NestJPARepository;

@Service
public class NestService implements INestRepository{
	@Autowired private NestJPARepository nestRepo;
	private NestMapper nm = new NestMapper();
	private AntMapper am = new AntMapper();
	private NestLevelMapper nlm = new NestLevelMapper();
	private UsuarioMapper um = new UsuarioMapper();

	@Override
	public Nest findById(Integer id) {
		Nest out = null;
		
		if(id != null) {
			Optional<NestEntity> findById = nestRepo.findById(id);
			
			if(findById.isPresent()) {
				out = nm.toDomain(findById.get());
				
				if (findById.get().getAnt() != null) {
					out.setAnt(am.toDomain(findById.get().getAnt()));
				}
				
				if (findById.get().getNestLevels() != null) {
					List<NestLevel> list = new ArrayList<>();
					
					for (NestLevelEntity entity : findById.get().getNestLevels()) {
						list.add(nlm.toDomain(entity));
					}
					
					out.setNestLevels(list);
				}
				
				if (findById.get().getUsuario() != null) {
					out.setUsuario(um.toDomain(findById.get().getUsuario()));
				}
			}
		}
		
		return out;
	}

	@Override
	public Nest save(Nest in) {
		Nest out = null;
		
		if(in != null) {
			//Casteo A Persistence
			NestEntity persistance = nm.toPersistance(in);
			
			if (in.getAnt() != null) {
				persistance.setAnt(am.toPersistance(in.getAnt()));
			}
			
			if (in.getNestLevels() != null) {
				List<NestLevelEntity> list = new ArrayList<>();
				
				for (NestLevel entity : in.getNestLevels()) {
					list.add(nlm.toPersistance(entity));
				}
				
				persistance.setNestLevels(list);
			}
			
			if (in.getUsuario() != null) {
				persistance.setUsuario(um.toPersistance(in.getUsuario()));
			}
			
			NestEntity save = nestRepo.save(persistance);
			
			//Casteo a Domain
			if(save != null) {
				out = nm.toDomain(save);
				
				if (save.getAnt() != null) {
					out.setAnt(am.toDomain(save.getAnt()));
				}
				
				if (save.getNestLevels() != null) {
					List<NestLevel> list = new ArrayList<>();
					
					for (NestLevelEntity entity : save.getNestLevels()) {
						list.add(nlm.toDomain(entity));
					}
					
					out.setNestLevels(list);
				}
				
				if (save.getUsuario() != null) {
					out.setUsuario(um.toDomain(save.getUsuario()));
				}
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
				Nest out = nm.toDomain(nestEntity);
				
				if (nestEntity.getAnt() != null) {
					out.setAnt(am.toDomain(nestEntity.getAnt()));
				}
				
				if (nestEntity.getNestLevels() != null) {
					List<NestLevel> NestLevellist = new ArrayList<>();
					
					for (NestLevelEntity entity : nestEntity.getNestLevels()) {
						NestLevellist.add(nlm.toDomain(entity));
					}
					
					out.setNestLevels(NestLevellist);
				}
				
				if (nestEntity.getUsuario() != null) {
					out.setUsuario(um.toDomain(nestEntity.getUsuario()));
				}
				
				aux.add(out);
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
		List<Nest> list = null;

		if (id != null) {
			Iterable<NestEntity> findAllOwn = nestRepo.findAllOwn(id);

			if (findAllOwn != null) {
				list = new ArrayList<Nest>();
				
				for (NestEntity entity : findAllOwn) {
					Nest out = nm.toDomain(entity);
					
					if (entity.getAnt() != null) {
						out.setAnt(am.toDomain(entity.getAnt()));
					}
					
					if (entity.getNestLevels() != null) {
						List<NestLevel> NestLevellist = new ArrayList<>();
						
						for (NestLevelEntity NestLevelentity : entity.getNestLevels()) {
							NestLevellist.add(nlm.toDomain(NestLevelentity));
						}
						
						out.setNestLevels(NestLevellist);
					}
					
					if (entity.getUsuario() != null) {
						out.setUsuario(um.toDomain(entity.getUsuario()));
					}
					
					list.add(out);
				}
			}
		}

		return list;
	}

}
