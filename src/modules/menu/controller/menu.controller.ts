import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { menu , MenuDTO } from '../entities' ;
import { Response } from '../../../share/response/response.model' ;
import { MenuService } from '../service' ;
import {departDTO} from "../../depart/entities"

@ApiUseTags("菜单控制器")
@Controller()
export class MenuController{
	constructor(
		private  readonly service : MenuService
	) {};

	@Delete("menu/:id")
	@ApiResponse( { status : 200 , description : "成功" })
	@ApiOperation( { title : "删除菜单"})
	async delete(
		@Res() res ,
		@Param("id") id : number
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.delete(id)
		);
	};

	@Get("menu/tree")
	@ApiResponse( { status : 200 , description : "成功"  , type : MenuDTO })
	@ApiOperation( { title : "查询所有菜单"})
	async getTree(
		@Res() res ,
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.getTree()
		);
	};


	@Post("menu")
	@ApiResponse( { status : 200 , description : "成功"  , type : MenuDTO })
	@ApiOperation( { title : "新增菜单"})
	async post(
		@Res() res ,
		@Body() data : MenuDTO
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.post( data)
		);
	};

	@Put("menu")
	@ApiResponse( { status : 200 , description : "成功"  , type : MenuDTO })
	@ApiOperation( { title : "新增菜单"})
	async put(
		@Res() res ,
		@Body() data : MenuDTO
	){
		return res.status( HttpStatus.OK ).send(
			await this.service.put( data)
		);
	};
}
