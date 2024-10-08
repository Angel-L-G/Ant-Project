package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IUsuarioRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.ChatEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.AntMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.ChatMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.GuildMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.NestMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.UsuarioJPARepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService implements IUsuarioRepository{
	@Autowired private UsuarioJPARepository usuarioRepo;
	private UsuarioMapper um = new UsuarioMapper();
	private AntMapper am = new AntMapper();
	private NestMapper nm = new NestMapper();
	private GuildMapper gm = new GuildMapper();
	private ChatMapper cm = new ChatMapper();
	
	@Override
	public Usuario findById(Integer id) {
		Usuario out = null;
		
		if(id != null) {
			Optional<UsuarioEntity> findById = usuarioRepo.findById(id);
			
			if(findById.isPresent()) {
				out = um.toDomain(findById.get());
				
				if(findById.get().getNests() != null && findById.get().getNests().size() != 0) {
					List<Nest> lista = new ArrayList<Nest>();
					for (NestEntity entity : findById.get().getNests()) {
						lista.add(nm.toDomain(entity));
					}
					out.setNests(lista);
				}
				
				if(findById.get().getChats() != null && findById.get().getChats().size() != 0) {
					List<Chat> lista = new ArrayList<Chat>();
					for (ChatEntity entity : findById.get().getChats()) {
						lista.add(cm.toDomain(entity));
					}
					out.setChats(lista);
				}
			}
		}
		
		return out;
	}

	@Transactional
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
	@Transactional
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
				findByName.get().setEggs(persistance.getEggs());
				findByName.get().setGoldenEggs(persistance.getGoldenEggs());
				findByName.get().setImg(persistance.getImg());

				findByName.get().setTotalMoneyGenerated(persistance.getTotalMoneyGenerated());
				
				if(in.getGuild() != null) {
					findByName.get().setGuild(gm.toPersistance(in.getGuild()));
				}
				
				if(in.getNests() != null ) {
					for (Nest nest : in.getNests()) {
						findByName.get().getNests().add(nm.toPersistance(nest));
					}
				}
				
				if(in.getAnts() != null) {
					for (Ant ant : in.getAnts()) {
						findByName.get().getAnts().add(am.toPersistance(ant));
					}
				}
				
				if(in.getChats() != null) {
					List<ChatEntity> lista = new ArrayList<ChatEntity>();
					for (Chat domain : in.getChats()) {
						lista.add(cm.toPersistance(domain));
					}
					findByName.get().setChats(lista);
				}
				
				usuarioRepo.save(findByName.get());
				
				ok = true;
			}
		}
		
		return ok;
	}
	
	@Override
	public boolean updateGuild(Usuario in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<UsuarioEntity> find = usuarioRepo.findById(in.getId());
			
			if(find.isPresent()) {
				if(in.getGuild() != null) {
					find.get().setGuild(gm.toPersistance(in.getGuild()));
				}else {
					find.get().setGuild(null);
				}
				
				usuarioRepo.save(find.get());
				
				ok = true;
			}
		}
		
		return ok;
	}
	
	@Override
	public boolean updateChats(Usuario in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<UsuarioEntity> find = usuarioRepo.findById(in.getId());
			
			if(find.isPresent()) {
				if(in.getChats() != null) {
					List<ChatEntity> lista = new ArrayList<ChatEntity>();
					for (Chat domain : in.getChats()) {
						lista.add(cm.toPersistance(domain));
					}
					find.get().setChats(lista);
				} else {
					find.get().setChats(null);
				}
				
				usuarioRepo.save(find.get());
				
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

	@Override
	public boolean addFriend(String name, String nameFriend) {
		boolean ok = false;
		if(name != null && nameFriend != null) {
			Optional<UsuarioEntity> user = usuarioRepo.findByName(name);
			Optional<UsuarioEntity> friend = usuarioRepo.findByName(nameFriend);
			
			if(user.isPresent() && friend.isPresent()) {
				user.get().getFriends().add(friend.get());
				friend.get().getFriends().add(user.get());
				
				usuarioRepo.save(user.get());
				usuarioRepo.save(friend.get());
				ok = true;
			}
		}
		return ok;
	}

	@Override
	public boolean removeFriend(String name, String nameFriend) {
		boolean ok = false;
		if(name != null && nameFriend != null) {
			Optional<UsuarioEntity> user = usuarioRepo.findByName(name);
			Optional<UsuarioEntity> friend = usuarioRepo.findByName(nameFriend);
			
			if(user.isPresent() && friend.isPresent()) {
				user.get().getFriends().remove(friend.get());
				friend.get().getFriends().remove(user.get());
				
				usuarioRepo.save(user.get());
				usuarioRepo.save(friend.get());
				ok = true;
			}
		}
		return ok;
	}
	
	@Override
	public List<Usuario> findFriends(Integer id) {
		List<Usuario> out = null;
		
		if(id != null) {
			Optional<UsuarioEntity> findById = usuarioRepo.findById(id);
			
			if(findById.isPresent()) {
				List<Usuario> aux = new ArrayList<>();
				for (UsuarioEntity userEntity : findById.get().getFriends()) {
					aux.add(um.toDomain(userEntity));
				}
				out = aux;
			}
		}
		
		return out;
	}

	@Override
	public List<Usuario> findBloqued(Integer id) {
		List<Usuario> out = null;
		
		if(id != null) {
			Optional<UsuarioEntity> findById = usuarioRepo.findById(id);
			
			if(findById.isPresent()) {
				List<Usuario> aux = new ArrayList<>();
				for (UsuarioEntity userEntity : findById.get().getBloqued()) {
					aux.add(um.toDomain(userEntity));
				}
				out = aux;
			}
		}
		
		return out;
	}

	@Override
	public boolean block(String name, String nameFriend) {
		boolean ok = false;
		
		if(name != null && nameFriend != null) {
			Optional<UsuarioEntity> user = usuarioRepo.findByName(name);
			Optional<UsuarioEntity> bloqued = usuarioRepo.findByName(nameFriend);
			
			if(user.isPresent() && bloqued.isPresent()) {
				user.get().getBloqued().add(bloqued.get());
				bloqued.get().getBloqued().add(user.get());
				
				usuarioRepo.save(user.get());
				usuarioRepo.save(bloqued.get());
				
				ok = true;
			}
		}
		
		return ok;
	}

	@Override
	public boolean unblock(String name, String nameFriend) {
		boolean ok = false;
		if(name != null && nameFriend != null) {
			Optional<UsuarioEntity> user = usuarioRepo.findByName(name);
			Optional<UsuarioEntity> bloqued = usuarioRepo.findByName(nameFriend);
			
			if(user.isPresent() && bloqued.isPresent()) {
				user.get().getBloqued().remove(bloqued.get());
				bloqued.get().getBloqued().remove(user.get());
				
				usuarioRepo.save(user.get());
				usuarioRepo.save(bloqued.get());
				
				ok = true;
			}
		}
		return ok;
	}

	@Override
	public Guild findUserGuild(Integer id) {
		Guild out = null;
		
		if(id != null) {
			Optional<UsuarioEntity> find = usuarioRepo.findById(id);
			
			if(find.isPresent()) {
				out = gm.toDomain(find.get().getGuild());
			}
		}
		
		return out;
	}
}
