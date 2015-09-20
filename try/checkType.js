var Type;
(function (Type) {
    Type[Type["digit"] = 0] = "digit";
    Type[Type["alpha"] = 1] = "alpha";
    Type[Type["alnum"] = 2] = "alnum";
})(Type || (Type = {}));
;
var checkEnum = function (value, e) {
    try {
        var type;
        if (value === String(value)) {
            if (value in e) {
                type = value;
            }
        }
        if (type === undefined) {
            throw new TypeError("\"The parameter " + value + " is not in the EnumType\"");
        }
    }
    catch (error) {
        console.error(error.name + ":" + error.message);
    }
    return type;
};
console.log(checkEnum("digit", Type));
