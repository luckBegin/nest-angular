import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { depart } from '../entities/depart.entity' ;

@Injectable()
export class DepartService {
	constructor(
		@InjectRepository(depart)
		private readonly DepartRepository : Repository<depart>,
	){};

	async get(): Promise< depart[] > {
		return await this.DepartRepository.find() ;
	};

	async post( data : any ) : Promise< any > {
		const _data = this.DepartRepository.create(data) ;
		return await this.DepartRepository.insert(_data) ;
	};
};

