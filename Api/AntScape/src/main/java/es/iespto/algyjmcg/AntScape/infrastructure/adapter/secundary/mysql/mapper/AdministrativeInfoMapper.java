package es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.mapper;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.infrastructure.adapter.secundary.mysql.entity.AdministrativeInfoEntity;

public class AdministrativeInfoMapper {
	public AdministrativeInfoEntity toPersistance(AdministrativeInfo in) {
		AdministrativeInfoEntity out = new AdministrativeInfoEntity();
		
		if(in != null) {
			out.setId(in.getId());
			out.setCreatedAt(in.getCreatedAt());
			out.setInformacion(in.getInformacion());
			out.setLastLogin(in.getLastLogin());
			out.setUpdatedAt(in.getUpdatedAt());
		}
		
		return out;
	}
	
	public AdministrativeInfo toDomain(AdministrativeInfoEntity in) {
		AdministrativeInfo out = new AdministrativeInfo();
		
		if(in != null) {
			out.setId(in.getId());
			out.setCreatedAt(in.getCreatedAt());
			out.setInformacion(in.getInformacion());
			out.setLastLogin(in.getLastLogin());
			out.setUpdatedAt(in.getUpdatedAt());
		}
		
		return out;
	}
}
