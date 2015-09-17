///<reference path="jquery.d.ts"/>
enum Type { digit=1, alpha=2, alnum=3 }
enum Transform{uppercase=1,lowercase}
interface Options {
	type: Type;
	length: number;
	min: number;
	max: number;
	uppercase: boolean;
	lowercase: boolean;
	transform: Transform;
	valueChange: (element:Object,value:string) => string;
}
class InputFilter {
	constructor(private options: Options, private element: Object) {
		
	}

}