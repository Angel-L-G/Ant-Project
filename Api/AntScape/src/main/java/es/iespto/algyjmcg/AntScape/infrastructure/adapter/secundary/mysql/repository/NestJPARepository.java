package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;

@Repository
public interface NestJPARepository extends JpaRepository<NestEntity, Integer>{
	@Query("SELECT n FROM NestEntity n WHERE n.usuario.id = :id")
    Iterable<NestEntity> findAllOwn(@Param("id") Integer id);
}
