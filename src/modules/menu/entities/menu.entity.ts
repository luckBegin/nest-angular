import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../share/entities' ;
import {IsNotEmpty, IsString } from 'class-validator' ;
import {  MenuLocaleDTO } from './menu_locale.entity' ;
@Entity()
export class menu extends BasicEntity{
	@ApiModelProperty( { description : "按钮名成"})
	@Column()
	buttonKey : string ;

	@ApiModelProperty( { description : "是否按钮"})
	@Column()
	isButton : number ;

	@ApiModelProperty( { description : "子菜单"})
	children : menu[] ;

	@ApiModelProperty( { description : "控制器ID"})
	controllerIds : number[] ;

	@ApiModelProperty({ description : "是否启用"})
	@Column()
	enabled : number ;

	@ApiModelProperty( { description : "菜单图标"})
	@Column()
	iconPath : string ;

	@ApiModelProperty( { description : "是否需要权限"})
	@Column()
	isAuth: number ;


	@ApiModelProperty({ description : "父级ID"})
	@Column()
	parentId : number ;

	@ApiModelProperty({description : "菜单地址"})
	@Column()
	url : string ;
};

export class MenuDTO extends BasicEntity{
	@ApiModelProperty( { description : "地址" } )
	@IsNotEmpty()
	url : string ;

	@ApiModelProperty( { description : "图标" } )
	iconPath : string ;

	@ApiModelProperty( { description : "菜单语言" } )
	menuDescriptionVOS : MenuLocaleDTO[] ;

	@ApiModelProperty({ description : "子菜单"})
	children : MenuLocaleDTO[] ;
};