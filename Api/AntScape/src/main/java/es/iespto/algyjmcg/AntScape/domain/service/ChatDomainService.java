package es.iespto.algyjmcg.AntScape.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IChatService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IChatRepository;

@Service
public class ChatDomainService implements IChatService{
	@Autowired private IChatRepository service;

	@Override
	public Chat findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public Chat save(Chat in) {
		return service.save(in);
	}

	@Override
	public Iterable<Chat> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
	}

	@Override
	public boolean update(Chat in) {
		return service.update(in);
	}

	@Override
	public Chat findByGuildId(Integer idGuild) {
		return service.findByGuildId(idGuild);
	}

	@Override
	public List<Chat> findUserChats(Integer id) {
		return service.findUserChats(id);
	}

}
