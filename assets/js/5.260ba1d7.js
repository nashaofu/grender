(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{344:function(e,t,n){"use strict";n.r(t);var s=n(276),i=n.n(s),r={name:"Demo1",mounted:function(){this.grender=new i.a(this.$el);var e=this.$el.offsetWidth/2-30,t=new s.Rect({shape:{x:e,y:40,width:80,height:40}}),n=new s.Line({shape:{x1:e-50,y1:40,x2:e+50,y2:160}}),r=new s.Arrow({shape:{x1:e-30,y1:40,x2:e+10,y2:160}}),d=new s.Circle({shape:{x:e,y:100,r:40}}),h=new s.Ellipse({shape:{x:e+60,y:120,rx:60,ry:30}});this.grender.add(t),this.grender.add(n),this.grender.add(r),this.grender.add(d),this.grender.add(h),window.addEventListener("resize",this.resize)},destroyed:function(){window.removeEventListener("resize",this.resize),this.grender.destroy()},methods:{resize:function(){this.grender.resize()}}},d=n(33),h=Object(d.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"demo1",staticStyle:{height:"180px"}})}),[],!1,null,null,null);t.default=h.exports}}]);