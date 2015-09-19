var _this = this;
var Filter;
(function (Filter) {
    (function (Type) {
        Type[Type["digit"] = 0] = "digit";
        Type[Type["alpha"] = 1] = "alpha";
        Type[Type["alnum"] = 2] = "alnum";
    })(Filter.Type || (Filter.Type = {}));
    var Type = Filter.Type;
    (function (Transform) {
        Transform[Transform["uppercase"] = 0] = "uppercase";
        Transform[Transform["lowercase"] = 1] = "lowercase";
    })(Filter.Transform || (Filter.Transform = {}));
    var Transform = Filter.Transform;

    Filter.enumHasValue = function (e, v) {
        for (var member in e) {
            if (member === v) {
                return true;
            }
        }
        return false;
    };
    var Input = (function () {
        function Input(options, element) {
            this.options = options;
            this.element = element;
        }
        Input.prototype.digitFilter = function () {
            var value = this.element.value, options = this.options, max = options.max, min = options.min;
            if (value === undefined) {
                this.element.value = "";
                return false;
            } else if (value === "") {
                return false;
            } else if (!/^[1-9]\d*$/.test(value) || value > max) {
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
        };
        Input.prototype.alphaFilter = function () {
            var value = this.element.value, options = this.options;
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
                } else if (!isNaN(options.length) && value.length > options.length) {
                    this.element.value = value.slice(0, options.length);
                    return false;
                }
            }
            return true;
        };
        Input.prototype.alnumFilter = function () {
            var value = this.element.value, options = this.options;
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
        };
        return Input;
    })();
    Filter.Input = Input;
})(Filter || (Filter = {}));
(function ($) {
    $.fn.inputFilter = function (options) {
        options = $.extend({}, $.fn.inputFilter.options, options || {});
        try  {
            if (!Filter.enumHasValue(Filter.Type, options.type)) {
                throw new TypeError('Parameter "type" must be in ["digit","alpha","alnum"]');
            }
            if (!Filter.enumHasValue(Filter.Transform, options.transform)) {
                throw new TypeError('Parameter "transform" must be in [null,"uppercase","lowercase"]');
            }
            var elements = _this;
            return elements.each(function () {
                var element = _this, valueChange = options.valueChange, inputFilter = new Filter.Input(options, element), eventHandler = function () {
                    if ("\v" === "v") {
                        if (inputFilter[options.type + "Filter"]()) {
                            valueChange(element, element.value);
                        }
                    } else {
                        inputFilter[options.type + "Filter"]();
                        valueChange(element, element.value);
                    }
                };
                try  {
                    if (element.tagName !== "INPUT" || element.type === "checkbox" || element.type === "radio") {
                        throw new TypeError("The Element is not sport this plugin");
                    }
                    if (element.addEventListener) {
                        element.addEventListener("input", eventHandler, false);
                    } else {
                        element.attachEvent("onpropertychange", function () {
                            return eventHandler.call(element);
                        });
                    }
                } catch (e) {
                    console.error(e.name + ": " + e.message);
                }
                return _this;
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
        "transform": null,
        "valueChange": function (element, value) {
        }
    };
})(jQuery);
