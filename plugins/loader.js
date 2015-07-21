/*jslint browser:true */
/*jslint node: true */
/*global j */
'use strict';
j.loadGoogleFont = function (fonts) {
    var protocol, key;
    protocol = ('https:' === document.location.protocol ? 'https' : 'http');
    for (key in fonts) {
        if (fonts.hasOwnProperty(key)) {
            this.loadFile([{'fileName': protocol + "://fonts.googleapis.com/css?family=" + key + ":" + fonts[key], 'fileType': 'css'}]);
        }

    }
};
    
j.loadFont = function (fonts) {
    var styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    if (fonts.light !== undefined) {
        styleElement.innerHTML += "@font-face{\nfont-family: '" + fonts.name + "';\nfont-weight:300;\nsrc: url(";
        if (fonts.light.otf !== undefined) {
            styleElement.innerHTML += "fonts/" + fonts.light.otf + ");";
        }
        styleElement.innerHTML += "\n}\n";
    }
    if (fonts.normal !== undefined) {
        styleElement.innerHTML += "@font-face{\nfont-family: '" + fonts.name + "';\nfont-weight:400;\nsrc: url(";
        if (fonts.normal.otf !== undefined) {
            styleElement.innerHTML += "fonts/" + fonts.normal.otf + ");";
        }
        styleElement.innerHTML += "\n}\n";
    }
    if (fonts.bold !== undefined) {
        styleElement.innerHTML += "@font-face{\nfont-family: '" + fonts.name + "';\nfont-weight:700;\nsrc: url(";
        if (fonts.bold.otf !== undefined) {
            styleElement.innerHTML += "fonts/" + fonts.bold.otf + ");";
        }
        styleElement.innerHTML += "\n}\n";
    }
    this.selectByTag("head")[0].appendChild(styleElement);
};

j.loadFile = function (items, fn) {
    function loadJs(fileName) {
        var script;
        script = document.createElement('script');
        script.async = true;
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", fileName);
        return script;
    }
    function loadCss(fileName) {
        var script;
        script = document.createElement("link");
        script.async = true;
        script.setAttribute("rel", "stylesheet");
        script.setAttribute("type", "text/css");
        script.setAttribute("href", fileName);
        return script;
    }
    var counter = items.length, next = 0, i = 0, fileName, fileType, script;
    function Callback() {
        if (this.readyState) {
            if ((this.readyState === "complete") || (this.readyState === "loaded")) {
                next = next + 1;
            }
        } else {
            next = next + 1;
        }
        if (counter === next) {
            fn();
        }
    }
    for (i = 0; i < items.length; i = i + 1) {
        fileName = items[i].fileName;
        fileType = items[i].fileType;
        script = undefined;
        if (this.checkIfFileLoaded(fileName, fileType)) {
            if (fileType === "js") {
                script = loadJs(fileName);
            } else if (fileType === "css") {
                script = loadCss(fileName);
            }
            if (typeof script !== "undefined") {
                if (fn) {
                    if (script.addEventListener) {
                        script.addEventListener("load", Callback, false);
                    } else if (script.readyState) {
                        script.onreadystatechange = Callback;
                    }
                }
                this.selectByTag("head")[0].appendChild(script);

            }
        } else {
            next += 1;
        }
    }
};

j.checkIfFileLoaded = function (fileName, fileType) {
    var elems = "", i;
    if (fileType === "js") {
        elems = this.selectByTag('script');
        for (i = 0; i < elems.length; i = i + 1) {
            if (elems[i].getAttribute("src") !== null) {
                if (this.stringContains(elems[i].getAttribute("src"), fileName)) {
                    return false;
                }
            }
        }
    } else if (fileType === "css") {
        elems = this.selectByTag('link');
        for (i = 0; i < elems.length; i = i + 1) {
            if (this.stringContains(elems[i].getAttribute("href"), fileName)) {
                return false;
            }
        }
    }
    return true;
};