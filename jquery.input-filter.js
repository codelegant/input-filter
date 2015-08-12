;if (typeof jQuery === 'undefined') {
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
            if (value === undefined) {
                value = "";
            } else {
                value = value.replace(/[^\d]+/g, "");
                if (options.min !== null && value < options.min) {
                    value = options.min;
                }
                if (options.max !== null && value > options.max) {
                    value = options.max;
                }
            }
            return value;
        },
        alphaFilter: function() {
            var value = this.element.value,
                options = this.options;
            if (value === undefined) {
                value = "";
            } else {
                var reg;
                if (options.uppercase && options.lowercase) {
                    reg = /[^A-Za-z]+/g;
                } else if (options.uppercase && !options.lowercase) {
                    reg = /[^A-Z]+/g;
                } else {
                    reg = /[^a-z]+/g;
                }
                value = value.replace(reg, "");
                if (options.transform === "uppercase") {
                    value = value.toUpperCase();
                } else if (options.transform === "lowercase") {
                    value = value.toLocaleLowerCase();
                }
            }
            return value;
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
                eventHandler = function() {
                    this.value = inputFilter[options.type + "Filter"]();
                    valueChange(this, this.value);
                };
            try {
                if ("\v" === "v") {
                    element.attachEvent("onpropertychange", eventHandler);
                } else {
                    element.addEventListener("input", eventHandler);
                }
            } catch (e) {
                throw new Error(e.name + ": " + e.message);
            }
            return this;
        });
    };
    $.fn.inputFilter.options = {
        "type": "alnum",
        "min": 0,
        "max": Infinity,
        "uppercase": true,
        "lowercase": true,
        "transform": null,
        "valueChange": function(element, value) {}

    };
})(jQuery, window, document);