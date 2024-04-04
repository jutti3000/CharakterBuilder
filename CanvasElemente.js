Objekt.CanvasElemente={};
Objekt.CanvasElemente.WelcheGibtEs = [
	["Linie"],
	["Kurve"],
	["FarbEllipse"],
	["Stempel"],
	["FarbKreis"],
	["GarbRechteck"],
	["FarbStern"],
	["FarbPoligon"]
];
Objekt.CanvasElemente.Linie=function(wer,x,y,x2,y2,rotation,borderWidth,borderColor,position){
 	for(alle in CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs){
		var array=CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs[alle];
	 	if(borderColor==array[0]){
			borderColor=Objekt[array[0]].GibDieFarbeRaus();
	  	}
	}
 	wer.scale(1,1);
 	var kleinstesX="";
 	var groesstesX="";
 	var kleinstesY="";
 	var groesstesY="";
 	if(x<=x2){
 	kleinstesX=x;
 	groesstesX=x2;
 	}else{
 	kleinstesX=x2;
 	groesstesX=x;
 	}
 	if(y<=y2){
 	kleinstesY=y;
 	groesstesY=y2;
 	}else{
 	kleinstesY=y2;
 	groesstesY=y;
 	}
 	var translateX=(kleinstesX*1+groesstesX*1)/2;
 	var translateY=(kleinstesY*1+groesstesY*1)/2;
 	wer.translate(translateX,translateY);
 	wer.rotate(rotation);
 	wer.translate(-translateX,-translateY);
 	wer.beginPath();
 	wer.moveTo(x,y);
 	wer.lineTo(x2,y2);
 	wer.strokeStyle=borderColor;
 	wer.lineWidth=borderWidth;
 	wer.stroke();
 	wer.closePath();
 	wer.translate(translateX,translateY);
 	wer.rotate(-rotation);
 	wer.translate(-translateX,-translateY);
};
Objekt.CanvasElemente.Kurve=function(wer,x,y,x2,y2,b1,b2,c1,c2,rotation,borderWidth,borderColor,position){
	for(alle in CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs){
		var array=CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs[alle];
		if(borderColor==array[0]){
		  	borderColor=Objekt[array[0]].GibDieFarbeRaus();
	 	}
  	}
  	wer.scale(1,1);
  	var kleinstesX="";
  	var groesstesX="";
  	var kleinstesY="";
  	var groesstesY="";
  	if(x<=x2){
  	kleinstesX=x;
  	groesstesX=x2;
  	}else{
  	kleinstesX=x2;
  	groesstesX=x;
  	}
  	if(y<=y2){
  	kleinstesY=y;
  	groesstesY=y2;
  	}else{
  	kleinstesY=y2;
  	groesstesY=y;
  	}
  	var translateX=(kleinstesX*1+groesstesX*1)/2;
  	var translateY=(kleinstesY*1+groesstesY*1)/2;
  	wer.translate(translateX,translateY);
  	wer.rotate(rotation);
  	wer.translate(-translateX,-translateY);
  	wer.strokeStyle=borderColor;
  	wer.lineWidth=borderWidth;
  	wer.beginPath();
  	wer.moveTo(x,y);
  	wer.bezierCurveTo(b1,b2,c1,c2,x2,y2);
  	wer.stroke();
  	wer.translate(translateX,translateY);
  	wer.rotate(-rotation);
  	wer.translate(-translateX,-translateY);
};
Objekt.CanvasElemente.FarbEllipse=function(wer,rgba,x,y,w,h,rotation,borderWidth,borderColor,position){
//	wer.resetTransform();
	let rgbaVary;
	let borderColorVary;
	for(alle in CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs){
		var array=CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs[alle];
		if(rgba==array[0]){
			rgbaVary=Objekt[array[0]].GibDieFarbeRaus();
		}
		if(borderColor==array[0]){
			borderColorVary=Objekt[array[0]].GibDieFarbeRaus();
		}
	}
	wer.scale(1,1);
	wer.beginPath();
	wer.fillStyle=rgbaVary;
	wer.ellipse(x,y,w,h,rotation,0,2*Math.PI,true);
	wer.closePath();
	wer.fill();
	CB.GegnerSchablone.MachDieFuellungen(wer,rgba);
	wer.strokeStyle=borderColorVary;
	wer.lineWidth=borderWidth;
	wer.stroke();
};
Objekt.CanvasElemente.Stempel=function(wer,id,x,y,scaleX,scaleY,skewX,skewY,rotation,position){
	wer.resetTransform();
	wer.scale(1,1);
	wer.transform(scaleX,skewX,skewY,scaleY,x,y);
	var translateX=CB.GegnerSchablone[AktuelleCharakter].Bild.Width/2;
	var translateY=CB.GegnerSchablone[AktuelleCharakter].Bild.Height/2;
	wer.translate(translateX,translateY);
	wer.rotate(rotation);
	wer.translate(-translateX,-translateY);
	var stempelArray=CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs;
	for(alles in stempelArray){
		var stempelVary=stempelArray[alles][0];
		if(id==stempelVary){
			for(opl in stempelArray[alles][1]){
				var array=stempelArray[alles][1][opl];
				var element=array[0];
				if(element=="FarbKreis"){
					var rgbaWert=array[1];
					var xWert=array[2];
					var yWert=array[3];
					var radius=array[4];
					var borderWidth=array[5];
					var borderColor=array[6];
					Objekt.CanvasElemente[element](wer,rgbaWert,xWert,yWert,radius,borderWidth,borderColor);
				}else
				if(element=="FarbRechteck"){
					var rgbaWert=array[1];
					var xWert=array[2];
					var yWert=array[3];
					var w=array[4];
					var h=array[5];
					var rotationWert=array[6];
					var borderWidth=array[7];
					var borderColor=array[8];
					Objekt.CanvasElemente[element](wer,rgbaWert,xWert,yWert,w,h,rotationWert,borderWidth,borderColor);
				}else
				if(element=="FarbStern"){
					var rgbaWert=array[1];
					var xWert=array[2];
					var yWert=array[3];
					var radius=array[4];
					var spitzen=array[5];
					var rotationWert=array[6];
					var borderWidth=array[7];
					var borderColor=array[8];
					Objekt.CanvasElemente[element](wer,rgbaWert,xWert,yWert,radius,spitzen,rotationWert,borderWidth,borderColor);
				}else
				if(element=="FarbEllipse"){
					var rgbaWert=array[1];
					var xWert=array[2];
					var yWert=array[3];
					var w=array[4];
					var h=array[5];
					var rotationWert=array[6];
					var borderWidth=array[7];
					var borderColor=array[8];
					Objekt.CanvasElemente[element](wer,rgbaWert,xWert,yWert,w,h,rotationWert,borderWidth,borderColor);
			//		wer.resetTransform();
				}else
				if(element=="Stempel"){
					var welchesElement='CanvasJetztContainer';
					var welchesElement2='CanvasJetzt';
					var p=document.createElement('canvas');
					p.setAttribute('id',welchesElement2);
					p.setAttribute('class','bild');
					$(welchesElement).appendChild(p);
					var werJetzt='CanvasJetzt';
					var id=werJetzt;
					var canvas=$(id);
					canvas.width=400;
					canvas.height=400;
					var ctxJetzt=canvas.getContext('2d');
					var welcheNummer="";
					for(alles in CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs){
						if(CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs[alles][0]==array[1]){
							welcheNummer=alles;
							//	alert(array[1]+34)
						}
					}
				//	alert(CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs[welcheNummer][1])
					var istEinStempelImStempel=false;
					ctxJetzt.transform(scaleX,skewX,skewY,scaleY,x,y);
					for(alles in CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs[welcheNummer][1]){
						arrayNeu=CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs[welcheNummer][1][alles];
						if(arrayNeu[0]=="FarbEllipse"){
							ctxJetzt.clearRect(0,0,400,400)
							var rgbaWert=array[1];
							var xWert=array[2]*1+x*1;
							var yWert=array[3]*1+y*1;
							var w=array[4];
							var h=array[5];
							var rotationWert=array[6];
							var borderWidth=array[7];
							var borderColor=array[8];
							Objekt.CanvasElemente[element](ctxJetzt,rgbaWert,xWert,yWert,w,h,rotationWert,borderWidth,borderColor);
							//		wer.resetTransform();
						}
				//	alert(CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs[welcheNummer][1][alles][0])
				/*		if(CB.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs[welcheNummer][1][alles][0]=="Stempel"){
							alert("tzuiop")
							istEinStempelImStempel=true;
						}*/
					}
					if(istEinStempelImStempel==true){
						alert("suprr")
					}
					wer.drawImage($('CanvasJetzt'),0,0);
					if(scaleX!=1||scaleY!=1||skewX!=0||skewY!=0||x!=0||y!=0){
					var rechenVaryScaleX=1/scaleX;
					var rechenVaryScaleY=1/scaleY;
					if(scaleX<0){
					rechenVaryScaleX;
					}
					if(scaleY<0){
					rechenVaryScaleY;
					}
					var rechenVarySkewX=skewX*-1;
					var rechenVarySkewY=skewY*-1;
					ctxJetzt.transform(rechenVaryScaleX,rechenVarySkewX,rechenVarySkewY,rechenVaryScaleY,-x,-y);
					ctxJetzt.resetTransform();
					}
					var idVary=array[1];
					var xWert=array[2];
					var yWert=array[3];
					var rotationWert=array[4];
					var scaleWert=array[5];
					var scaleY=array[6];
					var skewX=array[7];
					var skewY=array[8];
					if(id!=idVary){
						Objekt.CanvasElemente[element](wer,idVary,xWert,yWert,scaleX,scaleY,skewX,skewY,rotationWert);
					}else{
					alert("zui")
					}
	//		wer.resetTransform();
		//	return{};
				}else
				if(element=="Linie"){
					var xWert=array[1];
					var yWert=array[2];
					var xWert2=array[3];
					var yWert2=array[4];
					var rotationWert=array[5];
					var borderWidth=array[6];
					var borderColor=array[7];
					Objekt.CanvasElemente[element](wer,xWert,yWert,xWert2,yWert2,rotationWert,borderWidth,borderColor);
				}else
				if(element=="Kurve"){
					var xWert=array[1];
					var yWert=array[2];
					var xWert2=array[3];
					var yWert2=array[4];
					var b1=array[5];
					var b2=array[6];
					var c1=array[7];
					var c2=array[8];
					var rotationWert=array[9];
					var borderWidth=array[10];
					var borderColor=array[11];
					Objekt.CanvasElemente[element](wer,xWert,yWert,xWert2,yWert2,b1,b2,c1,c2,rotationWert,borderWidth,borderColor);
				}else
				if(element=="FarbPoligon"){
					var rgbaWert=array[1];
					var xWert=array[2];
					var yWert=array[3];
					var Array=array[4];
					var rotationWert=array[5];
					var borderWidth=array[6];
					var borderColor=array[7];
					Objekt.CanvasElemente[element](wer,rgbaWert,xWert,yWert,Array,rotationWert,borderWidth,borderColor);
				}
			}
		}
	}
	wer.translate(translateX,translateY);
	wer.rotate(-rotation);
	wer.translate(-translateX,-translateY);
	if(scaleX!=1||scaleY!=1||skewX!=0||skewY!=0||x!=0||y!=0){
		var rechenVaryScaleX=1/scaleX;
		var rechenVaryScaleY=1/scaleY;
		if(scaleX<0){
	//	alert("kleiner")
			rechenVaryScaleX;
		}
		if(scaleY<0){
			rechenVaryScaleY;
		}
		var rechenVarySkewX=skewX*-1;
		var rechenVarySkewY=skewY*-1;
		wer.transform(rechenVaryScaleX,rechenVarySkewX,rechenVarySkewY,rechenVaryScaleY,-x,-y);
	}
//	alert(wer.transform)
	wer.resetTransform();
	wer.scale(1,1);
};

