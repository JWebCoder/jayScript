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
-   nameType
-   first
-   createFloatingBox
-   showFloatingBox
-   getQueryParams
-   throttle
-   debounce
-   loadGoogleFont
-   isMobile
-   get
-   share
-   socialShare
-   setTheme

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
