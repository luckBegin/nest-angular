import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { staff , staff_depart , staff_role } from './entities' ;
import { StaffController } from './controller' ;
import { StaffService } from './service/staff.service' ;
import { role } from "../role/entities"
import { depart } from "../depart/entities"

const entities = [ staff , staff_depart , staff_role  , role , depart ] ;
@Module({
	imports: [
		TypeOrmModule.forFeature( entities )
	],
	controllers: [
		StaffController
	],
	providers: [ StaffService ],
})
export class StaffModule{};