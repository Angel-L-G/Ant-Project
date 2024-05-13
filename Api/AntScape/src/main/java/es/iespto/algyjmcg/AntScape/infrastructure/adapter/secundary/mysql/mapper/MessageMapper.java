package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Message;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.MessageEntity;

public class MessageMapper {
	public MessageEntity toPersistance(Message in) {
		MessageEntity out = new MessageEntity();
		
		if(in != null){
			out.setId(in.getId());
			out.setBody(in.getBody());
			out.setSentAt(in.getSentAt());
		}

		return out;
	}
	
	public Message toDomain(MessageEntity in) {
		Message out = new Message();
		
		if(in != null){
			out.setId(in.getId());
			out.setBody(in.getBody());
			out.setSentAt(in.getSentAt());
			out.setSenderId(in.getSender().getId());
		}
		
		return out;
	}
}
