///<reference path="jquery.d.ts"/>
enum Type { digit = 1, alpha = 2, alnum = 3 }
enum Transform { uppercase = 1, lowercase }
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
var enumHasValue = <T>(e: Array<string>, v: string): boolean=> {
	for (var member of e) {
		if (member === v) {
			return true;
		}
	}
	return false;
}
(($) => {
	$.fn.inputFilter = (
		type = "album",
		length = 0,
		min = 0,
		max = Infinity,
		uppercase = true,
		lowercase = true,
		transform = null,
		valueChange = (element, value) => null
		) => {
	};
})(jQuery);