package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;

@Repository
public interface GuildLevelJPARepository extends JpaRepository<AntEntity, Integer>{

}
