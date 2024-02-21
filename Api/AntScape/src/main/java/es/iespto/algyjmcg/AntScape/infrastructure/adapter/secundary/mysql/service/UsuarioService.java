package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IUsuarioRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.UsuarioJPARepository;

@Service
public class UsuarioService implements IUsuarioRepository{
	@Autowired private UsuarioJPARepository usuarioRepo;
	private UsuarioMapper um = new UsuarioMapper();
	
	@Override
	public Usuario findById(Integer id) {
		Usuario out = null;
		
		if(id != null) {
			Optional<UsuarioEntity> findById = usuarioRepo.findById(id);
			
			if(findById.isPresent()) {
				out = um.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public Usuario save(Usuario in) {
		Usuario out = null;
		
		if(in != null) {
			UsuarioEntity persistance = um.toPersistance(in);
			
			UsuarioEntity save = usuarioRepo.save(persistance);
			
			if(save != null) {
				out = um.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<Usuario> findAll() {
		Iterable<Usuario> list = null;
		
		List<UsuarioEntity> findAll = usuarioRepo.findAll();
		
		if(findAll != null) {
			List<Usuario> aux = new ArrayList<>();
			for (UsuarioEntity userEntity : findAll) {
				aux.add(um.toDomain(userEntity));
			}
			list = aux;
		}
		
		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if(id != null) {
			usuarioRepo.deleteById(id);
		}
	}

	@Override
	public boolean update(Usuario in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<UsuarioEntity> findByName = usuarioRepo.findById(in.getId());
			
			if(findByName.isPresent()) {
				UsuarioEntity persistance = um.toPersistance(in);

				findByName.get().setEmail(persistance.getEmail());
				findByName.get().setPassword(persistance.getPassword());
				findByName.get().setRol(persistance.getRol());
				findByName.get().setName(persistance.getName());
				
				findByName.get().setNests(persistance.getNests());
				findByName.get().setAnts(persistance.getAnts());
				
				ok = true;
			}
		}
		
		return ok;
	}

	@Override
	public Usuario findByName(String n) {
		Usuario out = null;
		
		if(n != null) {
			Optional<UsuarioEntity> findById = usuarioRepo.findByName(n);
			
			if(findById.isPresent()) {
				out = um.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public Usuario findByEmail(String e) {
		Usuario out = null;
		System.out.println("Service: " + e);
		if(e != null) {
			Optional<UsuarioEntity> findById = usuarioRepo.findByEmail(e);
			System.out.println(findById.get());
			
			if(findById.isPresent()) {
				out = um.toDomain(findById.get());
			}
		}
		
		return out;
	}
	
	@Override
	public List<Usuario> findFriends(String name){
		if(name != null) {
			Optional<UsuarioEntity> findByName = usuarioRepo.findByName(name);
			
			if(findByName.isPresent() && findByName.get().getAmigos() != null) {
				
				List<Usuario> list = new ArrayList<Usuario>();
				for (UsuarioEntity u : findByName.get().getAmigos()) {
					list.add(um.toDomain(u));
				}
				
				return list;
			}
		}
		return null;
	}
	
	@Override
	public boolean addFriend(String name, String nameFriend) {
		boolean ok = false;
		if(name != null && nameFriend != null) {
			Optional<UsuarioEntity> user = usuarioRepo.findByName(name);
			Optional<UsuarioEntity> friend = usuarioRepo.findByName(nameFriend);
			
			if(user.isPresent() && friend.isPresent()) {
				user.get().getAmigos().add(friend.get());
				friend.get().getAmigos().add(user.get());
				
				usuarioRepo.save(user.get());
				usuarioRepo.save(friend.get());
				ok = true;
			}
		}
		return ok;
	}
	
	public boolean verify(Integer id) {
		boolean ok = false;
		
		if(id != null) {
			Optional<UsuarioEntity> findByEmail = usuarioRepo.findById(id);
			
			if(findByEmail != null) {
				findByEmail.get().setActive(true);
				
				UsuarioEntity save = usuarioRepo.save(findByEmail.get());
				
				if(save != null) {
					ok = true;
				}
			}
		}
		
		return ok;
	}
	
	public boolean ban(Integer id) {
		boolean ok = false;
		
		if(id != null) {
			Optional<UsuarioEntity> findByEmail = usuarioRepo.findById(id);
			
			if(findByEmail != null) {
				findByEmail.get().setBanned(true);
				
				UsuarioEntity save = usuarioRepo.save(findByEmail.get());
				
				if(save != null) {
					ok = true;
				}
			}
		}
		
		return ok;
	}
	
	public boolean unBan(Integer id) {
		boolean ok = false;
		
		if(id != null) {
			Optional<UsuarioEntity> findByEmail = usuarioRepo.findById(id);
			
			if(findByEmail != null) {
				findByEmail.get().setBanned(false);
				
				UsuarioEntity save = usuarioRepo.save(findByEmail.get());
				
				if(save != null) {
					ok = true;
				}
			}
		}
		
		return ok;
	}
}
