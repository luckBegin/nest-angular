import { Entity, Column } from 'typeorm' ;
import { BasicEntity } from '../../../share/entities' ;
@Entity()
export class staff_depart extends BasicEntity{
	@Column()
	staffId : number ;

	@Column()
	departId : number;
};