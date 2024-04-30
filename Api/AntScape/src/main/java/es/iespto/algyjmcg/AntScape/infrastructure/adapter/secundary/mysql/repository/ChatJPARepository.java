package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.ChatEntity;

@Repository
public interface ChatJPARepository extends JpaRepository<ChatEntity, Integer>{
	@Query("SELECT c FROM ChatEntity c WHERE c.idGuild = :id")
    ChatEntity findByGuildId(@Param("id") Integer id);
	@Query("SELECT c FROM ChatEntity c WHERE c.usuario1.id = :id OR c.usuario2.id = :id")
    List<ChatEntity> findUserChats(@Param("id") Integer id);
}
