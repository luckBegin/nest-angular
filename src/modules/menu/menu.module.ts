import { Module , NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menu  ,menu_locale } from './entities' ;
import { MenuController } from './controller' ;

import { MenuService } from './service/menu.service' ;
import {role} from "../role/entities"
import {staff} from "../staff/entities"
const entities = [ menu , menu_locale  , role , staff ] ;
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