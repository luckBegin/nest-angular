import {Get, Controller, Res, HttpStatus, Post} from '@nestjs/common';
import { ImageService } from '../service' ;
import { ApiResponse } from '@nestjs/swagger' ;
import { image } from '../entities' ;
import { Response } from '../../../share/response/response.model' ;

@Controller()
export class ImageController{
	constructor(
		private imgSer : ImageService
	) {};

	@Get("image")
	@ApiResponse({ status: 200, description: "成功", type : image })
	async get(
		@Res() res
	){
		return res.status( HttpStatus.OK ).send( Response.succes( await  this.imgSer.get() ) );
	};


	@Post("image")
	async post(
		@Res() res
	){
		return res.status( HttpStatus.OK ).send( '123' ) ;
	};

};
