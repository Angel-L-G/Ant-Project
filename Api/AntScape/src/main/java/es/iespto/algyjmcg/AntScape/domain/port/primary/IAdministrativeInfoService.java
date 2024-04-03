package es.iespto.algyjmcg.AntScape.domain.port.primary;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;

public interface IAdministrativeInfoService {
	AdministrativeInfo findById(Integer id);
	AdministrativeInfo save(AdministrativeInfo in);
	Iterable<AdministrativeInfo> findAll();
	void deleteById(Integer id);
	boolean update(AdministrativeInfo in);
}
