(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{166:function(e,t,n){},169:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(50),i=n.n(c),o=n(260),s=n(247),l=n(99),u=Object(l.a)({palette:{mode:"dark",primary:{main:"#ba68c8"},secondary:{main:"#ffa726"},divider:"#485654"},spacing:8,typography:{fontFamily:"PT Sans",fontSize:15,htmlFontSize:17,fontWeightLight:400,fontWeightRegular:500,fontWeightMedium:600,h1:{fontFamily:"Lora"},h2:{fontFamily:"Lora"},h3:{fontFamily:"Lora"},h4:{fontFamily:"Lora"},subtitle1:{fontFamily:"Lora"},h5:{fontFamily:"Lora"},h6:{fontFamily:"Lora"},subtitle2:{fontFamily:"PT Sans"},button:{fontFamily:"PT Sans"}}}),j=n(33),d=n(14),b=n(7),h=n(5),O=n(250),x=n(266),f=n(254),m=n(252),p=n(268),v=n(269),g=n(258),y=n(235),S=n(22),w=n.n(S),C=n(32),k=n(69),F=n(116);function M(){return localStorage.getItem("access_token")}function D(e){localStorage.setItem("access_token",e)}var E={baseURL:"",timeout:1e3},T=n.n(F).a.create(E);T.interceptors.request.use((function(e){var t=M(),n={};return t&&(n.Authorization="Bearer ".concat(t)),Object(k.a)(Object(k.a)({},e),{},{headers:n})}),(function(e){console.log(e)}));var B=n(56),L=n(57);var W=new(function(){function e(){Object(B.a)(this,e)}return Object(L.a)(e,[{key:"login",value:function(){var e=Object(C.a)(w.a.mark((function e(t,n){var r,a,c,i,o,s;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.post("login",{username:t,password:n});case 2:return r=e.sent,a=r.data,c=a.name,i=a.id,o=a.role,(s=a.access_token)&&(D(s),l={id:i,name:c,role:o},localStorage.setItem("user_info",JSON.stringify(l))),e.abrupt("return",{id:i,name:c,role:o,access_token:s});case 10:case"end":return e.stop()}var l}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"logout",value:function(){var e=Object(C.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:D("");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}()),z=n(0),I=a.a.createContext(null);function P(e){var t=e.children,n=function(){var e=localStorage.getItem("user_info")||"{}";return JSON.parse(e)}(),a=n.name,c=n.id,i=n.role,o=M(),s=Object(r.useState)(!!o),l=Object(b.a)(s,2),u=l[0],j=l[1],d=Object(r.useState)(a),h=Object(b.a)(d,2),O=h[0],x=h[1],f=Object(r.useState)(c),m=Object(b.a)(f,2),p=m[0],v=m[1],g=Object(r.useState)(i),y=Object(b.a)(g,2),S=y[0],k=y[1],F=Object(r.useState)(),D=Object(b.a)(F,2),E=D[0],T=D[1],B=Object(r.useState)(!1),L=Object(b.a)(B,2),P=L[0],H=L[1];function R(){return(R=Object(C.a)(w.a.mark((function e(t,n){var r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W.login(t,n);case 3:return r=e.sent,H(!1),x(r.name),v(r.id),k(r.role),j(!0),e.abrupt("return",r);case 12:e.prev=12,e.t0=e.catch(0),T(e.t0),H(!0);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function A(){return(A=Object(C.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(!1),e.next=3,W.logout();case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var G={authenticated:u,token:o,userName:O,userId:p,userRole:S,login:function(e,t){return R.apply(this,arguments)},logout:function(){return A.apply(this,arguments)},isHandler:function(){return"handler"===S},error:E,hasError:P};return Object(z.jsx)(I.Provider,{value:G,children:t})}function H(){return a.a.useContext(I)}var R=Object(h.a)(O.a)((function(e){return{margin:8,maxWidth:680,minWidth:200}})),A=Object(h.a)("form")({display:"flex",flexDirection:"column",padding:8}),G=Object(h.a)("img")({width:160,height:160,borderRadius:80}),_=function(){var e,t,n=Object(r.useState)(""),a=Object(b.a)(n,2),c=a[0],i=a[1],o=Object(r.useState)(""),s=Object(b.a)(o,2),l=s[0],u=s[1],j=H(),h=Object(d.h)(),O=(null===(e=Object(d.g)().state)||void 0===e||null===(t=e.from)||void 0===t?void 0:t.pathname)||"/",S=Object(r.useState)("error"),w=Object(b.a)(S,2),C=w[0],k=w[1],F=Object(r.useState)(""),M=Object(b.a)(F,2),D=M[0],E=M[1],T=Object(r.useState)(j.hasError),B=Object(b.a)(T,2),L=B[0],W=B[1],I=Object(r.useState)(4e3),P=Object(b.a)(I,2),_=P[0],K=P[1];return Object(r.useEffect)((function(){j.authenticated&&h(O,{replace:!0}),k("success"),E("See you Soon \ud83d\udc12"),K(2e3),W(!0)}),[j.authenticated,h,O]),Object(r.useEffect)((function(){j.hasError&&(k("error"),E("wrong credentials \ud83d\ude48"),W(!0))}),[j.hasError]),Object(z.jsxs)(x.a,{maxWidth:"xs",children:[Object(z.jsx)(f.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:L,autoHideDuration:_,onClose:function(){W(!1)},children:Object(z.jsx)(m.a,{severity:C,sx:{mt:4},variant:"outlined",children:Object(z.jsx)(p.a,{children:D})})}),Object(z.jsxs)(y.a,{sx:{height:"100vh",alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center"},children:[Object(z.jsx)(v.a,{variant:"h4",sx:{my:4},color:"secondary",children:"Latin Sessions"}),Object(z.jsx)(G,{src:"/arribalasmarihuanas.jpeg"}),Object(z.jsx)(v.a,{variant:"h6",sx:{mb:2},children:"ay no"}),Object(z.jsxs)(A,{onSubmit:function(e){e.preventDefault(),j.login(c,l).then((function(){return W(j.hasError)}))},children:[Object(z.jsx)(R,{label:"username",onChange:function(e){return i(e.currentTarget.value)},value:c,color:"primary"}),Object(z.jsx)(R,{label:"password",onChange:function(e){return u(e.currentTarget.value)},value:l,type:"password",color:"primary"}),Object(z.jsx)(g.a,{type:"submit",variant:"outlined",sx:{m:1},children:"Login"})]})]})]})},K=n(265),N=n(255),q=n(270),J=n(271),Y=n(236);function Z(){var e=Object(r.useState)([]),t=Object(b.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){T.get("users").then((function(e){var t=e.data;a(t)}))}),[]),Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(v.a,{variant:"h2",children:"Users!"}),Object(z.jsx)(K.a,{children:n.map((function(e){var t=e.id,n=e.name,r=e.role;return Object(z.jsx)(N.a,{children:Object(z.jsx)(q.a,{children:Object(z.jsx)(J.a,{children:Object(z.jsxs)(Y.a,{children:[Object(z.jsxs)(v.a,{variant:"body1",children:["user id: ",t]}),Object(z.jsxs)(v.a,{variant:"body1",children:["username: ",n]}),Object(z.jsxs)(v.a,{variant:"body1",children:["role: ",r]})]})})})},t)}))})]})}var U=n(272),Q=n(273),V=n(267),X=n(263),$=n(239),ee=n(274),te=n(275),ne=n(264),re=n(276),ae=n(277),ce=n(278),ie=n(237),oe=n(238),se=n(240),le=n(241),ue=a.a.createContext(null);function je(e){var t=e.children,n=Object(r.useState)(""),a=Object(b.a)(n,2),c=a[0],i=a[1],o=Object(r.useState)(""),s=Object(b.a)(o,2),l=s[0],u=s[1],j=Object(r.useState)([{item:""}]),d=Object(b.a)(j,2),h=d[0],O=d[1],x=Object(r.useState)(0),f=Object(b.a)(x,2),m=f[0],p=f[1],v=Object(r.useState)(!1),g=Object(b.a)(v,2),y=g[0],S=g[1],k=Object(r.useState)([]),F=Object(b.a)(k,2),M=F[0],D=F[1],E=Object(r.useState)(new Map),B=Object(b.a)(E,2),L=B[0],W=B[1],I=function(e){O(e),S(!0)},P=function(e){p(e),S(!0)},H=function(){return T.get("/orders").then((function(e){var t,n=e.data;if(!n.id)return O([]),void p(0);i(n.id),u(n.user.username),D(n.items),O(n.items),p(n.total),S(!1);var r=new Map;null===(t=n.items)||void 0===t||t.forEach((function(e){return e.item&&e.qty?r.set(e.item,e.qty):null})),W(r)}))};Object(r.useEffect)((function(){H().catch((function(e){console.log(e)}))}),[]);var R={id:c,user:l,items:h,total:m,updateItems:I,updateTotal:P,saveOrder:function(){var e=Object(C.a)(w.a.mark((function e(){var t,n,r,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T({url:"/orders",method:"PATCH",data:{items:h}});case 2:n=e.sent,r=n.data,i(r.id),O(r.items),p(r.total),S(!1),a=new Map,null===(t=r.items)||void 0===t||t.forEach((function(e){var t=e.item,n=e.qty;return t&&n?a.set(t,n):null})),W(a);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),fetchOrder:H,hasChanges:y,originalItems:M,summaryMap:L,updateSummaryAndTotal:function(e){var t=function(e){var t=[];return L.forEach((function(n,r){var a=n*(e.get(r)||0);t.push({item:r,qty:n,subtotal:a})})),t}(e);I(t);var n=function(e){return e.reduce((function(e,t){return e+t.subtotal}),0)}(t);P(n)}};return Object(z.jsx)(ue.Provider,{value:R,children:t})}function de(){return Object(r.useContext)(ue)}var be=a.a.createContext(null);function he(e){var t=e.children,n=Object(r.useState)([]),a=Object(b.a)(n,2),c=a[0],i=a[1],o=Object(r.useState)(new Map),s=Object(b.a)(o,2),l=s[0],u=s[1],j=function(){var e=Object(C.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",T.get("menu").then((function(e){var t=e.data,n=new Map;i(t.items||[]),t.items.forEach((function(e){var t=e.name,r=e.price;return n.set(t,r)})),u(n)})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(C.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",T.post("/menu",{items:t}).then((function(){return j()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j;e()}),[]);var h={items:c,priceMap:l,fetchMenu:j,updateMenu:d};return Object(z.jsx)(be.Provider,{value:h,children:t})}function Oe(){return Object(r.useContext)(be)}var xe=function(e){var t=e.name,n=e.price,r=e.onRemove,a=e.onAdd,c=e.highlight,i=e.handleClick;return Object(z.jsxs)(U.a,{selected:c,children:[Object(z.jsxs)(Q.a,{children:[" ",t," "]}),Object(z.jsxs)(Q.a,{align:"center",children:[" ",n," "]}),Object(z.jsxs)(Q.a,{sx:{textAlign:"right",minWidth:"8em"},children:[Object(z.jsx)(V.a,{onClick:function(e){r(t),i(e,!0)},color:"secondary",children:Object(z.jsx)(ie.a,{})}),Object(z.jsx)(V.a,{onClick:function(e){a(t),i(e,!0)},color:"secondary",children:Object(z.jsx)(oe.a,{})})]})]})},fe=function(){var e=Oe(),t=e.items,n=e.priceMap,c=de()||[],i=c.summaryMap,o=c.updateSummaryAndTotal,s=a.a.useState(!1),l=Object(b.a)(s,2),u=l[0],j=l[1],d=a.a.useState(null),h=Object(b.a)(d,2),O=h[0],x=h[1],f=a.a.useState(""),m=Object(b.a)(f,2),p=m[0],g=m[1],y=function(e,t){t&&x(e.currentTarget),j(!0)},S=function(){j(!1)},w=u&&Boolean(O)?"transition-popper":void 0;function C(e){g(e);var t=i.get(e)||0;t<=0||(i.set(e,t-1),o(n))}function k(e){g(e);var t=i.get(e)||0;i.set(e,t+1),o(n)}return Object(r.useEffect)((function(){console.log(n)}),[n]),Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(X.a,{id:w,open:u,anchorEl:O,onClose:S,anchorOrigin:{vertical:"top",horizontal:"left"},children:Object(z.jsxs)(q.a,{children:[Object(z.jsxs)(J.a,{children:[Object(z.jsx)(v.a,{variant:"subtitle1",children:p}),Object(z.jsxs)($.a,{sx:{display:"flex",justifyContent:"space-between",mt:2,alignItems:"center"},children:[Object(z.jsx)(V.a,{onClick:function(){return e=p,i.set(e,0),o(n),void S();var e},children:Object(z.jsx)(se.a,{})}),Object(z.jsxs)($.a,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Object(z.jsx)(V.a,{onClick:function(e){C(p),y(e,!1)},color:"secondary",children:Object(z.jsx)(ie.a,{})}),Object(z.jsxs)(v.a,{variant:"subtitle1",sx:{mx:1},color:"primary",children:[i.get(p)||0," g"]}),Object(z.jsx)(V.a,{onClick:function(e){k(p),y(e,!1)},color:"secondary",children:Object(z.jsx)(oe.a,{})})]})]})]}),Object(z.jsx)(ee.a,{children:Object(z.jsx)(V.a,{sx:{ml:"auto"},color:"success",onClick:S,size:"large",children:Object(z.jsx)(le.a,{})})})]})}),Object(z.jsx)(v.a,{variant:"h6",sx:{mt:2,mb:2},children:"Menu \ud83c\udf40\ud83c\udf40\ud83c\udf40"}),Object(z.jsx)(te.a,{component:ne.a,children:Object(z.jsxs)(re.a,{children:[Object(z.jsx)(ae.a,{children:Object(z.jsxs)(U.a,{children:[Object(z.jsx)(Q.a,{children:"\ud83c\udf31 Dish"}),Object(z.jsx)(Q.a,{children:"\ud83d\udcb6 Price"}),Object(z.jsx)(Q.a,{})]})}),Object(z.jsx)(ce.a,{children:t&&(null===t||void 0===t?void 0:t.map((function(e){var t=e.name,n=e.price;return Object(z.jsx)(xe,{onRemove:C,onAdd:k,name:t,price:n,highlight:i&&i.has(t)&&!!i.get(t),handleClick:y},t)})))})]})})]})},me=n(281),pe=n(282),ve=n(244),ge=n(42),ye=n(115),Se=n(259),we=Object(r.createContext)(null);function Ce(e){var t=e.children,n=Object(r.useState)(!1),a=Object(b.a)(n,2),c=a[0],i=a[1],o={bottomDrawerOpen:c,closeBottomDrawer:function(){i(!1)},openBottomDrawer:function(){i(!0)}};return Object(z.jsx)(we.Provider,{value:o,children:t})}function ke(){return Object(r.useContext)(we)}var Fe=Object(h.a)($.a)((function(e){return{backgroundColor:"light"===e.theme.palette.mode?"#fff":ye.a[800]}})),Me=Object(h.a)(Fe)({position:"absolute",top:-56,borderTopLeftRadius:8,borderTopRightRadius:8,visibility:"visible",right:0,left:0,display:"flex",flexDirection:"column"}),De=Object(h.a)($.a)((function(e){return{width:30,height:6,backgroundColor:"light"===e.theme.palette.mode?ye.a[300]:ye.a[900],borderRadius:3,position:"absolute",top:8,left:"calc(50% - 15px)"}}));function Ee(e){var t=de(),n=t.total,r=t.hasChanges,a=ke(),c=a.bottomDrawerOpen,i=a.openBottomDrawer,o=a.closeBottomDrawer,s=document.body;return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(ge.a,{styles:{".MuiDrawer-root > .MuiDrawer-paperAnchorBottom":{height:"calc(50% - ".concat(56,"px)"),overflow:"visible"}}}),Object(z.jsxs)(Se.a,{anchor:"bottom",open:c,onClose:o,ModalProps:{keepMounted:!0},container:s,children:[Object(z.jsxs)(Me,{onClick:i,children:[Object(z.jsx)(De,{}),Object(z.jsxs)($.a,{sx:{display:"flex",justifyContent:"space-between",p:2},children:[Object(z.jsxs)(v.a,{variant:"h6",sx:{marginLeft:r?0:"auto"},children:["total: ",n," \u20ac"]}),r&&!c&&Object(z.jsx)(g.a,{variant:"contained",color:"primary",size:"small",children:"Save the order"})]})]}),Object(z.jsx)(Fe,{sx:{px:2,pb:2,height:"100%",overflow:"auto"},children:e.children})]})]})}function Te(e){var t=e.items;return Object(z.jsx)(K.a,{sx:{flexGrow:1,overflow:"scroll"},children:t&&t.map((function(e){var t=e.item,n=e.qty,r=e.subtotal;return Object(z.jsxs)(N.a,{children:[Object(z.jsxs)(v.a,{variant:"caption",children:[n,"g."]}),Object(z.jsx)(y.a,{component:"span",sx:{mr:1,ml:1},children:"-"}),Object(z.jsx)(v.a,{variant:"caption",sx:{flexGrow:1,textDecoration:n?"none":"line-through"},children:t}),Object(z.jsx)(v.a,{variant:"caption",children:r})]},t)}))})}var Be=a.a.createContext(null);function Le(e){var t=e.children,n=Object(r.useState)(""),a=Object(b.a)(n,2),c=a[0],i=a[1],o=Object(r.useState)(""),s=Object(b.a)(o,2),l=s[0],u=s[1],j=Object(r.useState)(""),d=Object(b.a)(j,2),h=d[0],O=d[1],x=Object(r.useState)(""),f=Object(b.a)(x,2),m=f[0],p=f[1],v=Object(r.useState)([{item:""}]),g=Object(b.a)(v,2),y=g[0],S=g[1],w=Object(r.useState)([{id:""}]),C=Object(b.a)(w,2),k=C[0],F=C[1],M=Object(r.useState)(0),D=Object(b.a)(M,2),E=D[0],B=D[1],L=function(){return T.get("order-wave").then((function(e){var t=e.data,n=t.id,r=t.handler,a=t.order_before,c=t.menu_id,o=t.summary,s=t.orders,l=t.total;console.log(null===s||void 0===s?void 0:s.map((function(e){return e.total}))),i(n),u(r.name),O(a),p(c),F(s),S(o),B(l)}))};Object(r.useEffect)((function(){L()}),[]);var W={id:c,handler:l,orderBefore:h,menuId:m,summary:y,orders:k,total:E,fetchOrderWave:L};return Object(z.jsx)(Be.Provider,{value:W,children:t})}function We(){return a.a.useContext(Be)}function ze(){var e=We().fetchOrderWave,t=de(),n=t.items,r=t.saveOrder,a=t.updateItems,c=t.updateTotal,i=ke().closeBottomDrawer,o=Object(d.h)();return Object(z.jsx)(z.Fragment,{children:Object(z.jsxs)($.a,{sx:{height:"100%",textAlign:"right",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[Object(z.jsx)(Te,{items:n||[]}),Object(z.jsxs)($.a,{sx:{display:"flex",justifyContent:"space-between",flexDirection:"row-reverse"},children:[Object(z.jsx)(g.a,{onClick:function(){r(),i&&i(),e&&e(),o("/")},variant:"contained",color:"secondary",children:"Save The order"}),n&&n.length>0&&Object(z.jsx)(g.a,{onClick:function(){a([]),c(0)},variant:"contained",color:"error",children:"delete all"})]})]})})}var Ie=n(242),Pe=n(243),He=n(279),Re=n(280);function Ae(e){var t=e.open,n=e.onClose,r=Object(d.h)();function a(e){r(e),n()}return Object(z.jsx)(Se.a,{anchor:"left",open:t,onClose:n,children:Object(z.jsx)(z.Fragment,{children:Object(z.jsxs)(K.a,{children:[Object(z.jsxs)(N.a,{button:!0,onClick:function(){return a("/")},children:[Object(z.jsx)(He.a,{children:Object(z.jsx)(Ie.a,{})}),Object(z.jsx)(Re.a,{primary:"Home"})]}),Object(z.jsxs)(N.a,{button:!0,onClick:function(){return a("/menu")},children:[Object(z.jsx)(He.a,{children:Object(z.jsx)(Pe.a,{})}),Object(z.jsx)(Re.a,{primary:"Menu"})]})]})})})}function Ge(){var e=H(),t=Object(d.h)(),n=Object(r.useState)(!1),a=Object(b.a)(n,2),c=a[0],i=a[1],o=Object(r.useState)(e.authenticated),s=Object(b.a)(o,2),l=s[0],u=s[1];function j(){return(j=Object(C.a)(w.a.mark((function n(){return w.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.logout();case 2:t("/login");case 3:case"end":return n.stop()}}),n)})))).apply(this,arguments)}var h=function(e){i(e)};return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsxs)($.a,{sx:{height:"100vh",display:"flex",flexDirection:"column",backgroundImage:"url(/psychedelyc.jpg)"},children:[Object(z.jsx)(Ae,{open:c,onClose:function(){return h(!1)}}),Object(z.jsx)(me.a,{position:"sticky",color:"secondary",children:Object(z.jsxs)(pe.a,{children:[Object(z.jsx)(V.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},onClick:function(){return h(!0)},children:Object(z.jsx)(ve.a,{})}),Object(z.jsx)(g.a,{onClick:function(){return j.apply(this,arguments)},sx:{ml:"auto"},children:"logout"})]})}),Object(z.jsxs)(x.a,{sx:{flexGrow:1,mb:8},children:[Object(z.jsx)($.a,{sx:{mb:8},children:Object(z.jsx)(d.b,{})}),Object(z.jsx)(Ce,{children:Object(z.jsx)(Ee,{children:Object(z.jsx)(ze,{})})})]})]}),Object(z.jsx)(f.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:l,autoHideDuration:2e3,onClose:function(){u(!1)},children:Object(z.jsx)(m.a,{severity:"success",children:Object(z.jsx)(v.a,{variant:"subtitle2",children:"Arriba las Marihuanas Joakin \ud83d\udc12"})})})]})}function _e(){var e=We(),t=e.summary,n=e.total;return Object(z.jsx)(q.a,{sx:{mb:2},children:Object(z.jsxs)(J.a,{children:[Object(z.jsxs)(v.a,{variant:"h6",children:["Everyone's Total: ",n," \u20ac"]}),Object(z.jsx)(Te,{items:t||[]})]})})}var Ke=n(256),Ne=n(283),qe=n(284),Je=n(245);function Ye(){var e=We().orders;return Object(z.jsx)(q.a,{children:Object(z.jsxs)(J.a,{children:[Object(z.jsx)(v.a,{variant:"h6",children:" These people are ordering:"}),null===e||void 0===e?void 0:e.map((function(e){var t;return Object(z.jsx)($.a,{sx:{mb:2,mt:2},children:Object(z.jsxs)(Ke.a,{children:[Object(z.jsx)(Ne.a,{expandIcon:Object(z.jsx)(Je.a,{}),children:Object(z.jsxs)(v.a,{variant:"body1",component:"div",color:"secondary",children:[null===(t=e.user)||void 0===t?void 0:t.name,": ",e.total," \u20ac"]})}),Object(z.jsx)(qe.a,{children:Object(z.jsx)(Te,{items:e.items||[]})})]})})}))]})})}var Ze=n(285);function Ue(e){return e<10?"0"+e:String(e)}function Qe(){var e,t,n=We(),r=H().userName,a=n.handler,c=n.orderBefore,i=new Date(c||""),o=void 0===(e=i.getDay())||null===e||e>6||e<0?"Danielsday":new Map([["2","Monday"],["3","Tuesday"],["4","Wednesday"],["5","Thursday"],["6","Friyay"],["7","Saturday"],["1","Sunday"]]).get(String(e+1))||"Danielsday",s=[Ue((t=i).getHours()),Ue(t.getMinutes())].join(":");return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsxs)(v.a,{variant:"h5",children:[a===r?"You are":"".concat(a," is")," ordering on "]}),Object(z.jsx)(v.a,{variant:"h5",color:"primary",sx:{mb:2},children:o}),Object(z.jsx)(Ze.a,{}),Object(z.jsxs)(v.a,{sx:{my:2},children:[" Order before ",s]})]})}function Ve(e){var t=e.children,n=H(),r=n.isHandler,a=n.userName,c=We().handler;return Object(z.jsxs)(q.a,{sx:{my:2},children:[Object(z.jsxs)(J.a,{children:[t,Object(z.jsxs)(Y.a,{children:[r()&&a===c&&Object(z.jsx)(g.a,{sx:{my:1},size:"small",to:"/create-menu",component:j.b,children:"change the Menu"}),r()&&Object(z.jsx)(g.a,{sx:{my:1},size:"small",color:"secondary",to:"/make-orderwave",component:j.b,children:"Make new OrderWave"})]})]}),Object(z.jsx)(ee.a,{children:Object(z.jsx)(g.a,{size:"small",to:"/menu",component:j.b,sx:{ml:"auto"},children:"Menu"})})]})}function Xe(){var e=de(),t=e.items,n=e.total;return Object(z.jsx)(q.a,{sx:{mb:2},children:Object(z.jsxs)(J.a,{children:[Object(z.jsx)(v.a,{variant:"h5",component:"div",sx:{mb:1},children:"Your order"}),(!(null===t||void 0===t?void 0:t.length)||!n)&&Object(z.jsx)(v.a,{variant:"subtitle1",component:"div",sx:{mb:1},children:"You have nothing to ask for... \ud83c\udf1a"}),!!(null===t||void 0===t?void 0:t.length)&&!!n&&Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(Te,{items:t||[]}),Object(z.jsx)(y.a,{sx:{display:"flex"},children:Object(z.jsxs)(v.a,{variant:"body1",component:"div",sx:{ml:"auto",mr:2},children:["total: ",n]})})]})]})})}function $e(){var e=H(),t=e.isHandler,n=e.userName,r=We().handler;return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(Ve,{children:Object(z.jsx)(Qe,{})}),Object(z.jsx)(Xe,{}),t()&&n===r&&Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(_e,{}),Object(z.jsx)(Ye,{})]})]})}function et(e){var t=e.children,n=e.role,r=H(),a=Object(d.g)();return r.userRole!==n?Object(z.jsx)(d.a,{to:"/menu",state:{from:a}}):t}function tt(e){var t=e.children,n=H(),r=Object(d.g)();return n.authenticated?t:Object(z.jsx)(d.a,{to:"/login",state:{from:r}})}var nt=n(249),rt=n(246),at=n(248);function ct(){var e=Object(r.useState)(new Date),t=Object(b.a)(e,2),n=t[0],a=t[1],c=H().userId,i=We(),o=Object(d.h)();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(v.a,{variant:"h5",sx:{my:2},children:" Make a New Orderwave"}),Object(z.jsx)(q.a,{children:Object(z.jsxs)(J.a,{children:[Object(z.jsx)(v.a,{variant:"h6",component:"div"}),Object(z.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t={handler:c,order_before:n};T.post("order-wave",t).then((function(){return i.fetchOrderWave?null===i||void 0===i?void 0:i.fetchOrderWave():null})).then((function(){return o("/")}))},children:[Object(z.jsx)($.a,{sx:{mb:2},children:Object(z.jsx)(at.a,{renderInput:function(e){return Object(z.jsx)(O.a,Object(k.a)({},e))},label:"Order before:",value:n,onChange:function(e){a(e)}})}),Object(z.jsx)(g.a,{type:"submit",variant:"contained",children:" create orderWave"})]})]})})]})}var it=n(262);function ot(){var e=We().fetchOrderWave,t=de().fetchOrder,n=Object(d.h)(),a=Oe().updateMenu;var c=Object(r.useState)("\nWEED \ud83c\udf32\ud83c\udf32 per G\nMimozz (hybrid)\ud83c\udf6d\ud83c\udf6d\ud83c\udf6d12\u20ac\nBlood Orange (hybrid)\ud83c\udf4a\ud83c\udf4a\ud83c\udf4a12\u20ac\nZookies (hybrid)\ud83e\udd6e\ud83e\udd6e\ud83e\udd6e12\u20ac\nBacio Gelato (hybrid)\ud83c\udf68\ud83c\udf68\ud83c\udf6812\u20ac\nMimosa (hybrid)\ud83c\udf3e\ud83c\udf3e\ud83c\udf3e11\u20ac\nGorilla Zkittlez (hybrid) \ud83e\udd8d\ud83c\udf4a\ud83e\udd8d11\u20ac\nMelonade (sativa)\ud83c\udf49\ud83c\udf49\ud83c\udf4910\u20ac\nStrawberry Kush (indica)\ud83c\udf53\ud83c\udf53\ud83c\udf5310\u20ac\nL.A. Confidential (indica)\ud83c\udf03\ud83c\udf03\ud83c\udf0310\u20ac\nShoreline (sativa)\ud83c\udf52\ud83c\udf52\ud83c\udf5210\u20ac\nSomari (indica)\ud83e\udd67\ud83e\udd67\ud83e\udd679\u20ac\nMiss Cookies (hybrid)\ud83c\udf6a\ud83d\udc78\ud83c\udf6a9\u20ac\nGuanabana #2 (hybrid) \ud83c\udf48\ud83c\udf48\ud83c\udf489\u20ac\nChocolope (sativa)\ud83c\udf6b\ud83c\udf6b\ud83c\udf6b8.5\u20ac\nEnemy of the States (indica)\ud83e\udd67\ud83e\udd67\ud83e\udd678.5\u20ac\nLemon Kush (indica)\ud83c\udf4b\ud83c\udf3f\ud83c\udf4b8.5\u20ac\nSuper Lemon Haze (sativa)\ud83c\udf4b\ud83c\udf4b\ud83c\udf4b7\u20ac\nSuper Silver Haze (sativa) \ud83d\udc0a\ud83d\udc0a\ud83d\udc0a7\u20ac\nSkunk (indica)\ud83e\udda8\ud83e\udda8\ud83e\udda87\u20ac\nMix Buds \ud83c\uddf3\ud83c\uddf1\ud83c\uddf3\ud83c\uddf1\ud83c\uddf3\ud83c\uddf1 6\u20ac\n\nHASH\ud83c\udf6b\ud83c\udf6b per G\nGelato Triple Filtred \ud83c\udf67\ud83c\udf67\ud83c\udf6715\u20ac\nLemonchello Triple Filtred\ud83c\udf4b\ud83c\udf4b\ud83c\udf4b15\u20ac\nMandalina Triple Filtred \ud83c\udf4a\ud83c\udf4a\ud83c\udf4a15\u20ac\nBarbara Peach Triple Filtred \ud83c\udf51\ud83c\udf51\ud83c\udf51 15\u20ac\nKit & Kat Double Filtred + Wax \ud83c\udf6b\ud83c\udf6b\ud83c\udf6b13.5\u20ac\nBiscotti Eggs Double Filtred \ud83c\udf6a\ud83c\udf6a\ud83c\udf6a 13.5\u20ac\nMandarina Eggs Double Filtred \ud83c\udf4a\ud83c\udf4a\ud83c\udf4a13.5\u20ac\nGorilla Zkittlez Eggs Double Filtred\ud83e\udd8d\ud83c\udf4a\ud83e\udd8d13.5\u20ac\nGolden States Eggs Double Filtred \ud83c\udf4c\ud83c\udf4c\ud83c\udf4c12.5\u20ac\nBanana Kush Refiltred \ud83c\udf4c\u2618\ufe0f\ud83c\udf4c12\u20ac\nGorilla Kush Blond Refiltred \ud83e\udd8d\u2618\ufe0f\ud83e\udd8d10\u20ac\nBanana Punch Refiltred \ud83c\udf4c\ud83c\udf4c\ud83c\udf4c10\u20ac\nBluberry Kush Filtred Hash \ud83c\udf52\ud83c\udf53\ud83c\udf527.5\u20ac\nMango Kush Filtred Hash\ud83e\udd6d\ud83e\udd6d\ud83e\udd6d7.5\u20ac\nPhineapple Express Pollinetor Hash \ud83c\udf4d\ud83c\udf4d\ud83c\udf4d7\u20ac\nOrange Bud Maroccan Hash \ud83c\udf4a\ud83c\udf4a\ud83c\udf4a7\u20ac"),i=Object(b.a)(c,2),o=i[0],s=i[1];return Object(z.jsx)(q.a,{children:Object(z.jsxs)(J.a,{children:[Object(z.jsx)(it.a,{fullWidth:!0,children:Object(z.jsx)(O.a,{label:"paste the menu here \ud83d\udc47\ud83c\udffe",multiline:!0,rows:15,variant:"outlined",onChange:function(e){return s(e.currentTarget.value)},value:o})}),Object(z.jsx)(g.a,{variant:"contained",color:"primary",onClick:function(){if(o){var r=o.split("\n"),c=/(^.+[^\d^.]|[^\d])([\d.]{1,4}).?/,i=r.filter((function(e){return c.test(e)})).map((function(e){var t=e.match(c);return t?{id:t[0],name:t[1],price:parseFloat(t[2])}:{id:"",name:"",price:0}}));null!==i&&i.length>0?a(i).then((function(){e&&e(),t(),n("/menu")})):console.error("WTF...")}else console.log("textfield is empty yo")},children:" Gogogo! "})]})})}var st=function(){return Object(z.jsxs)(o.a,{theme:u,children:[Object(z.jsx)(s.a,{}),Object(z.jsx)(P,{children:Object(z.jsx)(j.a,{children:Object(z.jsxs)(d.e,{children:[Object(z.jsxs)(d.c,{path:"/",element:Object(z.jsx)(tt,{children:Object(z.jsx)(Le,{children:Object(z.jsx)(je,{children:Object(z.jsx)(he,{children:Object(z.jsx)(rt.b,{dateAdapter:nt.a,children:Object(z.jsx)(Ge,{})})})})})}),children:[Object(z.jsx)(d.c,{path:"",element:Object(z.jsx)($e,{})}),Object(z.jsx)(d.c,{path:"menu",element:Object(z.jsx)(fe,{})}),Object(z.jsx)(d.c,{path:"users",element:Object(z.jsx)(et,{role:"handler",children:Object(z.jsx)(Z,{})})}),Object(z.jsx)(d.c,{path:"make-orderwave",element:Object(z.jsx)(ct,{})}),Object(z.jsx)(d.c,{path:"create-menu",element:Object(z.jsx)(ot,{})})]}),Object(z.jsx)(d.c,{path:"/login",element:Object(z.jsx)(z.Fragment,{children:Object(z.jsx)(d.b,{})}),children:Object(z.jsx)(d.c,{path:"",element:Object(z.jsx)(_,{})})})]})})})]})},lt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,286)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};n(166),n(167),n(168);i.a.render(Object(z.jsx)(a.a.StrictMode,{children:Object(z.jsx)(st,{})}),document.getElementById("root")),lt()}},[[169,1,2]]]);
//# sourceMappingURL=main.428ff346.chunk.js.map