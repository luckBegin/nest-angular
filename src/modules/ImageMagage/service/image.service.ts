import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { image } from '../entities/image-list.entity' ;

@Injectable()
export class ImageService {
	constructor(
		@InjectRepository(image)
		private readonly ImageListRepository : Repository<image>,
	){};

	async get(): Promise< image[] > {
		return await this.ImageListRepository.find() ;
	};
};

