import { Get, Controller  , Res , HttpStatus} from '@nestjs/common';
import { ImageService } from '../service' ;
import { ApiResponse } from '@nestjs/swagger' ;
import { image } from '../model' ;
import { Response } from '../../../share/response/response.model' ;
@Controller()
export class ImageController{
	constructor(
		private imgSer : ImageService
	) {}

	@Get("image")
	@ApiResponse({ status: 200, description: "disable OK", type : image })
	async get(
		@Res() res
	){
		return res.status( HttpStatus.OK ).send(Response.succes( await  this.imgSer.get() ) );
	};
};