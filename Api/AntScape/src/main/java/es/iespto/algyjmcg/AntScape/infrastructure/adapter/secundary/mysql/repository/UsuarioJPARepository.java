package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;

@Repository
public interface UsuarioJPARepository  extends JpaRepository<UsuarioEntity, Integer>{
	@Query("SELECT u from Usuario u where u.nombre=:nombre")
	public UsuarioEntity findByName(@Param("nombre") String nombre);
	
	@Query("SELECT u from Usuario u where u.email=:email")
	public UsuarioEntity findByEmail(@Param("email") String email);
}
