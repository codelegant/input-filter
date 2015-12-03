require.config({
	paths: {
		jquery: "./../vendor/jquery/jquery",
		inputFilter: "input-filter.amd"
	}
});
require(["jquery", "jquery", "inputFilter"], function (jquery, $, inputFilter) {
	var count = 0;
	$("#filter").inputFilter({
		type: "alnum",
		transform: "uppercase",
		//max:1000,
		length: 10,
		valueChange: function (element, value) {
			console.info(value);
		}
	});
});