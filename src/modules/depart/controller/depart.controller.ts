import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { depart , departDTO } from '../entities' ;
import { Response } from '../../../share/response/response.model' ;
import { DepartService } from '../service' ;
@ApiUseTags("部门控制器")
@Controller()
export class DepartController{
	constructor(
		private  readonly service : DepartService
	) {};

	@Get("department/tree")
	@ApiResponse({ status: 200, description: "成功", type : departDTO })
	@ApiOperation({ title: '获取部门列表' })
	async get(
		@Res() res
	){
		return res.status( HttpStatus.OK ).send( await this.service.get() );
	};

	@Post("department")
	@ApiResponse( { status : 200 , description : "成功" , type : depart })
	@ApiOperation( { title : "新增部门"})
	async post(
		@Res() res ,
		@Body() data : departDTO
	){
		const result = await this.service.post( data ) ;
		return res.status( HttpStatus.OK )
			.send( result );
	};

	@Delete("department/:id")
	@ApiResponse( { status : 200 , description : "成功" })
	@ApiOperation( { title : "删除部门"})
	async delete(
		@Res() res ,
		@Param("id") id : number
	){
		return res.status( HttpStatus.OK ).send(
			Response.success( { data :  await this.service.delete( id ) } )
		);
	};

	@Put("department")
	@ApiResponse( { status : 200 , description : "成功" })
	@ApiOperation( { title : "更新部门"})
	async put(
		@Res() res ,
		@Body() data : departDTO
	){
		return res.status( HttpStatus.OK ).send(
			Response.success( { data :  await this.service.put( data ) } )
		);
	};
}
