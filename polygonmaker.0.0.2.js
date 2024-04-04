$ = function(id) {return(document.getElementById(id))};

let PM = {};

PM.CreateDatabaseObjectsFromDataArray = function(dataArray) {
	for (let i = 0; i < dataArray.length; i++) {
		let polygonArray = dataArray[i];
		let polygonObject = {};
		for (let j = 0; j < polygonArray.length; j++) {
			let property = polygonArray[j];
			let key = property[0];
			let value = property[1];
			polygonObject[key] = value;
		}
		PM.DatabaseObject[polygonObject.id] = polygonObject;
		PM.DatabaseObjects.push(polygonObject.id);
	}
};

PM.PolygonMakerInit=function(){
	PM.VariablesInit();
	PM.AddEventListners();
	PM.CreateToolMenu();
	PM.CreateDatabaseObjectsFromDataArray(CB.GegnerSchablone[AktuelleCharakter].Polygone.WelcheGibtEs);
	PM.LoadPolyponsFromDatabaseObjects();
	PM.ClearAndResetCanvas();
	PM.DisplayPolygonArray();
}

PM.LoadPolyponsFromDatabaseObjects=function(){
	for(all in PM.DatabaseObjects){
		PM.Polygons.push(PM.DatabaseObject[PM.DatabaseObjects[all]]);
	}
}

PM.VariablesInit=function(){
	PM.Canvas = $("PM_Canvas");
	PM.MultiPointModeCheckbox = $("PM_MultiPointModeCheckbox");
	PM.Ctx = PM.Canvas.getContext("2d");
	PM.LineWidth = 6;
	PM.LineColor = "#000000";
	PM.FillColor = "#ffffff";
	PM.LineAlpha = 1;
	PM.FillAlpha = 1;
	PM.Coordinates = [];
	PM.Polygons = [];
	PM.History = [];
	PM.UndoStack = [];
	PM.SelectedPolygon = null;
	PM.SelectedCoordinateIndex = null;
	PM.SelectedCoordinatesArray = [];
	PM.SelectedCoordinatesArray_SaveState = [];
	PM.PointSelectMode = "singleMode";
	PM.TouchMoveTimer = null;
	PM.TouchMoveEventHappend = false;
	PM.TouchMoveStartPosition = { x: 0, y: 0 };
	PM.ClickEventOnExistingCoordinatesHappend = false;
	PM.CirleRadiusDefault = 5;
	PM.CirleRadiusActual = PM.CirleRadiusDefault;
	PM.SelectionRectangle = {
		start: null,
		end: null
	};
	PM.Tools = {
		Draw: 'Malen',
		Select: 'Auswählen',
		Rubber: 'Löschen',
		Rotate: 'Rotieren',
		Scaling: 'Scaling'
	};
	PM.DatabaseObject={};
	PM.DatabaseObjects = [];
	PM.Database=[
		[
			
		],
	];
	PM.User = {
		defaultTool: 'Draw',
		selectedTool: 'Draw'
	};
}

PM.ToggleMultiPointButtons = function() {
	if (PM_MultiPointModeCheckbox.checked) {
		PM_DeselectAllCoordinatesButton.style.display = "inline-block";
		PM_AddAllCoordinatesExceptSelectedButton.style.display = "inline-block";
	} else {
		PM_DeselectAllCoordinatesButton.style.display = "none";
		PM_AddAllCoordinatesExceptSelectedButton.style.display = "none";
	}
}

PM.DeselectAllCoordinates = function() {
	PM.SelectedCoordinatesArray = [];
	PM.SelectedCoordinateIndex = null;
	PM.DrawCanvas();
}

PM.AddAllCoordinatesExceptSelected = function() {
	PM.SelectedCoordinatesArray = [];
	for(all in PM.Coordinates){
		if(all!=PM.SelectedCoordinateIndex){
			PM.SelectedCoordinatesArray[PM.SelectedCoordinatesArray.length]=parseInt(all);
		}
	}
	PM.DrawCanvas();
}

PM.ToggleCircles = function() {
	if (PM.CirleRadiusActual > 0) {
		PM.CirleRadiusActual = 0;
		$("PM_ToggleCirclesButton").textContent = "Kreise anzeigen";
	} else {
		PM.CirleRadiusActual = PM.CirleRadiusDefault;
		$("PM_ToggleCirclesButton").textContent = "Kreise ausblenden";
	}
	PM.DrawCanvas();
}

PM.ScalePointsOnChange = function() {
	let scalePointsCheckbox = $("PM_ScalePointsCheckbox");
	if (scalePointsCheckbox.checked) {
		let canvasWidth = parseInt($("PM_CanvasWidthInput").value);
		let canvasHeight = parseInt($("PM_CanvasHeightInput").value);
		let previousCanvasWidth = PM.Canvas.width;
		let previousCanvasHeight = PM.Canvas.height;
		if (canvasWidth !== previousCanvasWidth || canvasHeight !== previousCanvasHeight) {
			let scaleX = canvasWidth / previousCanvasWidth;
			let scaleY = canvasHeight / previousCanvasHeight;
			PM.Coordinates.forEach(function(coord) {
				coord.x *= scaleX;
				coord.y *= scaleY;
			});
			PM.DrawCanvas();
		}
	}
}

PM.GetElementMousePosition = function(event, element) {
	let rect = element.getBoundingClientRect();
	let scaleX = element.width / rect.width;
	let scaleY = element.height / rect.height;
	let x = (event.clientX - rect.left) * scaleX;
	let y = (event.clientY - rect.top) * scaleY;
	return {
		x: x,
		y: y
	};
}

PM.UpdateCanvasSizeInputValues = function() {
	$("PM_CanvasWidthInput").value = PM.Canvas.width;
	$("PM_CanvasHeightInput").value = PM.Canvas.height;
}

PM.UpdateCanvasSize = function() {
	PM.ScalePointsOnChange();
	PM.Canvas.width = parseInt($("PM_CanvasWidthInput").value);
	PM.Canvas.height = parseInt($("PM_CanvasHeightInput").value);
	PM.UpdateCanvasSizeInputValues();
	PM.DrawCanvas();
}

PM.CheckChanges = function(polygon) {
	if (JSON.stringify(polygon.Coordinates) !== JSON.stringify(PM.Coordinates)) {
		return true;
	}
	if (polygon.LineWidth !== PM.LineWidth ||
		polygon.LineColor !== PM.LineColor ||
		polygon.LineAlpha !== PM.LineAlpha ||
		polygon.FillColor !== PM.FillColor ||
		polygon.FillAlpha !== PM.FillAlpha) {
		return true;
	}
	return false;
}

