package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import java.util.ArrayList;
import java.util.List;

import es.iespto.algyjmcg.AntScape.domain.model.Ant;
import es.iespto.algyjmcg.AntScape.domain.model.AntNest;
import es.iespto.algyjmcg.AntScape.domain.model.Boss;
import es.iespto.algyjmcg.AntScape.domain.model.Nest;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AntNestEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.BossEntity;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.NestEntity;

public class NestMapper {
	private UsuarioMapper um;
	private AntNestMapper anm;
	
	public NestEntity toPersistance(Nest in) {
		NestEntity out = new NestEntity();

		out.setId(in.getId());	
		out.setAntType(in.getAntType());
		out.setDeleted(in.getDeleted());
		out.setMap(in.getMap());
		
		if(in.getUsuario() != null) {
			um = new UsuarioMapper();
			out.setUsuario(um.toPersistance(in.getUsuario()));
		}
		
		if(in.getAntNests() != null) {
			anm = new AntNestMapper();
			List<AntNestEntity> lista = new ArrayList<AntNestEntity>();
			for (AntNest an : in.getAntNests()) {
				lista.add(anm.toPersistance(an));
			}
			out.setAntNests(lista);
		}
		
		return out;
	}
	
	public Nest toDomain(NestEntity in) {
		Nest out = new Nest();
		
		out.setId(in.getId());	
		out.setAntType(in.getAntType());
		out.setDeleted(in.getDeleted());
		out.setMap(in.getMap());
		
		if(in.getUsuario() != null) {
			um = new UsuarioMapper();
			out.setUsuario(um.toDomain(in.getUsuario()));
		}
		
		if(in.getAntNests() != null) {
			anm = new AntNestMapper();
			List<AntNest> lista = new ArrayList<AntNest>();
			for (AntNestEntity an : in.getAntNests()) {
				lista.add(anm.toDomain(an));
			}
			out.setAntNests(lista);
		}
		
		return out;
	}
}
