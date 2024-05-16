package es.iespto.algyjmcg.AntScape.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespto.algyjmcg.AntScape.domain.model.AdministrativeInfo;
import es.iespto.algyjmcg.AntScape.domain.port.primary.IAdministrativeInfoService;
import es.iespto.algyjmcg.AntScape.domain.port.secundary.IAdministrativeInfoRepository;


@Service
public class AdministrativeInfoDomainService implements IAdministrativeInfoService{
	@Autowired private IAdministrativeInfoRepository service;

	@Override
	public AdministrativeInfo findById(Integer id) {
		return service.findById(id);
	}

	@Override
	public AdministrativeInfo save(AdministrativeInfo in) {
		return service.save(in);
	}

	@Override
	public Iterable<AdministrativeInfo> findAll() {
		return service.findAll();
	}

	@Override
	public void deleteById(Integer id) {
		service.deleteById(id);
		
	}

	@Override
	public boolean update(AdministrativeInfo in) {
		return service.update(in);
	}

	@Override
	public AdministrativeInfo findByUserId(Integer user_id) {
		return service.findByUserId(user_id);
	}

	@Override
	public void updateTimeStamp(Integer userId, Integer option) {
		service.updateTimeStamp(userId, option);
		
	}
}