PM.ChangeImageID = function() {
	let newImageID = $("PM_ImageIDInput").value.trim(); // Entferne führende und nachfolgende Leerzeichen
	if (newImageID === "") {
		alert("Bitte geben Sie eine Bild-ID ein.");
		return;
	}
	let idExists = PM.Polygons.some(polygon => polygon.id === newImageID);
	if (idExists) {
		alert("Diese ID ist schon vergeben.");
		return;
	}
	if (PM.SelectedPolygon) {
		PM.SelectedPolygon.id = newImageID;
		PM.DisplayPolygonArray();
	}
}

PM.Undo = function() {
	if (PM.History.length > 0) {
		let lastState = PM.History.pop();
		PM.AddToUndoStack(lastState);
		let deletedCoordinate = null;
		if (lastState.SelectedCoordinateIndex !== null && lastState.SelectedCoordinateIndex < lastState.Coordinates.length) {
			deletedCoordinate = lastState.Coordinates[lastState.SelectedCoordinateIndex];
		}
		PM.Coordinates = lastState.Coordinates; // Letzten Zustand wiederherstellen
		PM.SelectedCoordinateIndex = lastState.SelectedCoordinateIndex; // Wiederherstellen des ausgewählten Koordinatenindex
		PM.SelectedCoordinatesArray = lastState.SelectedCoordinatesArray;
		PM.SelectedPolygon = lastState.SelectedPolygon; // Wiederherstellen des ausgewählten Polygons
		PM.DrawCanvas();
		if (deletedCoordinate) {
			let index = PM.Coordinates.findIndex((coord) => coord.x === deletedCoordinate.x && coord.y === deletedCoordinate.y);
			if (index !== -1) {
				PM.SelectedCoordinateIndex = index;
				PM.DrawCanvas();
			}
		}
	}
	if (PM.History.length <= 0) {
		PM.ClearHistory();
	}
	PM.DrawCanvas();
}

PM.ResetCanvasDefaults = function() {
	PM.LineWidth = 6;
	PM.LineColor = "#000000";
	PM.LineAlpha = 1;
	PM.FillColor = "#ffffff";
	PM.FillAlpha = 1;
	$("PM_LineWidth").value = PM.LineWidth;
	$("PM_LineColor").value = PM.LineColor;
	$("PM_LineAlpha").value = PM.LineAlpha;
	$("PM_FillColor").value = PM.FillColor;
	$("PM_FillAlpha").value = PM.FillAlpha;
}

PM.IdCreator = function(id){
	let idExists = PM.Polygons.some(polygon => polygon.id === id);
	if (idExists) {
		id += "_Neu";
	}
	idExists = PM.Polygons.some(polygon => polygon.id === id);
	if (idExists) {
		return PM.IdCreator(id);
	}else{
		return id;
	}
}

PM.ClearAndResetCanvas = function() {
	PM.Ctx.clearRect(0, 0, PM.Canvas.width, PM.Canvas.height);
	PM.ResetCanvasDefaults();
	PM.Coordinates = [];
	PM.SelectedCoordinateIndex = null;
	PM.SelectedCoordinatesArray = [];
	PM.SelectedPolygon = null;
	let newImageID = "Polygon" + (PM.Polygons.length + 1);
	$("PM_ImageIDInput").value = PM.IdCreator(newImageID);
	PM.DisplayPolygonArray();
	PM.ClearHistory();
	PM.UndoStack = [];
	PM.UpdateCanvasSizeInputValues();
	PM.AddToHistory();
}

PM.AddToHistory = function() {
	let historyEntry = {
		Coordinates: JSON.parse(JSON.stringify(PM.Coordinates)),
		SelectedCoordinateIndex: PM.SelectedCoordinateIndex,
		SelectedCoordinatesArray: PM.SelectedCoordinatesArray,
		SelectedPolygon: PM.SelectedPolygon
	};
	if (PM.SelectedCoordinateIndex !== null && PM.SelectedCoordinateIndex < PM.Coordinates.length) {
		historyEntry.selectedCoordinate = PM.Coordinates[PM.SelectedCoordinateIndex];
	}
	PM.History.push(historyEntry);
}

PM.ClearHistory = function() {
	PM.History = [];
	PM.AddToHistory();
}

PM.AddToUndoStack = function(deletedValue) {
	PM.UndoStack.push(deletedValue);
}

PM.RestoreLastDeletedHistoryValue = function() {
	if (PM.UndoStack.length > 0) {
		let lastDeletedValue = PM.UndoStack.pop();
		PM.History.push(lastDeletedValue);
		PM.Coordinates = lastDeletedValue.Coordinates; // Letzten Zustand wiederherstellen
		PM.SelectedCoordinateIndex = lastDeletedValue.SelectedCoordinateIndex; // Wiederherstellen des ausgewählten Koordinatenindex
		PM.SelectedCoordinatesArray = lastDeletedValue.SelectedCoordinatesArray;
		PM.SelectedPolygon = lastDeletedValue.SelectedPolygon; // Wiederherstellen des ausgewählten Polygons
		PM.DrawCanvas();
	}
}

PM.DeleteSelectedCoordinate = function() {
	if(PM.PointSelectMode == "singleMode"){
		if (PM.SelectedCoordinateIndex !== null) {
			PM.Coordinates.splice(PM.SelectedCoordinateIndex, 1)[0];
		}
	}else
	if(PM.PointSelectMode == "multibleMode"){
		let leftoverCoordinatesArray = [];
		for(all in PM.Coordinates){
			if(!PM.SelectedCoordinatesArray.includes(parseInt(all))){
				if(PM.SelectedCoordinateIndex!=parseInt(all)){
					leftoverCoordinatesArray.push(PM.Coordinates[all]);
				}
			}
		}
		PM.Coordinates = leftoverCoordinatesArray;
		PM.SelectedCoordinatesArray = [];
	}
	PM.SelectedCoordinateIndex = null;
	PM.UndoStack = [];
	PM.AddToHistory();
	PM.DrawCanvas();
}

PM.CalculateDistance = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

PM.ClearTimer = function(timer){
	if (PM[timer]) {
		clearTimeout(PM[timer]);
		PM[timer] = null;
	} 
}

