;(function ($, win, doc, undefined) {
    'use strict';
    var EventHandler = function (element, options) {
        this.options = options;
        this.element = element;
    };
    EventHandler.prototype = {
        digitFilter: function () {
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
        alphaFilter: function () {
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
        alnumFilter: function () {
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
    $.fn.inputFilter = function (options) {
        options = $.extend({}, $.fn.inputFilter.options, options || {});
        var elements = this;
        return elements.each(function () {
            var element = this,
                eventHandler = new EventHandler(element, options);
            try {
                if ("\v" === "v") {
                    element.attachEvent("onpropertychange", function () {
                        return element.value = eventHandler[options.type + "Filter"]();
                    });
                } else {
                    element.addEventListener("input", function () {
                        return element.value = eventHandler[options.type + "Filter"]();
                    });
                }
            } catch (e) {
                console.error(e.name + ": " + e.message);
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
        "transform": "uppercase"
    };
})(jQuery, window, document);