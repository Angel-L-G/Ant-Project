package es.iespto.algyjmcg.AntScape.domain.port.primary;

import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;

public interface IUsuarioService {
	Usuario findById(Integer id);
	Usuario save(Usuario u);
	Iterable<Usuario> findAll();
	void deleteById(Integer id);
	boolean update(Usuario u);
	
	public Usuario findByName(String n);
	public Usuario findByEmail(String e);
	
<<<<<<< HEAD
=======
	public List<Usuario> findFriends();
	public boolean addFriend(String name, String nameFriend);
	public boolean removeFriend(String name, String nameFriend);
	
	public List<Usuario> findBloqued();
	public boolean block(String name, String nameFriend);
	public boolean unblock(String name, String nameFriend);

>>>>>>> hexagonal
	public boolean verify(Integer id);
	public boolean ban(Integer id);
	public boolean unBan(Integer id);
}
