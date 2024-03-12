package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.Usuario;
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
			out.setEggs(in.getEggs());
			out.setGoldenEggs(in.getGoldenEggs());
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
<<<<<<< HEAD
			
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
=======
			out.setEggs(in.getEggs());
			out.setGoldenEggs(in.getGoldenEggs());
>>>>>>> hexagonal
		}
		
		return out;
	}
}
