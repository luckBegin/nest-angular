import { Get, Controller  , Res , HttpStatus} from '@nestjs/common';
import { ImageService } from '../service' ;
import { ApiResponse } from '@nestjs/swagger' ;
import { image } from '../model' ;
@Controller()
export class ImageController{
	constructor(
		private imgSer : ImageService
	) {}

	@Get("image")
	@ApiResponse({ status: 200, description: "disable OK", type: image })
	async get(
		@Res() res
	){
		return res.status( HttpStatus.OK ).send({
			errorCode: 0,
			errorMessage: '请求成功',
			data: await  this.imgSer.list()
		});
	};
};