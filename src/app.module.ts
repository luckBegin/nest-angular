import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageManageModule } from "./modules/ImageMagage/ImageManage.module" ;

// basic module
import { DepartModule } from './modules/depart/depart.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './modules/menu/menu.module' ;
import { RoleModule } from './modules/role/role.module' ;

const modules = [
	ImageManageModule ,
	DepartModule ,
	MenuModule ,
	RoleModule
];

@Module({
    imports: [ ...modules , TypeOrmModule.forRoot({
		"type": "mysql",
		"host": "localhost",
		"port": 3306,
		"username": "root",
		"password": "root",
		"database": "sys",
		"entities": [
			"src/**/**.entity{.ts,.js}"
		],
		"synchronize": false // 自动同步entities
	})],
    controllers: [AppController],
    providers: [ AppService ],

})
export class AppModule{}