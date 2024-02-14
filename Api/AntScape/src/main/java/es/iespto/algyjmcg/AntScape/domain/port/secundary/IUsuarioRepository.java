package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;

public interface IUsuarioRepository {
	Usuario findById(Integer id);
	Usuario save(Usuario u);
	Iterable<Usuario> findAll();
	void deleteById(Integer id);
	boolean update(Usuario u);
	
	public Usuario findByName(String n);
	public Usuario findByEmail(String e);
	
	public boolean verify(Integer id);
	public boolean ban(Integer id);
	public boolean unBan(Integer id);
}
