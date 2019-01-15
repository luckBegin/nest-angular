import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../share/entities' ;
import {IsNotEmpty, IsString } from 'class-validator' ;
@Entity()
export class staff extends BasicEntity{
	@ApiModelProperty( { description : "登录名" } )
	@Column()
	username : string ;


	@ApiModelProperty({ description : "密码"})
	@Column()
	password : string ;

	@ApiModelProperty({ description : "备注"})
	@Column()
	description : string ;

	@ApiModelProperty({description : "手机号"})
	@Column()
	phoneNumber : string ;
};

export class StaffDTO extends BasicEntity{
	@ApiModelProperty( { description : "登录名" } )
	@IsNotEmpty()
	username : string ;

	@ApiModelProperty({ description : "密码"})
	password : string ;

	@ApiModelProperty({ description : "备注"})
	description : string ;

	@ApiModelProperty({description : "手机号"})
	phoneNumber : string ;
};