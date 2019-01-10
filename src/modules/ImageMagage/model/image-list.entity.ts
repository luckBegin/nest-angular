import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
@Entity()
export class image extends BaseEntity{

	@ApiModelProperty( { description : "主键"} )
	@PrimaryGeneratedColumn()
	id : number ;

	@ApiModelProperty( { description : "图片路径" })
	@Column()
	path : string ;

	@ApiModelProperty( { description : "创建用户"} )
	@Column()
	createUser : string ;

	@ApiModelProperty( { description : "创建时间" } )
	@Column()
	createTime : string ;

	@ApiModelProperty( { description : "更新时间" } )
	@Column()
	modifyTime : string ;

	@ApiModelProperty( { description : "创建用户" } )
	@Column()
	modifyUser : string ;

	@ApiModelProperty( { description : "分类ID" } )
	@Column()
	classifyId : number ;

	@ApiModelProperty( { description : "项目ID" } )
	@Column()
	projectId : number ;
}