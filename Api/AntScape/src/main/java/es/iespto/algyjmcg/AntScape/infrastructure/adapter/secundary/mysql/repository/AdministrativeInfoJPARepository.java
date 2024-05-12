package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AdministrativeInfoEntity;

@Repository
public interface AdministrativeInfoJPARepository extends JpaRepository<AdministrativeInfoEntity, Integer>{
	@Query("SELECT a FROM AdministrativeInfoEntity a WHERE a.usuario.id = :id")
    AdministrativeInfoEntity findUserChats(@Param("id") Integer id);
}
