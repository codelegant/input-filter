interface Option{
	type?: string;
	length?: number;
	min?: number;
	max?: number;
	uppercase?: boolean;
	lowercase?: boolean;
	transform?: string;
	valueChange?:(element: HTMLInputElement, value: string)=>void;
}
var obj = {
	"type": "alnum",
	"length": 0,
	"min": 0,
	"max": Infinity,
	"uppercase": true,
	"lowercase": true,
	"transform": "none", //也可以通过样式控制
	"valueChange": (element, value) => { }
}
