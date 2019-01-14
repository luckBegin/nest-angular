import { Entity, Column } from 'typeorm' ;
import { BasicEntity } from '../../../share/entities' ;
@Entity()
export class role_menu extends BasicEntity{
	@Column()
	menuId : number ;

	@Column()
	roleId : number ;
};
