package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IMessageRepository;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IUsuarioRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.MessageEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.MessageMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.UsuarioMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.MessageJPARepository;

@Service
public class MessageService implements IMessageRepository{
	@Autowired private IUsuarioRepository userRepository;
	private MessageJPARepository repository;
	private MessageMapper mem = new MessageMapper();
	private UsuarioMapper um = new UsuarioMapper();

	@Override
	public Message findById(Integer id) {
		Message out = null;
		
		if(id != null) {
			Optional<MessageEntity> findById = repository.findById(id);
			
			if(findById.isPresent()) {
				out = mem.toDomain(findById.get());
			}
		}
		
		return out;
	}

	@Override
	public Message save(Message in) {
		Message out = null;
		
		if(in != null) {
			MessageEntity persistance = mem.toPersistance(in);
			
			persistance.setSender(um.toPersistance(userRepository.findById(in.getSenderId())));
			
			MessageEntity save = repository.save(persistance);
			
			if(save != null) {
				out = mem.toDomain(save);
			}
		}
		
		return out;
	}

	@Override
	public Iterable<Message> findAll() {
		Iterable<Message> list = null;
		
		List<MessageEntity> findAll = repository.findAll();
		
		if(findAll != null) {
			List<Message> aux = new ArrayList<>();
			for (MessageEntity MessageEntity : findAll) {
				aux.add(mem.toDomain(MessageEntity));
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
	public boolean update(Message in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<MessageEntity> find = repository.findById(in.getId());
			
			if(find.isPresent()) {
				find.get().setBody(in.getBody());
				find.get().setSentAt(in.getSentAt());
				
				repository.save(find.get());
				
				ok = true;
			}
		}
		
		return ok;
	}

	@Override
	public Iterable<Message> findByChatId(Integer id) {
		Iterable<Message> out = null;
				
		if(id != null) {
			Iterable<MessageEntity> byChatId = repository.findByChatId(id);
			List<Message> list = new ArrayList<Message>();
			
			for (MessageEntity messageEntity : byChatId) {
				list.add(mem.toDomain(messageEntity));
			}
			out = list;
		}
		
		return out;
	}

}
