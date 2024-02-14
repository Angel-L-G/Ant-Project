package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;

@Repository
public interface AntJPARepository extends JpaRepository<AntEntity, Integer>{
	@Query("SELECT a from Ant a where a.name=:name")
	public Optional<AntEntity> findByName(@Param("name") String name);
	
	@Query("SELECT a from Ant a where a.type=:type")
	public Optional<AntEntity> findByType(@Param("type") String type);

}
