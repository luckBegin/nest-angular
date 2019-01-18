import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from "../../../share/entities" ;

@Entity()
export class image extends BasicEntity{
	@ApiModelProperty( { description : "图片路径" })
	@Column()
	path : string ;

	@ApiModelProperty( { description : "分类ID" } )
	@Column()
	classifyId : number ;

	@ApiModelProperty( { description : "项目ID" } )
	@Column()
	projectId : number ;
}