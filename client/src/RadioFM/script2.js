var mytuner_scripts = mytuner_scripts || {};
if (mytuner_scripts["widget-player-v1.js-imported"] == undefined) {
    mytuner_scripts["widget-player-v1.js-imported"] = false;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://mytuner-radio.com/static/js/widgets/widget-player-v1.js";
    s.defer = true;
    document.getElementsByTagName('head')[0].appendChild(s);
}