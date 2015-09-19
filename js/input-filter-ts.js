///<reference path="jquery.d.ts"/>
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
            return null;
        }
    };
})(jQuery);
