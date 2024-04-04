Objekt.Daten={};	
Objekt.Daten.Struktur={};

Objekt.Daten.Struktur.WelcheGibtEs=[
		"FarbEllipse",
		"Stempel",
		"FarbKreis",
		"FarbRechteck",
		"FarbStern",
		"FarbPoligon",
		"Linie",
		"Kurve"
	];
	
Objekt.Daten.SchummelArray = {
	FarbEllipse: [
		["Element", "Typ"],
		["RGBAWert", "Farbe"],
		["XWert", "XWert"],
		["YWert", "YWert"],
		["WWert", "Breite"],
		["HWert", "Hoehe"],
		["RotationWert", "Rotation"],
		["BorderWidthWert", "Rand"],
		["BorderColorWert", "RFarbe"]
	],
	Linie: [
		["Element", "Typ"],
		["XWert", "XWert"],
		["YWert", "YWert"],
		["X2Wert", "X2Wert"],
		["Y2Wert", "Y2Wert"],
		["RotationWert", "Rotation"],
		["BorderWidthWert", "Rand"],
		["BorderColorWert", "RFarbe"]
	],
	Kurve: [
		["Element", "Typ"],
		["XWert", "XWert"],
		["YWert", "YWert"],
		["X2Wert", "X2Wert"],
		["Y2Wert", "Y2Wert"],
		["B1Wert", "B1Wert"],
		["B2Wert", "B2Wert"],
		["C1Wert", "C1Wert"],
		["C2Wert", "C2Wert"],
		["RotationWert", "Rotation"],
		["BorderWidthWert", "Rand"],
		["BorderColorWert", "RFarbe"]
	],
	FarbPoligon: [
		["Element", "Typ"],
		["RGBAWert", "Farbe"],
		["XWert", "XWert"],
		["YWert", "YWert"],
		["ArrayWert", "Array"],
		["RotationWert", "Rotation"],
		["BorderWidthWert", "Rand"],
		["BorderColorWert", "RFarbe"]
	],
	FarbRechteck: [
		["Element", "Typ"],
		["RGBAWert", "Farbe"],
		["XWert", "XWert"],
		["YWert", "YWert"],
		["WWert", "Breite"],
		["HWert", "Hoehe"],
		["RotationWert", "Rotation"],
		["BorderWidthWert", "Rand"],
		["BorderColorWert", "RFarbe"]
	],
	FarbStern: [
		["Element", "Typ"],
		["RGBAWert", "Farbe"],
		["XWert", "XWert"],
		["YWert", "YWert"],
		["RadiusWert", "Radius"],
		["SpitzenWert", "Spitzen"],
		["RotationWert", "Rotation"],
		["BorderWidthWert", "Rand"],
		["BorderColorWert", "RFarbe"]
	],
	FarbKreis: [
		["Element", "Typ"],
		["RGBAWert", "Farbe"],
		["XWert", "XWert"],
		["YWert", "YWert"],
		["WWert", "Breite"],
		["BorderWidthWert", "Rand"],
		["BorderColorWert", "RFarbe"]
	],
	Stempel: [
		["Element", "Typ"],
		["IdWert", "Id"],
		["XWert", "X"],
		["YWert", "Y"],
		["ScaleXWert", "ScaleX"],
		["ScaleYWert", "scaleY"],
		["SkewXWert", "skewX"],
		["SkewYWert", "skewY"],
		["RotationWert", "Rotation"]
	],
	FuellungenRadial: [
		["X1Wert", "X1Wert"],
		["Y1Wert", "Y1Wert"],
		["Radius1Wert", "Radius1"],
		["X2Wert", "X2Wert"],
		["Y2Wert", "Y2Wert"],
		["Radius2Wert", "Radius2"]
	],
	FuellungenLinear: [
		["X1Wert", "X1Wert"],
		["Y1Wert", "Y1Wert"],
		["X2Wert", "X2Wert"],
		["Y2Wert", "Y2Wert"]
	],
	FuellungenPattern: [
		["ImageWert", "Image"],
		["RepeatWert", "Repeat"],
		["ScaleXWert", "ScaleX"],
		["ScaleYWert", "ScaleY"],
		["TranslateXWert", "TranslateX"],
		["TranslateYWert", "TranslateY"],
		["OpacityWert", "Opacity"],
		["RotateWert", "Rotate"]
	],
	Timestop: [
		["Nr", "Nummer"],
		["RgbaWert", "rgbaWert"]
	]
 };
	
