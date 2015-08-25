;
if (typeof jQuery === 'undefined') {
	throw new Error("InputFilter's JavaScript requires jQuery")
}
(function($, win, doc, undefined) {
	'use strict';

	var InputFilter = function(element, options) {
		this.options = options;
		this.element = element;
	};
	InputFilter.prototype = {
		digitFilter: function() {
			var value = this.element.value,
				options = this.options;
			if (value === undefined || value === "") {
				this.element.value = "";
				return false;
			} else if (!/^[1-9]\d*$/.test(value) || value > options.max) {
				//如果输出不符合预期，则进行过滤
				value = value.replace(/[^\d]+/g, "");
				if (options.min !== null && value < options.min) {
					value = options.min;
				}
				if (options.max !== null && value > options.max) {
					value = options.max;
				}
				this.element.value = value;
				return false;
			}
			return true;
		},
		alphaFilter: function() {
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
				} else if (typeof options.length === "number" && value.length > options.length) {
					this.element.value = value.slice(0, options.length);
					return false;
				}
			}
			return true;
		},
		alnumFilter: function() {
			var value = this.element.value,
				options = this.options;
			if (value === undefined) {
				value = "";
			} else {
				var reg;
				if (options.uppercase && options.lowercase) {
					reg = /[^A-Za-z0-9]+/g;
				} else if (options.uppercase && !options.lowercase) {
					reg = /[^A-Z0-9]+/g;
				} else {
					reg = /[^a-z0-9]+/g;
				}
				value = value.replace(reg, "");
				if (options.transform === "uppercase") {
					value = value.toUpperCase();
				} else if (options.transform === "lowercase") {
					value = value.toLocaleLowerCase();
				}
				if (typeof options.length === "number") {
					value = value.slice(0, options.length);
				}
			}
			return value;
		}
	};

	$.fn.inputFilter = function(options) {
		options = $.extend({}, $.fn.inputFilter.options, options || {});
		var elements = this;
		return elements.each(function() {
			var element = this,
				valueChange = options.valueChange,
				inputFilter = new InputFilter(element, options),
				mark = true,
				eventHandler = function(event) {
					//inputFilter[options.type + "Filter"]()第一次执行永远返回true
					//如果有第二次，则返回false
					//以此限制valueChange()只能执行一次
					if (inputFilter[options.type + "Filter"]()) {
						valueChange(element, element.value);
					}
					/*var filterValue = inputFilter[options.type + "Filter"]();
					if (typeof options.length === "number" && options.type !== "digit") {
						filterValue = filterValue.slice(0, options.length);
					}
					
					element.value = filterValue;
					return false;*/
					//console.log("value: " + element.value);
				};
			try {
				if (element.addEventListener) {
					element.addEventListener("input", eventHandler, false);
				} else {
					element.attachEvent("onpropertychange", function(event) {
						return eventHandler.call(element, event);
					});
				}
			} catch (e) {
				throw new Error(e.name + ": " + e.message);
			}
			return this;
		});
	};
	$.fn.inputFilter.options = {
		"type": "alnum",
		"length": null,
		"min": 0,
		"max": Infinity,
		"uppercase": true,
		"lowercase": true,
		"transform": null,
		"valueChange": function(element, value) {}

	};
})(jQuery, window, document);