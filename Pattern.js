CB.PatternInit=function(){
	Objekt.Pattern={};
	Objekt.Pattern.WelcheGibtEs=["Schachbrett","Streifen","Zufall","Kugeln","Zacken","Wellen","Sinus"];
	Objekt.Pattern.WelcheGibtEs.sort();
	
	for(all in Objekt.Pattern.WelcheGibtEs){
		Objekt.Pattern[Objekt.Pattern.WelcheGibtEs[all]]={};
	}
	
	Objekt.Pattern.Schachbrett.Bauen=function(element,farbe){
		var canvas=$(element);
		canvas.width=20;
		canvas.height=20;
		var ctx=canvas.getContext('2d');
		ctx.fillStyle=farbe;
		ctx.fillRect(0,0,10,10);
		ctx.fillRect(10,10,10,10);
	};
	
	Objekt.Pattern.Streifen.Bauen=function(element,farbe){
 		var canvas=$(element);
		canvas.width=20;
		canvas.height=20;
 		var ctx=canvas.getContext('2d');
	 	ctx.fillStyle=farbe;
 		ctx.fillRect(0,0,10,20);
	};
		
	Objekt.Pattern.Zufall.Bauen=function(element,farbe){
		var canvas=$(element);
		canvas.width=100;
		canvas.height=100;
		var ctx=canvas.getContext('2d');
		for(i=0;i<canvas.width;i++){
			for(j=0;j<canvas.width;j++){
				ctx.fillStyle=farbe;
				ctx.globalAlpha=Math.random();
				ctx.fillRect(i,j,1,1);
			}
		}
		ctx.globalAlpha=1;
	};
		
	Objekt.Pattern.Kugeln.Bauen=function(element,farbe){
		var canvas=$(element);
		var width=200;
		var height=200;
		canvas.width=width;
		canvas.height=height;
		var ctx=canvas.getContext('2d');
		for(kugeln=0;kugeln<354;kugeln++){
			var x=parseInt(Math.random()*width);
			var y=parseInt(Math.random()*height);
			var h=parseInt(Math.random()*10)+3*1;
			ctx.beginPath();
			ctx.arc(x,y,h,0,2*Math.PI);
			ctx.fillStyle=farbe;
			ctx.globalAlpha=Math.random();
			ctx.fill();
		}
		/*for(i=0;i<canvas.width;i++){
			for(j=0;j<canvas.width;j++){
				ctx.fillStyle=farbe;
				ctx.globalAlpha=Math.random();
				ctx.fillRect(i,j,1,1);
			}
		}*/
		ctx.globalAlpha=1;
	};
		
	Objekt.Pattern.Zacken.Bauen=function(element,farbe){
	 	var canvas=$(element);
	 	canvas.width=20;
	 	canvas.height=20;
		var ctx=canvas.getContext('2d');
		ctx.fillStyle=farbe;
		ctx.strokeStyle=farbe;
		ctx.lineWidth=4;
		ctx.beginPath();
		ctx.moveTo(0,-5);
		ctx.lineTo(15,10);
		ctx.lineTo(-5,30);
		ctx.stroke();
	};
	
	Objekt.Pattern.Wellen.Bauen=function(element,farbe){
		var canvas=$(element);
		canvas.width=20;
		canvas.height=20;
		var ctx=canvas.getContext('2d');
		ctx.fillStyle=farbe;
		ctx.strokeStyle=farbe;
		ctx.lineWidth=4;
	 	ctx.beginPath();
	 	ctx.moveTo(20,-5);
		ctx.bezierCurveTo(-2, 5, -2, 15, 20, 25);
	 	ctx.stroke();
	};
	
	Objekt.Pattern.Sinus.Bauen=function(element,farbe){
		var canvas=$(element);
		canvas.width=20;
		canvas.height=40;
		var ctx=canvas.getContext('2d');
		ctx.fillStyle=farbe;
		ctx.strokeStyle=farbe;
		ctx.lineWidth=4;
		ctx.beginPath();
		ctx.moveTo(13,-10);
		ctx.bezierCurveTo(-2, 5, -2, 15, 21, 20);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(-2,19);
		ctx.bezierCurveTo(12, 25, 12, 35, 0, 45);
		ctx.stroke();
	};
}