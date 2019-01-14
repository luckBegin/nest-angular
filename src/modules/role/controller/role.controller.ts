import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import {  RoleDTO  } from '../entities' ;
import { Response } from '../../../share/response/response.model' ;
import { RoleService } from '../service' ;
import {departDTO} from "../../depart/entities"

@ApiUseTags("角色控制器")
@Controller()
export class RoleController{
	constructor(
		private  readonly service : RoleService
	) {};

	@Delete("role/:id")
	@ApiResponse( { status : 200 , description : "成功" })
	@ApiOperation( { title : "删除角色"})
	async delete(
		@Res() res ,
		@Param("id") id : number
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.delete(id)
		);
	};

	@Get("role")
	@ApiResponse( { status : 200 , description : "成功"  , type : RoleDTO })
	@ApiOperation( { title : "查询角色"})
	async getTree(
		@Res() res ,
		@Query() query : any
	){
		const page = query.currentPage == 0 ? 1 : query.currentPage ;
		return res.status( HttpStatus.OK ).send(
			await this.service.get( page , query.pageSize )
		);
	};

	@Get("role/:id")
	@ApiResponse( { status : 200 , description : "成功"  , type : RoleDTO })
	@ApiOperation( { title : "查询角色详情"})
	async getById(
		@Res() res ,
		@Param("id") id : number
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.getById( id )
		);
	};

	@Post("role")
	@ApiResponse( { status : 200 , description : "成功"  , type : RoleDTO })
	@ApiOperation( { title : "新增角色"})
	async post(
		@Res() res ,
		@Body() data : RoleDTO
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.post( data)
		);
	};

	@Put("role")
	@ApiResponse( { status : 200 , description : "成功"  , type : RoleDTO })
	@ApiOperation( { title : "修改角色"})
	async put(
		@Res() res ,
		@Body() data : RoleDTO
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.put( data )
		);
	};
}