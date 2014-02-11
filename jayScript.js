j = {
	moveFloatingBox : -1,
	loadfile: function(items,callback){
		var counter = items.length;
		var next = 0;
        for(var i = 0; i < items.length; i++){
			var fileName = items[i].fileName;
			var fileType = items[i].fileType;
			var script = undefined;
			if(this.checkIfFileLoaded(fileName,fileType)){
				if (fileType=="js"){
                    script = this.loadJs(fileName);
				}
				else if (fileType=="css"){
					script = this.loadCss(fileName);
				}
                if (typeof script!="undefined"){
                    if(callback){
                        script.onreadystatechange = script.onload = function() {
                            next++;
                            if(counter == next){
                                callback();
                            }
                        };
                    }
					document.getElementsByTagName("head")[0].appendChild(script);
				}
			}
		}
	},
    loadJs : function(fileName){
        script = document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", fileName);
        return script;
    },
    loadCss : function(fileName){
        script = document.createElement("link");
        script.setAttribute("rel", "stylesheet");
        script.setAttribute("type", "text/css");
        script.setAttribute("href", fileName);
        return script;
    },
	checkIfFileLoaded: function(fileName,fileType){
        var elems = "";
		if (fileType=="js"){
			elems = document.getElementsByTagName('script'), i;
			for (i=0; i<elems.length; i++) {
				if ((elems[i].getAttribute("src") + "").indexOf(fileName) > -1) {
				    return false;
				}
			}
		}
		else if (fileType=="css"){
			elems = document.getElementsByTagName('link'), i;
			for (i=0; i<elems.length; i++) {
				if ((elems[i].getAttribute("href") + "").indexOf(fileName) > -1) {
				    return false;
				}
			}
		}
		return true;
	},
	onPageLoaded:function(fn){
		if (window.addEventListener){
		    window.addEventListener('load', function() { fn(); },false);
		}else if (window.attachEvent) {
			window.attachEvent('onload',function(){ fn(); } );
		} else {
		    if (window.onload) {
		        var curronload = window.onload;
		        var newonload = function() {
		            curronload();
		            fn();
		        };
		        window.onload = newonload;
		    } else {
		        window.onload = function() { fn(); };
		    }
		}
	},
	onDomReady:function(fn){
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded', function() { fn(); },false);
		}else{
			if(document.onreadystatechange){
				var curronready = document.onreadystatechange;
				var newonready = function(){
					curronready();
					if(document.readyState == "complete"){
						fn();
					}
				};
				document.onreadystatechange = newonready;
			}
			else{
				document.onreadystatechange = function(){
					if(document.readyState == "complete"){
						fn();
					}
				};
			}
		}
	},

    setFullBackground : function(link, target){
        var element;
        target = typeof target !== 'undefined' ? target : "html";
        if(this.nameType(target) == 0){
            element = this.selectById(target.substring(1));
        }else if(this.nameType(target) == 1){
            element = this.selectByClass(target.substring(1))[0];
        }else if(this.nameType(target) == 2){
            element = this.selectByTag(target)[0];
        }
        element.style.background="url('" + link + "') no-repeat center center fixed";
        element.style.webkitBackgroundSize = "cover";
        element.style.MozBackgroundSize = "cover";
        element.style.OBackgroundSize = "cover";
        element.style.backgroundSize = "cover";
    },

    select: function(element){
        if(this.nameType(element) == 0){
            element = this.selectById(element.substring(1));
        }else if(this.nameType(element) == 1){
            element = this.selectByClass(element.substring(1));
        }else if(this.nameType(element) == 2){
            element = this.selectByTag(element);
        }
        return element;
    },

    selectById: function(element){
        return document.getElementById(element);
    },

    selectByClass: function(element){
        var elements = document.getElementsByTagName('*'), i, result = [];
        for (i in elements) {
            if((' ' + elements[i].className + ' ').indexOf(' ' + element + ' ') > -1) {
                result.push(elements[i]);
            }
        }
        return result;
    },

    selectByTag: function(element){
        return document.getElementsByTagName(element);
    },

    nameType: function(element){
        if(element.charAt(0) == '#'){
            return 0;
        }else if(element.charAt(0) == '.'){
            return 1;
        }else{
            return 2;
        }
    },
	
	first: function(element){
        if (element.length >= 1){
            element = element[0];
        }
		return element;
	},

    createFloatingBox : function(element){
		var stopMove = false;
		var topBar = document.createElement("div");
		
    	function moveBox(e){
			if(!stopMove){
				topBar.parentNode.style.top = e.clientY - topBar.top;
				topBar.parentNode.style.left = e.clientX - topBar.left;
			}
    	}
    	function mouseUp(e){
			window.removeEventListener('mousemove', moveBox, false);
			stopMove = false;
		}
		
		function mouseDown(e){
			topBar.top = e.clientY - parseInt(topBar.parentNode.style.top);
        	topBar.left = e.clientX - parseInt(topBar.parentNode.style.left);
        	window.addEventListener("mousemove", moveBox, false);
		}
		
		function mouseDownClose(e){
        	stopMove = true;
		}
		
		function moveUp(e){
			self.selectByClass("floatingBoxBar").forEach(function(entry){
				zIndex = entry.parentNode.style.zIndex;
				if((zIndex == "") || (zIndex < 50)){
					zIndex = 50;
				}
				entry.parentNode.style.zIndex = zIndex - 1;
			});
			this.style.zIndex = 100;
		}
		
		element = this.select(element);
        this.first(element);
        
        self = this;
		topBar.className = topBar.className + " floatingBoxBar";
        topBar.addEventListener("mousedown", mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);
        
		leftTopBar = document.createElement("div");
		leftTopBar.style.float = "left";
		text = document.createTextNode("Bar");
		leftTopBar.appendChild(text);
		
		rightTopBar = document.createElement("div");
		rightTopBar.style.float = "right";
		text = document.createTextNode("Close");
		rightTopBar.onclick = function(){
			topBar.parentNode.style.display = "none"
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
	
	showFloatingBox: function(element){
		this.selectByClass("floatingBoxBar").forEach(function(entry){
			zIndex = entry.parentNode.style.zIndex;
			if((zIndex == "") || (zIndex < 50)){
				zIndex = 50;
			}
			entry.parentNode.style.zIndex = zIndex - 1;
		});
	  element = this.first(this.select(element));
        element.style.display = "block";
		element.style.zIndex = 100;
	}
}
