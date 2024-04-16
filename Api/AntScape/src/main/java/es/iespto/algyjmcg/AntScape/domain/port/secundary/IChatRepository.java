package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;

public interface IChatRepository {
	Chat findById(Integer id);
	Chat save(Chat in);
	Iterable<Chat> findAll();
	void deleteById(Integer id);
	boolean update(Chat in);
	
	Chat findByGuildId(Integer idGuild);
	List<Chat> findUserChats(Integer id);
}
