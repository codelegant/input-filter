///<reference path="jquery.d.ts"/>
module Filter {
	export enum Type { digit, alpha, alnum }
	export enum Transform { uppercase, lowercase }
	export interface Options {
		type?: string;
		length?: number;
		min?: number;
		max?: number;
		uppercase?: boolean;
		lowercase?: boolean;
		transform?: string;
		valueChange?: (element: Object, value: string) => string;
	}
	export var enumHasValue = (e, v: string): boolean=> {
		for (var member in e) {
			if (member === v) {
				return true;
			}
		}
		return false;
	}
}
(($) => {
	$.fn.inputFilter = (options: Filter.Options) => {
		options = $.extend({}, $.fn.inputFilter.options, options || {});
		try {
			if (!Filter.enumHasValue(Filter.Type, options.type)) {
				throw new TypeError('Parameter "type" must be in ["digit","alpha","alnum"]');
			}
			if (!Filter.enumHasValue(Filter.Transform, options.transform)) {
				throw new TypeError('Parameter "transform" must be in [null,"uppercase","lowercase"]');
			}
		} catch (error) {
			console.error(error.name + ":" + error.message);
		}

	};
	$.fn.inputFilter.options = {
		"type": "alnum",
		"length": 0,
		"min": 0,
		"max": Infinity,
		"uppercase": true,
		"lowercase": true,
		"transform": null, //也可以通过样式控制
		"valueChange": (element, value) => null
	}
})(jQuery);