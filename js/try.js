///<reference path="jquery.d.ts"/>
var Type;
(function (Type) {
    Type[Type["digit"] = 0] = "digit";
    Type[Type["alpha"] = 1] = "alpha";
    Type[Type["alnum"] = 2] = "alnum";
})(Type || (Type = {}));
var Transform;
(function (Transform) {
    Transform[Transform["null"] = 0] = "null";
    Transform[Transform["uppercase"] = 1] = "uppercase";
    Transform[Transform["lowercase"] = 2] = "lowercase";
})(Transform || (Transform = {}));

var OptionsDefault = function () {
    return ({
        type: 2 /* alnum */,
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
var enumHasValue = function (e, v) {
    for (var member in e) {
        if (member === v) {
            return true;
        }
    }
    return false;
};

// (($)=>{
// 	$.fn.inputFilter=(
// 		type="album",
// 		length=0,
// 		min=0,
// 		max=Infinity,
// 		uppercase=true,
// 		lowercase=true,
// 		transform=null,
// 		valueChange=(element,value)=>null
// 		)=>{
// 		};
// })(jQuery);
var test = function (type, length, min, max, uppercase, lowercase, transform, valueChange) {
    if (typeof type === "undefined") { type = "album"; }
    if (typeof length === "undefined") { length = 0; }
    if (typeof min === "undefined") { min = 0; }
    if (typeof max === "undefined") { max = Infinity; }
    if (typeof uppercase === "undefined") { uppercase = true; }
    if (typeof lowercase === "undefined") { lowercase = true; }
    if (typeof transform === "undefined") { transform = null; }
    if (typeof valueChange === "undefined") { valueChange = function (element, value) {
        return null;
    }; }
    return type;
};
console.log(test());
