enum Type {digit, alpha, alnum };
var checkEnum = <E>(value: E|string, e: any): string => {
	try {
		var type;
		if (value === String(value)) {
			if (<string>value in e) {
				type = <E>value;
			}
		}
		if (type === undefined) {
			throw new TypeError(`"The parameter ${value} is not in the EnumType"`)
		}
	} catch (error) {
		console.error(error.name + ":" + error.message);
	}
	return type;
}
console.log(checkEnum<Type>("digit",Type));