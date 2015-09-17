///<reference path="jquery.d.ts"/>
enum Type { digit, alpha, alnum }
enum Transform { null, uppercase, lowercase }
interface Lengthwise {
	length: number;
}
interface Options {
	type?: Type;
	length?: number;
	min?: number;
	max?: number;
	uppercase?: boolean;
	lowercase?: boolean;
	transform?: Transform;
	valueChange?: (element: Object, value: string) => string;
}
var OptionsDefault = (): Options=> (
	{
        type: Type.alnum,
        length: 0,
        min: 0,
        max: Infinity,
        uppercase: true,
        lowercase: true,
        transform: null,
        valueChange: function(element, value) {
            return null;
        }
	}
	);

//sdfsdf
class InputFilter {
	private options: Options = OptionsDefault();
	constructor(theOptions?: Options) {
		//this.options=theOptions;
	}
	getValue(): Options {
		return this.options;
	}
}
var enumHasValue = <T>(e:Array<string>, v:T): boolean=> {
	for (var member in e) {
		if (member === v) {
			return true;
		}
	}
	return false;
}
// (($)=>{
// 	$.fn.inputFilter=(
// 		type="album",
// 		length=0,
// 		min=0,
// 		max=Infinity,
// 		uppercase=true,
// 		lowercase=true,
// 		transform=null,
// 		valueChange=(element,value)=>null
// 		)=>{
			
// 		};
// })(jQuery);
var test = (
	type = "album",
	length = 0,
	min = 0,
	max = Infinity,
	uppercase = true,
	lowercase = true,
	transform = null,
	valueChange = (element, value) => null
	) => {
	return type;
};
console.log(test());