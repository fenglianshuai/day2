"use strict";define(["jquery","handlebars","text!template/catalog.html"],function(c,d,r){var h={};window.location.search.substr(1).split("&").map(function(i){h[i.split("=")[0]]=i.split("=")[1]}),console.log(h),c.ajax({url:"/api/chapterlist?id="+h.id,dataType:"json",success:function(i){var t,o,a,l,e,s=i.item.toc;t=r,o=s,a=c(".box"),e=d.compile(t)(o),0===l?a.append(e):a.html(e),"last"===h.last&&(c(".box li").last().addClass("active").siblings().removeClass(),c("section").scrollTop(c(".active").offset().top));var n=window.localStorage;c(".box").on("click","li",function(){c(this).addClass("active").siblings().removeClass("active"),2===c(this).children().length&&"免费"===c(this).children()[1].innerHTML?window.location.href="read.html?id="+c(this).data("id")+"&maxnum="+s.length+"&bookid="+h.id:n.getItem("log")?window.location.href="read.html?id="+c(this).data("id")+"&maxnum="+s.length+"&bookid="+h.id:window.location.href="login.html"}),console.log(c(".box").find(".active")),c(".box li").eq(h.active).addClass("active").siblings().removeClass("active"),c(".root").on("click",function(){window.location.href="/"})}})});