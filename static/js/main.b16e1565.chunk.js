(this["webpackJsonpa-peeling-banana"]=this["webpackJsonpa-peeling-banana"]||[]).push([[0],{196:function(e,a,n){"use strict";n.r(a);var t=n(0),r=n.n(t),l=n(60),i=n.n(l),s=(n(77),n(78),n(1)),c=n(61),o=n.n(c),m=n(31),u=n.n(m),d=n(62),g=n(9),f=n(63),p=n.n(f),h=n(71),_=n(64),b=n(32),v=n(65),E=n(66),w=n.n(E),C=n(67),O=n.n(C),y=n(14),N=n.n(y),j=n(68),k=n.n(j),x=n(69),S=n.n(x);var A=function(e){var a=e.trim().toLowerCase();if(!a)return[];var n=O()(b.a,(function(e,n){return N()(n.name.toLowerCase(),a)&&e.push(n.id),e}),[]),t=[];return k()(_.a,(function(e){var r=Object(h.a)({},e),l=S()(r.ingredient_ids,n);r.matchingIngredientsIds=l,(l.length>0||N()(e.collection.toLowerCase(),a))&&t.push(r)})),t},B=n(70),I=n.n(B);var L=function(e){var a=e.product,n=e.searchValue,l=Object(t.useState)(""),i=Object(g.a)(l,2),c=i[0],o=i[1];return Object(t.useEffect)((function(){var e,n=(e=a.id,v[e]);o(n)}),[a]),r.a.createElement("li",null,r.a.createElement(s.Row,{justify:"center"},r.a.createElement("div",{className:"Card"},r.a.createElement("div",{className:"ProductImageContainer"},r.a.createElement("img",{className:"ProductImage",src:c,alt:"Avatar"})),r.a.createElement("div",{className:"CardContainer"},r.a.createElement("span",{className:"ProductName"},r.a.createElement("b",null,a.name)),r.a.createElement("br",null),r.a.createElement("ul",{className:"comma-list IngredientList"},a.ingredient_ids.map((function(e){var t=function(e){return w()(b.a,(function(a){return a.id===e}))}(e);return t?N()(a.matchingIngredientsIds,e)?function(e){var a=e.name.trim(),t=n.trim(),l=a.toLowerCase().indexOf(t.trim().toLowerCase()),i=l+t.length,s=a.substring(0,l),c=a.substring(l,i),o=a.substring(i,a.length);return r.a.createElement("li",{className:"IngredientListItem",key:"ingredient-".concat(e.id)},r.a.createElement("span",null,s,r.a.createElement("b",null,c),o))}(t):r.a.createElement("li",{className:"IngredientListItem",key:"ingredient-".concat(t.id)},r.a.createElement("span",null,t.name)):null})))))))};var R=Object(t.memo)(L,(function(e,a){return I()(e.product,a.product)})),P=function(e){var a=e.products,n=e.searchValue,t=a.map((function(e){return r.a.createElement(R,{key:"product-".concat(e.id),product:e,searchValue:n})}));return r.a.createElement("ul",{className:"ProductList","aria-label":"product-list"},t)},M=A("Organic Banana");var q=function(){var e=Object(t.useState)(!1),a=Object(g.a)(e,2),n=a[0],l=a[1],i=Object(t.useState)("Organic Banana"),c=Object(g.a)(i,2),o=c[0],m=c[1],f=Object(t.useState)(M),h=Object(g.a)(f,2),_=h[0],b=h[1],v=Object(t.useRef)(p()(function(){var e=Object(d.a)(u.a.mark((function e(a){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,100)}));case 2:n=A(a),b(n),l(!1);case 5:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),300,{trailing:!0})).current;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.Row,{justify:"center"},r.a.createElement("input",{"aria-label":"ingredient-search",className:"SearchInput",placeholder:"Hungry for . . .",value:o,type:"search",onChange:function(e){l(!0),m(e.target.value),v(e.target.value.trim())}})),n||0===_.length?n?r.a.createElement(s.Row,null,r.a.createElement("div",{className:"Loader"})):o&&0===_.length?r.a.createElement(s.Row,null,r.a.createElement(s.Col,null,r.a.createElement("div",{"araia-label":"no-result-div",className:"SorryMessage"},r.a.createElement("span",null,"Sorry! Looks like we are fresh out of"),r.a.createElement("br",null),r.a.createElement("span",null,r.a.createElement("i",null,'"'.concat(o,'"')))))):void 0:r.a.createElement(P,{products:_,searchValue:o}))};function G(){return r.a.createElement(s.Row,null,r.a.createElement("img",{className:"AppLogo",src:o.a,alt:"logo"}))}var J=function(){return r.a.createElement(s.Container,{className:"AppContainer",fluid:!0},r.a.createElement(s.Row,{justify:"center"},r.a.createElement(s.Col,{xs:1,sm:3,lg:4}),r.a.createElement(s.Col,{xs:10,sm:6,lg:4},r.a.createElement("div",null,r.a.createElement(G,null),r.a.createElement(q,null))),r.a.createElement(s.Col,{xs:1,sm:3,lg:4})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},32:function(e){e.exports=JSON.parse('{"a":[{"id":1,"name":"Organic Acai Berry","is_allergen":false},{"id":2,"name":"Organic Cherry","is_allergen":false},{"id":3,"name":"Organic Banana","is_allergen":false},{"id":4,"name":"Organic Blueberry","is_allergen":false},{"id":5,"name":"Organic Kale","is_allergen":false},{"id":6,"name":"Hazelnuts","is_allergen":false},{"id":7,"name":"Ginger","is_allergen":false},{"id":8,"name":"Apples","is_allergen":false},{"id":9,"name":"Organic Raspberry","is_allergen":false},{"id":10,"name":"Avocado","is_allergen":false},{"id":11,"name":"Organic Flax Seeds","is_allergen":false},{"id":12,"name":"Organic Spinach","is_allergen":false},{"id":13,"name":"Lemon","is_allergen":false},{"id":14,"name":"Celery","is_allergen":false},{"id":15,"name":"Cucumber","is_allergen":false},{"id":16,"name":"Beets","is_allergen":false},{"id":17,"name":"Macadamia Nut","is_allergen":true},{"id":18,"name":"Celery","is_allergen":false},{"id":19,"name":"Cinnamon","is_allergen":false},{"id":20,"name":"Oats","is_allergen":false},{"id":21,"name":"Maple","is_allergen":false},{"id":22,"name":"Organic Butternut Squash","is_allergen":false},{"id":23,"name":"Mushrooms","is_allergen":false},{"id":24,"name":"Seaweed","is_allergen":false},{"id":25,"name":"Miso","is_allergen":false},{"id":26,"name":"Cacao","is_allergen":false}]}')},61:function(e,a,n){e.exports=n.p+"static/media/daily-harvest-logo.68c0e9f0.jpg"},64:function(e){e.exports=JSON.parse('{"a":[{"id":1,"name":"Acai + Cherry","collection":"smoothie","ingredient_ids":[1,2,3,4,5]},{"id":2,"name":"Chocolate + Blueberry","collection":"smoothie","ingredient_ids":[3,4,26,5,12]},{"id":3,"name":"Beet + Avocado Poke","collection":"harvest bowl","ingredient_ids":[10,16,7,17]},{"id":4,"name":"Cinnamon + Banana","collection":"oat bowl","ingredient_ids":[19,3,22,26,21,20]},{"id":5,"name":"Mushroom + Miso","collection":"soup","ingredient_ids":[22,23,7,24,25,12]},{"id":6,"name":"Ginger + Greens","collection":"smoothie","ingredient_ids":[10,7,3,11,12]}]}')},65:function(e){e.exports=JSON.parse('{"1":"//images.ctfassets.net/iw4cawak30d4/1q0dxhQIVjeNah1Ctd78dn/30608d718831b252b7ca4efc3aed0536/transparent-shot-ingredients_3x-squashed.png?w=350&fl=progressive","2":"//images.ctfassets.net/iw4cawak30d4/1uAHoSHtcZhYLR7l2gk9o9/7b7c22f8346b7b8c00069de3d08cd198/Chocolate___Blueberry_transparent-shot-ingredients_3x-squashed.png?w=350&fl=progressive","3":"//images.ctfassets.net/iw4cawak30d4/35AUNhCNebUv6CeAGRCRLh/dfa2c592ab943e24a0cd20e00d4a5149/F07-POKE_Beet___Avocado_Poke___3x.png?w=350&fl=progressive","4":"//images.ctfassets.net/iw4cawak30d4/eAiZVKUhv8y8ENWd8npje/c24eba01c2e433c0719b752d09f4b32b/Cinnamon___Banana_transparent-shot_3x-squashed.png?w=350&fl=progressive","5":"//images.ctfassets.net/iw4cawak30d4/1DWEg4ePnI7StHcCJbaFDm/21395aab4ca010004a1f54983eb0d2bd/update_3x-squashed.png?w=350&fl=progressive","6":"//images.ctfassets.net/iw4cawak30d4/3fcbAZtKaQU9l6lr44fa4A/a9216f2b26f7826b383d12fe34113ef6/Ginger___Greens_transparent-shot-ingredients_3x-squashed.png?w=350&fl=progressive"}')},72:function(e,a,n){e.exports=n(196)},77:function(e,a,n){},78:function(e,a,n){}},[[72,1,2]]]);
//# sourceMappingURL=main.b16e1565.chunk.js.map