Objekt.CanvasElemente.FarbPoligon = function (wer, rgba, x, y, Array, rotation, borderWidth, borderColor, position) {
	wer.scale(1, 1);
	wer.translate(x, y);
	gradientVary = "";
	let rgbaVary;
	let borderColorVary;;
	for (alle in CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs) {
		let array = CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs[alle];
		if (rgba == array[0]) {
			rgbaVary = Objekt[array[0]].GibDieFarbeRaus();
		}
		if (borderColor == array[0]) {
			borderColorVary = Objekt[array[0]].GibDieFarbeRaus();
		}
	}
	var minX = Infinity;
	var maxX = -Infinity;
	var minY = Infinity;
	var maxY = -Infinity;
	let array = CB.GegnerSchablone[AktuelleCharakter].Polygone.WelcheGibtEs;
	for(alle in array){
//	alert(array[alle][0][1])
		if(Array == array[alle][0][1]){
	//	alert(Array)
			Array = array[alle][6][1];
		}
	}
	for (var i = 0; i < Array.length; i++) {
		if (i % 2 === 0) {
			minX = Math.min(minX, Array[i].x);
			maxX = Math.max(maxX, Array[i].x);
		} else {
			minY = Math.min(minY, Array[i].y);
			maxY = Math.max(maxY, Array[i].y);
		}
	}
	var translateX = (minX + maxX) / 2;
	var translateY = (minY + maxY) / 2;
	wer.translate(translateX, translateY);
	wer.rotate(rotation);
	wer.translate(-translateX, -translateY);
	wer.beginPath();
	wer.fillStyle = rgbaVary;
	wer.moveTo(Array[0].x, Array[0].y);
	for (var item = 1; item < Array.length; item++) {
		wer.lineTo(Array[item].x, Array[item].y);
	}
	wer.closePath();
	wer.fill();
	CB.GegnerSchablone.MachDieFuellungen(wer, rgba);
	wer.strokeStyle = borderColorVary;
	wer.lineWidth = borderWidth;
	wer.stroke();
	wer.translate(translateX, translateY);
	wer.rotate(-rotation);
	wer.translate(-translateX, -translateY);
	wer.translate(-x, -y);
};

