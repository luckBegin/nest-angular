import {Get, Controller, Res, HttpStatus, Post, Body} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { depart } from '../entities' ;
import { Response } from '../../../share/response/response.model' ;
import { DepartService } from '../service' ;

@ApiUseTags("部门控制器")
@Controller()
export class DepartController{
	constructor(
		private  readonly service : DepartService
	) {};

	@Get("depart")
	@ApiResponse({ status: 200, description: "成功", type : depart })
	@ApiOperation({ title: '获取部门列表' })
	async get(
		@Res() res
	){
		return res.status( HttpStatus.OK ).send(
			Response.succes( await this.service.get() )
		);
	};

	@Post("depart")
	@ApiResponse( { status : 200 , description : "成功" , type : depart })
	@ApiOperation( { title : "新增部门"})
	async post(
		@Res() res ,
		@Body() depart : depart
	){
		console.log(depart) ;
		return res.status( HttpStatus.OK )
			.send("200")
	};
};
