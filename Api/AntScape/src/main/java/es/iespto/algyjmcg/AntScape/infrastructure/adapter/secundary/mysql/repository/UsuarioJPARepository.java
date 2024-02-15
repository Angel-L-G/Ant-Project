package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;

@Repository
public interface UsuarioJPARepository  extends JpaRepository<UsuarioEntity, Integer>{
	@Query("SELECT u from UsuarioEntity u where u.name=:name")
	public Optional<UsuarioEntity> findByName(@Param("name") String name);
	
	@Query("SELECT u from UsuarioEntity u where u.email=:email")
	public Optional<UsuarioEntity> findByEmail(@Param("email") String email);
}
