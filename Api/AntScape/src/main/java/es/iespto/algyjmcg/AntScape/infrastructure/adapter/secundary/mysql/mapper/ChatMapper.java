package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.ChatEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.MessageEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;

public class ChatMapper {
	private MessageMapper mem = new MessageMapper();
	private UsuarioMapper um = new UsuarioMapper();
	
	public ChatEntity toPersistance(Chat in) {
		ChatEntity out = new ChatEntity();
		
		if(in != null){
			out.setName(in.getName());
			
			if (in.getUsuarios() != null && in.getUsuarios().size() != 0) {
				List<UsuarioEntity> list = new ArrayList<UsuarioEntity>();
				for (Usuario domain : in.getUsuarios()) {
					list.add(um.toPersistance(domain));
				}
				out.setUsuarios(list);
			}
			
			if (in.getMessages() != null && in.getMessages().size() != 0) {
				List<MessageEntity> list = new ArrayList<MessageEntity>();
				for (Message domain : in.getMessages()) {
					list.add(mem.toPersistance(domain));
				}
				out.setMessages(list);
			}
		}

		return out;
	}
	
	public Chat toDomain(ChatEntity in) {
		Chat out = new Chat();
		
		if(in != null){
			out.setName(in.getName());
			
			if (in.getUsuarios() != null && in.getUsuarios().size() != 0) {
				List<Usuario> list = new ArrayList<Usuario>();
				for (UsuarioEntity entity : in.getUsuarios()) {
					list.add(um.toDomain(entity));
				}
				out.setUsuarios(list);
			}
			
			if (in.getMessages() != null && in.getMessages().size() != 0) {
				List<Message> list = new ArrayList<Message>();
				for (MessageEntity entity : in.getMessages()) {
					list.add(mem.toDomain(entity));
				}
				out.setMessages(list);
			}
		}
		
		return out;
	}
}