Objekt.CanvasElemente.FarbKreis=function(wer,rgba,x,y,radius,borderWidth,borderColor,position){
 	wer.scale(1,1);
 	let rgbaVary;
 	let borderColorVary;
	for(alle in CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs){
		var array=CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs[alle];
		if(rgba==array[0]){
			rgbaVary=Objekt[array[0]].GibDieFarbeRaus();
		}
		if(borderColor==array[0]){
	  		borderColorVary=Objekt[array[0]].GibDieFarbeRaus();
		}
	}
 	wer.beginPath();
 	wer.fillStyle=rgbaVary;
 	wer.arc(x,y,radius,0,2*Math.PI);
 	wer.fill();
 	CB.GegnerSchablone.MachDieFuellungen(wer,rgba);
 	wer.strokeStyle=borderColorVary;
 	wer.lineWidth=borderWidth;
 	wer.stroke();
  	wer.closePath();
 // 	wer.resetTransform();
};

Objekt.CanvasElemente.FarbStern=function(wer,rgba,x,y,radius,spitzen,rotation,borderWidth,borderColor,position){
	wer.scale(1,1);
	let rgbaVary;
	let borderColorVary;
	for(alle in CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs){
		var array=CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs[alle];
		if(rgba==array[0]){
			rgbaVary=Objekt[array[0]].GibDieFarbeRaus();
		}
		if(borderColor==array[0]){
			borderColorVary=Objekt[array[0]].GibDieFarbeRaus();
		}
	}
	var translateX=x*1;
	var translateY=y*1;
	wer.translate(translateX,translateY);
	wer.rotate(rotation);
	wer.translate(-translateX,-translateY);
	wer.strokeStyle=borderColorVary;
	wer.lineWidth=borderWidth;
	var points=spitzen||5;
	wer.fillStyle=rgbaVary;
	wer.beginPath();
	wer.moveTo(x*1,y*1+radius*1);
	for(var i=0;i<2*points+1;i++){
		var r=(i%2==0)?radius:radius/2;
		var a=Math.PI*i/points;
		wer.lineTo(x*1+r*Math.sin(a),y*1+r*Math.cos(a));
	};
	wer.closePath();
	wer.fill();
	CB.GegnerSchablone.MachDieFuellungen(wer,rgba);
	wer.stroke();
	wer.translate(translateX,translateY);
	wer.rotate(-rotation);
	wer.translate(-translateX,-translateY);
}

