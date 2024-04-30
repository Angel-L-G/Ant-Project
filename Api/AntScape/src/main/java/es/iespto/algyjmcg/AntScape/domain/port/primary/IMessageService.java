package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.Message;

public interface IMessageService {
	Message findById(Integer id);
	Message save(Message in);
	Iterable<Message> findAll();
	void deleteById(Integer id);
	boolean update(Message in);
	
	Iterable<Message> findByChatId(Integer id);
}
