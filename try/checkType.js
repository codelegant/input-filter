var Type;
(function (Type) {
    Type[Type["null"] = 0] = "null";
    Type[Type["digit"] = 1] = "digit";
    Type[Type["alpha"] = 2] = "alpha";
    Type[Type["alnum"] = 3] = "alnum";
})(Type || (Type = {}));
;
var checkType = function (value) {
    try {
        var gender;
        if (value === String(value) || value == null) {
            if (value in Type) {
                //gender = Type[value];
                gender = value;
            }
        }
        if (!gender && gender !== null) {
            throw new TypeError("\"The parameter " + value + " is not in Type\"");
        }
    }
    catch (error) {
        console.error(error.name + ":" + error.message);
    }
    return gender;
};
console.log(checkType(null));
