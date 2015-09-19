var Type;
(function (Type) {
    Type[Type["digit"] = 0] = "digit";
    Type[Type["alpha"] = 1] = "alpha";
    Type[Type["alnum"] = 2] = "alnum";
})(Type || (Type = {}));
function parseGender(value) {
    try {
        var gender;
        if (value === Number(value)) {
            gender = value;
        }
        else if (value === String(value)) {
            if (value in Type) {
                //gender = Type[value];
                gender = value;
            }
        }
        if (!gender) {
            throw new TypeError("\"The parameter " + value + " is not incorrect\"");
        }
    }
    catch (error) {
        console.error(error.name + ":" + error.message);
    }
    return gender;
}
function judgeGender(type) {
    var gender = parseGender(type);
    console.log(gender);
}
judgeGender("fuck");
//给你一个注释 