Objekt.Daten.Struktur.Erstellen=function(element){
	var array=Objekt.Daten.Struktur[element].WelcheGibtEs;
	for(all in array){
		var arrayNr=array[all];
		var wer=arrayNr[0];
		var typeVary=arrayNr[1];
		var valueVary=arrayNr[2];
		var onChangeVary=arrayNr[3];
		var onClickVary=arrayNr[4];
		var htmlVary=arrayNr[5];
		Objekt.Daten.Struktur[element].ElementErstellen[wer]={};
		Objekt.Daten.Struktur[element].ElementErstellen[wer].Type=typeVary;
		Objekt.Daten.Struktur[element].ElementErstellen[wer].Value=valueVary;
		Objekt.Daten.Struktur[element].ElementErstellen[wer].Onchange=onChangeVary;
		Objekt.Daten.Struktur[element].ElementErstellen[wer].Onclick=onClickVary;
		Objekt.Daten.Struktur[element].ElementErstellen[wer].EigenHTML=htmlVary;
	}
};

var array=Objekt.Daten.Struktur.WelcheGibtEs;
for(all in array){
	var wer=array[all];
	Objekt.Daten.Struktur[wer]={};
}

Objekt.Daten.Struktur.FarbEllipse.WelcheGibtEs=[
	['Element','input','FarbEllipse','','',''],
	['XWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','xWert'],
	['YWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','yWert'],
	['WWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['WWertLable','div','','','$("ElementCreationContainerAnzeigeWWert").select()','wWert'],
	['HWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['HWertLable','div','','','$("ElementCreationContainerAnzeigeHWert").select()','hWert'],
	['RotationWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RotationWertLable','div','','','$("ElementCreationContainerAnzeigeRotationWert").select()','Rotation'],
	['RGBAWert','input','Weiss','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RGBAWertLable','div','','','$("ElementCreationContainerAnzeigeRGBAWert").select()','Farbe'],
	['BorderWidthWert','input','2','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderWidthWertLable','div','','','$("ElementCreationContainerAnzeigeBorderWidthWert").select()','Rand'],
	['BorderColorWert','input','Schwarz','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderColorWertLable','div','','','$("ElementCreationContainerAnzeigeBorderColorWert").select()','RFarbe'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];

Objekt.Daten.Struktur.Stempel.WelcheGibtEs=[
	['Element','input','Stempel','','',''],
	['IdWert','input',"Stempel0",'ElementCreation_MachDieZwischenZeichnung()','',''],
	['IdWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','id'],
	['XWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','X'],
	['YWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','Y'],
	['ScaleXWert','input',1,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['ScaleXWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','ScaleX'],
	['ScaleYWert','input',1,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['ScaleYWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','scaleY'],
	['SkewXWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['SkewXWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','SkewX'],
	['SkewYWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['SkewYWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','SkewY'],
	['RotationWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RotationWertLable','div','','','$("ElementCreationContainerAnzeigeRotationWert").select()','Rotation'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];

Objekt.Daten.Struktur.Linie.WelcheGibtEs=[
	['Element','input','Linie','','',''],
	['XWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/4,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','xWert'],
	['YWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/4,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','yWert'],
	['X2Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['X2WertLable','div','','','$("ElementCreationContainerAnzeigeWWert").select()','x2Wert'],
	['Y2Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['Y2WertLable','div','','','$("ElementCreationContainerAnzeigeHWert").select()','y2Wert'],
	['RotationWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RotationWertLable','div','','','$("ElementCreationContainerAnzeigeRotationWert").select()','Rotation'],
	['BorderWidthWert','input','2','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderWidthWertLable','div','','','$("ElementCreationContainerAnzeigeBorderWidthWert").select()','Rand'],
	['BorderColorWert','input','Schwarz','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderColorWertLable','div','','','$("ElementCreationContainerAnzeigeBorderColorWert").select()','RFarbe'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];

Objekt.Daten.Struktur.Kurve.WelcheGibtEs=[
	['Element','input','Kurve','','',''],
	['XWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/4,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','xWert'],
	['YWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/4,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','yWert'],
	['X2Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['X2WertLable','div','','','$("ElementCreationContainerAnzeigeWWert").select()','x2Wert'],
	['Y2Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['Y2WertLable','div','','','$("ElementCreationContainerAnzeigeHWert").select()','y2Wert'],
	['B1Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/4,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['B1WertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','b1Wert'],
	['B2Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/4,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['B2WertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','b2Wert'],
	['C1Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['C1WertLable','div','','','$("ElementCreationContainerAnzeigeWWert").select()','c1Wert'],
	['C2Wert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['C2WertLable','div','','','$("ElementCreationContainerAnzeigeHWert").select()','c2Wert'],
	['RotationWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RotationWertLable','div','','','$("ElementCreationContainerAnzeigeRotationWert").select()','Rotation'],
	['BorderWidthWert','input','2','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderWidthWertLable','div','','','$("ElementCreationContainerAnzeigeBorderWidthWert").select()','Rand'],
	['BorderColorWert','input','Schwarz','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderColorWertLable','div','','','$("ElementCreationContainerAnzeigeBorderColorWert").select()','RFarbe'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];

Objekt.Daten.Struktur.FarbPoligon.WelcheGibtEs=[
	['Element','input','FarbPoligon','','',''],
	['XWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','xWert'],
	['YWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','yWert'],
	['ArrayWert','input',['Polygon4'],'ElementCreation_MachDieZwischenZeichnung()','',''],
	['ArrayWertLable','div','','','$("ElementCreationContainerAnzeigeWWert").select()','Array'],
	['RotationWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RotationWertLable','div','','','$("ElementCreationContainerAnzeigeRotationWert").select()','Rotation'],
	['RGBAWert','input','Weiss','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RGBAWertLable','div','','','$("ElementCreationContainerAnzeigeRGBAWert").select()','Farbe'],
	['BorderWidthWert','input','2','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderWidthWertLable','div','','','$("ElementCreationContainerAnzeigeBorderWidthWert").select()','Rand'],
	['BorderColorWert','input','Schwarz','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderColorWertLable','div','','','$("ElementCreationContainerAnzeigeBorderColorWert").select()','RFarbe'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];
	
Objekt.Daten.Struktur.FarbKreis.WelcheGibtEs=[
	['Element','input','FarbKreis','','',''],
	['XWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','xWert'],
	['YWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','yWert'],
	['WWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['WWertLable','div','','','$("ElementCreationContainerAnzeigeWWert").select()','wWert'],
	['RGBAWert','input','Weiss','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RGBAWertLable','div','','','$("ElementCreationContainerAnzeigeRGBAWert").select()','Farbe'],
	['BorderWidthWert','input','2','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderWidthWertLable','div','','','$("ElementCreationContainerAnzeigeBorderWidthWert").select()','Rand'],
	['BorderColorWert','input','Schwarz','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderColorWertLable','div','','','$("ElementCreationContainerAnzeigeBorderColorWert").select()','RFarbe'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];

Objekt.Daten.Struktur.FarbRechteck.WelcheGibtEs=[
	['Element','input','FarbRechteck','','',''],
	['XWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','xWert'],
	['YWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','yWert'],
	['WWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['WWertLable','div','','','$("ElementCreationContainerAnzeigeWWert").select()','wWert'],
	['HWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['HWertLable','div','','','$("ElementCreationContainerAnzeigeHWert").select()','hWert'],
	['RotationWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RotationWertLable','div','','','$("ElementCreationContainerAnzeigeRotationWert").select()','Rotation'],
	['RGBAWert','input','Weiss','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RGBAWertLable','div','','','$("ElementCreationContainerAnzeigeRGBAWert").select()','Farbe'],
	['BorderWidthWert','input','2','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderWidthWertLable','div','','','$("ElementCreationContainerAnzeigeBorderWidthWert").select()','Rand'],
	['BorderColorWert','input','Schwarz','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderColorWertLable','div','','','$("ElementCreationContainerAnzeigeBorderColorWert").select()','RFarbe'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];

Objekt.Daten.Struktur.FarbStern.WelcheGibtEs=[
	['Element','input','FarbStern','','',''],
	['XWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['XWertLable','div','','','$("ElementCreationContainerAnzeigeXWert").select()','xWert'],
	['YWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['YWertLable','div','','','$("ElementCreationContainerAnzeigeYWert").select()','yWert'],
	['RadiusWert','input',CB.GegnerSchablone[AktuelleCharakter].Bild.Width/4,'ElementCreation_MachDieZwischenZeichnung()','',''],
	['RadiusWertLable','div','','','$("ElementCreationContainerAnzeigeRadiusWert").select()','Radius'],
	['SpitzenWert','input','5','ElementCreation_MachDieZwischenZeichnung()','',''],
	['SpitzenWertLable','div','','','$("ElementCreationContainerAnzeigeSpitzenWert").select()','Spitzen'],
	['RotationWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RotationWertLable','div','','','$("ElementCreationContainerAnzeigeRotationWert").select()','Rotation'],
	['RGBAWert','input','Weiss','ElementCreation_MachDieZwischenZeichnung()','',''],
	['RGBAWertLable','div','','','$("ElementCreationContainerAnzeigeRGBAWert").select()','Farbe'],
	['BorderWidthWert','input','2','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderWidthWertLable','div','','','$("ElementCreationContainerAnzeigeBorderWidthWert").select()','Rand'],
	['BorderColorWert','input','Schwarz','ElementCreation_MachDieZwischenZeichnung()','',''],
	['BorderColorWertLable','div','','','$("ElementCreationContainerAnzeigeBorderColorWert").select()','RFarbe'],
	['PositionWert','input','0','ElementCreation_MachDieZwischenZeichnung()','',''],
	['PositionWertLable','div','','','$("ElementCreationContainerAnzeigePositionWert").select()','Position']
];

var array=Objekt.Daten.Struktur.WelcheGibtEs;
for(all in array){
	var wer=array[all];
	Objekt.Daten.Struktur[wer].ElementErstellen={};
	Objekt.Daten.Struktur.Erstellen(wer);
}
	