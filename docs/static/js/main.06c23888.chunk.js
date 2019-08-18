(window["webpackJsonpreact-staged"]=window["webpackJsonpreact-staged"]||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);n(6);var r,a=n(0),c=n.n(a),u=n(4),o=n.n(u),i=n(1);!function(e){e.TRANSITION_DURATION="--s-trans-dur",e.TRANSITION_ANIMATION="--s-trans-animation",e.TRANSFORM_X="--s-transform-x",e.AMOUNT="--s-amount"}(r||(r={}));var l,s=function(e,t,n){var r=e.current;r&&r.style.setProperty(t,n)};!function(e){e[e.LEFT=0]="LEFT",e[e.CENTER=1]="CENTER",e[e.RIGHT=2]="RIGHT"}(l||(l={}));var f=function(e){var t=e.current,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:l.CENTER;t&&t.style.setProperty(r.TRANSFORM_X,"".concat(-t.clientWidth*a+n,"px"))},m=function(e,t){s(e,r.TRANSITION_DURATION,"".concat(.5,"s")),f(e,0,t)},d=function(e){s(e,r.TRANSITION_DURATION,"0"),f(e,0,l.CENTER)},v={prev:function(e){return m(e,l.LEFT)},next:function(e){return m(e,l.RIGHT)},center:function(e){return m(e,l.CENTER)},finish:d,update:function(e,t){return f(e,t)},transition:function(e,t){return t(e),new Promise(function(t){setTimeout(function(){d(e),t()},500)})},amount:function(e,t){return s(e,r.AMOUNT,String(t))}},p=function(e,t){return(e%t+t)%t},E=function(e){return"touches"in e?e.touches[0].pageX:e.pageX},h=function(e,t,n,r,c){var u=function(e){var t=Object(a.useRef)(!1);return Object(a.useEffect)(function(){var n=e.current,r=function(e){t.current&&e.stopPropagation()};if(n)return n.addEventListener("click",r,!0),function(){return n.removeEventListener("click",r,!0)}},[]),t}(t),o=Object(a.useRef)(void 0),i=Object(a.useRef)(0);return[Object(a.useCallback)(function(e){c.stop(),o.current=E(e)},[c]),Object(a.useCallback)(function(t){var n=o.current;void 0!==n&&(i.current=E(t)-n,v.update(e,i.current))},[]),Object(a.useCallback)(function(){var t=e.current,a=o.current,l=i.current;if(t&&void 0!==a){if(c.start(),o.current=void 0,i.current=0,u.current=!!l,Math.abs(l)/t.clientWidth>.1)return l<0?r():n();v.transition(e,v.center)}},[r,n,u,c])]},b=function(e){var t=e.outerRef,n=e.forwardRef,r=e.slides,a=e.prev,u=e.next,o=e.autoSlider,l=h(t,n,a,u,o),s=Object(i.a)(l,3),f=s[0],m=s[1],d=s[2];return c.a.createElement("div",{className:"staged",ref:n,onMouseDown:f,onTouchStart:f,onTouchMove:m,onMouseMove:m,onTouchEnd:d,onMouseUp:d,onMouseLeave:d},r)},O={start:function(){},stop:function(){}},g=function(e,t){var n=Object(a.useMemo)(function(){return function(e,t){var n=0;return t?{start:function(){n||(n=setInterval(e,t))},stop:function(){clearInterval(n),n=0}}:O}(e,t)},[e,t]);return Object(a.useEffect)(function(){return n.start(),n.stop},[n]),n},j=n(2),N=function(e){var t=e.children,n=e.amount,r=void 0===n?1:n,u=e.hideArrows,o=e.autoSlide,l=e.noDrag,s=Object(a.useRef)(null),f=Object(a.useRef)(null);!function(e){Object(a.useEffect)(function(){var t=function(){return v.finish(e)};return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}},[])}(s),function(e,t){Object(a.useLayoutEffect)(function(){v.amount(e,t)},[t])}(s,r);var m=function(e,t,n){var r=Object(a.useState)(0),c=Object(i.a)(r,2),u=c[0],o=c[1];return[u,Object(a.useCallback)(function(){v.transition(e,v.prev).then(function(){return o(function(e){return p(e-n,t)})})},[t]),Object(a.useCallback)(function(){v.transition(e,v.next).then(function(){return o(function(e){return p(e+n,t)})})},[t,n])]}(s,t.length,r),d=Object(i.a)(m,3),E=d[0],h=d[1],O=d[2],N=g(O,o),T=function(e,t,n){var r=Object(a.useMemo)(function(){return Object(j.a)(Array(3*t)).map(function(e,n){return n-t})},[t]);return Object(a.useMemo)(function(){return r.map(function(t){return e[p(n+t,e.length)]})},[e,r,n])}(t,r,E);return c.a.createElement("div",{className:"staged-outer",ref:s},u||c.a.createElement("div",{className:"staged-left-nav",onClick:h}),l?c.a.createElement("div",{className:"staged",ref:f},T):c.a.createElement(b,{outerRef:s,forwardRef:f,prev:h,next:O,slides:T,autoSlider:N}),u||c.a.createElement("div",{className:"staged-right-nav",onClick:O}))},T=[{authors:"Charlotte Link",title:"Die Suche",cover:"/2016/09/10/17/18/book-1659717__340.jpg"},{authors:"Helen Fields",title:"Die perfekte Unschuld",cover:"/2014/11/27/10/29/forest-547363__340.jpg"},{authors:"Carmen Korn",title:"Zeitenwende",cover:"/2018/09/14/22/57/manhole-cover-3678303__340.jpg"},{authors:"Julia Kaufhold",title:"All die sch\xf6nen Tage",cover:"/2016/11/21/14/12/books-1845614__340.jpg"},{authors:"Rita Falk",title:"Eberhofer, Zefix!",cover:"/2015/04/25/03/09/cork-738603__340.jpg"},{authors:"Andreas Gruber",title:"Rachewinter",cover:"/2016/05/17/22/16/baby-1399332__340.jpg"},{authors:"Annette Hess",title:"Deutsches Haus",cover:"/2017/11/28/22/25/lapland-2984828__340.jpg"},{authors:"Lori Nelson Spielman",title:"Heute schon f\xfcr morgen tr\xe4umen",cover:"/2015/07/12/14/26/coffee-842020__340.jpg"},{authors:"Elizabeth George",title:"Wer Strafe verdient",cover:"/2017/01/06/23/03/sunrise-1959227__340.jpg"},{authors:"Jussi Adler-Olsen",title:"Miese kleine Morde",cover:"/2017/05/13/12/40/fashion-2309519__340.jpg"}],R=function(e){var t=e.article,n=t.title,r=t.cover,u=Object(a.useState)(!1),o=Object(i.a)(u,2),l=o[0],s=o[1],f=Object(a.useCallback)(function(){s(!0),setTimeout(function(){return s(!1)},250)},[]);return c.a.createElement("img",{className:l?"clicked":"",src:"https://cdn.pixabay.com/photo".concat(r),alt:n,draggable:!1,onClick:f})},_=function(){return c.a.createElement("div",{className:"example-1"},c.a.createElement("h2",null,"Example 1"),c.a.createElement("p",null,"{ amount: 3 }"),c.a.createElement(N,{amount:3},T.map(function(e,t){return c.a.createElement(R,{article:e,key:t})})))},k=Object(j.a)(T);k.sort(function(){return.5-Math.random()});var S=function(){var e=Object(a.useState)(5e3),t=Object(i.a)(e,2),n=t[0],r=t[1],u=Object(a.useCallback)(function(e){var t=+e.target.value;isNaN(t)||r(t||void 0)},[]);return c.a.createElement("div",{className:"example-2"},c.a.createElement("h2",null,"Example 2"),c.a.createElement("p",null,"{ hideArrows: true, autoSlide: ".concat(n," }")),c.a.createElement("label",{htmlFor:"example-2-autoSlide"},"autoSlide (in ms): "),c.a.createElement("input",{id:"example-2-autoSlide",type:"number",value:String(n||""),onChange:u}),c.a.createElement(N,{hideArrows:!0,autoSlide:n},k.map(function(e,t){return c.a.createElement(R,{article:e,key:t})})))},A=function(){return c.a.createElement("div",{className:"example-3"},c.a.createElement("h2",null,"Example 3"),c.a.createElement("p",null,"{ amount: 2, noDrag: true }"),c.a.createElement(N,{amount:2,noDrag:!0},T.map(function(e,t){return c.a.createElement(R,{article:e,key:t})})))};o.a.render(c.a.createElement(function(){return c.a.createElement("div",{className:"App"},c.a.createElement(_,null),c.a.createElement(S,null),c.a.createElement(A,null))},null),document.getElementById("root"))},5:function(e,t,n){e.exports=n(11)},6:function(e,t,n){}},[[5,1,2]]]);
//# sourceMappingURL=main.06c23888.chunk.js.map