import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { depart } from '../entities/depart.entity' ;

@Injectable()
export class DepartService {
	constructor(
		@InjectRepository(depart)
		private readonly ImageListRepository : Repository<depart>,
	){};

	async get(): Promise< depart[] > {
		return await this.ImageListRepository.find() ;
	};
};

