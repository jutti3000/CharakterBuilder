/* ---DataMover--- */

DM = {};

DM.GibDenCodeRaus = function() {
    var htmlVary = "";
    for (var all in CB.GegnerSchablone[AktuelleCharakter].WelcheGibtEs) {
        var array = CB.GegnerSchablone[AktuelleCharakter].WelcheGibtEs[all];
        var name = array[0];
        var htmlVary2 = "";
        for (var each in CB.GegnerSchablone[AktuelleCharakter][name].CanvasElemente.Alle) {
            var array2 = CB.GegnerSchablone[AktuelleCharakter][name].CanvasElemente.Alle[each];
            var innerHtml = array2.map(function(item) {
                return typeof item === 'object' ? '{"x":' + item.x + ',"y":' + item.y + '}' : JSON.stringify(item);
            }).join(',');
            htmlVary2 += '[' + innerHtml + ']';
            if (each < CB.GegnerSchablone[AktuelleCharakter][name].CanvasElemente.Alle.length - 1) {
                htmlVary2 += ',';
            }
        }
        htmlVary += 'CB.GegnerSchablone.' + AktuelleCharakter + '.' + name + '.CanvasElemente.Alle=[' + htmlVary2 + '];\n';
        htmlVary += '</br>';
    }

    var htmlVary3 = JSON.stringify(CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs).replace(/\\/g, '');
    var htmlVaryStempel = JSON.stringify(CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs).replace(/\\/g, '');
    var htmlVaryPattern = JSON.stringify(CB.GegnerSchablone[AktuelleCharakter].Pattern.WelcheGibtEs).replace(/\\/g, '');
    var htmlVaryPolygone = JSON.stringify(CB.GegnerSchablone[AktuelleCharakter].Polygone.WelcheGibtEs).replace(/\\/g, '');

    DM_Code.innerHTML = 'CB.GegnerSchablone.' + AktuelleCharakter + '.Farben.WelcheGibtEs=' + htmlVary3 + ';</br>';
    DM_Code.innerHTML += 'CB.GegnerSchablone.' + AktuelleCharakter + '.Stempel.WelcheGibtEs=' + htmlVaryStempel + ';</br>';
    DM_Code.innerHTML += 'CB.GegnerSchablone.' + AktuelleCharakter + '.Pattern.WelcheGibtEs=' + htmlVaryPattern + ';</br>';
    DM_Code.innerHTML += 'CB.GegnerSchablone.' + AktuelleCharakter + '.Polygone.WelcheGibtEs=' + htmlVaryPolygone + ';</br>';
    DM_Code.innerHTML += htmlVary;
    DM_Code.style.display = "block";
    DM_CodeWiederAusmachenButton.style.display = "block";
    CanvasElementContainer.style.display = "none";
    OptionsContainer.style.display = "none";
    BildContainer.style.display = "none";
    BildContainerReal.style.display = "none";
}


DM.GibDenCodeRein = function(){
	mach = DM_GibDenCodeReinInput.value;
	mach.replace('</br>','');
	eval(mach);
	CB.GegnerSchablone.MalDieBilder("Alle");
	ZeigDasBild("Bild0","",0,"Bestandteil");
}

DM.GibDenCodeReinContainerCheck = function(){
  	if(DM_GibDenCodeReinContainer.style.display == "block"){
	  	DM_GibDenCodeReinContainer.style.display="none";
	}else{
	 	DM_GibDenCodeReinContainer.style.display="block";
  	}
}

DM.GibDenCodeRausContainerCheck = function(){
 	if(DM_GibDenCodeRausContainer.style.display == "block"){
		DM_GibDenCodeRausContainer.style.display="none";
	}else{
	 	DM_GibDenCodeRausContainer.style.display = "block";
  	}
}

DM.CodeWiederAusmachen = function(){
	DM_Code.style.display = "none";
	DM_CodeWiederAusmachenButton.style.display = "none";
	CanvasElementContainer.style.display = "block";
	OptionsContainer.style.display = "block";
	BildContainer.style.display = "block";
	BildContainerReal.style.display = "block";
}