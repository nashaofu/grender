(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{179:function(e,n,r){},264:function(e,n,r){"use strict";var t=r(179);r.n(t).a},271:function(e,n,r){"use strict";r.r(n);r(62),r(64);var t=r(155),s={name:"Demo4",data:function(){return{event:void 0}},mounted:function(){var e=this;this.grender=new t.d(this.$refs.canvas);var n=this.$refs.canvas.offsetWidth/2-30,r=new t.c({shape:{x:n,y:40,width:80,height:40}}),s=new t.a({shape:{x:n,y:100,r:40}}),i=new t.b({shape:{x:n+60,y:120,rx:60,ry:30}});this.grender.add(r),this.grender.add(s),this.grender.add(i),this.grender.shapes.forEach((function(n){n.on("dragging",(function(r){n.translate(r.x,r.y),e.event="dragging",e.grender.refresh()})),n.on("mouseover",(function(r){n.brush.fillStyle="red",e.event="mouseover",e.grender.refresh()})),n.on("mouseout",(function(r){n.brush.fillStyle="rgba(0,0,0,0)",e.event="mouseout",e.grender.refresh()})),e.grender.on("mouseup",(function(){e.grender.refresh()}))})),window.addEventListener("resize",this.resize)},destroyed:function(){window.removeEventListener("resize",this.resize),this.grender.destroy()},methods:{resize:function(){this.grender.resize()}}},i=(r(264),r(29)),o=Object(i.a)(s,(function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"demo4"},[n("div",[this._v("当前触发事件："+this._s(this.event))]),this._v(" "),n("div",{ref:"canvas",staticClass:"demo4-canvas"})])}),[],!1,null,null,null);n.default=o.exports}}]);