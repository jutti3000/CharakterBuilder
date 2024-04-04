FS = {};

// DOM-Elemente einmalig abrufen und referenzieren
FS.mainContainer = $("FS_MainContainer");
FS.favColorInput = $("FS_Favcolor");
FS.opacityValueInput = $("FS_OpacityValue");
FS.opacityReglerInput = $("FS_OpacityRegler");
FS.anzeigeCanvas = $("FS_AnzeigeCanvas");

// Event-Handler zuweisen und Hauptcontainer anzeigen
FS.Check = function(input){
	$("FS_AuswaehlenButton").onclick = function(){
		FS.DieseFarbeAuswaehlen(input);
	}
	FS.mainContainer.show();
	FS.favColorInput.value = FS.RgbaToHex($(input).value);
	FS.MachDieFarbensucherAnzeigeCanvas();
}

// Wert basierend auf dem Modus aktualisieren und Anzeige aktualisieren
FS.ZeigDenValue = function(modus){
	if(modus === "Regler"){
		FS.opacityValueInput.value = FS.opacityReglerInput.value;
	} else if(modus === "Value"){
		FS.opacityReglerInput.value = FS.opacityValueInput.value;
	}
	FS.MachDieFarbensucherAnzeigeCanvas();
}

// Ausgewählte Farbe setzen und entsprechende Aktion ausführen
FS.DieseFarbeAuswaehlen = function(input){
	var farbe = FS.ConvertHexToRgbA(FS.favColorInput.value, FS.opacityValueInput.value);
	$(input).value = farbe;
	if(input === "PatternContainerAnzeigePatternContainerFarbeAendernInput"){
		PatternContainerAnzeigePatternContainerValueAendernInputAendern(input, 1);
	} else if(input === "FarbenAnzeigeContainerValueAendernInput"){
		FarbenAnzeigeContainerValueAendernInputAendern(input, 1);
	}
	FS.mainContainer.close();
}

// Funktion zur Konvertierung von Hex zu RGBA
FS.ConvertHexToRgbA = function(hex, a){
	let r = parseInt(hex.substring(1, 3), 16);
	let g = parseInt(hex.substring(3, 5), 16);
	let b = parseInt(hex.substring(5, 7), 16);
	return "rgba("+r+","+g+","+b+","+a+")";
}

// Funktion zur Konvertierung von RGBA zu Hex
FS.RgbaToHex = function(rgba){
	var inParts = rgba.substring(rgba.indexOf("(")).split(",");
	var r = parseInt(trim(inParts[0].substring(1)), 10);
	var g = parseInt(trim(inParts[1]), 10);
	var b = parseInt(trim(inParts[2]), 10);
	var a = parseFloat(trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2);
	var outParts = [
		r.toString(16),
		g.toString(16),
		b.toString(16)
	];
	outParts.forEach(function(part, i){
		if(part.length === 1){
			outParts[i] = '0' + part;
		}
	})
	return ('#' + outParts.join(''));
}

// Funktion zur Aktualisierung der Farbensucheranzeige im Canvas
FS.MachDieFarbensucherAnzeigeCanvas = function(){
	var w = FS.anzeigeCanvas.width;
	var h = FS.anzeigeCanvas.height;
	var ctx = FS.anzeigeCanvas.getContext('2d');
	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = "black";
	for(let i = 0; i < w / 10; i++){
		for(let j = 0; j < h / 10; j++){
			if(i % 2 === 0){
				if(j % 2 === 0){
					ctx.fillRect(i * 10, j * 10, 10, 10);
				}
			} else if(i % 2 === 1){
				if(j % 2 === 1){
					ctx.fillRect(i * 10, j * 10, 10, 10);
				}
			}
		}
	}
	var farbe = FS.ConvertHexToRgbA(FS.favColorInput.value, FS.opacityValueInput.value);
	ctx.fillStyle = farbe;
	ctx.fillRect(0, 0, w, h);
}

// Funktion zur Aktualisierung des Canvas bei Auswahl einer Lieblingsfarbe
FS.Favcolor = function(){
	FS.MachDieFarbensucherAnzeigeCanvas();
}