/*jslint browser:true */
/*jslint node: true */
/*global j */
'use strict';
j.share = function (element) {
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
};
    
j.socialShare = {
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
};