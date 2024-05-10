package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Chat;
import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.ChatEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.MessageEntity;

public class ChatMapper {
	private MessageMapper mem = new MessageMapper();
	private UsuarioMapper um = new UsuarioMapper();
	
	public ChatEntity toPersistance(Chat in) {
		ChatEntity out = new ChatEntity();
		
		if(in != null){
			out.setId(in.getId());
			out.setLastMessage(in.getLastMessage());
			out.setUsuario1(um.toPersistance(in.getUsuario1()));
			
			if(in.getIdGuild() != null) {
				out.setIdGuild(in.getIdGuild());
			}
			
			if(in.getUsuario2() != null) {
				out.setUsuario2(um.toPersistance(in.getUsuario2()));
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
			out.setId(in.getId());
			out.setLastMessage(in.getLastMessage());
			out.setUsuario1(um.toDomain(in.getUsuario1()));
			
			if(in.getIdGuild() != null) {
				out.setIdGuild(in.getIdGuild());
			}
			
			if(in.getUsuario2() != null) {
				out.setUsuario2(um.toDomain(in.getUsuario2()));
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
