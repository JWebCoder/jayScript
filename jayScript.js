/*jslint browser:true */
/*jslint node: true */
"use strict";
var j = {
	loadFile: function (items, fn) {
        function loadJs(fileName) {
            var script;
            script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", fileName);
            return script;
        }
        function loadCss(fileName) {
            var script;
            script = document.createElement("link");
            script.setAttribute("rel", "stylesheet");
            script.setAttribute("type", "text/css");
            script.setAttribute("href", fileName);
            return script;
        }
		var counter = items.length, next = 0, i = 0, fileName, fileType, script;
        function callback() {
            next = next + 1;
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
                            script.addEventListener("load", callback, false);
                        } else if (script.readyState) {
                            script.onreadystatechange = callback;
                        }
                    }
					this.selectByTag("head")[0].appendChild(script);
                    
				}
			}
		}
	},
	checkIfFileLoaded: function (fileName, fileType) {
        var elems = "", i;
		if (fileType === "js") {
			elems = this.selectByTag('script');
			for (i = 0; i < elems.length; i = i + 1) {
                if (elems[i].getAttribute("src") !== null) {
                    if ((elems[i].getAttribute("src")).indexOf(fileName) > -1) {
                        return false;
                    }
                }
			}
		} else if (fileType === "css") {
            elems = this.selectByTag('link');
			for (i = 0; i < elems.length; i = i + 1) {
				if ((elems[i].getAttribute("href")).indexOf(fileName) > -1) {
				    return false;
				}
			}
		}
		return true;
	},
	onPageLoaded: function (fn) {
        if (window.addEventListener) {
		    window.addEventListener('load', function () { fn(); }, false);
		} else if (window.attachEvent) {
			window.attachEvent('onload', function () { fn(); });
		} else {
		    if (window.onload) {
		        var curronload = window.onload,
                    newonload = function () {
                        curronload();
                        fn();
                    };
		        window.onload = newonload;
		    } else {
		        window.onload = function () { fn(); };
		    }
		}
	},
	onDomReady: function (fn) {
        if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', function () { fn(); }, false);
		} else {
			if (document.onreadystatechange) {
				var curronready = document.onreadystatechange,
				    newonready = function () {
				        curronready();
				        if (document.readyState === "complete") {
                            fn();
                        }
                    };
				document.onreadystatechange = newonready;
			} else {
				document.onreadystatechange = function () {
					if (document.readyState === "complete") {
						fn();
					}
				};
			}
		}
	},
    addEvent : function (html_element, event_name, event_function) {
        if (html_element.addEventListener) {
            html_element.addEventListener(event_name, event_function, false);
        } else if (html_element.attachEvent) {
            html_element.attachEvent("on" + event_name, function () {
                event_function.call(html_element);
            });
        }
    },
    
    removeEvent : function (html_element, event_name, event_function) {
        if (html_element.removeEventListener) {
            html_element.removeEventListener(event_name, event_function, false);
        } else if (html_element.detachEvent) {
            html_element.detachEvent("on" + event_name, function () {
                event_function.call(html_element);
            });
        }
    },
    
    setFullBackground : function (link, target) {
        var element;
        target = typeof target !== 'undefined' ? target : "html";
        if (this.nameType(target) === 0) {
            element = this.selectById(target.substring(1));
        } else if (this.nameType(target) === 1) {
            element = this.selectByClass(target.substring(1))[0];
        } else if (this.nameType(target) === 2) {
            element = this.selectByTag(target)[0];
        }
        element.style.background = "url('" + link + "') no-repeat center center fixed";
        element.style.webkitBackgroundSize = "cover";
        element.style.MozBackgroundSize = "cover";
        element.style.OBackgroundSize = "cover";
        element.style.backgroundSize = "cover";
    },

    select: function (element, scope) {
        if (this.nameType(element) === 0) {
            element = this.selectById(element.substring(1), scope);
        } else if (this.nameType(element) === 1) {
            element = this.selectByClass(element.substring(1), scope);
        } else if (this.nameType(element) === 2) {
            element = this.selectByTag(element, scope);
        }
        return element;
    },

    selectById: function (element, scope) {
        if (scope === undefined) {
            return document.getElementById(element);
        } else {
            return scope.getElementById(element);
        }
    },

    selectByClass: function (element, scope) {
        if (scope === undefined) {
            scope = document;
        }
        var result = [], elements, i, nodeList;
        if (scope.getElementsByClassName) {
            nodeList = scope.getElementsByClassName(element);
            for (i = 0; i < nodeList.length; i = i + 1) {
                result.push(nodeList[i]);
            }
            return result;
        } else {
            elements = j.selectByTag('*', scope);
            for (i = 0; i < elements.length; i = i + 1) {
                if ((' ' + elements[i].className + ' ').indexOf(' ' + element + ' ') > -1) {
                    result.push(elements[i]);
                }
            }
            return result;
        }
    },

    selectByTag: function (element, scope) {
        if (scope === undefined) {
            return document.getElementsByTagName(element);
        } else {
            return scope.getElementsByTagName(element);
        }
    },

    nameType: function (element) {
        if (element.charAt(0) === '#') {
            return 0;
        } else if (element.charAt(0) === '.') {
            return 1;
        } else {
            return 2;
        }
    },
	
	first: function (element) {
        if (element.length >= 1) {
            element = element[0];
        }
		return element;
	},
    
    addClass: function (className, element) {
        var i, elemI;
        if (Object.prototype.toString.call(element) === '[object Array]') {
            for (elemI = 0; elemI < element.length; elemI = elemI + 1) {
                this.addClass(className, element[elemI]);
            }
        } else {
            className = className.split(" ");
            if (element.classList) {
                for (i = 0; i < className.length; i = i + 1) {
                    element.classList.add(className[i]);
                }
            } else {
                for (i = 0; i < className.length; i = i + 1) {
                    if (this.hasClass(className[i], element)) {
                        this.removeClass(className[i], element);
                    }
                    if (element.className.length === 0) {
                        element.className = className[i];
                    } else {
                        element.className = element.className + " " + className[i];
                    }
                }
            }
        }
        return element;
    },
    
    removeClass: function (className, element) {
        var i, elemI;
        if (Object.prototype.toString.call(element) === '[object Array]') {
            for (elemI = 0; elemI < element.length; elemI = elemI + 1) {
                this.removeClass(className, element[elemI]);
            }
        } else {
            className = className.split(" ");
            if (element.classList) {
                for (i = 0; i < className.length; i = i + 1) {
                    element.classList.remove(className[i]);
                }
            } else {
                for (i = 0; i < className.length; i = i + 1) {
                    element.className = element.className.replace(" " + className[i], "");
                    element.className = element.className.replace(className[i], "");
                    if (element.className[0] === " ") {
                        element.className = element.className.substring(1);
                    }
                }
            }
        }
        return element;
    },
    
    hasClass: function (className, element) {
        var classList,
            i,
            len;
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            classList = element.className.split(" ");
            len = classList.length;
            for (i = 0; i < len; i = i + 1) {
                if (className === classList[i]) {
                    return true;
                }
            }
            return false;
        }
    },

    createFloatingBox : function (element) {
        var stopMove = false,
            topBar = document.createElement("div"),
            self = this,
            leftTopBar,
            rightTopBar,
            text,
            clearTopBar;
        function moveBox(e) {
            if (!stopMove) {
				topBar.parentNode.style.top = e.clientY - topBar.top + "px";
				topBar.parentNode.style.left = e.clientX - topBar.left + "px";
			}
        }
        function mouseUp(e) {
			window.removeEventListener('mousemove', moveBox, false);
			stopMove = false;
		}
		
		function mouseDown(e) {
			topBar.top = e.clientY - parseInt(topBar.parentNode.style.top, 10);
            topBar.left = e.clientX - parseInt(topBar.parentNode.style.left, 10);
            window.addEventListener("mousemove", moveBox, false);
		}
		
		function mouseDownClose(e) {
            stopMove = true;
		}
		
		function moveUp(e) {
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
		
		element = this.select(element);
        this.first(element);
        this.addClass("floatingBoxBar", topBar);
        topBar.addEventListener("mousedown", mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);
		leftTopBar = document.createElement("div");
		leftTopBar.style.float = "left";
		text = document.createTextNode("Bar");
		leftTopBar.appendChild(text);
		
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
		
		topBar.appendChild(leftTopBar);
		topBar.appendChild(rightTopBar);
		topBar.appendChild(clearTopBar);
		
		element.insertBefore(topBar, element.firstChild);
		element.addEventListener("mousedown", moveUp, false);
		
		return element;
    },
	
	showFloatingBox: function (element) {
        var zIndex;
		this.selectByClass("floatingBoxBar").forEach(function (entry) {
			zIndex = entry.parentNode.style.zIndex;
			if ((zIndex === "") || (zIndex < 50)) {
				zIndex = 50;
			}
			entry.parentNode.style.zIndex = zIndex - 1;
		});
		element = this.first(this.select(element));
        element.style.display = "block";
		element.style.zIndex = 100;
	},
    
    getQueryParams: function () {
        /*jslint regexp:true */
        var qs = document.location.search.split("+").join(" "),
            params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
        /*jslint regexp:false */
        
        while ((tokens = re.exec(qs)) !== null) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    },
    
    throttle: function (fn, threshold, scope) {
        if (!threshold) {
            threshold = 250;
        }
        var last,
            deferTimer;
        return function () {
            var context = scope || this,
                now,
                args;

            now = +new Date();
            args = arguments;
            if (last && now < last + threshold) {
              // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    },
    
    debounce: function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            }, wait);
            if (immediate && !timeout) {
                func.apply(context, args);
            }
        };
    },
	
	loadGoogleFont: function (fonts) {
        var protocol, key;
		protocol = ('https:' === document.location.protocol ? 'https' : 'http');
        for (key in fonts) {
            if (fonts.hasOwnProperty(key)) {
                this.loadFile([{'fileName': protocol + "://fonts.googleapis.com/css?family=" + key + ":" + fonts[key], 'fileType': 'css'}]);
            }
            
        }
	},
    
    loadFont: function (fonts) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        if(fonts.light !== undefined) {
            styleElement.innerHTML += "@font-face{\nfont-family: '" + fonts.name + "';\nfont-weight:300;\nsrc: url(";
            if(fonts.light.otf !== undefined) {
                styleElement.innerHTML += "fonts/" + fonts.light.otf + ");";
            }
            styleElement.innerHTML += "\n}\n";
        }
        if(fonts.normal !== undefined) {
            styleElement.innerHTML += "@font-face{\nfont-family: '" + fonts.name + "';\nfont-weight:400;\nsrc: url(";
            if(fonts.normal.otf !== undefined) {
                styleElement.innerHTML += "fonts/" + fonts.normal.otf + ");";
            }
            styleElement.innerHTML += "\n}\n";
        }
        if(fonts.bold !== undefined) {
            styleElement.innerHTML += "@font-face{\nfont-family: '" + fonts.name + "';\nfont-weight:700;\nsrc: url(";
            if(fonts.bold.otf !== undefined) {
                styleElement.innerHTML += "fonts/" + fonts.bold.otf + ");";
            }
            styleElement.innerHTML += "\n}\n";
        }
        this.selectByTag("head")[0].appendChild(styleElement);
	},
    