PM.DrawSelectionRectangle=function(ctx, rect) {
	if (rect.start && rect.end) {
		ctx.beginPath();
		ctx.rect(
			Math.min(rect.start.x, rect.end.x),
			Math.min(rect.start.y, rect.end.y),
			Math.abs(rect.end.x - rect.start.x),
			Math.abs(rect.end.y - rect.start.y)
		);
		ctx.strokeStyle = "rgba(67,67,67,0.5)";
		ctx.setLineDash([5, 5]);
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.setLineDash([0, 0]);
	}
}

PM.HandleSelectionRectangle = function(position) {
	let start = { x: position.x, y: position.y };
	let end = { x: PM.TouchMoveStartPosition.x, y: PM.TouchMoveStartPosition.y };
	let rectangle = {
		x: Math.min(start.x, end.x),
		y: Math.min(start.y, end.y),
		width: Math.abs(end.x - start.x),
		height: Math.abs(end.y - start.y)
	};
	PM.SelectedCoordinatesArray = [];
	for (all in PM.SelectedCoordinatesArray_SaveState) {
		if (!PM.SelectedCoordinatesArray.includes(PM.SelectedCoordinatesArray_SaveState[all])) {
			if(PM.SelectedCoordinateIndex != PM.SelectedCoordinatesArray_SaveState[all]){
				PM.SelectedCoordinatesArray.push(PM.SelectedCoordinatesArray_SaveState[all]);
			}
		}
	}
	// Iteration über alle Koordinaten und Hinzufügen der innerhalb des Rechtecks liegenden Koordinaten zum ausgewählten Koordinaten-Array
	for (let i = 0; i < PM.Coordinates.length; i++) {
		let coord = PM.Coordinates[i];
		if (PM.IsPointInsideRectangle(coord, rectangle)) {
			if(PM.SelectedCoordinateIndex != parseInt(i)){
				if(!PM.SelectedCoordinatesArray.includes(parseInt(i))){
					PM.SelectedCoordinatesArray.push(i);
				}
			}
		}
	}
	if (!PM.SelectionRectangle.start) {
		PM.SelectionRectangle.start = { x: position.x, y: position.y };
	}
	PM.SelectionRectangle.end = { x: position.x, y: position.y };
	PM.DrawCanvas();
}

PM.HandleDrawToolClick = function(x, y, closestIndex) {
	if (closestIndex !== null) {
	//	alert(closestIndex+","+PM.FindClosestLineIndices(x, y).start+","+PM.FindClosestLineIndices(x, y).end);
		PM.Coordinates.splice(closestIndex + 1, 0, { x: x, y: y });
		
		PM.SelectedCoordinateIndex = closestIndex + 1;
	} else if (closestIndex == null) {
		PM.Coordinates.push({ x: x, y: y });
		PM.SelectedCoordinateIndex = PM.Coordinates.length - 1;
	}
	PM.SelectedCoordinatesArray = [];
}

PM.FindClosestLineIndices = function(x, y) {
let closestLineIndices = { start: null, end: null };
let minDistance = Infinity;

for (let i = 0; i < PM.Coordinates.length; i++) {
let nextIndex = (i + 1) % PM.Coordinates.length;
let x1 = PM.Coordinates[i].x;
let y1 = PM.Coordinates[i].y;
let x2 = PM.Coordinates[nextIndex].x;
let y2 = PM.Coordinates[nextIndex].y;

// Berechnung der Distanz von Punkt (x, y) zur Linie (x1, y1) -> (x2, y2)
let distance = PM.PointToLineDistance(x, y, x1, y1, x2, y2);
//	alert(distance)
// Aktualisierung der Indizes der Koordinatenpunkte für die kürzeste Strecke
if (distance < minDistance) {
minDistance = distance;
closestLineIndices.start = i;
closestLineIndices.end = nextIndex;
//	alert(minDistance)
}
}

return closestLineIndices;
};


// Hilfsfunktion zur Berechnung der Distanz von einem Punkt zu einer Linie
PM.PointToLineDistance = function(x, y, x1, y1, x2, y2) {
let A = x - x1;
let B = y - y1;
let C = x2 - x1;
let D = y2 - y1;

let dot = A * C + B * D;
let lenSq = C * C + D * D;
let param = -1;

if (lenSq !== 0) // in dem Fall ist die Linie ein Punkt, also wird param = 0
param = dot / lenSq;

let xx, yy;

if (param < 0) {
xx = x1;
yy = y1;
} else if (param > 1) {
xx = x2;
yy = y2;
} else {
xx = x1 + param * C;
yy = y1 + param * D;
}

let dx = x - xx;
let dy = y - yy;
return Math.sqrt(dx * dx + dy * dy);
};

PM.HandleCoordinateSelection = function(index) {
	if (PM.SelectedCoordinatesArray.includes(index)) {
		PM.SelectedCoordinatesArray.splice(PM.SelectedCoordinatesArray.indexOf(index), 1);
	} else if (PM.SelectedCoordinateIndex === index) {
		PM.SelectedCoordinateIndex = null;
	} else {
		 if (PM.PointSelectMode === "multibleMode" && PM.SelectedCoordinateIndex != null) {
			if (!PM.SelectedCoordinatesArray.includes(PM.SelectedCoordinateIndex)) {
				PM.SelectedCoordinatesArray.push(PM.SelectedCoordinateIndex);
			}
		}
		PM.SelectedCoordinateIndex = index;
	}
}

PM.SetMultiPointMode=function()	{
	if(!PM_MultiPointModeCheckbox.checked){
		PM_MultiPointModeCheckbox.checked = true;
	}
	PM_MultiPointModeContainer.style.height = 8+"%";
	PM.PointSelectMode = "multibleMode";
	PM_MultiPointModeCheckboxLabel.innerHTML = "Multipoint-Modus";
	PM.ToggleMultiPointButtons();
}

PM.HandleRubberToolTouchEndEvent=function(){
	PM.AddToHistory();
	let operationArray = [];
	for(all in PM.Coordinates){
		if(!PM.SelectedCoordinatesArray.includes(parseInt(all))){
			operationArray.push(PM.Coordinates[all]);
		}
	}
	PM.Coordinates = operationArray;
	PM.SelectedCoordinatesArray = [];
}

