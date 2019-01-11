import { Module , NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { depart } from './entities/depart.entity' ;
import { DepartController } from './controller' ;

import { DepartService } from './service/depart.service' ;
const entities = [ depart ] ;
@Module({
	imports: [
		TypeOrmModule.forFeature( entities )
	],
	controllers: [
		DepartController
	],
	providers: [ DepartService ],
})
export class DepartModule{}