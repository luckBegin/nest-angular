import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { depart } from '../entities/depart.entity' ;
import { Response  , ResponseModel } from '../../../share/response/response.model';
@Injectable()
export class DepartService{
	constructor(
		@InjectRepository(depart)
		private readonly DepartRepository : Repository<depart>,
	){};

	async get(): Promise< depart[] > {
		return await this.DepartRepository.find() ;
	};

	async post( data : any ) : Promise< ResponseModel > {
		const _data = this.DepartRepository.create(data) ;
		try {
			const result = await this.DepartRepository.insert(_data) ;

			return Response.succes() ;
		}catch (e) {
			return Response.error( { message : e } ) ;
		};
	};
}