PM.FindCenterPointOfPolygon = function(coords){
	let point = { x:0,y:0};
	for (let i = 0; i < coords.length; i++) {
		point.x += coords[i].x;
		point.y += coords[i].y;
	}
	point.x /= coords.length;
	point.y /= coords.length;
	return point;
}

PM.RotatePolygon = function(angle, coords, selectedCoordIndex) {
	let centerPoint = { x:0,y:0};
	if (selectedCoordIndex !== null) {
		centerPoint.x = coords[selectedCoordIndex].x;
		centerPoint.y = coords[selectedCoordIndex].y;
	} else {
		centerPoint = PM.FindCenterPointOfPolygon(coords);
	}
	for (let i = 0; i < coords.length; i++) {
		let x = coords[i].x - centerPoint.x;
		let y = coords[i].y - centerPoint.y;
		let rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
		let rotatedY = x * Math.sin(angle) + y * Math.cos(angle);
		coords[i].x = rotatedX + centerPoint.x;
		coords[i].y = rotatedY + centerPoint.y;
	}
	PM.DrawCanvas();
};

PM.ScalePolygon = function(scaleFactor, coords, selectedCoordIndex) {
	let centerPoint = { x:0,y:0};
	if (selectedCoordIndex === null) {
		centerPoint = PM.FindCenterPointOfPolygon(coords);
	} else {
		centerPoint = coords[selectedCoordIndex];
	}
	coords.forEach((coord, i) => {
		if (i === selectedCoordIndex) return;
		let deltaX = coord.x - centerPoint.x;
		let deltaY = coord.y - centerPoint.y;
		let distance = Math.hypot(deltaX, deltaY);
		let scaledDistance = distance * scaleFactor;
		let scaleRatio = scaledDistance / distance;
		coord.x = centerPoint.x + deltaX * scaleRatio;
		coord.y = centerPoint.y + deltaY * scaleRatio;
	});
	PM.DrawCanvas();
};

PM.AddEventListners = function() {
	
	PM.Canvas.addEventListener("click", function (event) {
		event.preventDefault();
		if (PM.ClickEventOnExistingCoordinatesHappend == false) {
			if(PM.User.selectedTool == "Draw"){
				let position = PM.GetElementMousePosition(event, PM.Canvas);
				let x = position.x;
				let y = position.y;
				let closestIndex = PM.FindClosestCoordinateIndex(x, y, PM.Coordinates);
				let isInside = PM.IsPointInsidePolygon(position, PM.Coordinates);
				if(isInside){
				//	alert(isInside);
				}
				PM.HandleDrawToolClick(x, y, closestIndex);
				PM.UndoStack = [];
				PM.AddToHistory();
				PM.DrawCanvas();
			}else
			if(PM.User.selectedTool == "Select"){
			}else
			if(PM.User.selectedTool == "Rubber"){
			}else
			if(PM.User.selectedTool == "Rotate"){
			}
		}
	});

	PM.Canvas.addEventListener("touchmove",
		function (event) {
			if (event.touches.length >= 2) {} else {
				event.preventDefault();
				if (PM.TouchMoveTimer !== null) return;
				PM.TouchMoveTimer = setTimeout(function() {
					let position = PM.GetElementMousePosition(event.touches[0], PM.Canvas);
					let deltaX = position.x - PM.TouchMoveStartPosition.x;
					let deltaY = position.y - PM.TouchMoveStartPosition.y;
					if(PM.User.selectedTool == "Scaling"){
						let scaleFactor = 1;
						let deltaDistace = deltaX;
						let scaleFactorTriggerDistance = 10;
						if(deltaDistace<-scaleFactorTriggerDistance){
							scaleFactor = 0.99;
						}else
						if(deltaDistace>scaleFactorTriggerDistance){
							scaleFactor = 1.01;
						}
						PM.ScalePolygon(scaleFactor, PM.Coordinates, PM.SelectedCoordinateIndex);
					}else
					if(PM.User.selectedTool == "Rotate"){
						let rotation = 0;
						let deltaDistace = -deltaX + deltaY;
						let rotationTriggerDistance = 10;
						if(deltaDistace<-rotationTriggerDistance){
							rotation = ((deltaDistace+rotationTriggerDistance)/1000).toFixed(2)
						}else
						if(deltaDistace>rotationTriggerDistance){
							rotation = ((deltaDistace-rotationTriggerDistance)/1000).toFixed(2)
						}
						PM.RotatePolygon(rotation, PM.Coordinates, PM.SelectedCoordinateIndex);
					}else
					if(PM.User.selectedTool == "Draw"){
						PM.MoveSelectedCoordinates(deltaX, deltaY, position, PM.Coordinates, PM.SelectedCoordinateIndex);
					}else
					if (PM.User.selectedTool === "Select"||PM.User.selectedTool == "Rubber") {
						PM.HandleSelectionRectangle(position);
					}
					PM.TouchMoveTimer = null;
					PM.TouchMoveEventHappend = true;
				},42);
			}
		}
	);

	PM.Canvas.addEventListener("touchend", function (event) {
		if (PM.User.selectedTool == "Scaling"){
			PM.UndoStack = [];
			PM.AddToHistory();
		} else
		if (PM.User.selectedTool == "Rotate"){
			PM.UndoStack = [];
			PM.AddToHistory();
		} else
		if (PM.User.selectedTool == "Draw"){
			if (PM.SelectedCoordinateIndex !== null && PM.TouchMoveEventHappend == true) {
				PM.UndoStack = [];
				PM.AddToHistory();
			}
		} else
		if (PM.User.selectedTool == "Select"){
			if(PM.SelectedCoordinatesArray.length > 0){
				PM.SetMultiPointMode();
			}
		} else
		if (PM.User.selectedTool == "Rubber"){
			PM.HandleRubberToolTouchEndEvent();
			PM.UndoStack = [];
			PM.AddToHistory();
		}
		PM.ClearTimer("TouchMoveTimer");
		PM.TouchMoveEventHappend = false;
		PM.ClickEventOnExistingCoordinatesHappend = false;
		PM.SelectionRectangle = {
			start: null,
			end: null
		};
		PM.DrawCanvas();
	});

	PM.Canvas.addEventListener("touchstart", function (event) {
		PM.ClearTimer("TouchMoveTimer");
		let position = PM.GetElementMousePosition(event.touches[0], PM.Canvas);
		PM.TouchMoveStartPosition = { x: position.x, y: position.y };
		PM.SelectedCoordinatesArray_SaveState = PM.SelectedCoordinatesArray;
		for (let i = 0; i < PM.Coordinates.length; i++) {
			let coord = PM.Coordinates[i];
			let distance = PM.CalculateDistance(coord.x, coord.y, position.x, position.y);
			if (distance <= 10) {
				if(PM.User.selectedTool == "Draw"||PM.User.selectedTool == "Select"||PM.User.selectedTool == "Rotate"||PM.User.selectedTool == "Scaling"){
					PM.HandleCoordinateSelection(i);
				}
				else
				if(PM.User.selectedTool == "Rubber"){
					PM.SelectedCoordinateIndex = i;
					PM.DeleteSelectedCoordinate();
				}
				event.preventDefault();
				PM.DrawCanvas();
				PM.ClickEventOnExistingCoordinatesHappend = true;
				return;
			} else {
				PM.ClickEventOnExistingCoordinatesHappend = false;
			}
		}
	});
	
	PM.MultiPointModeCheckbox.addEventListener("change", function(event) {
		if (event.target.checked) {
			PM_MultiPointModeContainer.style.height = 8+"%";
			PM.PointSelectMode = "multibleMode";
			PM_MultiPointModeCheckboxLabel.innerHTML = "Multipoint-Modus";
		} else {
			PM_MultiPointModeContainer.style.height = 3+"%";
			PM.SelectedCoordinatesArray = [];
			PM.PointSelectMode = "singleMode";
			PM_MultiPointModeCheckboxLabel.innerHTML = "Singlepoint-Modus";
			PM.DrawCanvas();
		}
	});
};

