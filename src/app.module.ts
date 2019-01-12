import { Module , NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageManageModule } from "./modules/ImageMagage/ImageManage.module" ;
import { DepartModule } from './modules/depart/depart.module'
import { TypeOrmModule } from '@nestjs/typeorm';

const modules = [
	ImageManageModule ,
	DepartModule
]
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
		"synchronize": true
	})],
    controllers: [AppController],
    providers: [ AppService ],

})
export class AppModule{}