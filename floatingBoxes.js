/*jslint browser:true */
/*jslint node: true */
/*global j */
'use strict';
j.createFloatingBox = function (element, box) {
    var stopMove = false,
        topBar = document.createElement("div"),
        self = this,
        leftTopBar,
        rightTopBar,
        text,
        clearTopBar,
        resize,
        maxHeight,
        maxWidth,
        docFragment = document.createDocumentFragment();
    if (typeof box !== "undefined") {

        maxHeight = parseInt(j.getStyle(box, "height"), 10);
        maxWidth = parseInt(j.getStyle(box, "width"), 10);

    } else {
        maxHeight = window.innerHeight;
        maxWidth = window.innerWidth;
    }

    function moveBox(e) {
        if (!stopMove) {
            if ((e.clientY - topBar.top) <= 0) {
                topBar.parentNode.style.top = 0;
            } else if ((e.clientY - topBar.top) + parseInt(self.getStyle(topBar.parentNode, "height"), 10) < maxHeight) {
                topBar.parentNode.style.top = e.clientY - topBar.top + "px";
            } else {
                topBar.parentNode.style.top = maxHeight - parseInt(self.getStyle(topBar.parentNode, "height"), 10) + "px";
            }
            if ((e.clientX - topBar.left) <= 0) {
                topBar.parentNode.style.left = 0;
            } else if ((e.clientX - topBar.left) + parseInt(self.getStyle(topBar.parentNode, "width"), 10) < maxWidth) {
                topBar.parentNode.style.left = e.clientX - topBar.left + "px";
            } else {
                topBar.parentNode.style.left = maxWidth - parseInt(self.getStyle(topBar.parentNode, "width"), 10) + "px";
            }

        }
    }

    function resizeBox(e) {
        if (e.clientX <= maxWidth) {
            topBar.parentNode.style.width = e.clientX - topBar.left + 5 + "px";
        } else {
            topBar.parentNode.style.width = maxWidth - topBar.left + "px";
        }

        if (e.clientY <= maxHeight) {
            topBar.parentNode.style.height = e.clientY - topBar.top + 5 + "px";
        } else {
            topBar.parentNode.style.height = maxHeight - topBar.top + "px";
        }
    }

    function mouseUp() {
        window.removeEventListener('mousemove', moveBox, false);
        window.removeEventListener('mousemove', resizeBox, false);
        stopMove = false;
    }

    function mouseDown(e) {
        topBar.top = e.clientY - parseInt(self.getStyle(topBar.parentNode, "top"), 10);
        topBar.left = e.clientX - parseInt(self.getStyle(topBar.parentNode, "left"), 10);
        window.addEventListener("mousemove", moveBox, false);
    }

    function mouseDownResize() {
        topBar.top = parseInt(self.getStyle(topBar.parentNode, "top"), 10);
        topBar.left = parseInt(self.getStyle(topBar.parentNode, "left"), 10);
        window.addEventListener("mousemove", resizeBox, false);
    }

    function mouseDownClose() {
        stopMove = true;
    }

    function moveUp() {
        var zIndex;
        self.selectByClass("floatingBoxBar").forEach(function (entry) {
            zIndex = entry.parentNode.style.zIndex;
            if ((zIndex === "") || (zIndex < 50)) {
                zIndex = 50;
            }
            entry.parentNode.style.zIndex = zIndex - 1;
        });
        element.style.zIndex = 100;
    }

    this.addClass("floatingBoxBar", topBar);
    this.addEvent(topBar, "mousedown", mouseDown);
    this.addEvent(window, 'mouseup', mouseUp);

    rightTopBar = document.createElement("div");
    rightTopBar.style.float = "right";
    text = document.createTextNode("Close");
    rightTopBar.onclick = function () {
        topBar.parentNode.style.display = "none";
        stopMove = false;
    };
    rightTopBar.addEventListener("mousedown", mouseDownClose, false);
    rightTopBar.appendChild(text);

    clearTopBar = document.createElement("div");
    clearTopBar.style.clear = "both";

    if (element.getAttribute("data-windowTitle") !== null) {
        leftTopBar = document.createElement("div");
        leftTopBar.style.float = "left";
        text = document.createTextNode(element.getAttribute("data-windowTitle"));
        leftTopBar.appendChild(text);
        topBar.appendChild(leftTopBar);
    }

    topBar.appendChild(rightTopBar);
    topBar.appendChild(clearTopBar);

    resize = document.createElement("div");
    j.addClass("resize", resize);

    docFragment.appendChild(topBar);
    docFragment.appendChild(resize);
    element.insertBefore(docFragment, element.firstChild);
    element.addEventListener("mousedown", moveUp, false);

    j.addEvent(resize, "mousedown", mouseDownResize);

    return element;
};
	
j.showFloatingBox = function (element) {
    var zIndex;
    this.selectByClass("floatingBoxBar").forEach(function (entry) {
        zIndex = entry.parentNode.style.zIndex;
        if ((zIndex === "") || (zIndex < 50)) {
            zIndex = 50;
        }
        entry.parentNode.style.zIndex = zIndex - 1;
    });
    element.style.display = "block";
    element.style.zIndex = 100;
};