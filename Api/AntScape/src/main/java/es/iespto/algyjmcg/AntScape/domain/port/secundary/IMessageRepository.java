package es.iespto.algyjmcg.AntScape.domain.port.secundary;

import es.iespto.algyjmcg.AntScape.domain.model.Message;

public interface IMessageRepository {
	Message findById(Integer id);
	Message save(Message in);
	Iterable<Message> findAll();
	void deleteById(Integer id);
	boolean update(Message in);
}
