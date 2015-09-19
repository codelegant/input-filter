enum Type {null, digit, alpha, alnum };
var checkType = (value: Type|string): string => {
	try {
		var gender;
		if (value === String(value)||value==null) {
			if (<string>value in Type) {	
				//gender = Type[value];
				gender = <Type>value;
			}
		}
		if (gender===undefined) {
			throw new TypeError(`"The parameter ${value} is not in Type"`)
		}
	} catch (error) {
		console.error(error.name + ":" + error.message);
	}
	return gender;
}
console.log(checkType(null));