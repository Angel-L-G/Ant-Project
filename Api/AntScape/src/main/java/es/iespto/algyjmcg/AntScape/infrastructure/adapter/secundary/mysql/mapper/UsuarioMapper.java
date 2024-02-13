package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;

public class UsuarioMapper {
	public UsuarioEntity toPersistance(Usuario in) {
		UsuarioEntity out = new UsuarioEntity();
		
		if(in.getName() != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setActive(in.getActive());
			out.setBanned(in.getBanned());
			out.setEmail(in.getEmail());
			out.setHash(in.getHash());
			out.setPassword(in.getPassword());
			out.setRol(in.getRol());

			//out.setAnts(in.getAnts());
			//out.setNests(in.getNests());
		}
		
		return out;
	}
	
	public Usuario toDomain(UsuarioEntity in) {
		Usuario out = new Usuario();
		
		if(in.getName() != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setActive(in.getActive());
			out.setBanned(in.getBanned());
			out.setEmail(in.getEmail());
			out.setHash(in.getHash());
			out.setPassword(in.getPassword());
			out.setRol(in.getRol());

			//out.setAnts(in.getAnts());
			//out.setNests(in.getNests());
		}
		
		return out;
	}
}
