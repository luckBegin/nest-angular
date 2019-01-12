import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../share/entities' ;
import {IsNotEmpty, IsString} from 'class-validator' ;

@Entity()
export class depart extends BasicEntity{
	@ApiModelProperty( { description : "部门名称" })
	@Column()
	name : string ;

	@ApiModelProperty( { description : "备注" } )
	@Column()
	description ?: string ;

	@ApiModelProperty( { description : "父级ID"})
	@Column()
	parentId ?: number ;
};

export class departDTO {
	@IsNotEmpty()
	name : string ;

	description : string ;

	parentId : number ;
};