import { Entity, Column } from 'typeorm' ;
import { BasicEntity } from '../../../share/entities' ;
@Entity()
export class staff_role extends BasicEntity{
	@Column()
	staffId : number ;

	@Column()
	roleId : number;
};