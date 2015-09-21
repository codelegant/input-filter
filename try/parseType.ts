enum Type { digit, alpha, alnum }
function parseGender(value: Type|number|string) {
	try {
		var gender;
		
		//if (typeof e[k] === 'number')
        //return <any>e[k];
		if (value === Number(value)) {
			gender = <Type>value;
		} else if (value === String(value)) {
			if (<string>value in Type) {	
				//gender = Type[value];
				gender = <Type>value;
			}
		}
		if (!gender) {
			throw new TypeError(`"The parameter ${value} is not incorrect"`)
		}
	} catch (error) {
		console.error(error.name + ":" + error.message);
	}
	return gender;
}
function judgeGender(type: Type|number|string) {
	var gender = parseGender(type);
	console.log(gender);
}
judgeGender("fuck");
//给你一个注释