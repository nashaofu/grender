(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{175:function(e,n,s){},265:function(e,n,s){"use strict";var t=s(175);s.n(t).a},272:function(e,n,s){"use strict";s.r(n);s(63),s(65);var t=s(152),r=s.n(t),i={name:"Demo4",data:function(){return{event:void 0}},mounted:function(){var e=this;this.grender=new r.a(this.$refs.canvas);var n=this.$refs.canvas.offsetWidth/2-30,s=new t.Rect({shape:{x:n,y:40,width:80,height:40}}),i=new t.Line({brush:{lineWidth:2},shape:{x1:n-50,y1:40,x2:n+50,y2:160}}),a=new t.Circle({shape:{x:n,y:100,r:40}}),o=new t.Ellipse({shape:{x:n+60,y:120,rx:60,ry:30}});this.grender.add(s),this.grender.add(i),this.grender.add(a),this.grender.add(o),this.grender.shapes.forEach((function(n){n.on("dragging",(function(s){n.translate(s.x,s.y),e.event="dragging"})),n.on("mouseenter",(function(s){n.brush.fillStyle="red",n.brush.strokeStyle="blue",e.event="mouseenter",e.grender.refresh()})),n.on("mouseleave",(function(s){n.brush.fillStyle="rgba(0,0,0,0)",n.brush.strokeStyle="#000",e.event="mouseleave",e.$refs.canvas.style.cursor="pointer",e.grender.refresh(),console.log(s)}))})),window.addEventListener("resize",this.resize)},destroyed:function(){window.removeEventListener("resize",this.resize),this.grender.destroy()},methods:{resize:function(){this.grender.resize()}}},a=(s(265),s(29)),o=Object(a.a)(i,(function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"demo4"},[n("div",[this._v("当前触发事件："+this._s(this.event))]),this._v(" "),n("div",{ref:"canvas",staticClass:"demo4-canvas"})])}),[],!1,null,null,null);n.default=o.exports}}]);