///<reference path="jquery.d.ts"/>
module Filter {
	export enum Type { digit, alpha, alnum }
	export enum Transform { uppercase, lowercase }
	export interface Options {
		type: string;
		length: number;
		min: number;
		max: number;
		uppercase: boolean;
		lowercase: boolean;
		transform: string;
		valueChange(element: HTMLInputElement, value: string): void;
	}
	export interface IE8HTMLInputElement extends HTMLInputElement {
		attachEvent(type: string, listener: EventListenerOrEventListenerObject): void;
	}
	export var enumHasValue = (e, v: string): boolean=> {
		for (var member in e) {
			if (member === v) {
				return true;
			}
		}
		return false;
	}
	export class Input {
		private options: Options;
		private element: HTMLInputElement;
		constructor(options: Options, element: HTMLInputElement) {
			this.options = options;
			this.element = element;
		}
		digitFilter() {
			var value: any = this.element.value,
				options = this.options,
				max = options.max,
				min = options.min;
			if (value === undefined) {
				this.element.value = "";
				return false;
			} else if (value === "") {
				return false;
			} else if (!/^[1-9]\d*$/.test(value) || value > max) {
				//如果输出不符合预期
				value = value.replace(/[^\d]+/g, "");
				if (min !== null && !isNaN(min) && value < min) {
					value = min;
				}
				if (max !== null && !isNaN(max) && value > max) {
					value = max;
				}
				this.element.value = value;
				return false;
			}
		}
		alphaFilter() {
			var value: any = this.element.value,
				options = this.options;
			if (value === undefined) {
				this.element.value = "";
				return false;
			} else if (value === "") {
				return false;
			} else {
				var reg: RegExp;
				if (options.uppercase && options.lowercase) {
					reg = /[^A-Za-z]+/g;
				} else if (options.uppercase && !options.lowercase) {
					reg = /[^A-Z]+/g;
				} else {
					reg = /[^a-z]+/g;
				}
				if (reg.test(value) && value !== "") {
					value = value.replace(reg, "");
					if (options.transform === "uppercase") {
						value = value.toUpperCase();
					} else if (options.transform === "lowercase") {
						value = value.toLowerCase();
					}
					this.element.value = value;
					return false;
				} else if (!isNaN(options.length) && value.length > options.length) {
					this.element.value = value.slice(0, options.length);
					return false;
				}
			}
			return true;
		}
		alnumFilter() {
			var value = this.element.value,
				options = this.options;
			if (value === undefined) {
				this.element.value = "";
				return false;
			} else if (value === "") {
				return false;
			} else {
				var reg;
				if (options.uppercase && options.lowercase) {
					reg = /[^A-Za-z0-9]+/g;
				} else if (options.uppercase && !options.lowercase) {
					reg = /[^A-Z0-9]+/g;
				} else {
					reg = /[^a-z0-9]+/g;
				}
				if (reg.test(value)) {
					value = value.replace(reg, "");
					if (options.transform === "uppercase") {
						value = value.toUpperCase();
					} else if (options.transform === "lowercase") {
						value = value.toLocaleLowerCase();
					}
					if (!isNaN(options.length)) {
						value = value.slice(0, options.length);
					}
					this.element.value = value;
					return false;
				} else if (!isNaN(options.length) && value.length > options.length) {
					this.element.value = value.slice(0, options.length);
					return false;
				}
			}
			return true;
		}
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
			var elements:JQuery= this;
			return elements.each(() => {
				var element: Filter.IE8HTMLInputElement = this,
					valueChange = options.valueChange,
					inputFilter = new Filter.Input(options, element),
					eventHandler = (): void=> {
						if ("\v" === "v") {
							//IE8及以下的版本中
							//inputFilter[options.type + "Filter"]()第一次执行永远返回true
							//如果有第二次，则返回false
							//以此限制valueChange()只能执行一次
							if (inputFilter[options.type + "Filter"]()) {
								valueChange(element, element.value);
							}
						} else {
							inputFilter[options.type + "Filter"]();
							valueChange(element, element.value);
						}
					}
				try {
					if (element.tagName !== "INPUT" || element.type === "checkbox" || element.type === "radio") {
						throw new TypeError("The Element is not sport this plugin");
					}
					if (element.addEventListener) {
						element.addEventListener("input", eventHandler, false);
					} else {
						element.attachEvent("onpropertychange", function() {
							return eventHandler.call(element);
						});
					}
				} catch (e) {
					console.error(e.name + ": " + e.message);
				}
				return this;
			});

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
		"valueChange": (element, value) => { }
	}
})(jQuery);