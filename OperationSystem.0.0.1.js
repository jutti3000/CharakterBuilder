/* ---OperatiinSystem---*/

$ = function(id){return(document.getElementById(id))};

SagDas = function(wasDenn){
	eval("al"+""+"ert(wasDenn)");
}

const createDivElement = (parentId, id, className, innerHTML) => {
  	const element = document.createElement('div');
  	element.setAttribute('id', id);
  	element.setAttribute('class', className);
  	element.innerHTML = innerHTML;
  	$(parentId).appendChild(element);
};

const createButtonElement = (parentId, id, className, onclickFunction, innerHTML) => {
  	const button = document.createElement('div');
  	button.setAttribute('id', id);
  	button.setAttribute('class', className);
  	button.setAttribute('onclick', onclickFunction);
  	button.innerHTML = innerHTML;
  	$(parentId).appendChild(button);
};

const createImageElement = (parentId, id, className, src) => {
  	const image = document.createElement('img');
  	image.setAttribute('id', id);
  	image.setAttribute('class', className);
  	image.setAttribute('src', src);
  	$(parentId).appendChild(image);
};

const createInputElement = (parentId, id, className, type, value, onchange) => {
  	const input = document.createElement('input');
  	input.setAttribute('id', id);
  	input.setAttribute('class', className);
  	input.setAttribute('type', type);
  	input.setAttribute('value', value);
  	input.setAttribute('onchange', onchange);
  	document.getElementById(parentId).appendChild(input);
};

const createSelectElement = (parentId, id, className, onchange) => {
  	const select = document.createElement('select');
  	select.setAttribute('id', id);
  	select.setAttribute('class', className);
  	select.setAttribute('onchange', onchange);
  	document.getElementById(parentId).appendChild(select);
};

const createOptionElement = (parentId, id, className, value, innerHTML) => {
  	const option = document.createElement('option');
  	option.setAttribute('id', id);
  	option.setAttribute('class', className);
  	option.setAttribute('value', value);
  	option.innerHTML = innerHTML;
  	document.getElementById(parentId).appendChild(option);
};

const createCanvasElement = (parentId, id, className, width, height) => {
  	const canvas = document.createElement('canvas');
  	canvas.setAttribute('id', id);
  	canvas.setAttribute('class', className);
  	document.getElementById(parentId).appendChild(canvas);
  	if(width != "" && height != ""){
 	 	canvas.width = width;
 	 	canvas.height = height;
  	}
  	return canvas;
};

BauStringZuArray =function(string){
	  	SagDas("wird hier jemals was gemacht?")
		var testVary="";
	var testArray=[];
	for(ill in string){
		var buchstabe=string[ill];
		if(buchstabe!=","){
			testVary+=buchstabe;
		}else{
			testArray[testArray.length]=Number(testVary);
			testVary="";
		}
		if(ill == string.length-1){
			testArray[testArray.length]=Number(testVary);
			testVary="";
		}
	}
	return(
		JetztWiederArray=testArray
	)
}
 
const trim = function(str){
	return str.replace(/^\s+|\s+$/gm,'');
}

rgbaToHex=function(rgba){
	var inParts=rgba.substring(rgba.indexOf("(")).split(","),
	r=parseInt(trim(inParts[0].substring(1)),10),
	g=parseInt(trim(inParts[1]),10),
	b=parseInt(trim(inParts[2]),10),
	a=parseFloat(trim(inParts[3].substring(0,inParts[3].length-1))).toFixed(2);
	var outParts=[
		r.toString(16),
		g.toString(16),
		b.toString(16)
		/*,
		Math.round(a * 255).toString(16).substring(0, 2)*/
	];
	// Pad single-digit output values
	outParts.forEach(function(part,i){
		if(part.length===1){
			outParts[i]='0'+part;
		}
	})
	return ('#'+outParts.join(''));
}