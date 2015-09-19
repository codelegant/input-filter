///<reference path="../ts/jquery.d.ts"/>
var Type;
(function (Type) {
    Type[Type["digit"] = 1] = "digit";
    Type[Type["alpha"] = 2] = "alpha";
    Type[Type["alnum"] = 3] = "alnum";
})(Type || (Type = {}));
var Transform;
(function (Transform) {
    Transform[Transform["null"] = 0] = "null";
    Transform[Transform["uppercase"] = 1] = "uppercase";
    Transform[Transform["lowercase"] = 2] = "lowercase";
})(Transform || (Transform = {}));
var OptionsDefault = function () { return ({
    type: Type.alnum,
    length: 0,
    min: 0,
    max: Infinity,
    uppercase: true,
    lowercase: true,
    transform: null,
    valueChange: function (element, value) {
        return null;
    }
}); };
//sdfsdf
var InputFilter = (function () {
    function InputFilter(theOptions) {
        this.options = OptionsDefault();
        //this.options=theOptions;
    }
    InputFilter.prototype.getValue = function () {
        return this.options;
    };
    return InputFilter;
})();
var enumHasValue = function (e, v) {
    for (var member in e) {
        if (member === v) {
            return true;
        }
    }
    return false;
};
(function ($) {
    $.fn.inputFilter = function (type, length, min, max, uppercase, lowercas, transform, valueChange) {
        var _a = $.fn.inputFilter.options, type = _a.type, length = _a.length, min = _a.min, max = _a.max, uppercase = _a.uppercase, lowercas = _a.lowercas, transform = _a.transform, valueChange = _a.valueChange;
        try {
            if (!enumHasValue(Type, type)) {
                throw new TypeError('Parameter "type" must be in ["digit","alpha","alnum"]');
            }
            if (!enumHasValue(Transform, transform)) {
                throw new TypeError('Parameter "transform" must be in [null,"uppercase","lowercase"]');
            }
        }
        catch (error) {
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
        "transform": null,
        "valueChange": function (element, value) { return null; }
    };
})(jQuery);
