/*jslint browser:true */
/*jslint node: true */
/*global j */
'use strict';
j.strip = function (html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html.replace("\\n", " ");
    return tmp.textContent || tmp.innerText || "";
}