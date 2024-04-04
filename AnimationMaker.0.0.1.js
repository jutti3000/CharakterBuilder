/* --AnimationMaker-- */

AM = {}; 

AM.Aktiv=false;

AM.Bildcounter = 0;

AM.BPS = {};
AM.BPS.Value = 12;
AM.BPS.Aendern=function(){
	AM.Check();
	window.clearInterval(AM.LoopObjekt);
	AM.BPS.Value=AM_BPSInput.value;
	AM.LoopObjekt=window.setInterval("AM.Loop()",1000/AM.BPS.Value);
	AM.Check();
}

AM.Groessen={};
AM.Groessen.AktuelleNummer=5;
AM.Groessen.WelcheGibtEs=[[3,2.5],[6,5],[11.5,9.5],[23.5,19],[47,38],[94,75]];
AM.Groessen.Aendern = function(wert) {
	if (wert === -1 && AM.Groessen.AktuelleNummer > 0) {
	  	AM.Groessen.AktuelleNummer--;
	} else if (wert === 1 && AM.Groessen.AktuelleNummer < AM.Groessen.WelcheGibtEs.length - 1) {
	  	AM.Groessen.AktuelleNummer++;
	}
	const aktuelleGroessenArray = AM.Groessen.WelcheGibtEs[AM.Groessen.AktuelleNummer];
	$("AM_BildContainer").style.width = aktuelleGroessenArray[0] + "%";
	$("AM_BildContainer").style.height = aktuelleGroessenArray[1] + "%";
}

AM.Check = function() {
	AM.Aktiv = !AM.Aktiv;
	AM_StartenButton.style.backgroundColor = AM.Aktiv ? "#997600" : "green";
	AM_StartenButton.innerHTML = AM.Aktiv ? 'Stop' : '►';
};

AM.Loop = function(){
	if(AM.Aktiv == true){
		AM.Machen();
	}
};

AM.Machen = function() {
	const bildAnzahl = CB.GegnerSchablone[AktuelleCharakter].Bild.Anzahl;
	const i = AM.Bildcounter;
	AM_Bild.src = $('Bild' + i + 'Bild').src;
	AM.Bildcounter = (AM.Bildcounter + 1) % bildAnzahl;
};