PM.IsPointInsideRectangle = function(point, rectangle) {
	return point.x >= rectangle.x && point.x <= (rectangle.x + rectangle.width) &&
	point.y >= rectangle.y && point.y <= (rectangle.y + rectangle.height);
}

PM.IsPointInsidePolygon = function(point, coords) {
	let inside = false;
	let x = point.x;
	let y = point.y;
	let polyPoints = coords;
	let polyLength = polyPoints.length;
	for (let i = 0, j = polyLength - 1; i < polyLength; j = i++) {
		let xi = polyPoints[i].x;
		let yi = polyPoints[i].y;
		let xj = polyPoints[j].x;
		let yj = polyPoints[j].y;

		let intersect = ((yi > y) !== (yj > y)) &&
		(x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}
	return inside;
}

function doLinesIntersect(line1Start, line1End, line2Start, line2End) {
	function orientation(p, q, r) {
		const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
		if (val === 0) return 0; // colinear
			return (val > 0) ? 1 : 2; // clock or counterclock wise
	}

	function onSegment(p, q, r) {
		if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
		q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
		return true;
		return false;
	}

	const o1 = orientation(line1Start, line1End, line2Start);
	const o2 = orientation(line1Start, line1End, line2End);
	const o3 = orientation(line2Start, line2End, line1Start);
	const o4 = orientation(line2Start, line2End, line1End);

	// General case
	if (o1 !== o2 && o3 !== o4) return true;

	// Special Cases
	if (o1 === 0 && onSegment(line1Start, line2Start, line1End)) return true;
	if (o2 === 0 && onSegment(line1Start, line2End, line1End)) return true;
	if (o3 === 0 && onSegment(line2Start, line1Start, line2End)) return true;
	if (o4 === 0 && onSegment(line2Start, line1End, line2End)) return true;

	return false; // Doesn't fall in any of the above cases
}


PM.FindClosestCoordinateIndex = function(x, y, array) {
	let closestDistance = Infinity;
	let closestIndex = null;
	for (let i = 0; i < array.length; i++) {
		let coord = array[i];
		let distance = PM.CalculateDistance(coord.x, coord.y, x, y);
		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = i;
		}
	}
	return closestIndex;
}

PM.HexToRgb = function(hex) {
	hex = hex.replace(/^#/, "");
	if (hex.length !== 3 && hex.length !== 6) {
		throw new Error("Ungültiger Hexadezimalwert");
	}
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);
	return `${r}, ${g}, ${b}`;
}

PM.DrawCanvas = function() {
	PM.Ctx.clearRect(0, 0, PM.Canvas.width, PM.Canvas.height);
	if (PM.Coordinates.length > 0) {
		PM.Ctx.beginPath();
		PM.Ctx.moveTo(PM.Coordinates[0].x, PM.Coordinates[0].y);
		for (let i = 1; i < PM.Coordinates.length; i++) {
			PM.Ctx.lineTo(PM.Coordinates[i].x, PM.Coordinates[i].y);
		}
		PM.Ctx.closePath();
		PM.Ctx.strokeStyle = `rgba(${PM.HexToRgb(PM.LineColor)}, ${PM.LineAlpha})`;
		PM.Ctx.lineWidth = PM.LineWidth;
		PM.Ctx.fillStyle = `rgba(${PM.HexToRgb(PM.FillColor)}, ${PM.FillAlpha})`;
		PM.Ctx.stroke();
		PM.Ctx.fill();
		for (let i = 0; i < PM.Coordinates.length; i++) {
			PM.Ctx.beginPath();
			PM.Ctx.ellipse(PM.Coordinates[i].x, PM.Coordinates[i].y, PM.CirleRadiusActual / PM.Ctx.getTransform().a, PM.CirleRadiusActual / PM.Ctx.getTransform().a, 0, 0, Math.PI * 2);
			if (PM.SelectedCoordinateIndex !== null && i === PM.SelectedCoordinateIndex) {
				PM.Ctx.fillStyle = "orange";
			} else {
				if (PM.SelectedCoordinatesArray.includes(i)){
					PM.Ctx.fillStyle = "#ff3434";
				}else{
					PM.Ctx.fillStyle = "lightblue";
				}
			}
			PM.Ctx.fill();
			PM.Ctx.fillStyle = "black";
			PM.Ctx.lineWidth = 1;
			PM.Ctx.stroke();
		}
	}
	PM.DrawSelectionRectangle(PM.Ctx, PM.SelectionRectangle);
}

PM.UpdateConstructionValue = function(property, value) {
	switch (property) {
		case "lineWidth":
			PM.LineWidth = value;
			break;
		case "lineColor":
			PM.LineColor = value;
			break;
		case "fillColor":
			PM.FillColor = value;
			break;
		case "lineAlpha":
			PM.LineAlpha = value;
			break;
		case "fillAlpha":
			PM.FillAlpha = value;
			break;
		default:
			console.error("Ungültige Eigenschaft: " + property);
		return;
	}
	PM.DrawCanvas();
}

