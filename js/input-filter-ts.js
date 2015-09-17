///<reference path="jquery.d.ts"/>
var Type;
(function (Type) {
    Type[Type["digit"] = 1] = "digit";
    Type[Type["alpha"] = 2] = "alpha";
    Type[Type["alnum"] = 3] = "alnum";
})(Type || (Type = {}));
var Transform;
(function (Transform) {
    Transform[Transform["uppercase"] = 1] = "uppercase";
    Transform[Transform["lowercase"] = 2] = "lowercase";
})(Transform || (Transform = {}));

var OptionsDefault = function () {
    return ({
        type: 3 /* alnum */,
        length: 0,
        min: 0,
        max: Infinity,
        uppercase: true,
        lowercase: true,
        transform: null,
        valueChange: function (element, value) {
            return null;
        }
    });
};

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

var inputer = new InputFilter();
console.log(inputer.getValue());
