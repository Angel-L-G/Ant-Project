package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IChatRepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.ChatEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.MessageEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.ChatMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper.MessageMapper;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.ChatJPARepository;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.repository.MessageJPARepository;

@Service
public class ChatService implements IChatRepository{
	@Autowired private ChatJPARepository repository;
	@Autowired private MessageJPARepository messageRepository;
	private ChatMapper cm = new ChatMapper();
	private MessageMapper mem = new MessageMapper();

	@Override
	public Chat findById(Integer id) {
		Chat out = null;
		
		if(id != null) {
			Optional<ChatEntity> chatEntity = repository.findById(id);
			
			if(chatEntity.isPresent()) {
				out = cm.toDomain(chatEntity.get());
				
				List<Message> list = new ArrayList<Message>();
				for (MessageEntity m : chatEntity.get().getMessages()) {
					list.add(mem.toDomain(m));
				}
				out.setMessages(list);
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
			Optional<ChatEntity> chat = repository.findById(id);
			
			for (MessageEntity m : chat.get().getMessages()) {
				messageRepository.deleteById(m.getId());
			}
			
			repository.deleteById(id);
		}
	}

	@Override
	public boolean update(Chat in) {
		boolean ok = false;
		
		if(in != null) {
			Optional<ChatEntity> find = repository.findById(in.getId());
			
			if(find.isPresent()) {
				find.get().setLastMessage(in.getLastMessage());
				
				List<MessageEntity> list = new ArrayList<MessageEntity>();
				for (Message m : in.getMessages()) {
					list.add(mem.toPersistance(m));
				}
				find.get().setMessages(list);
				
				repository.save(find.get());
				
				ok = true;
			}
		}
		
		return ok;
	}

	@Override
	public Chat findByGuildId(Integer idGuild) {
		Chat out = null;
		
		if(idGuild != null) {
			ChatEntity chatEntity = repository.findByGuildId(idGuild);
			
			out = cm.toDomain(chatEntity);
		
			if(chatEntity != null && chatEntity.getMessages() != null) {
				List<Message> list = new ArrayList<Message>();
				for (MessageEntity m : chatEntity.getMessages()) {
					list.add(mem.toDomain(m));
				}
				out.setMessages(list);
			}
		}
		
		return out;
	}

	@Override
	public List<Chat> findUserChats(Integer id) {
		List<Chat> list = null;
		
		List<ChatEntity> findAll = repository.findUserChats(id);
		
		if(findAll != null) {
			list = new ArrayList<>();
			for (ChatEntity chatEntity : findAll) {
				list.add(cm.toDomain(chatEntity));
			}
		}
		
		return list;
	}
}
