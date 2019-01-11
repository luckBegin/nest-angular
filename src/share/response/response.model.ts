class Model{
	code : number ;
	message : string ;
	success : boolean ;
	data : any ;
	page : Page;

	constructor( data : any , page : Page , message : string , code : number , success : boolean = true ){
		this.data = data ;
		this.success = success ;
		this.message = message ;
		this.page = page ;
		this.code = code ;
	};
}
class Page {
	pageSize: number
	totalNumber: number
	totalPage: number ;

	constructor( pageSize : number , totalNumber : number , totalPage : number ){
		this.pageSize = pageSize ;
		this.totalNumber = totalNumber ;
		this.totalPage = totalPage ;
	};
};


export class Response {
	static succes : Function = function(data : any = null , page : Page  = null , message : string =  null , code : number = null ) : Model {
		return new Model( data , page , message , code ) ;
	};

	static error : Function = function (data : any = null , page : Page  = null , message : string =  null , code : number = null )  : Model {
		return new Model( data , page , message , code , false ) ;
	};

	static page : Function = function( pageSize : number = 0 , totalNumber : number =  0 , totalPage : number = 0  ) : Page {
		return new Page(pageSize , totalNumber , totalPage )
	};
}