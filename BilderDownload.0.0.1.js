var durchlaufCounter=0;
test=function(){
	if(durchlaufCounter<CB.GegnerSchablone[AktuelleCharakter].Bild.Anzahl){
		var i=durchlaufCounter;
		var containerElement="BilderDownloadContainer";
		var welchesElement2='BilderDownloadAnker'+i;
		var p=document.createElement('a');
		p.setAttribute('id',welchesElement2);
		p.setAttribute('href',$("Bild"+i+"Bild").src);
		p.setAttribute('download','Teppui'+i+'.png');
		$(containerElement).appendChild(p);
		var welchesElement3='BilderDownloadBild'+i;
		var p=document.createElement('img');
		p.setAttribute('id',welchesElement3);
		//	p.setAttribute('class','StempelContainerAnzeigeStempelContainer');
		p.setAttribute('src','');
		$(welchesElement2).appendChild(p);
		$(welchesElement3).src=$("Bild"+i+"Bild").src;
		//	$(welchesElement2).href=$("Bild"+i+"Bild").src;
		$(welchesElement2).click();
		if(durchlaufCounter<2){
			window.setTimeout("test()",3000);
		}else
		if(durchlaufCounter>=2){
			window.setTimeout("test()",300);
		}
	}
	durchlaufCounter++;
}

BilderDownload=function(){
	durchlaufCounter=0;
	window.setTimeout("test()",3000);
}