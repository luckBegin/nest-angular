import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../share/entities' ;
import {IsNotEmpty, IsString} from 'class-validator' ;
@Entity()
export class menu_locale extends BasicEntity{
	@ApiModelProperty({ description : "菜单描述"})
	@Column()
	description : string ;

	@ApiModelProperty( { description : "是否启用"})
	@Column()
	enabled : number ;

	@ApiModelProperty({description : "I18N"})
	locale : string ;

	@ApiModelProperty({description : "菜单ID"})
	@Column()
	menuId : number
};

export class MenuLocaleDTO extends BasicEntity{
	@ApiModelProperty( { description : "菜单名称" } )
	@IsNotEmpty()
	description : string ;

	@ApiModelProperty( { description : "菜单名称" } )
	@IsNotEmpty()
	locale : string ;

	@ApiModelProperty( { description : "菜单ID" } )
	@IsNotEmpty()
	menuId : number ;

};