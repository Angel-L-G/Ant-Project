package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;

public class UsuarioMapper {
	NestMapper nm = new NestMapper();
	
	public UsuarioEntity toPersistance(Usuario in) {
		UsuarioEntity out = new UsuarioEntity();
		
		if(in != null) {
			out.setId(in.getId());
			out.setName(in.getName());
			out.setActive(in.getActive());
			out.setBanned(in.getBanned());
			out.setEmail(in.getEmail());
			out.setHash(in.getHash());
			out.setPassword(in.getPassword());
			out.setRol(in.getRol());
			out.setEggs(in.getEggs());
			out.setGoldenEggs(in.getGoldenEggs());
			out.setImg(in.getImg());
			
			if(in.getNests() != null && in.getNests().size() != 0) {
				List<NestEntity> lista = new ArrayList<NestEntity>();
				for (Nest domain : in.getNests()) {
					lista.add(nm.toPersistance(domain));
				}
				out.setNests(lista);
			}
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
			out.setEggs(in.getEggs());
			out.setGoldenEggs(in.getGoldenEggs());
			out.setImg(in.getImg());
			
			if(in.getNests() != null && in.getNests().size() != 0) {
				List<Nest> lista = new ArrayList<Nest>();
				for (NestEntity entity : in.getNests()) {
					lista.add(nm.toDomain(entity));
				}
				out.setNests(lista);
			}
		}
		
		return out;
	}
}
