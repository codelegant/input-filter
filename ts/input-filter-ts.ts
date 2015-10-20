///<reference path="jquery.d.ts"/>
module Filter {
    export enum Type { digit, alpha, alnum }
    export enum Transform { none, uppercase, lowercase }
    export interface Options {
        type?: string;
        length?: number;
        min?: number;
        max?: number;
        uppercase?: boolean;
        lowercase?: boolean;
        transform?: string;
        valueChange?: (element:HTMLInputElement, value:string) => void;
    }

    export interface IE8HTMLInputElement extends HTMLInputElement {
        //attachEvent(type: string, listener: EventListenerOrEventListenerObject): void;
        attachEvent(event:string, listener:EventListener): boolean;
    }
    export var enumHasValue = (e, v:string):boolean=> {
        for (var member in e) {
            if (member === v) {
                return true;
            }
        }
        return false;
    };
    export var checkEnum = <E>(value:E|string, e:any):string => {
        try {
            var type;
            if (value === String(value)) {
                if (<string>value in e) {
                    type = <E>value;
                }
            }
            if (type === undefined) {
                throw new TypeError(`"The parameter ${value} is incorrect"`)
            }
        } catch (error) {
            console.error(error.name + ":" + error.message);
        }
        return type;
    };
    export class Input {
        private options:Options;
        private element:HTMLInputElement;

        constructor(options:Options, element:HTMLInputElement) {
            this.options = options;
            this.element = element;
        }

        digitFilter() {
            //只接受数字
            var value:any = this.element.value,
                options   = this.options,
                max       = options.max,
                min       = options.min;
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
            return true;
        }

        alphaFilter() {
            //只接受字母
            var value:any = this.element.value,
                options   = this.options;
            if (value === undefined) {
                this.element.value = "";
                return false;
            } else if (value === "") {
                return false;
            } else {
                var reg:RegExp;
                if (options.uppercase && options.lowercase) {
                    reg = /[^A-Za-z]+/g;
                } else if (options.uppercase && !options.lowercase) {
                    reg = /[^A-Z]+/g;
                } else {
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
                } else if (options.transform === "uppercase" && /[a-z]+/g.test(value)) {
                    this.element.value = value.toUpperCase();
                    return false;
                } else if (options.transform === "lowercase" && /[A-Z]+/g.test(value)) {
                    this.element.value = value.toLowerCase();
                    return false;
                }
            }
            return true;
        }

        alnumFilter() {
            //字母与数字
            var value:any = this.element.value,
                options   = this.options;
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
                    if (!isNaN(options.length)) {
                        value = value.slice(0, options.length);
                    }
                    this.element.value = value;
                    return false;
                } else if (!isNaN(options.length) && value.length > options.length) {
                    this.element.value = value.slice(0, options.length);
                    return false;
                } else if (options.transform === "uppercase" && /[a-z]+/g.test(value)) {
                    this.element.value = value.toUpperCase();
                    return false;
                } else if (options.transform === "lowercase" && /[A-Z]+/g.test(value)) {
                    this.element.value = value.toLowerCase();
                    return false;
                }
            }
            return true;
        }
    }
}
(($) => {
    $.fn.inputFilter = function (options:Filter.Options) {
        options = $.extend({}, $.fn.inputFilter.options, options || {});
        try {
            options.type = Filter.checkEnum<Filter.Type>(options.type, Filter.Type);
            options.transform = Filter.checkEnum<Filter.Transform>(options.transform, Filter.Transform);
            var elements:JQuery = this;
            return elements.each(function () {
                var element:Filter.IE8HTMLInputElement = this,
                    valueChange                        = options.valueChange,
                    inputFilter                        = new Filter.Input(options, element),
                    eventHandler                       = ():void=> {
                        if ("\v" === "v") {
                            if (inputFilter[options.type + "Filter"]()) {
                                valueChange(element, element.value);
                            }
                        } else {
                            inputFilter[options.type + "Filter"]();
                            valueChange(element, element.value);
                        }
                    };
                try {
                    if (element.tagName === "INPUT" && element.type === "text") {
                        if (element.addEventListener) {
                            element.addEventListener("input", eventHandler, false);
                        } else {
                            element.attachEvent("onpropertychange", function () {
                                return eventHandler.call(element);
                            });
                        }
                    } else {
                        throw new TypeError("The Element is not sport this plugin");
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
        "type"       : "alnum",
        "length"     : Infinity,
        "min"        : 0,
        "max"        : Infinity,
        "uppercase"  : true,
        "lowercase"  : true,
        "transform"  : "none",
        "valueChange": (element, value) => {
        }
    }
})(jQuery);