/*jslint browser:true */
/*jslint node: true */
/*global j */
'use strict';
var j = {
    breaker: null,
    version: '1',
    StringProto: String.prototype,
    ObjectProto: Object.prototype,
    me: function () {
        console.log("  _             _____           _       _   \n  (_)           /  ___|         (_)     | |  \n   _  __ _ _   _\\ `--.  ___ _ __ _ _ __ | |_ \n  | |/ _` | | | |`--. \\/ __| '__| | '_ \\| __|\n  | | (_| | |_| /\\__/ / (__| |  | | |_) | |_ \n  | |\\__,_|\\__, \\____/ \\___|_|  |_| .__/ \\__|\n _/ |       __/ |                 | |        \n|__/       |___/                  |_|        \n");
    },
    forEach: function (obj, fn, scope) {
        var i, len, keys;
        if (obj === null) {
            return obj;
        }
        if (obj.constructor === Array) {
            obj.forEach(fn, scope);
        } else if (obj.length === +obj.length) {
            for (i = 0, len = obj.length; i < len; i += 1) {
                if (fn.call(scope, obj[i], i, obj) === this.breaker) {
                    return;
                }
            }
        } else {
            keys = Object.keys(obj);
            for (i = 0, len = keys.length; i < len; i += 1) {
                if (fn.call(scope, obj[keys[i]], keys[i], obj) === this.breaker) {
                    return;
                }
            }
        }
        return obj;
    },
    
    trim: function (string) {
        return this.StringProto.trim.call(string);
    },
    
    trimLeft: function (string) {
        if (string === null) {
            return '';
        }
        if (this.StringProto.trimLeft) {
            return this.StringProto.trimLeft.call(string);
        }
        return string.replace(/^\s+/, '');
    },
    
    trimRight: function (string) {
        if (string === null) {
            return '';
        }
        if (this.StringProto.trimLeft) {
            return this.StringProto.trimRight.call(string);
        }
        return string.replace(/\s+$/, '');
    },
    
    stringContains: function (string, content) {
        string.contains(content);
    },
    
    keys: function (obj) {
        return Object.keys(obj);
    },
    
    isObject: function (obj) {
        return obj === Object(obj);
    },
    
    onPageLoaded: function (fn) {
        this.addEvent(window, "load", fn);
	},
    
    onDomReady: function (fn) {
        if (document.readyState === "complete") {
            fn();
        }
        this.addEvent(document, "DOMContentLoaded", fn);
	},
    
    addEvent: function (html_element, event_name, event_function) {
        html_element.addEventListener(event_name, event_function, false);
    },
    
    removeEvent: function (html_element, event_name, event_function) {
        html_element.removeEventListener(event_name, event_function, false);
    },
    
    triggerEvent: function (element, event_name) {
        var event;
        event = document.createEvent("Event");
        event.initEvent(event_name, true, false);
        element.dispatchEvent(event);
    },

    select: function (element, scope) {
        return this.selectByQuery(element, scope);
    },

    selectById: function (element, scope) {
        
        if (scope === undefined) {
            scope = document;
        }
        
        return scope.getElementById(element);
    },

    selectByClass: function (element, scope) {
        
        var result = [], i, nodeList;
        
        if (scope === undefined) {
            scope = document;
        }
        
        nodeList = scope.getElementsByClassName(element);
        nodeList = [].slice.call(nodeList);
        for (i = 0; i < nodeList.length; i = i + 1) {
            result.push(nodeList[i]);
        }
        return result;
    },

    selectByTag: function (element, scope) {
        var elements, result = [], i;
        
        if (scope === undefined) {
            scope = document;
        }
        
        elements = scope.getElementsByTagName(element);
        for (i = 0; i < elements.length; i = i + 1) {
            result.push(elements[i]);
        }
        return result;
    },
    
    selectByQuery: function (query, scope) {
        var elements, result = [], i;
        
        if (scope === undefined) {
            scope = document;
        }
        
        elements = scope.querySelectorAll(query);
        for (i = 0; i < elements.length; i = i + 1) {
            result.push(elements[i]);
        }
        return result;
    },
    
    selectParentById: function (id, element) {
        if (element.parentNode !== document) {
            if (element.parentNode.getAttribute('id') === id) {
                return element.parentNode;
            } else {
                return this.selectParentById(id, element.parentNode);
            }
        } else {
            return "";
        }
    },
    
    selectParentByClass: function (className, element) {
        if (element.parentNode !== document) {
            if (this.hasClass(className, element.parentNode)) {
                return element.parentNode;
            } else {
                return this.selectParentByClass(className, element.parentNode);
            }
        } else {
            return "";
        }
    },
    
    selectParentByTag: function (tag, element) {
        if (element.parentNode !== document) {
            if (element.parentNode.tagName === tag.toUpperCase()) {
                return element.parentNode;
            } else {
                return this.selectParentByTag(tag, element.parentNode);
            }
        } else {
            return "";
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
        if (this.ObjectProto.toString.call(element) === '[object Array]') {
            for (elemI = 0; elemI < element.length; elemI = elemI + 1) {
                this.addClass(className, element[elemI]);
            }
        } else {
            className = className.split(" ");
            for (i = 0; i < className.length; i = i + 1) {
                element.classList.add(className[i]);
            }
        }
        return element;
    },
    
    removeClass: function (className, element) {
        var i, elemI;
        if (this.ObjectProto.toString.call(element) === '[object Array]') {
            for (elemI = 0; elemI < element.length; elemI = elemI + 1) {
                this.removeClass(className, element[elemI]);
            }
        } else {
            className = className.split(" ");
            for (i = 0; i < className.length; i = i + 1) {
                element.classList.remove(className[i]);
            }
        }
        return element;
    },
    
    hasClass: function (className, element) {
        return element.classList.contains(className);
    },
    
    toggleClass: function (className, element) {
        var elemI;
        if (this.ObjectProto.toString.call(element) === '[object Array]') {
            for (elemI = 0; elemI < element.length; elemI = elemI + 1) {
                this.toggleClass(className, element[elemI]);
            }
        } else {
            if (this.hasClass(className, element)) {
                this.removeClass(className, element);
            } else {
                this.addClass(className, element);
            }
        }
    },
    
    getStyle: function (element, property) {
        var result;
        result = window.getComputedStyle(element, null).getPropertyValue(property);
        if (result === "auto") {
            if (property === "width") {
                result = element.offsetWidth;
            } else if (property === "height") {
                result = element.offsetHeight;
            }
        }
        return result;
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
    
    isMobile: function () {
        var agent;
		agent = navigator.userAgent || navigator.vendor || window.opera;
		if (/(android|bb\d+|meego)[\w\W]+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile[\w\W]+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4))) {
			return true;
		} else {
			return false;
		}
	},

    get: function (target, callback, options) {
        var xmlhttp;
		xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", target, true);
        if (options) {
            if (options.contentType) {
                xmlhttp.setRequestHeader("Content-Type", options.contentType);
            }
        }
		if (callback) {
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
					callback(xmlhttp);
				}
			};
		}
		xmlhttp.send();
	},
    
    post: function (target, callback, options) {
        var xmlhttp;
		xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", target, true);
        if (options) {
            if (options.contentType) {
                xmlhttp.setRequestHeader("Content-Type", options.contentType);
            }
        }
        
		if (callback) {
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
					callback(xmlhttp);
				}
			};
		}
		
        if (options) {
            if (options.data) {
                xmlhttp.send(options.data);
                return;
            }
        }
        xmlhttp.send();
		
	}
};