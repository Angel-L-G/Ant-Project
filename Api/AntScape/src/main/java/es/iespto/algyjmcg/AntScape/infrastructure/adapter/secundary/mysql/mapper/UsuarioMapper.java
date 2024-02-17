package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.UsuarioEntity;

public class UsuarioMapper {	
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

			/*if(in.getAnts() != null) {
				am = new AntMapper();
				List<AntEntity> lista = new ArrayList<AntEntity>();
				
				for (Ant a : in.getAnts()){
					lista.add(am.toPersistance(a));
				}
				
				out.setAnts(lista);
			}else {
				out.setAnts(null);
			}
			
			if(in.getNests() != null) {
				nm = new NestMapper();
				List<NestEntity> lista = new ArrayList<NestEntity>();
				
				for (Nest n : in.getNests()){
					lista.add(nm.toPersistance(n));
				}
				
				out.setNests(lista);
			}else {
				out.setNests(null);
			}*/
			
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

			/*if(in.getAnts() != null) {
				am = new AntMapper();
				List<Ant> lista = new ArrayList<Ant>();
				
				for (AntEntity a : in.getAnts()){
					lista.add(am.toDomain(a));
				}
				
				out.setAnts(lista);
			}
			
			if(in.getNests() != null) {
				nm = new NestMapper();
				List<Nest> lista = new ArrayList<Nest>();
				
				for (NestEntity n : in.getNests()){
					lista.add(nm.toDomain(n));
				}
				
				out.setNests(lista);
			}*/
		}
		
		return out;
	}
}