PM.SavePolygon = function() {
//	PM.Coordinates = PM.Coordinates.map(coord => `{"x": ${Math.round(coord.x)}, "y": ${Math.round(coord.y)}}`);
	
	if (PM.Coordinates.length >= 3) {
		if (PM.SelectedPolygon) {
			PM.SelectedPolygon.LineWidth = PM.LineWidth;
			PM.SelectedPolygon.LineColor = PM.LineColor;
			PM.SelectedPolygon.FillColor = PM.FillColor;
			PM.SelectedPolygon.LineAlpha = PM.LineAlpha;
			PM.SelectedPolygon.FillAlpha = PM.FillAlpha;
			PM.SelectedPolygon.Coordinates = JSON.parse(JSON.stringify(PM.Coordinates));
			PM.SelectedPolygon.CanvasWidth = PM.Canvas.width;
			PM.SelectedPolygon.CanvasHeight = PM.Canvas.height;
			PM.DisplayPolygonArray();
		} else {
			let id = $("PM_ImageIDInput").value;
			let copiedCoordinates = JSON.parse(JSON.stringify(PM.Coordinates));
			let polygon = {
				id: id,
				LineWidth: PM.LineWidth,
				LineColor: PM.LineColor,
				FillColor: PM.FillColor,
				LineAlpha: PM.LineAlpha,
				FillAlpha: PM.FillAlpha,
				Coordinates: copiedCoordinates,
				CanvasWidth: PM.Canvas.width,
				CanvasHeight: PM.Canvas.height
			};
			PM.Polygons.push(polygon);
			PM.SelectedPolygon = polygon;
			PM.DisplayPolygonArray();
		}
		//PM.DrawCanvas();
		//PM.ClearHistory();
	} else {
		alert("Es sind mindestens 3 Koordinaten erforderlich, um ein geschlossenes Polygon zu speichern.");
	}
}


PM.CreateProportionalThumbnail = function(polygon, div) {
	let thumbnailCanvas = document.createElement("canvas");
	thumbnailCanvas.width = 100;
	thumbnailCanvas.height = 100;
	let thumbnailCtx = thumbnailCanvas.getContext("2d");
	let scaleX = thumbnailCanvas.width / polygon.CanvasWidth;
	let scaleY = thumbnailCanvas.height / polygon.CanvasHeight;
	thumbnailCtx.beginPath();
	thumbnailCtx.moveTo(polygon.Coordinates[0].x * scaleX, polygon.Coordinates[0].y * scaleY);
	for (let i = 1; i < polygon.Coordinates.length; i++) {
		thumbnailCtx.lineTo(polygon.Coordinates[i].x * scaleX, polygon.Coordinates[i].y * scaleY);
	}
	thumbnailCtx.closePath();
	let lineRgb = PM.HexToRgb(polygon.LineColor);
	thumbnailCtx.strokeStyle = `rgba(${lineRgb}, ${polygon.LineAlpha})`;
	thumbnailCtx.lineWidth = polygon.LineWidth * scaleX;
	let fillRgb = PM.HexToRgb(polygon.FillColor);
	thumbnailCtx.fillStyle = `rgba(${fillRgb}, ${polygon.FillAlpha})`;
	thumbnailCtx.stroke();
	thumbnailCtx.fill();
	let thumbnailImage = document.createElement("img");
	thumbnailImage.src = thumbnailCanvas.toDataURL();
	thumbnailImage.classList.add("PM_PolygonObjectsDisplay-thumbnail");
	thumbnailImage.classList.add("PM_ChessPatternSmall");
	div.appendChild(thumbnailImage);
}

PM.DisplayPolygonArray = function() {
	let container = $("PM_PolygonContainer");
	container.innerHTML = "";
	PM.Polygons.forEach(function (polygon) {
		let div = document.createElement("div");
		div.classList.add("PM_PolygonObjectsDisplay-container");
		PM.CreateProportionalThumbnail(polygon, div);
		let idDisplay = document.createElement("div");
		idDisplay.classList.add("PM_PolygonObjectsDisplay-idDisplay");
		div.appendChild(idDisplay);
		idDisplay.innerHTML = polygon.id;
		let infoButton = document.createElement("button");
		infoButton.textContent = "Info";
		infoButton.onclick = function () {
			PM.ShowDataOfThisPolygonAsArray(polygon);
		};
		infoButton.classList.add("PM_PolygonObjectsDisplay-infoButton");
		div.appendChild(infoButton);
		let loadButton = document.createElement("button");
		loadButton.textContent = "Laden";
		loadButton.onclick = function () {
			PM.LoadPolygon(polygon);
		};
		loadButton.classList.add("PM_PolygonObjectsDisplay-loadButton");
		div.appendChild(loadButton);
		let deleteButton = document.createElement("button");
		deleteButton.textContent = "Löschen";
		deleteButton.onclick = function () {
			PM.DeletePolygon(polygon);
		};
		deleteButton.classList.add("PM_PolygonObjectsDisplay-deleteButton");
		div.appendChild(deleteButton);
		if (polygon === PM.SelectedPolygon) {
			div.classList.add("selected");
			let updateButton = document.createElement("button");
			updateButton.textContent = "Update";
			updateButton.onclick = function () {
				PM.SavePolygon();
			};
			updateButton.classList.add("PM_PolygonObjectsDisplay-updateButton");
			div.appendChild(updateButton);
		}
		container.appendChild(div);
	});
}

PM.CopyAndPastePolygonDataArrayIntoCache = function() {
	var polygonDataArray = PM.GetPolygonDataArray();
	var formattedData = PM.FormatPolygonDataArray(polygonDataArray);
	PM.CopyAndPasteDataIntoCache(formattedData);
}

PM.FormatPolygonDataArray = function(polygonDataArray) {
	var formattedData = "CB.GegnerSchablone.TestFigur.Polygone.WelcheGibtEs = [\n";
	polygonDataArray.forEach(function(polygonData) {
		formattedData += "\t[\n";
		polygonData.forEach(function(pair) {
			formattedData += "\t\t[" + JSON.stringify(pair[0]) + ", " + JSON.stringify(pair[1]) + "],\n";
		});
		formattedData += "\t],\n";
	});
	formattedData += "];\n";
	return formattedData;
}

