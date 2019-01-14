import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../share/entities' ;
import {IsNotEmpty, IsString } from 'class-validator' ;
@Entity()
export class role extends BasicEntity{
	@ApiModelProperty( { description : "按钮名成"})
	@Column()
	name : string ;

	@ApiModelProperty( { description : "是否按钮"})
	@Column()
	description : string ;

	@ApiModelProperty( { description : "子菜单"})
	enabled : number ;

};

export class RoleDTO extends BasicEntity{
	@ApiModelProperty( { description : "地址" } )
	@IsNotEmpty()
	name : string ;

	@ApiModelProperty( { description : "启用" })
	enabled : number ;

	@ApiModelProperty( { description : "描述" })
	description : number ;

	@ApiModelProperty( { description : "菜单" })
	menuDTOS : any[] ;
};