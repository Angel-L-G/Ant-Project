package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;

@Repository
public interface BossJPARepository extends JpaRepository<BossEntity, Integer>{
	@Query("SELECT b from Boss b where b.name=:name")
	public Optional<BossEntity> findByName(@Param("name") String name);
}