/*    <style> 
@font-face
{
font-family: myFirstFont;
src: url(sansation_light.woff);
}

@font-face
{
font-family: myFirstFont;
src: url(sansation_bold.woff);

}

div
{
font-family:myFirstFont;
}
</style>
	*/
	isMobile: function () {
        var agent;
		agent = navigator.userAgent || navigator.vendor || window.opera;
		if (/(android|bb\d+|meego)[\w\W]+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile[\w\W]+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4))) {
			return true;
		} else {
			return false;
		}
	},

	get: function (target, callback) {
        var xmlhttp;
		xmlhttp = new XMLHttpRequest();
		if (callback) {
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
					callback(xmlhttp);
				}
			};
		}
		
		xmlhttp.open("GET", target, true);
		xmlhttp.send();
	},
    
    strip: function (html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html.replace("\\n", " ");
        return tmp.textContent || tmp.innerText || "";
    },
    
    share: function (element) {
        var params = {};
        params.url = element.getAttribute("data-url");
        params.image = element.getAttribute("data-image");
        params.title = element.getAttribute("data-title");
        params.summary = element.getAttribute("data-summary");
        params.shareType = element.getAttribute("data-share-type");
        params.imgTitle = element.getAttribute("data-image-title");
        params.width = element.getAttribute("data-image-width");
        params.height = element.getAttribute("data-image-height");
        params.socialTarget = element.getAttribute("data-type");
        this.socialShare.publish(params);
        
    },
    
    socialShare: {
        publish: function (params) {
            var link, windowParams;
            if (params.socialTarget === "facebook") {
                link = "https://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + params.url + "&p[images][0]=" + encodeURIComponent(params.image) + "&p[title]=" + encodeURIComponent(params.title) + "&p[summary]=" + encodeURIComponent(j.strip(params.summary));
            } else if (params.socialTarget === "twitter") {
                link = "http://twitter.com/share?text=" + encodeURIComponent(j.strip(params.summary)) + "&url=" + params.url;
            } else if (params.socialTarget === "linkedin") {
                link = "http://www.linkedin.com/shareArticle?mini=true&url=" + params.url + "&title=" + params.title + "&summary=" + j.strip(params.summary);
            } else if (params.socialTarget === "googleplus") {
                link = "https://plus.google.com/share?url=" + params.url;
            } else if (params.socialTarget === "googlebookmark") {
                link = "http://www.google.com/bookmarks/mark?op=edit&bkmk=" + params.url + "&title=" + params.title + "&annotation=" + params.summary;
            } else if (params.socialTarget === "pinterest") {
                link = "http://pinterest.com/pin/create/button/?url=" + params.url + "&media=" + encodeURIComponent(params.image) + "&description=" + params.summary;
            } else if (params.socialTarget === "tumblr") {
                if (params.sharetype === "photo") {
                    link = "http://www.tumblr.com/share/photo?source=" + encodeURIComponent(params.image) + "&caption=" + params.summary + "&click_thru=" + encodeURIComponent(params.url);
                } else {
                    link = "http://www.tumblr.com/share/link?url=" + encodeURIComponent(params.url) + "&name=" + params.title + "&description=" + params.summary;
                }
            } else if (params.socialTarget === "delicious") {
                link = "http://delicious.com/post?url=" + params.url + "&title=" + params.title + "&notes=" + params.summary;
            } else if (params.socialTarget === "reddit") {
                link = "http://www.reddit.com/submit?url=" + params.url + "&title=" + params.title;
            } else if (params.socialTarget === "tapiture") {
                link = "http://tapiture.com/bookmarklet/image?img_src=" + params.image + "&page_url=" + params.url + "&page_title=" + params.title + "&img_title=" + params.imgTitle + "&img_width=" + params.width + "img_height=" + params.height;
            } else if (params.socialTarget === "stumbleupon") {
                link = "http://www.stumbleupon.com/submit?url=" + params.url + "&title=" + params.title;
            } else if (params.socialTarget === "newsvine") {
                link = "http://www.newsvine.com/_tools/seed&save?u=" + params.url + "&h=" + params.title;
            }
            if (link !== "") {
                windowParams = "";
                if (params.socialTarget === "tumblr") {
                    windowParams = "toolbar=0,status=0,width=800,height=500";
                } else if (params.socialTarget === "googleplus") {
                    windowParams = "toolbar=0,status=0,width=600,height=600";
    
                } else {
                    windowParams = "toolbar=0,status=0,width=626,height=436";
                }
                window.open(link, 'sharer', windowParams);
            }
        },
        setTheme: function (targetElements, path, theme, invertTheme) {
            var curronready,
                newonready;
            function imagesManager() {
                var elems = j.selectByTag('a'), i, images;
                function MouseOverNoTheme() {
                    this.getElementsByTagName('img')[0].src = this.getAttribute("data-image-button-over");
                }
                function MouseOutNoTheme() {
                    this.getElementsByTagName('img')[0].src = this.getAttribute("data-image-button");
                }
                function MouseOverTheme() {
                    if (invertTheme === true) {
                        this.getElementsByTagName('img')[0].src = path + this.getAttribute("data-type") + ".png";
                    } else {
                        this.getElementsByTagName('img')[0].src = path + this.getAttribute("data-type") + "over.png";
                    }
                }
                function MouseOutTheme() {
                    if (invertTheme === true) {
                        this.getElementsByTagName('img')[0].src = path + this.getAttribute("data-type") + "over.png";
                    } else {
                        this.getElementsByTagName('img')[0].src = path + this.getAttribute("data-type") + ".png";
                    }
                    
                }
                if (path === "") {
                    for (i = 0; i < elems.length; i = i + 1) {
                        if (j.hasClass(targetElements, elems[i])) {
                            elems[i].getElementsByTagName('img')[0].src = elems[i].getAttribute("data-image-button");
                            elems[i].onmouseover = MouseOverNoTheme;
                            elems[i].onmouseout = MouseOutNoTheme;
                        }
                    }
                } else {
                    path = path + "/" + theme + "/";
                    images = [];
                    for (i = 0; i < elems.length; i = i + 1) {
                        if (j.hasClass(targetElements, elems[i])) {
                            images.push(new Image());
                            if (invertTheme === true) {
                                images[images.length - 1].src = path + elems[i].getAttribute("data-type") + ".png";
                                elems[i].getElementsByTagName('img')[0].src = path + elems[i].getAttribute("data-type") + "over.png";
                                elems[i].onmouseover = MouseOverTheme;
                                elems[i].onmouseout = MouseOutTheme;
                            } else {
                                images[images.length - 1].src = path + elems[i].getAttribute("data-type") + "over.png";
                                elems[i].getElementsByTagName('img')[0].src = path + elems[i].getAttribute("data-type") + ".png";
                                elems[i].onmouseover = MouseOverTheme;
                                elems[i].onmouseout = MouseOutTheme;
                            }
                        }
                    }
                }
            }
            imagesManager();
        }
    }
};