package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.GuildEntity;

public interface GuildJPARepository extends JpaRepository<GuildEntity, Integer>{

}
