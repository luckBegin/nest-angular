import { Module , NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menu  ,menu_locale } from './entities' ;
import { MenuController } from './controller' ;

import { MenuService } from './service/menu.service' ;
const entities = [ menu , menu_locale ] ;
@Module({
	imports: [
		TypeOrmModule.forFeature( entities )
	],
	controllers: [
		MenuController
	],
	providers: [ MenuService ],
})
export class MenuModule{}