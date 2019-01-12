import {Get, Controller, Res, HttpStatus, Post, Body} from '@nestjs/common';
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

	@Get("department")
	@ApiResponse({ status: 200, description: "成功", type : depart })
	@ApiOperation({ title: '获取部门列表' })
	async get(
		@Res() res
	){
		return res.status( HttpStatus.OK ).send(
			Response.succes( { data : await this.service.get() } )
		);
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
};
