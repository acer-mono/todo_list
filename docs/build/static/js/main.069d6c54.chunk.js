(this["webpackJsonp907sv-lab2"]=this["webpackJsonp907sv-lab2"]||[]).push([[0],{45:function(t,e,n){},46:function(t,e,n){},53:function(t,e,n){},55:function(t,e,n){},56:function(t,e,n){},57:function(t,e,n){},58:function(t,e,n){},59:function(t,e,n){},60:function(t,e,n){},65:function(t,e,n){"use strict";n.r(e);var r=n(1),c=n.n(r),a=n(27),i=n.n(a),s=(n(45),n(46),n(7)),o=n.n(s),u=n(14),d=n(13),l=n(5),j=n(9),b="remove",O="edit",f="create",h="filterChanged",p="categoryChanged",m="clearErrors",v="addError",x="loadMessages",y="setRequestStatus",g="setAuthStatus",N="initialAuth",S="http://localhost:3001",C={"Content-Type":"application/json"};function E(t){return k.apply(this,arguments)}function k(){return(k=Object(u.a)(o.a.mark((function t(e){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:if(n=t.sent,200===e.status){t.next=5;break}throw new Error(n.error);case 5:return t.abrupt("return",n);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var w,D={todos:{add:function(t){var e=t.title;return fetch("".concat(S,"/todos"),{method:"POST",headers:C,body:JSON.stringify({title:e})}).then(E)},list:function(){return fetch("".concat(S,"/todos"),{method:"GET",headers:C}).then(E)},update:function(t){var e=t.id,n=t.isChecked,r=t.title;return fetch("".concat(S,"/todos/").concat(e),{method:"PUT",headers:C,body:JSON.stringify({id:e,title:r,isChecked:n})}).then(E)},delete:function(t){return fetch("".concat(S,"/todos/").concat(t),{method:"DELETE",headers:C,body:JSON.stringify({id:t})}).then(E)}},auth:{isAuth:function(){return fetch("".concat(S,"/auth"),{method:"GET",headers:C}).then(E)},login:function(t,e){return fetch("".concat(S,"/auth"),{method:"POST",headers:C,body:JSON.stringify({username:t,password:e})}).then(E)},logout:function(){return fetch("".concat(S,"/auth"),{method:"DELETE",headers:C}).then(E)}}};!function(t){t[t.IDLE=0]="IDLE",t[t.LOADING=1]="LOADING",t[t.SUCCESS=2]="SUCCESS",t[t.ERROR=3]="ERROR"}(w||(w={}));var R=function(t){return{type:m,payload:t}},L=function(t){return{type:v,payload:t}},A=function(t){return{type:x,payload:t}},I=function(t){return{type:y,payload:{requestStatus:t}}},T=function(t){return{type:g,payload:{state:t}}},G=function(t){return function(){var e=Object(u.a)(o.a.mark((function e(n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(I(w.LOADING)),e.prev=1,e.next=4,D.todos.add({title:t});case 4:r=e.sent,n({type:f,payload:{item:r}}),n(I(w.SUCCESS)),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),n(I(w.ERROR)),n(L({error:e.t0.message}));case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()},U=function(t){return function(){var e=Object(u.a)(o.a.mark((function e(n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(I(w.LOADING)),e.prev=1,e.next=4,D.todos.update(t);case 4:n(I(w.SUCCESS)),n((r=Object(j.a)({},t),{type:O,payload:r})),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),n(I(w.ERROR)),n(L({error:e.t0.message}));case 12:case"end":return e.stop()}var r}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},q=(n(53),n(2)),F=function(){var t=Object(r.useState)(""),e=Object(d.a)(t,2),n=e[0],c=e[1],a=Object(l.e)((function(t){return t.todo.requestStatus})),i=Object(l.d)();Object(r.useEffect)((function(){a==w.SUCCESS&&(c(""),i(I(w.IDLE)))}),[a]);var s=function(){var t=Object(u.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i(G(n));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(q.jsx)(q.Fragment,{children:Object(q.jsx)("form",{"data-testid":"create-form",action:"#",onSubmit:s,children:Object(q.jsx)("input",{className:"create-field","data-testid":"create-input",type:"text",value:n,disabled:a==w.LOADING,placeholder:"Type here to add",onChange:function(t){return c(t.target.value)}})})})},J=n(21),_=n(25),P={ALL:"All",DONE:"Done",NOT_DONE:"Not done"},M={searchString:"",category:P.ALL};function V(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case h:return t.searchString=e.payload.searchString,Object(j.a)({},t);case p:return t.category=e.payload.category,Object(j.a)({},t);default:return t}}function B(t,e){switch(e){case P.DONE:return t.filter((function(t){return t.isChecked}));case P.NOT_DONE:return t.filter((function(t){return!t.isChecked}));default:return t}}var z=Object(_.a)((function(t){return t.todo.list}),(function(t){return t.filter.category}),(function(t){return t.filter.searchString}),(function(t,e,n){return B(function(t,e){return t.filter((function(t){return t.title.toLowerCase().includes(e.toLowerCase())}))}(t,n),e)})),H=Object(_.a)((function(t){return t.todo.errors}),(function(t){return t})),K=Object(_.a)((function(t){return t.todo.list}),(function(t){var e;return e={},Object(J.a)(e,P.ALL,t.length),Object(J.a)(e,P.DONE,B(t,P.DONE).length),Object(J.a)(e,P.NOT_DONE,B(t,P.NOT_DONE).length),e})),Q=(Object(_.a)((function(t){return t.todo.list}),(function(t){return t.map((function(t){return t.title}))})),n(55),function(t){var e=t.filterValues,n=Object(r.useState)(""),c=Object(d.a)(n,2),a=c[0],i=c[1],s=Object(l.e)(K),o=Object(l.e)((function(t){return t.filter.category})),u=Object(l.d)();return Object(q.jsxs)(q.Fragment,{children:[Object(q.jsx)("input",{className:"search-field",placeholder:"Type here to search","data-testid":"search-input",type:"text",value:a,onChange:function(t){var e;u((e={searchString:t.target.value},{type:h,payload:e})),i(t.target.value)}}),Object(q.jsx)("div",{className:"option-wrapper",children:Object.entries(e).map((function(t){var e=Object(d.a)(t,2),n=e[0],r=e[1];return Object(q.jsxs)("a",{className:o===r?"selectedOption option-item":"option-item","data-testid":"option"+r,role:"option",onClick:function(){return u({type:p,payload:{category:r}})},children:[r," (",s[r],")"]},n)}))})]})}),W=(n(56),n(19)),X=function(t){var e=t.item,n=t.closeItem,c=Object(r.useState)(e.title),a=Object(d.a)(c,2),i=a[0],s=a[1],o=Object(l.d)();return Object(q.jsx)("div",{className:"edit-list-item-background",children:Object(q.jsxs)("form",{className:"edit-list-item-form","data-testid":"editForm",action:"",onSubmit:function(t){return function(t){t.preventDefault(),""!==i&&o(U({id:e.id,title:i,isChecked:void 0})),n()}(t)},children:[Object(q.jsx)("input",{className:"edit-list-item-input","data-testid":"edit-input",type:"text",value:i,onChange:function(t){s(t.target.value)}}),Object(q.jsx)("button",{type:"button",className:"edit-list-item-button","data-testid":"edit-button",onClick:n,children:Object(q.jsx)(W.d,{})})]})})},Y=(n(57),function(t){var e=t.item,n=Object(r.useState)(!1),c=Object(d.a)(n,2),a=c[0],i=c[1],s=Object(l.d)();return Object(q.jsxs)(q.Fragment,{children:[Object(q.jsxs)("div",{className:"item-wrapper",children:[Object(q.jsxs)("div",{title:e.title,className:"item-container",children:[Object(q.jsx)("input",{id:e.id,className:"checkbox","data-testid":"item-checkbox",type:"checkbox",checked:e.isChecked,onChange:function(){return s(U({id:e.id,isChecked:!e.isChecked,title:void 0}))}}),Object(q.jsx)("label",{className:"label-for-checkbox",htmlFor:e.id,"data-testid":"list-item",style:e.isChecked?{textDecoration:"line-through"}:{},children:e.title})]}),Object(q.jsxs)("div",{children:[Object(q.jsx)("button",{className:"button button-remove","data-testid":"remove-button",onClick:function(){return s((t=e.id,function(){var e=Object(u.a)(o.a.mark((function e(n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(I(w.LOADING)),e.prev=1,e.next=4,D.todos.delete(t);case 4:n(I(w.SUCCESS)),n({type:b,payload:{id:t}}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),n(I(w.ERROR)),n(L({error:e.t0.message}));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()));var t},children:Object(q.jsx)(W.c,{})}),Object(q.jsx)("button",{className:"button button-edit","data-testid":"edit-cancel-button",onClick:function(){return i(!a)},children:Object(q.jsx)(W.a,{})})]})]}),a&&Object(q.jsx)("div",{className:"edit-item-form",children:Object(q.jsx)(X,{item:e,closeItem:function(){return i(!1)}})})]})}),Z=function(){var t=Object(l.e)(z);return Object(q.jsx)(q.Fragment,{children:t.map((function(t){return Object(q.jsx)(Y,{item:t},t.id)}))})},$=function(){var t=Object(l.d)();return Object(q.jsxs)("div",{className:"todo-wrapper",children:[Object(q.jsx)("button",{className:"button-close",onClick:function(){t(function(){var t=Object(u.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(I(w.LOADING)),t.prev=1,t.next=4,D.auth.logout();case 4:e(I(w.SUCCESS)),e(T(!1)),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),e(I(w.ERROR)),e(L({error:t.t0.message}));case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}())},children:Object(q.jsx)(W.b,{})}),Object(q.jsxs)("div",{className:"content-main",children:[Object(q.jsx)("div",{className:"header-main",children:"Todo List"}),Object(q.jsx)("div",{className:"search-form",children:Object(q.jsx)(Q,{filterValues:P})}),Object(q.jsx)("div",{className:"list-items",children:Object(q.jsx)(Z,{})}),Object(q.jsx)("div",{className:"create-form",children:Object(q.jsx)(F,{})})]})]})},tt=(n(58),function(){return Object(q.jsxs)("div",{className:"spinner","data-testid":"spinner",children:[Object(q.jsx)("div",{className:"spinner-item item1"}),Object(q.jsx)("div",{className:"spinner-item item2"}),Object(q.jsx)("div",{className:"spinner-item item3"})]})}),et=(n(59),function(t){var e=t.error,n=t.delay,c=Object(l.d)();return Object(r.useEffect)((function(){var t=setTimeout((function(){return c(R({id:e.id}))}),n);return function(){clearTimeout(t)}}),[]),Object(q.jsxs)("div",{className:"alert",children:[Object(q.jsx)("button",{className:"close",onClick:function(){return c(R({id:e.id}))},"data-testid":"alert-close",children:Object(q.jsx)(W.d,{})}),Object(q.jsx)("div",{"data-testid":"error",children:e.title})]},e.id)}),nt=function(t){var e=t.delay,n=Object(l.e)(H);return n.length?Object(q.jsx)("div",{"data-testid":"alert",children:n.map((function(t){return Object(q.jsx)(et,{error:t,delay:e},t.id)}))}):null},rt=n(18),ct=(n(60),function(){var t=Object(l.d)(),e=Object(r.useState)(""),n=Object(d.a)(e,2),c=n[0],a=n[1],i=Object(r.useState)(""),s=Object(d.a)(i,2),j=s[0],b=s[1];return Object(q.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t(function(t,e){return function(){var n=Object(u.a)(o.a.mark((function n(r){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r(I(w.LOADING)),n.prev=1,n.next=4,D.auth.login(t,e);case 4:r(I(w.SUCCESS)),r(T(!0)),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(1),r(I(w.ERROR)),r(L({error:n.t0.message}));case 12:case"end":return n.stop()}}),n,null,[[1,8]])})));return function(t){return n.apply(this,arguments)}}()}(c,j))},action:"#","data-testid":"login-form",className:"login-form",children:[Object(q.jsx)("h1",{className:"login-header",children:"Nice to see you!"}),Object(q.jsx)("input",{value:c,onChange:function(t){return a(t.target.value)},placeholder:"Enter login",className:"login-input",type:"text",name:"login","data-testid":"login"}),Object(q.jsx)("input",{value:j,onChange:function(t){return b(t.target.value)},placeholder:"Enter password",className:"login-input",type:"password",name:"password","data-testid":"password"}),Object(q.jsx)("button",{className:"login-submit",type:"submit","data-testid":"submit-login",children:"Login"})]})}),at="Done",it="Not done",st={state:"All"};function ot(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:st,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case g:return e.payload.state?t.state=at:t.state=it,Object(j.a)({},t);default:return t}}var ut=function(){var t=Object(l.d)();Object(r.useEffect)((function(){t({type:N})}),[]);var e=Object(l.e)((function(t){return t.todo.requestStatus})),n=Object(l.e)((function(t){return t.auth.state}));return Object(q.jsxs)(q.Fragment,{children:[Object(q.jsxs)(rt.c,{children:[n===at&&Object(q.jsx)(rt.a,{path:"/",component:$}),n===it&&Object(q.jsx)(rt.a,{path:"/",component:ct})]}),Object(q.jsx)(nt,{delay:3e3}),e===w.LOADING&&Object(q.jsx)(tt,{})]})},dt=n(22),lt=n(20),jt=n(37),bt=n(26),Ot=n(40),ft={list:[],requestStatus:w.IDLE,errors:[]};function ht(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ft,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case b:return Object(j.a)(Object(j.a)({},t),{},{list:Object(bt.a)(t.list.filter((function(t){return t.id!==e.payload.id})))});case O:return Object(j.a)(Object(j.a)({},t),{},{list:Object(bt.a)(t.list.map((function(t){return t.id===e.payload.id&&(void 0!==e.payload.title&&(t.title=e.payload.title),void 0!==e.payload.isChecked&&(t.isChecked=e.payload.isChecked)),t})))});case f:return Object(j.a)(Object(j.a)({},t),{},{list:[].concat(Object(bt.a)(t.list),[e.payload.item])});case m:return Object(j.a)(Object(j.a)({},t),{},{errors:t.errors.filter((function(t){return t.id!=e.payload.id}))});case v:var n={id:Object(Ot.a)(),title:e.payload.error};return Object(j.a)(Object(j.a)({},t),{},{errors:[].concat(Object(bt.a)(t.errors),[n])});case x:return Object(j.a)(Object(j.a)({},t),{},{list:e.payload.list});case y:return Object(j.a)(Object(j.a)({},t),{},{requestStatus:e.payload.requestStatus});default:return t}}var pt=function(t){return Object(lt.b)({todo:ht,filter:V,auth:ot,router:Object(dt.b)(t)})},mt=n(11),vt=o.a.mark(gt),xt=o.a.mark(Nt),yt=o.a.mark(St);function gt(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(mt.d)(N,Nt);case 2:case"end":return t.stop()}}),vt)}function Nt(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(mt.c)(I(w.LOADING));case 3:return t.next=5,Object(mt.a)(D.auth.isAuth);case 5:return t.next=7,Object(mt.c)(I(w.SUCCESS));case 7:return t.next=9,Object(mt.c)(T(!0));case 9:return t.next=11,Object(mt.b)(St);case 11:t.next=21;break;case 13:return t.prev=13,t.t0=t.catch(0),t.next=17,Object(mt.c)(I(w.ERROR));case 17:return t.next=19,Object(mt.c)(T(!1));case 19:return t.next=21,Object(mt.c)(L({error:t.t0.message}));case 21:case"end":return t.stop()}}),xt,null,[[0,13]])}function St(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(mt.c)(I(w.LOADING));case 3:return e.next=5,Object(mt.a)(D.todos.list);case 5:return t=e.sent,e.next=8,Object(mt.c)(I(w.SUCCESS));case 8:return e.next=10,Object(mt.c)(A({list:t}));case 10:e.next=18;break;case 12:return e.prev=12,e.t0=e.catch(0),e.next=16,Object(mt.c)(I(w.ERROR));case 16:return e.next=18,Object(mt.c)(L({error:e.t0.message}));case 18:case"end":return e.stop()}}),yt,null,[[0,12]])}var Ct=n(16),Et=n(35),kt=n(39),wt=Object(Ct.a)(),Dt=pt(wt),Rt=Object(kt.a)(),Lt=Object(lt.d)(Dt,Object(lt.a)(jt.a,Object(Et.a)(wt),Rt));Rt.run(gt);var At=Lt;i.a.render(Object(q.jsx)(c.a.StrictMode,{children:Object(q.jsx)(l.a,{store:At,children:Object(q.jsx)(dt.a,{history:wt,children:Object(q.jsx)(ut,{})})})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.069d6c54.chunk.js.map