import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { staff, staff_depart, staff_role } from '../entities' ;
import { Response } from '../../../share/response/response.model';
import { role } from "../../role/entities" ;
import { depart } from "../../depart/entities" ;
import * as md5 from 'md5' ;

@Injectable()
export class StaffService{
	constructor(
		@InjectRepository(staff)
		private readonly StaffRepository : Repository<staff>,

		@InjectRepository(staff_depart)
		private readonly StaffDepartRepository : Repository<staff_depart> ,

		@InjectRepository(staff_role)
		private readonly StaffRoleRepository : Repository<staff_role> ,

		@InjectRepository(role)
		private readonly RoleRepository : Repository<role> ,

		@InjectRepository(depart)
		private readonly DepartRepository : Repository<depart> ,
	){};

	private role = new staff_role ;

	async getStaffRoleIds ( data : any[] ) : Promise<any> {
		return Promise.all( data.map( item => {
			return new Promise((resolve, reject) => {
				this.StaffRoleRepository.find({ staffId : item.id})
					.then( data => {
						const roleIds = data.map( item => item.roleId ) ;
						item.roleIds = roleIds ;
						this.RoleRepository.findByIds( roleIds )
							.then( roles => {
								item.roleOutputVOS = roles
								resolve(data) ;
							})
							.catch( e =>  reject(e))
					})
					.catch( e => {
						reject(e);
					});
			});
		}));
	};

	async getStaffDepartIds ( data : any[] ) : Promise<any> {
		return Promise.all( data.map( item => {
			return new Promise((resolve, reject) => {
				this.StaffDepartRepository.find( { staffId : item.id })
					.then( data => {
						const departIds = data.map( item => item.departId ) ;
						item.departIds = departIds ;
						this.DepartRepository.findByIds( departIds)
							.then( roles => {
								item.departmentDTOS = roles ;
								resolve(data) ;
							})
							.catch( e =>  reject(e))

					})
					.catch( e => {
						reject(e);
					});
			});
		}));
	};

	async get( page : number , size : number ) : Promise<any> {
		try {
			const [ result , total ] = await this.StaffRepository.findAndCount({
				take : size ,
				skip : ( page - 1 ) * size
			}) ;

			const Page = Response.page( size , total , Math.ceil( total / size ));

			await this.getStaffRoleIds(result) ;
			await this.getStaffDepartIds(result) ;

			return Response.success( { data : result  , page : Page }) ;
		}catch (e) {
			return Response.error( { message : e }) ;
		};
	};

	async post( data : any ) : Promise<any> {
		try {
			data.password = md5(data.password) ;
			const user = this.StaffRepository.create( data ) ;

			const result = await this.StaffRepository.insert(user) ;

			const insertId = result.identifiers[0]['id'] ;

			const Roles = data.roleIds.map( item => {
				const roles = {
					roleId : item ,
					staffId : insertId
				} ;
				return this.StaffRoleRepository.create( roles ) ;
			}) ;

			await this.StaffRoleRepository.insert(Roles) ;

			const Departs = data.departmentIds.map( item => {
				const depart = {
					departId : item ,
					staffId : insertId
				} ;

				return this.StaffDepartRepository.create( depart ) ;
			}) ;

			await this.StaffDepartRepository.insert(Departs) ;

			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};

	async put( data : any ) : Promise<any> {
		try {
			if(data.password)
				data.password = md5(data.password) ;

			const user = this.StaffRepository.create( data ) ;

			await this.StaffRepository.save(user) ;
			await this.StaffRoleRepository.delete({ staffId : data.id }) ;
			await this.StaffDepartRepository.delete({ staffId : data.id }) ;

			const Roles = data.roleIds.map( item => {
				const roles = {
					roleId : item ,
					staffId : data.id
				} ;
				return this.StaffRoleRepository.create( roles ) ;
			}) ;

			await this.StaffRoleRepository.insert(Roles) ;

			const Departs = data.departmentIds.map( item => {
				const depart = {
					departId : item ,
					staffId : data.id
				} ;

				return this.StaffDepartRepository.create( depart ) ;
			}) ;

			await this.StaffDepartRepository.insert(Departs) ;

			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		}
	};

	async delete( id : number ) : Promise<any> {
		try {
			await this.StaffRepository.delete(id) ;
			await this.StaffRoleRepository.delete({ staffId : id }) ;
			await this.StaffDepartRepository.delete({staffId : id }) ;
			return Response.success() ;
		}catch (e) {
			return Response.error( { message : e }) ;
		};
	};

	async login(data : any ) : Promise< any > {
		try {

			const usrname = data.username ;

			const pass = md5(data.password) ;

			const result = await this.StaffRepository.findOne({ username : usrname , password : pass }) ;

			if(result){
				return Response.success( { data : result }) ;
			}else{
				return Response.error({ code : 200 , message : "用户名或密码不正确"}) ;
			}
		}catch (e) {
			return Response.error(e) ;
		}
	};
}