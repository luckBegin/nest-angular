import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { StaffDTO } from '../entities' ;
import { Response } from '../../../share/response/response.model' ;
import { StaffService } from '../service' ;
import {departDTO} from "../../depart/entities"

@ApiUseTags("员工控制器")
@Controller()
export class StaffController{
	constructor(
		private  readonly service : StaffService
	) {};

	@Delete("employee/:id")
	@ApiResponse( { status : 200 , description : "成功" })
	@ApiOperation( { title : "删除员工"})
	async delete(
		@Res() res ,
		@Param("id") id : number
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.delete(id)
		);
	};

	@Get("employee")
	@ApiResponse( { status : 200 , description : "成功"  , type : StaffDTO })
	@ApiOperation( { title : "查询员工列表"})
	async getTree(
		@Res() res ,
		@Query() query : any
	){
		const page = query.currentPage == 0 ? 1 : query.currentPage ;
		return res.status( HttpStatus.OK ).send(
			await this.service.get( page , query.pageSize )
		);
	};


	@Post("employee")
	@ApiResponse( { status : 200 , description : "成功"  , type : StaffDTO })
	@ApiOperation( { title : "新增员工"})
	async post(
		@Res() res ,
		@Body() data : StaffDTO
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.post( data )
		);
	};

	@Put("employee")
	@ApiResponse( { status : 200 , description : "成功"  , type : StaffDTO })
	@ApiOperation( { title : "修改员工"})
	async put(
		@Res() res ,
		@Body() data : StaffDTO
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.put( data )
		);
	};

	@Post("employee/login")
	@ApiResponse( { status : 200 , description : "成功" })
	@ApiOperation( { title : "登录"})
	async login(
		@Res() res ,
		@Body() data
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.login( data )
		);
	};
}