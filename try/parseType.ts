enum Type { digit = 1, album = 2, alpha = 3 };
function parseGender(value: Type|number|string) {
	try {
		var gender;
		if (value === Number(value)) {
			gender = <Type>value;
		} else if (value === String(value)) {
			if (<string>value in Type) {
				gender = Type[value];
			}
		}
		if (!gender) throw new TypeError("The parameter gender is incorrect");
		return gender;
	} catch (e) {
		console.error(e.name + ":" + e.message);
	}
}
function judgeGender(type: Type|number|string) {
	var gender = parseGender(type);
	console.log(gender);
}
judgeGender("digit");