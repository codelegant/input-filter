///<reference path="../ts/jquery.d.ts"/>
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
var enumHasValue = (e, v: string): boolean=> {
	for (var member in e) {
		if (member === v) {
			return true;
		}
	}
	return false;
}
(($) => {
	$.fn.inputFilter = (
		type,
		length,
		min,
		max,
		uppercase,
		lowercas,
		transform,
		valueChange
		) => {
		var {type,length,min,max,uppercase,lowercas,transform,valueChange}=$.fn.inputFilter.options;
		try {
			if (!enumHasValue(Type, type)) {
				throw new TypeError('Parameter "type" must be in ["digit","alpha","alnum"]');
			}
			if (!enumHasValue(Transform, transform)) {
				throw new TypeError('Parameter "transform" must be in [null,"uppercase","lowercase"]');
			}
		} catch (error) {
			console.error(error.name + ":" + error.message);
		}

	};
	$.fn.inputFilter.options = {
		"type": "alnum",
		"length": null,
		"min": 0,
		"max": Infinity,
		"uppercase": true,
		"lowercase": true,
		"transform": null, //也可以通过样式控制
		"valueChange": (element, value) => null
	}
})(jQuery);