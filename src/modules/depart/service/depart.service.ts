import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { depart , departDTO } from '../entities/depart.entity' ;
import { Response  , ResponseModel } from '../../../share/response/response.model';
import {rejects} from "assert"
import { Mysql } from "../../../share/mysql/sql.builder"


@Injectable()
export class DepartService{
	constructor(
		@InjectRepository(depart)
		private readonly DepartRepository : Repository<depart>,
	){};


	getById ( id : number ) : Promise< departDTO[] > {
		return new Promise( ( resolve , reject ) => {
			this.DepartRepository.query("select * from depart where parentId = ?" , [id])
				.then( data => {
					resolve(data) ;
				})
				.catch( err => {
					reject(err) ;
				});
		});
	};

	private async recursive ( item ?: any[], data ?: any[] ) : Promise< any >{
		return new Promise( (resolve , reject ) => {
			const sql = Mysql.SqlBuilder.select()
				.from("depart")
				.where("parentId is")
				.get();

			this.DepartRepository.query(sql , [ null ])
				.then( data => {
					resolve(data) ;
				}).catch( e => {
					reject(e) ;
			});
		});
	};

	async get(): Promise< departDTO[] > {
		const data = this.recursive() ;
		return data ;
	};

	async post( data : any ) : Promise< ResponseModel > {
		const _data = this.DepartRepository.create(data) ;
		try {
			const result = await this.DepartRepository.insert(_data) ;
			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e } ) ;
		};
	};
}

