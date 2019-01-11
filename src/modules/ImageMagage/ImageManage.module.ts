import { Module , NestModule } from '@nestjs/common';
import { ImageController } from './controller' ;
import { image } from './entities' ;
import { TypeOrmModule } from '@nestjs/typeorm';
import {ImageService} from "./service"

const entities = [ image ] ;

@Module({
	imports: [
		TypeOrmModule.forFeature( entities )
	],
	controllers: [
		ImageController
	],
	providers: [ ImageService ],
})
export class ImageManageModule{}
