package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;

public interface IChatService {
	Chat findById(Integer id);
	Chat save(Chat in);
	Iterable<Chat> findAll();
	void deleteById(Integer id);
	boolean update(Chat in);
}
