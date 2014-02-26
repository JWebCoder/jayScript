jayScript
=========

A new javascript framework for those who think the right way.

jayScript framework V0.1
------------------------

jayScript is a JavaScript library that provides a list of useful functions without extendind any built-in objects.

It comes from combining pieces of code that you need to write to every single project you make, such has the domReady event, the onLoad event, a sharing script to social networks, and more.

Version 0.1
-----------

Features list:

-   [loadFile](<#loadFile>)
-   [checkIfFileLoaded](<#checkIfFileLoaded>)
-   [onPageLoaded](<#onPageLoaded>)
-   [onDomReady](<#onDomReady>)
-   [setFullBackground](<#setFullBackground>)
-   [select](<#select>)
-   [selectById](<#selectById>)
-   [selectByClass](<#selectByClass>)
-   [selectByTag](<#selectByTag>)
-   [nameType](<#nameType>)
-   [first](<#first>)
-   [addClass](<#addClass>)
-   [removeClass](<#removeClass>)
-   [hasClass](<#hasClass>)
-   [createFloatingBox](<#createFloatingBox>)
-   [showFloatingBox](<#showFloatingBox>)
-   [getQueryParams](<#getQueryParams>)
-   [throttle](<#throttle>)
-   [debounce](<#debounce>)
-   [loadGoogleFont](<#loadGoogleFont>)
-   [isMobile](<#isMobile>)
-   [get](<#get>)
-   [share](<#share>)
-   [socialShare](<#socialShare>)
   -   [setTheme](<#setTheme>)

<a name="loadFile"/> loadFile
-----------------------------

    j.loadFile([
        {fileName:'teste.css',fileType:'css'},
        {fileName:'jquery.js',fileType:'js'}],
        function(){
            console.log("loaded");
    });

<a name="checkIfFileLoaded"/> checkIfFileLoaded
-----------------------------------------------

    j.checkIfFileLoaded('teste.css','css');

<a name="onPageLoaded"/> onPageLoaded
-------------------------------------

    j.onPageLoaded(function(){
        console.log("page loaded");
    });

<a name="onDomReady"/> onDomReady
-------------------------------

    j.onDomReady(function(){
        console.log("dom ready");
    });

<a name="setFullBackground"/> setFullBackground
-------------------------------

    j.setFullBackground("image.png","targetElemet");

targetElement can be:
* #id - an id of an element
* .class - a class of an element
* tag - an element tag

<a name="select"/> select
-------------------------------

    j.select(targetElement);

targetElement can be:
* #id - an id of an element
* .class - a class of an element
* tag - an element tag

<a name="selectById"/> selectById
-------------------------------

    j.selectById(targetElement);

targetElement is the id of the element

<a name="selectByClass"/> selectByClass
-------------------------------

    j.selectByClass(targetElement);

targetElement is the class of the element

<a name="selectByTag"/> selectByTag
-------------------------------

    j.selectByTag(targetTag);

targetTag is the tag of the element

<a name="nameType"/> nameType
-------------------------------
This function is used by other functions to determine the type of element the user is selecting, if you still need to use it, this is how:

    j.nameType(targetString);

targetString can be:
* #string - returns 0
* .string - returns 1
* string - returns 2


<a name="first"/> first
-------------------------------

    elementList = j.select("div");
    first = j.first(elementList);

<a name="addClass"/> addClass
-------------------------------

    element = j.select(targetElement);
    j.addClass("foo", element);

<a name="removeClass"/> removeClass
-------------------------------

    element = j.select(targetElement);
    j.removeClass("foo", element);

<a name="hasClass"/> hasClass
-------------------------------
    
    element = j.select(targetElement);
    console.log(j.hasClass("foo", element));

<a name="createFloatingBox"/> createFloatingBox
-------------------------------

    j.createFloatingBox(targetElement);

targetElement can be:
* #id - an id of an element
* .class - a class of an element
* tag - an element tag

<a name="showFloatingBox"/> showFloatingBox
-------------------------------

    j.showFloatingBox(targetElement);

targetElement can be:
* #id - an id of an element
* .class - a class of an element
* tag - an element tag

<a name="getQueryParams"/> getQueryParams
-------------------------------

    params = j.getQueryParams();
    console.log(params.foo);

<a name="throttle"/> throttle
-------------------------------

    j.throttle(functionName, threshold, scope);
    
* functionName - the name of the function
* threshold - time between calls
* scope - scope to be used, default = this

<a name="debounce"/> debounce
-------------------------------

    j.debounce(functionName, wait, immediate);
    
* functionName - the name of the function
* wait - time to wait after the end of event
* immediate - function runs at the start, default = false


<a name="loadGoogleFont"/> loadGoogleFont
-------------------------------

    j.loadGoogleFont({"Roboto":"300,400,700"});

<a name="isMobile"/> isMobile
-------------------------------

    if (j.isMobile()) {
        console.log("mobile device");
    }

<a name="get"/> get
-------------------------------

    j.get("teste.php",function () { callback(a,b); });
    
<a name="socialShare"/> socialShare
-------------------------------

The SocialShare javascript plugin container.

<a name="setTheme"/> socialShare - setTheme
-------------------------------

    j.socialShare.setTheme(targetElements, path, theme, invertTheme);

targetElements - is the class used in the element where you want to set the theme.
path - is the relative path to the theme folder.
theme - is the name of the theme inside the theme folder.
invertTheme - option to use the theme inverted, the over image will become the default image, default = false
