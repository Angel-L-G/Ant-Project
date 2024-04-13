package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IChatRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.ChatEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.BossMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.ChatMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.MessageMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.BossJPARepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.ChatJPARepository;

@Service
public class ChatService implements IChatRepository{
	@Autowired private ChatJPARepository repository;
	private ChatMapper cm = new ChatMapper();
	private MessageMapper mem = new MessageMapper();

	@Override
	public Chat findById(Integer id) {
		Chat out = null;
		
		if(id != null) {
			Optional<ChatEntity> findById = repository.findById(id);
			
			if(findById.isPresent()) {
				out = cm.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public Chat save(Chat in) {
		Chat out = null;
		
		if(in != null) {
			ChatEntity save = repository.save(cm.toPersistance(in));
			
			if(save != null) {
				out = cm.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<Chat> findAll() {
		Iterable<Chat> list = null;
		
		List<ChatEntity> findAll = repository.findAll();
		
		if(findAll != null) {
			List<Chat> aux = new ArrayList<>();
			for (ChatEntity chatEntity : findAll) {
				aux.add(cm.toDomain(chatEntity));
			}
			list = aux;
		}
		
		return list;
	}

	@Override
	public void deleteById(Integer id) {
		if(id != null) {
			repository.deleteById(id);
		}
	}

	@Override
	public boolean update(Chat in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<ChatEntity> find = repository.findById(in.getId());
			
			if(find.isPresent()) {
				find.get().setName(in.getName());
				
				
				repository.save(find.get());
				
				ok = true;
			}
		}
		
		return ok;
	}
}
