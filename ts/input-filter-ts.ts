///<reference path="jquery.d.ts"/>
enum Type { digit, alpha, alnum }
enum Transform{uppercase,lowercase}
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
(($, win, doc, undefined) => {
	class InputFilter {
		constructor(private options: Options, private element: Object) {

		}
	}
})(jQuery, window, document, undefined);