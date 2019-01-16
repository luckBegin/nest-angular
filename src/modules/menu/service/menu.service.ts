import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { menu , MenuDTO  , menu_locale } from '../entities' ;
import { Response  , ResponseModel } from '../../../share/response/response.model';
import { Mysql } from "../../../share/mysql/sql.builder" ;
import {departDTO} from "../../depart/entities" ;
import {role} from "../../role/entities" ;
import {staff} from "../../staff/entities" ;

@Injectable()
export class MenuService{
	constructor(
		@InjectRepository(menu)
		private readonly MenuRepository : Repository< menu >,

		@InjectRepository(menu_locale)
		private readonly MenuLocaleRepository : Repository< menu_locale >,

		@InjectRepository(role)
		private readonly RoleRepository : Repository< role >,

		@InjectRepository(staff)
		private readonly StaffRepository : Repository< staff >,
	){};

	private async recursive ( item ?: any[] ) : Promise< any >{
		return Promise.all( item.map( ( item ) => {
			return this.getByParentId(item.id , item) ;
		}))
	};

	getByParentId ( id : number , parent : any ) : Promise< departDTO[] > {
		return new Promise( ( resolve , reject ) => {
			this.getLocale(id)
				.then( data => {
					parent.menuDescriptions = [ data ] ;
					this.MenuRepository.query("select * from menu where parentId = ?" , [id])
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
		});
	};

	getLocale( id : number ) : Promise<any> {
		return new Promise( (resolve, reject) => {
			this.MenuLocaleRepository.findOne(id)
				.then( data => resolve(data))
				.catch( e => reject(e)) ;
		});
	};

	async getTree() : Promise<any>{
		return new Promise((resolve, reject) => {
			const sql = Mysql.SqlBuilder.select()
				.from("menu").where('parentId is')
				.get() ;

			this.MenuRepository.query(sql , [null])
				.then( data => {
					this.recursive( data )
						.then(  result =>  resolve( Response.success( { data : data })) )
						.catch( e => reject(
							Response.error( { message : e })
						) );
					 ;
				})
				.catch( e => {
					reject( Response.error( { message : e }))
				});
		});
	};

	async delete( id : number) : Promise<any>{
		try {
			await this.MenuRepository.delete(id) ;
			await this.MenuLocaleRepository.delete(id) ;

			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};

	async post( data : any) : Promise<any>{
		try {
			const Menu = this.MenuRepository.create(data) ;

			const result = await this.MenuRepository.insert(Menu) ;

			const insertId = result.identifiers[0]['id'] ;

			const Locale = data.menuDescriptionVOS.map( item => {
				item.menuId = insertId ;
				return this.MenuLocaleRepository.create( item )
			}) ;

			await this.MenuLocaleRepository.insert(Locale) ;

			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};

	async put( data : any ) : Promise<any>{
		try {
			const Locale = data.menuDescriptionVOS.map( item => this.MenuLocaleRepository.create(item) ) ;
			const Menu = this.MenuRepository.create(data) ;
			await this.MenuLocaleRepository.save(Locale) ;
			await this.MenuRepository.save(Menu) ;
			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};

	async getByUsrId(id : number) : Promise<any>{
		try {
			const staff = await this.StaffRepository.findOne(id);
			return Response.success( { data : staff }) ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};
}