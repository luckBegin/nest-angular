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


	getByParentId ( id : number , parent : any ) : Promise< departDTO[] > {
		return new Promise( ( resolve , reject ) => {
			this.DepartRepository.query("select * from depart where parentId = ?" , [id])
				.then( data => {
					parent.children = data ;
					this.recursive(data)
						.then( data => resolve(data))
						.catch( e => reject(e)) ;
				})
				.catch( err => {
					reject(err) ;
				});
		});
	};

	private async recursive ( item ?: any[] ) : Promise< any >{
		return Promise.all( item.map( ( item ) => {
			return this.getByParentId(item.id , item) ;
		}))
	};

	async get(): Promise< any > {
		return new Promise( (resolve , rejects) => {
			const sql = Mysql.SqlBuilder.select()
				.from("depart")
				.where("parentId is")
				.get() ;

			this.DepartRepository.query(sql , [ null ])
				.then( data => {
					this.recursive( data )
						.then( tree => {
							resolve( Response.success( { data : data }) ) ;
						})
						.catch( e => rejects(
							Response.error( { message : e })
						)) ;
				})
				.catch( e => rejects(e))
		});
	};

	async post( data : any ) : Promise< ResponseModel > {
		const _data = this.DepartRepository.create(data) ;
		try {
			await this.DepartRepository.insert(_data) ;
			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e } ) ;
		};
	};

	async delete( id : number ) : Promise< any > {
		try {
			await this.DepartRepository.delete( id ) ;
			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		};
	};

	async put( data : any ) : Promise< any >{
		try {
			const item = this.DepartRepository.create( data ) ;
			await this.DepartRepository.save( item ) ;
			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e } ) ;
		}
	};
}

