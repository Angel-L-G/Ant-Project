package es.iespto.algyjmcg.AntScape.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IMessageService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IMessageRepository;

@Service
public class MessageDomainService implements IMessageService{
	@Autowired private IMessageRepository service;

	@Override
	public Message findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public Message save(Message in) {
		return service.save(in);
	}

	@Override
	public Iterable<Message> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
	}

	@Override
	public boolean update(Message in) {
		return service.update(in);
	}

	@Override
	public Iterable<Message> findByChatId(Integer id) {
		return service.findByChatId(id);
	}

}
