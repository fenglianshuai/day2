"use strict";require.config({baseUrl:"/js/",paths:{handlebars:"lib/handlebars-v4.0.11",flexible:"lib/flexible",index:"app/index",text:"lib/require.text",moce:"../../moce",template:"../template",swiper:"lib/swiper-4.2.2.min",lazyload:"lib/jquery.lazyload",jquery:"lib/jquery.min",seek:"app/seek",detail:"app/detail",getUrl:"mail/getUrl",catalog:"app/catalog",read:"app/read",base64:"lib/jquery.base64",login:"app/login",zepto:"lib/zepto"},shim:{lazyload:{exports:"lazyload",deps:["jquery"]},base64:{exports:"base64",deps:["jquery"]}}}),require(["flexible"]);