(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{344:function(e,t,i){"use strict";i.r(t);var r=i(276),s=i.n(r),n={name:"Demo2",mounted:function(){this.grender=new s.a(this.$el);var e=this.$el.offsetWidth/2-30,t=new r.Rect({brush:{fillStyle:"green",strokeStyle:"green",globalAlpha:.9},shape:{x:e,y:40,width:80,height:40},z:1}),i=new r.Circle({brush:{lineWidth:4,strokeStyle:"blue"},shape:{x:e,y:100,r:40}}),n=new r.Ellipse({brush:{lineWidth:0,fillStyle:"red",globalAlpha:.9},shape:{x:e+60,y:120,rx:60,ry:30}});this.grender.add(t),this.grender.add(i),this.grender.add(n),window.addEventListener("resize",this.resize)},destroyed:function(){window.removeEventListener("resize",this.resize),this.grender.destroy()},methods:{resize:function(){this.grender.resize()}}},l=i(33),d=Object(l.a)(n,(function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"demo2",staticStyle:{height:"180px"}})}),[],!1,null,null,null);t.default=d.exports}}]);