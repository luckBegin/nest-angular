import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { role , role_menu } from './entities' ;
import { RoleController } from './controller' ;
import { RoleService } from './service/role.service' ;
const entities = [ role , role_menu ] ;

@Module({
	imports: [
		TypeOrmModule.forFeature( entities )
	],
	controllers: [
		RoleController
	],
	providers: [ RoleService ],
})
export class RoleModule{};