var Filter;
(function (Filter) {
    (function (Type) {
        Type[Type["digit"] = 0] = "digit";
        Type[Type["alpha"] = 1] = "alpha";
        Type[Type["alnum"] = 2] = "alnum";
    })(Filter.Type || (Filter.Type = {}));
    var Type = Filter.Type;
    (function (Transform) {
        Transform[Transform["none"] = 0] = "none";
        Transform[Transform["uppercase"] = 1] = "uppercase";
        Transform[Transform["lowercase"] = 2] = "lowercase";
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
    Filter.checkEnum = function (value, e) {
        try {
            var type;
            if (value === String(value)) {
                if (value in e) {
                    type = value;
                }
            }
            if (type === undefined) {
                throw new TypeError("\"The parameter " + value + " is incorrect\"");
            }
        }
        catch (error) {
            console.error(error.name + ":" + error.message);
        }
        return type;
    };
    var Input = (function () {
        function Input(options, element) {
            this.options = options;
            this.element = element;
        }
        Input.prototype.digitFilter = function () {
            //只接受数字
            var value = this.element.value, options = this.options, max = options.max, min = options.min;
            if (value === undefined) {
                this.element.value = "";
                return false;
            }
            else if (value === "") {
                return false;
            }
            else if (!/^[1-9]\d*$/.test(value) || value > max) {
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
            return true;
        };
        Input.prototype.alphaFilter = function () {
            //只接受字母
            var value = this.element.value, options = this.options;
            if (value === undefined) {
                this.element.value = "";
                return false;
            }
            else if (value === "") {
                return false;
            }
            else {
                var reg;
                if (options.uppercase && options.lowercase) {
                    reg = /[^A-Za-z]+/g;
                }
                else if (options.uppercase && !options.lowercase) {
                    reg = /[^A-Z]+/g;
                }
                else {
                    reg = /[^a-z]+/g;
                }
                if (reg.test(value) && value !== "") {
                    value = value.replace(reg, "");
                    this.element.value = value;
                    return false;
                }
                else if (!isNaN(options.length) && value.length > options.length) {
                    this.element.value = value.slice(0, options.length);
                    return false;
                }
                else if (options.transform === "uppercase" && /[a-z]+/g.test(value)) {
                    this.element.value = value.toUpperCase();
                    return false;
                }
                else if (options.transform === "lowercase" && /[A-Z]+/g.test(value)) {
                    this.element.value = value.toLowerCase();
                    return false;
                }
            }
            return true;
        };
        Input.prototype.alnumFilter = function () {
            //字母与数字
            var value = this.element.value, options = this.options;
            if (value === undefined) {
                this.element.value = "";
                return false;
            }
            else if (value === "") {
                return false;
            }
            else {
                var reg;
                if (options.uppercase && options.lowercase) {
                    reg = /[^A-Za-z0-9]+/g;
                }
                else if (options.uppercase && !options.lowercase) {
                    reg = /[^A-Z0-9]+/g;
                }
                else {
                    reg = /[^a-z0-9]+/g;
                }
                if (reg.test(value)) {
                    value = value.replace(reg, "");
                    if (!isNaN(options.length)) {
                        value = value.slice(0, options.length);
                    }
                    this.element.value = value;
                    return false;
                }
                else if (!isNaN(options.length) && value.length > options.length) {
                    this.element.value = value.slice(0, options.length);
                    return false;
                }
                else if (options.transform === "uppercase" && /[a-z]+/g.test(value)) {
                    this.element.value = value.toUpperCase();
                    return false;
                }
                else if (options.transform === "lowercase" && /[A-Z]+/g.test(value)) {
                    this.element.value = value.toLowerCase();
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
        try {
            options.type = Filter.checkEnum(options.type, Filter.Type);
            options.transform = Filter.checkEnum(options.transform, Filter.Transform);
            var elements = this;
            return elements.each(function () {
                var element = this, valueChange = options.valueChange, inputFilter = new Filter.Input(options, element), eventHandler = function () {
                    if ("\v" === "v") {
                        if (inputFilter[options.type + "Filter"]()) {
                            valueChange(element, element.value);
                        }
                    }
                    else {
                        inputFilter[options.type + "Filter"]();
                        valueChange(element, element.value);
                    }
                };
                try {
                    if (element.tagName === "INPUT" && element.type === "text") {
                        if (element.addEventListener) {
                            element.addEventListener("input", eventHandler, false);
                        }
                        else {
                            element.attachEvent("onpropertychange", function () {
                                return eventHandler.call(element);
                            });
                        }
                    }
                    else {
                        throw new TypeError("The Element is not sport this plugin");
                    }
                }
                catch (e) {
                    console.error(e.name + ": " + e.message);
                }
                return this;
            });
        }
        catch (error) {
            console.error(error.name + ":" + error.message);
        }
    };
    $.fn.inputFilter.options = {
        "type": "alnum",
        "length": Infinity,
        "min": 0,
        "max": Infinity,
        "uppercase": true,
        "lowercase": true,
        "transform": "none",
        "valueChange": function (element, value) {
        }
    };
})(jQuery);