Objekt.CanvasElemente.FarbRechteck=function(wer,rgba,x,y,w,h,rotation,borderWidth,borderColor,position){
  	wer.scale(1,1);
  	let rgbaVary;
  	let borderColorVary;
  	for(alle in CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs){
	  	var array=CB.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs[alle];
	  	if(rgba==array[0]){
		  	rgbaVary=Objekt[array[0]].GibDieFarbeRaus();
	  	}
	  	if(borderColor==array[0]){
		  	borderColorVary=Objekt[array[0]].GibDieFarbeRaus();
	  	}
  	}
  	var translateX=x*1+(w/2)*1;
  	var translateY=y*1+(h/2)*1;
  	wer.translate(translateX,translateY);
  	wer.rotate(rotation);
  	wer.translate(-translateX,-translateY);
  	wer.beginPath();
  	wer.fillStyle=rgbaVary;
 	wer.fillRect(x,y,w,h);
 	wer.closePath();
 	wer.beginPath();
 	wer.moveTo(x,y);
 	wer.lineTo(x,y*1+h*1);
 	wer.lineTo(x*1+w*1,y*1+h*1);
 	wer.lineTo(x*1+w*1,y);
 	wer.closePath();
 	CB.GegnerSchablone.MachDieFuellungen(wer,rgba);
  	wer.strokeStyle=borderColorVary;
 	wer.lineWidth=borderWidth;
 	wer.strokeRect(x,y,w,h);
	wer.closePath();
	wer.translate(translateX,translateY);
	wer.rotate(-rotation);
	wer.translate(-translateX,-translateY);
//	wer.resetTransform();
};