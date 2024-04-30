package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.MessageEntity;

@Repository
public interface MessageJPARepository extends JpaRepository<MessageEntity, Integer>{
	@Query("SELECT m FROM MessageEntity m WHERE m.chat.id = :id")
    Iterable<MessageEntity> findByChatId(@Param("id") Integer id);
}
