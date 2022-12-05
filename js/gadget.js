function loadMain() {
    System.Gadget.beginTransition();
    background.style.width = "550px";
    background.style.height = "64px";
    loadFact(background);
}

function loadFact() {
    var xhr = new XMLHttpRequest();
    var fact;
    var textDisplay;
    xhr.open("GET", "https://catfact.ninja/fact");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            fact = xhr.responseText.substr(9, xhr.responseText.indexOf('."') - 9);
            textDisplay = fixDpiObject(background.addTextObject(fact, "Segoe UI", 14, "Gainsboro", 0, 0));
        }};
    xhr.send();
}
function getDpiScaling() {
    var wshShell = new ActiveXObject("WScript.Shell");
    var DPI = 96;
    try {
        try {
            //You can set custom DPI in 8GadgetPack
            DPI = wshShell.RegRead("HKCU\\Software\\8GadgetPack\\ForceDPI");
        }
        catch (e) {
            //In case no custom DPI is set or 8GadgetPack isn't installed
            DPI = wshShell.RegRead("HKCU\\Control Panel\\Desktop\\LogPixels");
        }
        wshShell.RegRead("HKCU\\Software\\8GadgetPack\\NoGadgetScalingFix"); //In case I'll be able to fix this in sidebar.exe I will set this registry entry
        DPI = 96;
    }
    catch (e) { }
    return parseInt((DPI / 96) * 100) / 100;
}
var dpiScaling = getDpiScaling();
function fixDpiObject(obj) {
    if ("fontsize" in obj) {
        obj.left = obj.left * dpiScaling;
        obj.top = obj.top * dpiScaling;
    }
    else {
        obj.left = obj.left * dpiScaling + (obj.width * dpiScaling - obj.width) / 2;
        obj.top = obj.top * dpiScaling + (obj.height * dpiScaling - obj.height) / 2;
    }
    obj.width = obj.width * dpiScaling;
    obj.height = obj.height * dpiScaling;
    return obj;
}
