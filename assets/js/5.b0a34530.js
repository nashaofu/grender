(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{177:function(e,t,n){},262:function(e,t,n){"use strict";var r=n(177);n.n(r).a},270:function(e,t,n){"use strict";n.r(t);var r=n(155),i={name:"Demo2",mounted:function(){this.grender=new r.d(this.$el);var e=this.$el.offsetWidth/2-30,t=new r.c({brush:{fillStyle:"green",strokeStyle:"green",globalAlpha:.9},shape:{x:e,y:40,width:80,height:40},z:1}),n=new r.a({brush:{lineWidth:4,strokeStyle:"blue"},shape:{x:e,y:100,r:40}}),i=new r.b({brush:{lineWidth:0,fillStyle:"red",globalAlpha:.9},shape:{x:e+60,y:120,rx:60,ry:30}});this.grender.add(t),this.grender.add(n),this.grender.add(i),window.addEventListener("resize",this.resize)},destroyed:function(){window.removeEventListener("resize",this.resize),this.grender.destroy()},methods:{resize:function(){this.grender.resize()}}},s=(n(262),n(29)),d=Object(s.a)(i,(function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"demo2"})}),[],!1,null,null,null);t.default=d.exports}}]);