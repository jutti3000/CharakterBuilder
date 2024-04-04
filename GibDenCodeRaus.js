GibDenCodeRaus = function() {
    var htmlVary = "";
    for (var all in Objekt.GegnerSchablone[AktuelleCharakter].WelcheGibtEs) {
        var array = Objekt.GegnerSchablone[AktuelleCharakter].WelcheGibtEs[all];
        var name = array[0];
        var htmlVary2 = "";
        for (var each in Objekt.GegnerSchablone[AktuelleCharakter][name].CanvasElemente.Alle) {
            var array2 = Objekt.GegnerSchablone[AktuelleCharakter][name].CanvasElemente.Alle[each];
            var innerHtml = array2.map(function(item) {
                return typeof item === 'object' ? '{"x":' + item.x + ',"y":' + item.y + '}' : JSON.stringify(item);
            }).join(',');
            htmlVary2 += '[' + innerHtml + ']';
            if (each < Objekt.GegnerSchablone[AktuelleCharakter][name].CanvasElemente.Alle.length - 1) {
                htmlVary2 += ',';
            }
        }
        htmlVary += 'Objekt.GegnerSchablone.' + AktuelleCharakter + '.' + name + '.CanvasElemente.Alle=[' + htmlVary2 + '];\n';
        htmlVary += '</br>';
    }

    var htmlVary3 = JSON.stringify(Objekt.GegnerSchablone[AktuelleCharakter].Farben.WelcheGibtEs);
    var htmlVaryStempel = JSON.stringify(Objekt.GegnerSchablone[AktuelleCharakter].Stempel.WelcheGibtEs);
    var htmlVaryPattern = JSON.stringify(Objekt.GegnerSchablone[AktuelleCharakter].Pattern.WelcheGibtEs);
    var htmlVaryPolygone = JSON.stringify(Objekt.GegnerSchablone[AktuelleCharakter].Polygone.WelcheGibtEs);

    Code.innerHTML = 'Objekt.GegnerSchablone.' + AktuelleCharakter + '.Farben.WelcheGibtEs=' + htmlVary3 + ';</br>';
    Code.innerHTML += 'Objekt.GegnerSchablone.' + AktuelleCharakter + '.Stempel.WelcheGibtEs=' + htmlVaryStempel + ';</br>';
    Code.innerHTML += 'Objekt.GegnerSchablone.' + AktuelleCharakter + '.Pattern.WelcheGibtEs=' + htmlVaryPattern + ';</br>';
    Code.innerHTML += 'Objekt.GegnerSchablone.' + AktuelleCharakter + '.Polygone.WelcheGibtEs=' + htmlVaryPolygone + ';</br>';
    Code.innerHTML += htmlVary;
    Code.style.display = "block";
    CodeWiederAusmachenButton.style.display = "block";
    CanvasElementContainer.style.display = "none";
    OptionsContainer.style.display = "none";
    BildContainer.style.display = "none";
    BildContainerReal.style.display = "none";
}