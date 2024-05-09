package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IGuildRepository;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IUsuarioRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildLevelEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.GuildMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.GuildJPARepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.GuildLevelJPARepository;

@Service
public class GuildService implements IGuildRepository{
	@Autowired private GuildJPARepository repository;
	@Autowired private IUsuarioRepository userService;
	@Autowired private GuildLevelJPARepository guildLevelRepository;
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
			GuildEntity persistance = gm.toPersistance(in);
			
			GuildEntity save = repository.save(persistance);
			
			save = generateGuildLevels(save);
			
			GuildEntity saved = repository.save(persistance);
			
			if(saved != null) {
				out = gm.toDomain(saved);
			}
		}
		
		return out;
	}
	
	private GuildEntity generateGuildLevels(GuildEntity in) {
		GuildLevelEntity barracks = new GuildLevelEntity();
		
		barracks.setCost(10.0);
		barracks.setEfect("Higher chances of wining");
		barracks.setLevel(0);
		barracks.setName("Barracks");
		barracks.setGuild(in);
		
		guildLevelRepository.save(barracks);
		
		GuildLevelEntity defenses = new GuildLevelEntity();
		
		defenses.setCost(25.0);
		defenses.setEfect("Higher chances of defending");
		defenses.setLevel(0);
		defenses.setName("Defenses");
		defenses.setGuild(in);
		
		guildLevelRepository.save(defenses);
		
		GuildLevelEntity foodChamerbs = new GuildLevelEntity();
		
		foodChamerbs.setCost(65.0);
		foodChamerbs.setEfect("More Resources Robbed");
		foodChamerbs.setLevel(0);
		foodChamerbs.setName("Food Chamerbs");
		foodChamerbs.setGuild(in);
		
		guildLevelRepository.save(foodChamerbs);
		
		return in;
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
				findByName.get().setGuildImage(in.getGuildImage());
				
				for (Usuario domain : in.getUsuarios()) {
					findByName.get().getUsuarios().add(um.toPersistance(domain));
				}
				
				GuildEntity save = repository.save(findByName.get());
				
				if(save != null) {
					ok = true;
				}
			}
		}
		
		return ok;
	}

	@Override
	public boolean giveOwnership(Integer idGuild, Integer idNewOwner) {
		boolean ok = false;
		
		if(idGuild != null && idNewOwner != null) {
			Usuario newOwner = userService.findById(idNewOwner); 
			Optional<GuildEntity> guild = repository.findById(idGuild);
		
			if(newOwner != null && guild.isPresent()) {
				guild.get().setLeader(idNewOwner);
				
				GuildEntity save = repository.save(guild.get());
				
				if(save != null) {
					ok = true;
				}
			}
		}
		
		return ok;
	}

	@Override
	public boolean removeUser(Integer idGuild, Integer idRemoved) {
		boolean ok = false;
		
		if(idGuild != null && idRemoved != null) {
			Usuario removed = userService.findById(idRemoved); 
			Optional<GuildEntity> guild = repository.findById(idGuild);
			
			if(removed != null && guild.isPresent()) {
				UsuarioEntity removedEntity = um.toPersistance(removed);
				
				guild.get().getUsuarios().remove(removedEntity);
				repository.save(guild.get());
			
				removed.setGuild(null);
				userService.save(removed);
			}
		}
		
		return ok;
	}
	
	@Override
	public List<Usuario> findGuildUsersByGuildId(Integer id){
		Optional<GuildEntity> guild = repository.findById(id);
		List<Usuario> out = null;
		
		if(guild.isPresent()) {
			List<UsuarioEntity> usuarios = guild.get().getUsuarios();
			
			out = new ArrayList<>();
			
			for (UsuarioEntity u : usuarios) {
				out.add(um.toDomain(u));
			}
		}
		
		return out;
	}
}