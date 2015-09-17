var Type;
(function (Type) {
    Type[Type["digit"] = 0] = "digit";
    Type[Type["alpha"] = 1] = "alpha";
    Type[Type["alnum"] = 2] = "alnum";
})(Type || (Type = {}));
var Transform;
(function (Transform) {
    Transform[Transform["uppercase"] = 0] = "uppercase";
    Transform[Transform["lowercase"] = 1] = "lowercase";
})(Transform || (Transform = {}));

var InputFilter = (function () {
    function InputFilter(options, element) {
        this.options = options;
        this.element = element;
    }
    return InputFilter;
})();
