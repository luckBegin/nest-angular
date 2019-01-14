import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { role  , role_menu } from '../entities' ;
import { Response } from '../../../share/response/response.model';

@Injectable()
export class RoleService{
	constructor(
		@InjectRepository(role)
		private readonly RoleRepository : Repository<role>,

		@InjectRepository(role_menu)
		private readonly RoleMenuRepository : Repository< role_menu >
	){};

	async get(page : number = 1 , size : number = 10 ){
		try {
			const [ result , total ] = await this.RoleRepository.findAndCount({
				take : size ,
				skip : ( page - 1 ) * size
			}) ;
			const Page = Response.page( size , total , Math.ceil( total / size ));
			return Response.success( { data : result  , page : Page }) ;
		}catch (e) {
			return Response.error({ message : e }) ;
		}
	};

	async getById( id : number ){
		try {

			const data = {
				menuDTOS : []
			} ;

			const result = await this.RoleMenuRepository.find( { roleId : id }) ;

			result.forEach( item => {
				data.menuDTOS.push( { id : item.menuId }) ;
			});
			return Response.success( { data : data } ) ;
		}catch (e) {
			return Response.error({ message : e }) ;
		};
	};


	async post( data : any ){
		try {
			const Role = this.RoleRepository.create(data) ;

			const result = await this.RoleRepository.insert(Role)  ;

			const insertId = result.identifiers[0]['id'] ;

			const Locale = data.menuIds.map( item => {
				const roleMenu = {
					roleId : insertId ,
					menuId : item
				} ;
				return this.RoleMenuRepository.create( roleMenu ) ;
			}) ;

			await this.RoleMenuRepository.insert(Locale) ;

			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};

	async put( data : any ){
		try {
			const Role = this.RoleRepository.create(data) ;

			await this.RoleRepository.save(Role) ;

			const Locales = data.menuIds.map( item => {
				const roleMenu = {
					roleId : data.id ,
					menuId : item
				} ;
				return this.RoleMenuRepository.create( roleMenu ) ;
			});

			await this.RoleMenuRepository.delete({ roleId : data.id}) ;

			if(Locales.length > 0)
				await this.RoleMenuRepository.insert( Locales ) ;

			return Response.success() ;
		}catch (e) {
			console.log(e) ;
			return Response.error({ message : e }) ;
		}
	};

	async delete( id : number ){
		try {
			await this.RoleRepository.delete(id) ;
			await this.RoleMenuRepository.delete( { roleId : id }) ;
			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};
}