PM.GetPolygonDataArray = function() {
	var polygonDataArray = [];
	PM.Polygons.forEach(function(polygon) {
		var coordinates = polygon.Coordinates.map(coord => ({x: Math.round(coord.x), y: Math.round(coord.y)}));
		var polygonData = [
			["id", polygon.id],
			["LineWidth", polygon.LineWidth],
			["LineColor", polygon.LineColor],
			["FillColor", polygon.FillColor],
			["LineAlpha", polygon.LineAlpha],
			["FillAlpha", polygon.FillAlpha],
			["Coordinates", polygon.Coordinates],
			["CanvasWidth", polygon.CanvasWidth],
			["CanvasHeight", polygon.CanvasHeight]
		];
		polygonData = polygonData.map(item => item.map(value => typeof value === 'string' ? value.replace(/\\/g, '') : value));
		polygonDataArray.push(polygonData);
	});
	return polygonDataArray;
}

PM.ShowDataOfThisPolygon = function(polygon) {
	var coordinates = polygon.Coordinates.map(coord => `{"x": ${Math.round(coord.x)}, "y": ${Math.round(coord.y)}}`);
	var polygonData = `
		PM.DatabaseObject.${polygon.id} = {
		"id": '${polygon.id}',
		"LineWidth": ${polygon.LineWidth},
		"LineColor": "${polygon.LineColor}",
		"FillColor": "${polygon.FillColor}",
		"LineAlpha": ${polygon.LineAlpha},
		"FillAlpha": ${polygon.FillAlpha},
		"Coordinates": [${coordinates.join(",")}],
		"CanvasWidth": ${polygon.CanvasWidth},
		"CanvasHeight": ${polygon.CanvasHeight}
	};`;
	PM.CopyAndPasteDataIntoCache(polygonData);
}

PM.ShowDataOfThisPolygonAsArray = function(polygon) {
	var coordinates = polygon.Coordinates.map(coord => `{"x": ${Math.round(coord.x)}, "y": ${Math.round(coord.y)}}`);
	var polygonData = `
	[
		["id", "${polygon.id}"],
		["LineWidth", ${polygon.LineWidth}],
		["LineColor", "${polygon.LineColor}"],
		["FillColor", "${polygon.FillColor}"],
		["LineAlpha", ${polygon.LineAlpha}],
		["FillAlpha", ${polygon.FillAlpha}],
		["Coordinates", [${coordinates.join(",")}]],
		["CanvasWidth", ${polygon.CanvasWidth}],
		["CanvasHeight", ${polygon.CanvasHeight}]
	]
	`;
	PM.CopyAndPasteDataIntoCache(polygonData);
}

PM.CopyAndPasteDataIntoCache = function(data){
	var dataTextArea = document.createElement('textarea');
	dataTextArea.setAttribute('readonly', '');
	dataTextArea.style.position = 'absolute';
	dataTextArea.style.left = '-9999px';
	dataTextArea.value = data;
	document.body.appendChild(dataTextArea);
	dataTextArea.select();
	document.execCommand('copy');
	document.body.removeChild(dataTextArea);
	alert('Die Daten wurden in die Zwischenablage kopiert.');
}

PM.UnfinishedBuissnesChecker=function(){
	if(PM.SelectedPolygon){
		if(PM.CheckChanges(PM.SelectedPolygon)==true){
			var check = confirm('Willst du die Änderungen an diesem Polygon speichern?'); 
			if (check == true) {
				PM.SavePolygon();
			}
		}
	}else{
		if(PM.Coordinates.length>2){
			var check = confirm('Willst du das angefangene Polygon speichern?'); 
			if (check == true) {
				PM.SavePolygon();
			} else {
				var check = confirm('Willst die Leinwand wechseln? Angefangene Koordinaten gehen verloren.'); 
				if (check == false) {
					return true;
				}
			}
		}
	}
}

PM.MoveSelectedCoordinates = function(deltaX, deltaY, position, coords, selectedIndex) {
	if(selectedIndex != null){
		coords[selectedIndex].x += deltaX;
		coords[selectedIndex].y += deltaY;
	}
	PM.SelectedCoordinatesArray.forEach(function(index) {
		coords[index].x += deltaX;
		coords[index].y += deltaY;
	});
	PM.DrawCanvas();
	PM.TouchMoveStartPosition = position;
}

PM.ApplyInbetweenPointsToPolygon = function(coords) {
	let newCoordinates = [];
	for (let i = 0; i < coords.length; i++) {
		newCoordinates.push(coords[i]);
		if (PM.SelectedCoordinatesArray.includes(i) || PM.SelectedCoordinateIndex == parseInt(i)) {
			let nextIndex = (i + 1) % coords.length;
			if (PM.SelectedCoordinatesArray.includes(nextIndex) || PM.SelectedCoordinateIndex == parseInt(nextIndex)) {
				let midX = (coords[i].x + coords[nextIndex].x) / 2;
				let midY = (coords[i].y + coords[nextIndex].y) / 2;
				newCoordinates.push({ x: midX, y: midY });
			}
		}
	}
	PM.Coordinates = newCoordinates;
	PM.SelectedCoordinateIndex = null;
	PM.SelectedCoordinatesArray = [];
	PM.DrawCanvas();
};

