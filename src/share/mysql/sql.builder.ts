class Sql{

	private table : string = '' ;

	private fields : string[] | string;

	private _sql = '' ;

	select( fields : string[] | string = '*'){
		this.fields = fields ;

		this._sql = `select ${ this.fields.toString() } ` ;
		return this
	};

	from(tableName : string){
		this.table = tableName ;

		this._sql += ` from ${ this.table }` ;

		return this
	};

	where( conditions : string[] | string ){
		this._sql += ' where' ;
		if(conditions instanceof  Array){
			const _this = this ;
			conditions.forEach( item => {
				_this._sql += ` ${ item } ?` ;
			});
		}else{
			this._sql +=  ` ${ conditions } ? ` ;
		};
		return this
	};

	delete(){

	};

	get():string{

		return this._sql ;
	}
};


export class Mysql {
	static SqlBuilder() : Sql{
		return new Sql ;
	}
};