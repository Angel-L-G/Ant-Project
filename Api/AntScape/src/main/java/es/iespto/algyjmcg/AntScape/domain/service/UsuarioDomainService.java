package es.iespto.algyjmcg.AntScape.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Guild;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IUsuarioService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IUsuarioRepository;

@Service
public class UsuarioDomainService implements IUsuarioService {
	@Autowired
	private IUsuarioRepository service;

	@Override
	public Usuario findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public Usuario save(Usuario in) {
		return service.save(in);
	}

	@Override
	public Iterable<Usuario> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);

	}

	@Override
	public boolean update(Usuario in) {
		return service.update(in);
	}

	@Override
	public Usuario findByName(String name) {
		return service.findByName(name);
	}

	@Override
	public Usuario findByEmail(String e) {
		return service.findByEmail(e);
	}

	@Override
	public List<Usuario> findFriends(Integer id){
		return service.findFriends(id);
	}
	
	@Override
	public boolean addFriend(String name, String nameFriend) {
		return service.addFriend(name, nameFriend);
	}

	@Override
	public boolean verify(Integer id) {
		return service.verify(id);
	}

	@Override
	public boolean ban(Integer id) {
		return service.ban(id);
	}

	@Override
	public boolean unBan(Integer id) {
		return service.unBan(id);
	}

	@Override
	public boolean removeFriend(String name, String nameFriend) {
		return service.removeFriend(name, nameFriend);
	}

	@Override
	public List<Usuario> findBloqued(Integer id) {
		return service.findBloqued(id);
	}

	@Override
	public boolean block(String name, String nameFriend) {
		return service.block(name, nameFriend);
	}

	@Override
	public boolean unblock(String name, String nameFriend) {
		return service.unblock(name, nameFriend);
	}

	@Override
	public boolean updateGuild(Usuario in) {
		return service.updateGuild(in);
	}

	@Override
	public Guild findUserGuild(Integer id) {
		return service.findUserGuild(id);
	}

}
