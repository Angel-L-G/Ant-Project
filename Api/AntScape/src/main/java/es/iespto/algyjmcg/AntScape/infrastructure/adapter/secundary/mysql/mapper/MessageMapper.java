package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.MessageEntity;

public class MessageMapper {
	private UsuarioMapper um = new UsuarioMapper();
	
	public MessageEntity toPersistance(Message in) {
		MessageEntity out = new MessageEntity();
		
		if(in != null){
			out.setBody(in.getBody());
			out.setSentAt(in.getSentAt());
			
			if(in.getGuildId() != null) {
				out.setGuildId(in.getGuildId());
			}
			
			out.setSender(um.toPersistance(in.getSender()));
			out.setReciever(um.toPersistance(in.getReciever()));
		}

		return out;
	}
	
	public Message toDomain(MessageEntity in) {
		Message out = new Message();
		
		if(in != null){
			out.setBody(in.getBody());
			out.setSentAt(in.getSentAt());
			
			if(in.getGuildId() != null) {
				out.setGuildId(in.getGuildId());
			}
			
			out.setSender(um.toDomain(in.getSender()));
			out.setReciever(um.toDomain(in.getReciever()));
		}
		
		return out;
	}
}
