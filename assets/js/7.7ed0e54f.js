(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{175:function(e,n,t){},265:function(e,n,t){"use strict";var s=t(175);t.n(s).a},272:function(e,n,t){"use strict";t.r(n);t(63),t(65);var s=t(152),r=t.n(s),i={name:"Demo4",data:function(){return{event:void 0}},mounted:function(){var e=this;this.grender=new r.a(this.$refs.canvas);var n=this.$refs.canvas.offsetWidth/2-30,t=new s.Rect({shape:{x:n,y:40,width:80,height:40}}),i=new s.Line({brush:{lineWidth:2},shape:{x1:n-50,y1:40,x2:n+50,y2:160}}),d=new s.Circle({shape:{x:n,y:100,r:40}}),a=new s.Ellipse({shape:{x:n+60,y:120,rx:60,ry:30}});this.grender.add(t),this.grender.add(i),this.grender.add(d),this.grender.add(a),this.grender.shapes.forEach((function(n){n.on("dragging",(function(t){n.translate(t.x,t.y),e.event="dragging"})),n.on("mouseover",(function(t){n.brush.fillStyle="red",n.brush.strokeStyle="red",e.event="mouseover",e.grender.refresh()})),n.on("mouseout",(function(t){n.brush.fillStyle="rgba(0,0,0,0)",n.brush.strokeStyle="#000",e.event="mouseout",e.grender.refresh()}))})),window.addEventListener("resize",this.resize)},destroyed:function(){window.removeEventListener("resize",this.resize),this.grender.destroy()},methods:{resize:function(){this.grender.resize()}}},d=(t(265),t(29)),a=Object(d.a)(i,(function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"demo4"},[n("div",[this._v("当前触发事件："+this._s(this.event))]),this._v(" "),n("div",{ref:"canvas",staticClass:"demo4-canvas"})])}),[],!1,null,null,null);n.default=a.exports}}]);