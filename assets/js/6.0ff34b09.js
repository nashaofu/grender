(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{323:function(e,t,n){},363:function(e,t,n){"use strict";var r=n(323);n.n(r).a},370:function(e,t,n){"use strict";n.r(t);var r=n(91),i=n(305),s=n.n(i),c={name:"Demo3",mounted:function(){this.grender1=new s.a(this.$refs.rect),this.rect=new i.Rect({brush:{fillStyle:"red",strokeStyle:"red"},shape:{x:0,y:0,width:80,height:40}}),this.grender1.add(this.rect),this.grender2=new s.a(this.$refs.ellipse),this.ellipse=new i.Ellipse({brush:{fillStyle:"red",strokeStyle:"red"},shape:{x:100,y:100,rx:60,ry:30}}),this.grender2.add(this.ellipse),window.addEventListener("resize",this.resize)},destroyed:function(){window.removeEventListener("resize",this.resize),this.grender1.destroy(),this.grender2.destroy()},methods:{resize:function(){this.grender1.resize(),this.grender2.resize()},translateX:function(e){var t=Object(r.a)(e.T,2),n=t[0],i=t[1];e.translate(n+10,i)},translateY:function(e){var t=Object(r.a)(e.T,2),n=t[0],i=t[1];e.translate(n,i+10)},rotate:function(e){var t=e.R;e.rotate(t+30)},scale:function(e,t){var n=Object(r.a)(e.S,2),i=n[0],s=n[1];e.scale(i*t,s*t)}}},l=(n(363),n(42)),o=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"demo3"},[n("h5",[e._v("矩形变换")]),e._v(" "),n("button",{on:{click:function(t){return e.translateX(e.rect)}}},[e._v("x + 10")]),e._v(" "),n("button",{on:{click:function(t){return e.translateY(e.rect)}}},[e._v("y + 10")]),e._v(" "),n("button",{on:{click:function(t){return e.rotate(e.rect)}}},[e._v("旋转30°")]),e._v(" "),n("button",{on:{click:function(t){return e.scale(e.rect,1.2)}}},[e._v("放大1.2倍")]),e._v(" "),n("button",{on:{click:function(t){return e.scale(e.rect,1/1.2)}}},[e._v("缩小1.2倍")]),e._v(" "),n("div",{ref:"rect",staticClass:"demo3-canvas"}),e._v(" "),n("h5",[e._v("椭圆变换")]),e._v(" "),n("button",{on:{click:function(t){return e.translateX(e.ellipse)}}},[e._v("x + 10")]),e._v(" "),n("button",{on:{click:function(t){return e.translateY(e.ellipse)}}},[e._v("y + 10")]),e._v(" "),n("button",{on:{click:function(t){return e.rotate(e.ellipse)}}},[e._v("旋转30°")]),e._v(" "),n("button",{on:{click:function(t){return e.scale(e.ellipse,1.2)}}},[e._v("放大1.2倍")]),e._v(" "),n("button",{on:{click:function(t){return e.scale(e.ellipse,1/1.2)}}},[e._v("缩小1.2倍")]),e._v(" "),n("div",{ref:"ellipse",staticClass:"demo3-canvas"})])}),[],!1,null,null,null);t.default=o.exports}}]);