PM.ApplyCurveSmoothingToPolygon = function() {
	let smoothedCoordinates = [];
	for (let i = 0; i < PM.Coordinates.length; i++) {
		smoothedCoordinates.push(PM.Coordinates[i]);
		if (PM.SelectedCoordinatesArray.includes(i)) {
			let prevIndex1 = (i - 1 + PM.Coordinates.length) % PM.Coordinates.length;
			let prevIndex2 = (i - 2 + PM.Coordinates.length) % PM.Coordinates.length;
			let nextIndex1 = (i + 1) % PM.Coordinates.length;
			let nextIndex2 = (i + 2) % PM.Coordinates.length;
			if (PM.SelectedCoordinatesArray.includes(prevIndex1) && PM.SelectedCoordinatesArray.includes(prevIndex2) &&
				PM.SelectedCoordinatesArray.includes(nextIndex1) && PM.SelectedCoordinatesArray.includes(nextIndex2)) {
				// Berechnung der Winkel
				let anglePrev1 = Math.atan2(PM.Coordinates[i].y - PM.Coordinates[prevIndex1].y, PM.Coordinates[i].x - PM.Coordinates[prevIndex1].x);
				let anglePrev2 = Math.atan2(PM.Coordinates[prevIndex1].y - PM.Coordinates[prevIndex2].y, PM.Coordinates[prevIndex1].x - PM.Coordinates[prevIndex2].x);
				let angleNext1 = Math.atan2(PM.Coordinates[nextIndex1].y - PM.Coordinates[i].y, PM.Coordinates[nextIndex1].x - PM.Coordinates[i].x);
				let angleNext2 = Math.atan2(PM.Coordinates[nextIndex2].y - PM.Coordinates[nextIndex1].y, PM.Coordinates[nextIndex2].x - PM.Coordinates[nextIndex1].x);
				// Berechnung des Durchschnittswinkels
				let midAngle = (anglePrev2 + anglePrev1 + angleNext1 + angleNext2) / 4;
				// Berechnung der Position des neuen Punktes
				let distance = Math.min(
				PM.CalculateDistance(PM.Coordinates[i].x, PM.Coordinates[i].y, PM.Coordinates[prevIndex1].x, PM.Coordinates[prevIndex1].y),
				PM.CalculateDistance(PM.Coordinates[i].x, PM.Coordinates[i].y, PM.Coordinates[nextIndex1].x, PM.Coordinates[nextIndex1].y)
				) / 2;
				let midX = PM.Coordinates[i].x + distance * Math.cos(midAngle);
				let midY = PM.Coordinates[i].y + distance * Math.sin(midAngle);
				smoothedCoordinates.push({ x: midX, y: midY });
			}
		}
	}
	PM.Coordinates = smoothedCoordinates;
	PM.SelectedCoordinateIndex = null;
	PM.SelectedCoordinatesArray = [];
	PM.DrawCanvas();
};


PM.NewPolygon=function(){
	let saveThisCheck = false;
	if(PM.SelectedPolygon == null){
		if(PM.Coordinates.length >0){
			saveThisCheck = confirm('Willst du das angefangene Polygon speichern?'); 
		}
	}else{
		if(PM.CheckChanges(PM.SelectedPolygon)){
			saveThisCheck = confirm('Du hast Veränderungen vorgenommen. Willst du '+PM.SelectedPolygon.id+' speichern?');
		}	
	}
	if (saveThisCheck == true) {
		PM.SavePolygon();
	}
	PM.ClearAndResetCanvas();
}

PM.LoadPolygon = function(polygon) {
	if(PM.UnfinishedBuissnesChecker()==true){
		return;
	}
	PM.SelectedPolygon = polygon;
	PM.Coordinates = JSON.parse(JSON.stringify(polygon.Coordinates));
	PM.LineWidth = polygon.LineWidth;
	PM.LineColor = polygon.LineColor;
	PM.LineAlpha = polygon.LineAlpha;
	PM.FillColor = polygon.FillColor;
	PM.FillAlpha = polygon.FillAlpha;
	PM.Canvas.width = polygon.CanvasWidth;
	PM.Canvas.height = polygon.CanvasHeight;
	$("PM_LineWidth").value = PM.LineWidth;
	$("PM_LineColor").value = PM.LineColor;
	$("PM_LineAlpha").value = PM.LineAlpha;
	$("PM_FillColor").value = PM.FillColor;
	$("PM_FillAlpha").value = PM.FillAlpha;
	$("PM_ImageIDInput").value = polygon.id;
	PM.SelectedCoordinatesArray = [];
	PM.UpdateCanvasSizeInputValues();
	PM.DrawCanvas();
	PM.DisplayPolygonArray();
	PM.ClearHistory();
	PM.UndoStack = [];
}

PM.DeletePolygon = function(polygon) {
	let index = PM.Polygons.indexOf(polygon);
	if (index !== -1) {
		PM.Polygons.splice(index, 1);
		PM.SelectedPolygon = null;
		PM.DisplayPolygonArray();
		PM.Ctx.clearRect(0, 0, PM.Canvas.width, PM.Canvas.height);
	}
}

PM.RemoveEventListeners = function() {
	PM.Canvas.removeEventListener("click", handleClick);
	PM.Canvas.removeEventListener("touchmove", handleTouchMove);
	PM.Canvas.removeEventListener("touchend", handleTouchEnd);
	PM.Canvas.removeEventListener("touchstart", handleTouchStart);
}

// Funktion zum Erstellen und Anzeigen des Werkzeugmenüs
PM.CreateToolMenu=function() {
	const toolMenu = document.createElement('div');
	toolMenu.id = 'toolMenu';
	toolMenu.style.position = 'absolute';
	toolMenu.style.top = '0.7%';
	toolMenu.style.right = '5.5%';
	toolMenu.style.backgroundColor = '#74a1b8';
	toolMenu.style.padding = '1.2%';
	toolMenu.style.border = '2px solid black';
	// Schleife durch die Werkzeuge und erstellen Sie Schaltflächen für jedes Werkzeug
	for (const tool in PM.Tools) {
		const toolButton = document.createElement('button');
		toolButton.textContent = PM.Tools[tool];
		toolButton.classList.add('PM_ToolButton'); // Fügen Sie der Schaltfläche die allgemeine Klasse 'PM_ToolButton' hinzu
		if (tool === PM.User.defaultTool) { // Überprüfen Sie, ob das Werkzeug 'Draw' der Malmodus ist
			toolButton.classList.add('active'); // Fügen Sie die aktive Klasse dem Malmodus-Button hinzu
		}
		toolButton.addEventListener('click', () => {
			document.querySelectorAll('.PM_ToolButton').forEach(btn => {
				btn.classList.remove('active');
			});
			toolButton.classList.add('active');
			// Aktualisieren Sie den Zustand im Benutzerobjekt entsprechend dem ausgewählten Werkzeug
			PM.User.selectedTool = tool;
			if(tool == "Rubber"){
				PM.SelectedCoordinatesArray = [];
				PM.SelectedCoordinateIndex = null;
				PM.DrawCanvas();
			}
			// Hier können Sie weitere Logik hinzufügen, um je nach ausgewähltem Werkzeug verschiedene Aktionen auszuführen
		});
		toolMenu.appendChild(toolButton);
	}
	PM_MainContainer.appendChild(toolMenu);
}

PM.ClosePolygonMaker=function(){
	CB.GegnerSchablone[AktuelleCharakter].Polygone.WelcheGibtEs = PM.GetPolygonDataArray();
	PM_MainContainer.style.display = "none";
}